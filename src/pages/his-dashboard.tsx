import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/context/theme-provider";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const HisHomePage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <main className="relative bg-gray-100 p-8 flex flex-col gap-6 h-full">
      <div className="absolute top-6 right-6 z-10">
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`relative flex items-center w-12 h-6 cursor-pointer rounded-full border transition-all duration-500 ${
            theme === "light"
              ? "bg-gray-100 border-gray-300 hover:bg-gray-200"
              : "bg-gray-900 border-gray-700 hover:bg-gray-800"
          }`}
        >
          <div
            className={`absolute left-1 flex items-center justify-center w-4 h-4 rounded-full transition-all duration-500 ${
              theme === "light"
                ? "text-yellow-500 scale-110"
                : "text-gray-500 opacity-60"
            }`}
          >
            <LightModeIcon
              fontSize="small"
              style={{ fontSize: "14px", color: "white" }}
            />
          </div>

          <div
            className={`absolute right-1 flex items-center justify-center w-4 h-4 rounded-full transition-all duration-500 ${
              theme === "dark"
                ? "text-blue-400 scale-110"
                : "text-gray-500 opacity-60"
            }`}
          >
            <ModeNightIcon fontSize="small" style={{ fontSize: "14px" }} />
          </div>

          <div
            className={`absolute w-5 h-5 rounded-full shadow-md transition-transform duration-500 ease-in-out ${
              theme === "light"
                ? "translate-x-1 bg-gray-800"
                : "translate-x-6 bg-white"
            }`}
          />
        </div>
      </div>

      <Skeleton className="h-10 w-1/3 rounded-lg animate-pulse bg-white dark:bg-gray-900" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col justify-center items-center space-y-2 animate-pulse"
          >
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow flex-1 overflow-hidden p-4 animate-pulse">
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
