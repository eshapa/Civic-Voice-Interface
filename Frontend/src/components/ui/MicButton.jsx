import React, { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = {
  en: "en-US",
  hi: "hi-IN",
  mr: "mr-IN",
};

const MicButton = ({ size = "md" }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lang, setLang] = useState("en"); // default language

  let recognition;

  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    setIsListening(true);
    recognition.lang = languages[lang];

    recognition.start();

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
      recognition.stop();
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="mb-2 p-2 rounded border"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
      </select>

      <button
        onClick={startListening}
        className={cn(
          "rounded-full text-white transition-all flex items-center justify-center",
          size === "md" ? "p-6" : "p-4",
          isListening ? "bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        {isListening ? <MicOff /> : <Mic />}
      </button>

      <p className="mt-2 font-medium text-gray-800">{transcript}</p>
    </div>
  );
};

export default MicButton;
