import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, BarChart3, AlertTriangle, Mic, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const BACKEND_URL = "http://localhost:5000";

const Eligibility = () => {
  const { schemeId } = useParams(); // Get schemeId from URL
  const [scheme, setScheme] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/eligibility/${schemeId}?lang=${language}`);
        const data = await res.json();
        setScheme(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEligibility();
  }, [schemeId, language]);

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header variant="app" />

      <main className="flex-1 container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{scheme.name}</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{scheme.name}</h1>
          <p className="text-muted-foreground">{scheme.description}</p>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Eligibility Criteria */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Eligibility Criteria</h2>
            </div>
            <div className="card-elevated overflow-hidden p-4">
              <ul className="list-disc pl-6 space-y-2">
                {scheme.eligibilityCriteria.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h2 className="font-semibold text-lg">Required Documents</h2>
            </div>
            <div className="info-card-warning p-4">
              <ul className="list-disc pl-6 space-y-2">
                {scheme.requiredDocuments.map((doc, index) => (
                  <li key={index} className="text-sm text-warning">{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/voice-assistant">
            <Button size="lg" className="rounded-full gap-2 px-8">
              <Mic className="h-5 w-5" />
              Continue by voice
            </Button>
          </Link>
          <Link to="/steps">
            <Button size="lg" variant="outline" className="rounded-full gap-2 px-8">
              View Next Steps <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Eligibility;
