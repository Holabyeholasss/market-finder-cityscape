import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CityFilter from "@/components/CityFilter";
import MarketCard from "@/components/MarketCard";
const marketsData = [{
  catchment_name: "Abohar - Malout Rd",
  city: "Gobindgarh, Abohar",
  latitude: 30.16267,
  longitude: 74.248161,
  geolq_id: "6236479",
  address: "Abohar - Malout Rd, opp. BR Villa Resort, Daulat Pura, Gobindgarh, Abohar, Punjab 152117, India"
}
// ... Add more market data from the sheet
];
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const cities = [...new Set(marketsData.map(market => market.city))];
  const filteredMarkets = marketsData.filter(market => {
    const matchesSearch = market.catchment_name.toLowerCase().includes(searchQuery.toLowerCase()) || market.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "all" || market.city === selectedCity;
    return matchesSearch && matchesCity;
  });
  return <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl mb-6 font-bold">Property requirements</h1>
      
      <div className="space-y-4 mb-6">
        <SearchBar onSearch={setSearchQuery} />
        <CityFilter cities={cities} onCitySelect={setSelectedCity} />
      </div>

      <div className="space-y-4">
        {filteredMarkets.map(market => <MarketCard key={market.geolq_id} market={market} />)}
        {filteredMarkets.length === 0 && <p className="text-center text-muted-foreground">No markets found</p>}
      </div>
    </div>;
};
export default Index;