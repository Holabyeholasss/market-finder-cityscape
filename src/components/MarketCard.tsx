
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
            <h3 className="text-sm font-semibold">{market.catchment_name}</h3>
            <p className="text-xs text-muted-foreground">{market.city}</p>
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${getPriorityColor(market.priority)}`}>
                  {market.priority.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="text-xs">Added on: {market.added_on}</Badge>
              </div>
              
              <p className="text-xs text-muted-foreground">{market.address}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Properties shared</span>
                  <span className="font-medium">{market.properties_shared}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carpet area</span>
                  <span className="font-medium">{market.carpet_area} sq ft.</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rent</span>
                  <span className="font-medium">INR {market.rent.toLocaleString()}</span>
                </div>
                
                <div>
                  <div className="text-muted-foreground">Added by</div>
                  <div className="flex justify-between">
                    <span className="font-medium">{market.added_by.name}</span>
                    <span className="text-xs text-muted-foreground">{market.added_by.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleGoogleMapsClick} className="w-full text-xs">
              <MapPin className="mr-2 h-3 w-3" />
              View on Google Maps
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default MarketCard;

