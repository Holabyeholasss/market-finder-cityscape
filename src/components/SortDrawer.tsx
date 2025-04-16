
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ } from "lucide-react";

type SortOption = "priority_high" | "priority_low" | "recent" | "old";

interface SortDrawerProps {
  onSort: (option: SortOption) => void;
}

export function SortDrawer({ onSort }: SortDrawerProps) {
  const [open, setOpen] = useState(false);

  const handleSort = (option: SortOption) => {
    onSort(option);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ArrowDownAZ className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[40vh]">
        <SheetHeader>
          <SheetTitle>Sort</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleSort("priority_high")}
          >
            Priority: High to Low
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleSort("priority_low")}
          >
            Priority: Low to High
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleSort("recent")}
          >
            Recent First
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleSort("old")}
          >
            Old First
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
