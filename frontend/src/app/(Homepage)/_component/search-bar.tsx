"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import memeDataArray from "@/Data/data";

interface SearchBarProps {
  onSearch: (results: typeof memeDataArray) => void;
}

const Searchbar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const results = memeDataArray.filter((meme) =>
      meme.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    onSearch(results);
  };

  const handleReset = () => {
    setSearchTerm("");
    onSearch(memeDataArray);
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex items-center justify-center container mx-auto">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input 
          type="text" 
          className="bg-[#fff]" 
          placeholder="Search by name, description, or address..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          className="px-8 py-0.5 hover:shadow-none border-2 border-black dark:border-white uppercase bg-[#fff] text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] hover:bg-primarycolor hover:text-white"
        >
          Search
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="px-8 py-0.5 hover:shadow-none border-2 border-black dark:border-white uppercase bg-[#fff] text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] hover:bg-primarycolor hover:text-white"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;