"use client";
import { useState } from "react";
import Memecard from "./meme-card";
import memeDataArray from "@/Data/data";
import { Button } from "@/components/ui/button";
import Searchbar from "./search-bar";

type Props = {};

const MemeList = (props: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [filteredMemes, setFilteredMemes] = useState(memeDataArray);
  
  const displayedMemes = showAll ? filteredMemes : filteredMemes.slice(0, 3);

  const handleSearch = (searchResults: typeof memeDataArray) => {
    setFilteredMemes(searchResults);
    setShowAll(false); // Reset to showing only 3 items when new search is performed
  };

  const toggleDisplay = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="mt-4 w-full">
      <Searchbar onSearch={handleSearch} />
      
      {filteredMemes.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg">No memes found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
            {displayedMemes.map((memeData) => (
              <Memecard key={memeData.id} memeData={memeData} />
            ))}
          </div>

          {filteredMemes.length > 3 && (
            <div className="mt-4 w-full flex items-center justify-center">
              <Button
                className="px-8 py-0.5 mx-auto hover:shadow-none max-w-max border-2 border-black dark:border-white uppercase bg-[#fffdd0] text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] hover:bg-primarycolor hover:text-white"
                onClick={toggleDisplay}
              >
                {showAll ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MemeList;