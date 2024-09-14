import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full overflow-hidden">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow p-4 bg-transparent text-white placeholder-white placeholder-opacity-75 focus:outline-none"
        />
        <motion.button
          type="submit"
          className="bg-white text-purple-600 p-4 rounded-full hover:bg-purple-100 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={24} />
        </motion.button>
      </div>
    </motion.form>
  );
};
