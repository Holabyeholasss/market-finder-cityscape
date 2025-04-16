
import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Market {
  catchment_name: string;
  city: string;
  latitude: number;
  longitude: number;
  geolq_id: string;
  address: string;
}

interface MarketCardProps {
  market: Market;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGoogleMapsClick = () => {
    const url = `https://www.google.com/maps?q=${market.latitude},${market.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="mb-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{market.catchment_name}</h3>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
        <p className="text-sm text-muted-foreground">{market.city}</p>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">{market.address}</p>
            <p className="text-sm text-muted-foreground">ID: {market.geolq_id}</p>
            <Button onClick={handleGoogleMapsClick} className="w-full mt-4">
              <MapPin className="mr-2 h-4 w-4" />
              View on Google Maps
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default MarketCard;
