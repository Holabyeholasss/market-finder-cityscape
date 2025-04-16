import { useState } from "react";
import { DateFilter, Priority } from "@/components/FiltersSection";
import FiltersSection from "@/components/FiltersSection";
import MarketCard from "@/components/MarketCard";
import { Card } from "@/components/ui/card";

const marketsData = [{
  catchment_name: "Abohar - Malout Rd",
  city: "Gobindgarh, Abohar",
  latitude: 30.16267,
  longitude: 74.248161,
  geolq_id: "6236479",
  address: "Abohar - Malout Rd, opp. BR Villa Resort, Daulat Pura, Gobindgarh, Abohar, Punjab 152117, India",
  properties_shared: 5,
  added_on: "2024-04-15",
  priority: "high" as Priority,
  added_by: {
    name: "John Doe",
    phone: "+91 9876543210"
  },
  carpet_area: 2000,
  rent: 200000
}];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    cities: string[];
    priorities: Priority[];
    dates: DateFilter[];
  }>({
    cities: [],
    priorities: [],
    dates: [],
  });
  const [sortOption, setSortOption] = useState<string>("");

  const cities = [...new Set(marketsData.map(market => market.city))];

  const filteredMarkets = marketsData.filter(market => {
    const matchesSearch = market.catchment_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = activeFilters.cities.length === 0 || 
      activeFilters.cities.includes(market.city);

    const matchesPriority = activeFilters.priorities.length === 0 ||
      activeFilters.priorities.includes(market.priority);

    const matchesDate = activeFilters.dates.length === 0 ||
      activeFilters.dates.includes("today");

    return matchesSearch && matchesCity && matchesPriority && matchesDate;
  });

  const sortedAndFilteredMarkets = filteredMarkets.sort((a, b) => {
    switch (sortOption) {
      case "priority_high":
        return getPriorityValue(b.priority) - getPriorityValue(a.priority);
      case "priority_low":
        return getPriorityValue(a.priority) - getPriorityValue(b.priority);
      case "recent":
        return new Date(b.added_on).getTime() - new Date(a.added_on).getTime();
      case "old":
        return new Date(a.added_on).getTime() - new Date(b.added_on).getTime();
      default:
        return 0;
    }
  });

  const getPriorityValue = (priority: Priority): number => {
    switch (priority) {
      case "high":
        return 3;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src="/lovable-uploads/82a46d57-432a-4834-8d3f-1302ed75426d.png" 
          alt="Lenskart" 
          className="h-8 object-contain"
        />
      </div>
      <h1 className="text-2xl mb-2 font-bold">Property requirements</h1>
      <p className="text-muted-foreground mb-6">
        View all the locations where the brand requires a property
      </p>

      <div className="mb-6">
        <FiltersSection
          cities={cities}
          onSearch={setSearchQuery}
          onFiltersChange={setActiveFilters}
        />
      </div>

      <div className="space-y-4">
        {sortedAndFilteredMarkets.map(market => (
          <MarketCard key={market.geolq_id} market={market} />
        ))}
        {sortedAndFilteredMarkets.length === 0 && (
          <p className="text-center text-muted-foreground">No markets found</p>
        )}
      </div>
    </div>
  );
};

export default Index;
