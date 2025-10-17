import { Skeleton } from "@/components/ui/skeleton";

const HisHomePage = () => {
 
  return (
    <main className="bg-gray-100 p-8 flex flex-col gap-6 h-full">
      
      <Skeleton className="h-10 w-1/3 rounded-lg animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-center space-y-2 animate-pulse"
          >
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow flex-1 overflow-hidden p-4 animate-pulse">
        <div className="grid grid-cols-4 gap-4 mb-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-4 w-full rounded" />
          ))}
        </div>

        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, colIdx) => (
                <Skeleton key={colIdx} className="h-4 w-full rounded" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HisHomePage;
