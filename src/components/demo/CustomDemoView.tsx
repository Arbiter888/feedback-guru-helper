import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RestaurantHeader } from "./RestaurantHeader";
import { ReviewSection } from "./ReviewSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { AiSurveyWidget } from "./AiSurveyWidget";
import { Footer } from "@/components/Footer";

interface CustomDemoViewProps {
  slug: string;
}

export const CustomDemoView = ({ slug }: CustomDemoViewProps) => {
  const [preferences, setPreferences] = useState<{
    restaurant_name: string;
    google_maps_url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAiSurvey, setShowAiSurvey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDemoPage = async () => {
      try {
        const { data, error } = await supabase
          .from('demo_pages')
          .select('restaurant_name, google_maps_url')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) {
          setPreferences(data);
          localStorage.setItem('demoPreferences', JSON.stringify({
            restaurantName: data.restaurant_name,
            googleMapsUrl: data.google_maps_url,
          }));
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Error loading demo page:', err);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadDemoPage();
  }, [slug, navigate]);

  const handleTakeAiSurvey = () => {
    setShowAiSurvey(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!preferences) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <RestaurantHeader
              name={preferences.restaurant_name}
              isCustomDemo={true}
            />
            <ReviewSection 
              customRestaurantName={preferences.restaurant_name}
              customGoogleMapsUrl={preferences.google_maps_url}
              hidePreferences={true}
              onTakeAiSurvey={handleTakeAiSurvey}
            />
          </CardContent>
        </Card>
      </div>
      
      <AiSurveyWidget show={showAiSurvey} />
      <Footer />
    </div>
  );
};