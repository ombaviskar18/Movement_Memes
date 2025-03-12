"use client";
import Memesection from "./_component/meme-section";
import Searchbar from "./_component/search-bar";
import Startcoin from "./_component/start-new-coin";
import { useState } from "react";
import memeDataArray from "@/Data/data";

export default function Home() {
  const [searchResults, setSearchResults] = useState(memeDataArray);

  return (
    <main className="">
      <div className="w-full min-h-screen bg-grid-black/[0.1] bg-slate-600 relative flex flex-col ">
        <div className=" h-full flex flex-col">
          <div className="relative z-[29999]">
            <Startcoin />
            <Searchbar onSearch={setSearchResults} />
            <Memesection searchResults={searchResults} />
          </div>
        </div>
      </div>
    </main>
  );
}