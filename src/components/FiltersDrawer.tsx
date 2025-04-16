
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateFilter, Priority } from "./FiltersSection";

interface FiltersDrawerProps {
  onFiltersChange: (filters: {
    cities: string[];
    priorities: Priority[];
    dates: DateFilter[];
  }) => void;
  cities: string[];
}

export function FiltersDrawer({ onFiltersChange, cities }: FiltersDrawerProps) {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateFilter[]>([]);
  const [open, setOpen] = useState(false);

  const priorities: Priority[] = ["high", "medium", "low"];
  const dateFilters: { value: DateFilter; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 days" },
    { value: "last_30_days", label: "Last 30 days" },
  ];

  const handleApply = () => {
    onFiltersChange({
      cities: selectedCities,
      priorities: selectedPriorities,
      dates: selectedDates,
    });
    setOpen(false);
  };

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedPriorities([]);
    setSelectedDates([]);
    onFiltersChange({ cities: [], priorities: [], dates: [] });
  };

  const totalFilters = selectedCities.length + selectedPriorities.length + selectedDates.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Filter className="h-4 w-4" />
          {totalFilters > 0 && (
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
              {totalFilters}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle>Filters</SheetTitle>
            {totalFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </div>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Priority</h3>
            <ToggleGroup type="multiple" className="flex flex-wrap gap-2" value={selectedPriorities} onValueChange={setSelectedPriorities}>
              {priorities.map((priority) => (
                <ToggleGroupItem key={priority} value={priority} className="rounded-full capitalize">
                  {priority}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Added on</h3>
            <ToggleGroup type="multiple" className="flex flex-wrap gap-2" value={selectedDates} onValueChange={setSelectedDates}>
              {dateFilters.map((filter) => (
                <ToggleGroupItem key={filter.value} value={filter.value} className="rounded-full">
                  {filter.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Cities</h3>
            <ToggleGroup type="multiple" className="flex flex-wrap gap-2" value={selectedCities} onValueChange={setSelectedCities}>
              {cities.map((city) => (
                <ToggleGroupItem key={city} value={city} className="rounded-full">
                  {city}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button onClick={handleApply} className="w-full">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
