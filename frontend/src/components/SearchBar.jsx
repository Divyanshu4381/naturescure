import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const isMobile = () => window.innerWidth < 640; // Tailwind's 'sm' breakpoint

  // Fetch suggestions while typing
  useEffect(() => {
  const fetchSuggestions = async () => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/plants/search?query=${query.trim()}`);
      const data = await res.json();
      console.log("API response:", data); // 👈 Debug

      if (Array.isArray(data)) {
        setSuggestions(data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debounceTimer = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(debounceTimer);
}, [query]);


  const handleSearch = async (selectedPlant) => {
    if (!selectedPlant && !query.trim()) return;

    try {
      const plantId = selectedPlant?._id;
      if (plantId) {
        if (isMobile()) setIsVisible(false);
        navigate(`/plants/${plantId}`);
        return;
      }

      // Fallback: search first matching plant
      const res = await fetch(`/api/plants/search?query=${query.trim()}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        if (isMobile()) setIsVisible(false);
        navigate(`/plants/${data[0]._id}`);
      } else {
        alert("Plant not found!");
      }
    } catch (error) {
      console.error("Error searching plant:", error);
      alert("Something went wrong! Try again.");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-3xl mx-auto"
        >
          {/* Input + Button Container */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-md border border-gray-200 gap-2 sm:gap-0 p-2 relative">
            
            {/* Input Field */}
            <motion.input
              type="text"
              placeholder="Search for medicinal plants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full flex-1 px-4 py-3 text-gray-700 bg-transparent border-none focus:outline-none placeholder-gray-400 text-sm sm:text-base"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />

            {/* Search Button */}
            <motion.button
              onClick={() => handleSearch()}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="flex justify-center items-center gap-2 text-sm sm:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </span>
            </motion.button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {suggestions.map((plant) => (
                <li
                  key={plant._id}
                  onClick={() => handleSearch(plant)}
                  className="px-4 py-2 text-gray-700 hover:bg-green-50 cursor-pointer text-sm sm:text-base"
                >
                  {plant.name}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
