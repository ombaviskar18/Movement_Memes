"use client";
import React, { useEffect, useState } from "react";
import TradeBtn from "./TradeBtn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  address: string;
  memeData: {
    id: string;
    imageUrl: string;
    tokenName: string;
    description: string;
  };
};

const buttonvalues = [
  { name: "reset", value: 0 },
  { name: "1", value: 1 },
  { name: "5", value: 5 },
  { name: "10", value: 10 },
];

const TradeBox = ({ address, memeData }: Props) => {
  const [selectedprice, setSelectedprice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: { price: 1 },
  });

  const watchPrice = watch("price", selectedprice);
  const equivalentcoinprice = selectedprice * 7585930858930.84949404;

  const handleMetaMaskTransaction = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Please install MetaMask to proceed with the transaction');
      return false;
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create transaction parameters
      const transactionParameters = {
        to: address,
        from: window.ethereum.selectedAddress,
        value: '0x' + (selectedprice * 1e18).toString(16), // Convert to Wei
        data: '0x', // Add contract data if needed
      };

      // Send transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      return txHash;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const txHash = await handleMetaMaskTransaction();
      if (txHash) {
        toast.success(
          `Successfully purchased ${memeData.tokenName}!`, 
          {
            duration: 5000,
            className: "bg-green-50",
            description: (
              <div className="mt-2">
                <p className="font-semibold">Transaction Details:</p>
                <p className="text-sm mt-1">Amount: {selectedprice} MOVE</p>
                <p className="text-sm mt-1">Token: {memeData.tokenName}</p>
                <p className="text-sm mt-1 font-mono">
                  TX: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </p>
                <div className="mt-3 p-2 bg-green-100 rounded-lg">
                  <p className="text-green-800 text-sm">
                    🎉 Trade executed successfully!
                  </p>
                </div>
              </div>
            ),
          }
        );
      }
    } catch (error) {
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const value = getValues("price");
    setSelectedprice(value || 0);
  }, [watchPrice, getValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[25rem] mx-auto rounded-lg bg-[#fff] min-h-32 border-white border-[1px] p-3 py-6">
        <div className="w-full">
        {/* Meme Info Section */}
        {memeData && (
          <div className="flex items-center gap-4 mb-4 p-2 border-b">
            <div className="relative w-12 h-12">
              <Image
                src={memeData.imageUrl}
                alt={memeData.tokenName}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-bold">{memeData.tokenName}</h3>
              <p className="text-sm text-gray-600 truncate max-w-[200px]">
                {memeData.description}
              </p>
            </div>
          </div>
        )}
        <div className="rounded bg-white grid place-content-center text-black font-semibold max-w-max px-4 py-2 mx-auto capitalize">
          presale
        </div>

        <div className="w-full my-5 flex justify-between bg-white">
          <TradeBtn className="bg-white">
            <span>switch to CAPTION</span>
          </TradeBtn>
          <TradeBtn>
            <span>set slippage</span>
          </TradeBtn>
        </div>

        <div className="">
          <Input
            className="bg-[#fff] border-[2px] border-primarycolor font-bold"
            value={watchPrice ? watchPrice : selectedprice}
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <div className="w-full my-5 flex gap-x-3 flex-wrap max-lg:items-center max-lg:justify-center gap-y-2 bg-white">
          {buttonvalues.map((button, index) => (
            <TradeBtn
              key={index}
              onClick={() => {
                setSelectedprice(button.value);
                setValue("price", button.value);
              }}
              className={cn(
                `${+selectedprice === button.value ? "!bg-black !text-white" : ""}`
              )}
            >
              <span className="flex gap-x-1">
                <span>{button.name}</span>
                <span>Move</span>
              </span>
            </TradeBtn>
          ))}
        </div>

        <div className="flex gap-x-1">
          <span className="font-semibold text-sm">
            {equivalentcoinprice.toFixed(2)}
          </span>
          <span className="text-black font-bold">CAPTION</span>
        </div>

        <Button
          className="px-8 py-0.5 my-5 w-full border-2 border-black dark:border-white uppercase bg-[#fff] text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] hover:bg-primarycolor hover:text-white hover:shadow-none"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Place Trade'}
        </Button>
      </div>
    </form>
  );
};

export default TradeBox;