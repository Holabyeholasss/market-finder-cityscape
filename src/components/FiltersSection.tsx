
import { useState } from "react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter, X } from "lucide-react";
import SearchBar from "./SearchBar";

export type Priority = "high" | "medium" | "low";
export type DateFilter = "today" | "yesterday" | "last_7_days" | "last_30_days";

interface FiltersSectionProps {
  cities: string[];
  onSearch: (query: string) => void;
  onFiltersChange: (filters: {
    cities: string[];
    priorities: Priority[];
    dates: DateFilter[];
  }) => void;
}

const FiltersSection = ({ cities, onSearch, onFiltersChange }: FiltersSectionProps) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateFilter[]>([]);

  const priorities: Priority[] = ["high", "medium", "low"];
  const dateFilters: { value: DateFilter; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 days" },
    { value: "last_30_days", label: "Last 30 days" },
  ];

  const updateFilters = () => {
    onFiltersChange({
      cities: selectedCities,
      priorities: selectedPriorities,
      dates: selectedDates,
    });
  };

  const toggleCity = (city: string) => {
    const newCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newCities);
    updateFilters();
  };

  const togglePriority = (priority: Priority) => {
    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(newPriorities);
    updateFilters();
  };

  const toggleDate = (date: DateFilter) => {
    const newDates = selectedDates.includes(date)
      ? selectedDates.filter((d) => d !== date)
      : [...selectedDates, date];
    setSelectedDates(newDates);
    updateFilters();
  };

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedPriorities([]);
    setSelectedDates([]);
    onFiltersChange({ cities: [], priorities: [], dates: [] });
  };

  const totalFilters = selectedCities.length + selectedPriorities.length + selectedDates.length;

  return (
    <div className="space-y-4">
      <SearchBar onSearch={onSearch} />
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Cities
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {cities.map((city) => (
              <DropdownMenuItem
                key={city}
                onClick={() => toggleCity(city)}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  readOnly
                  className="h-4 w-4"
                />
                {city}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Priority</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {priorities.map((priority) => (
              <DropdownMenuItem
                key={priority}
                onClick={() => togglePriority(priority)}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedPriorities.includes(priority)}
                  readOnly
                  className="h-4 w-4"
                />
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Added on</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dateFilters.map((filter) => (
              <DropdownMenuItem
                key={filter.value}
                onClick={() => toggleDate(filter.value)}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedDates.includes(filter.value)}
                  readOnly
                  className="h-4 w-4"
                />
                {filter.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {totalFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-10"
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      {totalFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCities.map((city) => (
            <Badge
              key={city}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleCity(city)}
            >
              {city}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          ))}
          {selectedPriorities.map((priority) => (
            <Badge
              key={priority}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => togglePriority(priority)}
            >
              {priority}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          ))}
          {selectedDates.map((date) => (
            <Badge
              key={date}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleDate(date)}
            >
              {dateFilters.find((f) => f.value === date)?.label}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiltersSection;
