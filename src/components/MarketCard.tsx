
import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface Market {
  catchment_name: string;
  city: string;
  latitude: number;
  longitude: number;
  geolq_id: string;
  address: string;
  properties_shared: number;
  added_on: string;
  priority: "high" | "medium" | "low";
  added_by: {
    name: string;
    phone: string;
  };
  carpet_area: number;
  rent: number;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{market.catchment_name}</h3>
            <p className="text-sm text-muted-foreground">{market.city}</p>
          </div>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getPriorityColor(market.priority)}>
                  {market.priority.toUpperCase()}
                </Badge>
                <Badge variant="secondary">Added on: {market.added_on}</Badge>
              </div>
              
              <p className="text-sm">{market.address}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Properties shared</p>
                  <p className="font-medium">{market.properties_shared}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Carpet area</p>
                  <p className="font-medium">{market.carpet_area} sq ft.</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rent</p>
                  <p className="font-medium">INR {market.rent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Added by</p>
                  <p className="font-medium">{market.added_by.name}</p>
                  <p className="text-sm text-muted-foreground">{market.added_by.phone}</p>
                </div>
              </div>
            </div>

            <Button onClick={handleGoogleMapsClick} className="w-full">
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
