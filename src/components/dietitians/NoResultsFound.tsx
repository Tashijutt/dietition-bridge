
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsFoundProps {
  clearFilters: () => void;
}

const NoResultsFound = ({ clearFilters }: NoResultsFoundProps) => {
  return (
    <div className="col-span-full text-center py-12 border rounded-lg">
      <User className="w-12 h-12 mx-auto text-gray-400" />
      <h3 className="mt-4 text-xl font-semibold">No dietitians found</h3>
      <p className="mt-2 text-gray-500">Try adjusting your search criteria.</p>
      <Button 
        onClick={clearFilters}
        className="mt-4 px-4 py-2 text-sm text-primary hover:text-primary/80"
        variant="ghost"
      >
        Clear filters
      </Button>
    </div>
  );
};

export default NoResultsFound;
