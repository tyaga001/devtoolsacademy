import { Search, AlertCircle } from "lucide-react";

export const NoToolFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-4">
        <Search className="w-16 h-16 text-purple-500 opacity-20" />
        <AlertCircle className="w-8 h-8 text-purple-500 absolute bottom-0 right-0" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No tools found</h2>
      <p className="text-muted-foreground mb-4">
        We couldn&apos;t find any tools matching your current filters. Try
        adjusting your search or clearing the filters.
      </p>
    </div>
  );
}


