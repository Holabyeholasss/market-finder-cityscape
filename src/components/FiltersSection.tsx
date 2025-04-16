import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { FiltersDrawer } from "./FiltersDrawer";
import { SortDrawer } from "./SortDrawer";

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
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <SearchBar onSearch={onSearch} className="flex-1" />
        <FiltersDrawer cities={cities} onFiltersChange={onFiltersChange} />
        <SortDrawer onSort={(option) => {
          console.log("Sort option selected:", option);
          // Implement sorting logic in parent component
        }} />
      </div>
    </div>
  );
};

export default FiltersSection;
