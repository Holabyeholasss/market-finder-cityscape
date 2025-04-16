
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CityFilterProps {
  cities: string[];
  onCitySelect: (city: string) => void;
}

const CityFilter = ({ cities, onCitySelect }: CityFilterProps) => {
  return (
    <Select onValueChange={onCitySelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Cities</SelectItem>
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CityFilter;
