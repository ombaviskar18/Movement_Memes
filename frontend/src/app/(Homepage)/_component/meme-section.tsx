import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Memecard from "./meme-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Add the MemeData interface
interface MemeData {
  id: string;
  imageUrl: string;
  creator: string;
  address: string;
  tokenName: string;
  description: string;
}

interface MemesectionProps {
  searchResults: MemeData[];
}

const MemeList = ({ memeData }: { memeData: MemeData[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedMemes = showAll ? memeData : memeData.slice(0, 3);

  const toggleDisplay = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="mt-4 w-full">
      {memeData.length === 0 ? (
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
          <div className="mt-4 w-full flex items-center justify-center">
            <Button
              className="px-8 py-0.5 mx-auto hover:shadow-none max-w-max border-2 border-black dark:border-white uppercase bg-[#fffdd0] text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] hover:bg-primarycolor hover:text-white"
              onClick={toggleDisplay}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

const Memesection = ({ searchResults }: MemesectionProps) => {
  return (
    <Tabs defaultValue="Terminal" className="container mt-10">
      <TabsList className="grid w-full grid-cols-2 lg:w-[250px] bg-[#fff] ">
        <TabsTrigger value="Following">Following</TabsTrigger>
        <TabsTrigger value="Terminal">Terminal</TabsTrigger>
      </TabsList>
      <TabsContent value="Terminal">
        <MemeList memeData={searchResults} />
      </TabsContent>
      <TabsContent value="Following">
        <div className="mt-4 w-full font-semibold">
          Connect your wallet to see a feed of your friends
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Memesection;