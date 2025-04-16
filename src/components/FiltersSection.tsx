
import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { FiltersDrawer } from "./FiltersDrawer";

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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <ArrowUpAZ className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[40vh]">
            <SheetHeader>
              <SheetTitle>Sort</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 py-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Priority: High to Low
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Priority: Low to High
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Recent First
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Old First
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FiltersSection;
