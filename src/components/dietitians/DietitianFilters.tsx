
import { Search, MapPin, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

// Cities for the filter
const CITIES = ["All Cities", "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan"];

// Filter categories based on the reference image
const FILTER_CATEGORIES = [
  { id: "female", label: "Female Doctors" },
  { id: "nearby", label: "Doctors Near Me" },
  { id: "experienced", label: "Most Experienced" },
  { id: "lowest_fee", label: "Lowest Fee" },
  { id: "highest_rated", label: "Highest Rated" },
  { id: "today", label: "Available Today" },
  { id: "discounts", label: "Discounts" },
  { id: "video", label: "Video Consultation" },
];

interface DietitianFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
  inView: boolean;
}

const DietitianFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  inView
}: DietitianFiltersProps) => {
  return (
    <>
      {/* Filter Categories - horizontal scrollable buttons */}
      <div className={cn(
        "mb-6 overflow-x-auto no-scrollbar",
        inView ? "animate-fade-up" : "opacity-0"
      )} style={{ animationDelay: '100ms' }}>
        <div className="flex space-x-2 pb-2 min-w-max">
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
              className={cn(
                "px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all",
                selectedCategory === category.id
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className={cn(
        "mb-8 max-w-4xl mx-auto",
        inView ? "animate-fade-up" : "opacity-0"
      )} style={{ animationDelay: '200ms' }}>
        <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
          
          {/* City Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none appearance-none"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "flex items-center justify-center p-1.5 rounded",
                viewMode === 'grid' 
                  ? "bg-primary text-white" 
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              )}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center justify-center p-1.5 rounded",
                viewMode === 'list' 
                  ? "bg-primary text-white" 
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              )}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { FILTER_CATEGORIES, CITIES };
export default DietitianFilters;
