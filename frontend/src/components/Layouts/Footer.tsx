import React from "react";
import { Cool } from "../custom-icons/cool";
import { Facebook, GitBranch, Github, Linkedin, Twitter } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-5 text-black py-4 bg-slate-800 border-t-[1px]  text-sm ">
      <div className="container mx-auto flex justify-between flex-col lg:flex-row items-center">
        <div className="flex gap-x-4 flex-col lg:flex-row items-center gap-y-3">
          <div className="flex gap-x-2 items-center">
            <span> &copy; {new Date().getFullYear()} </span>{" "}
            <div className="flex gap-x-1 capitalize items-center">
              <span className=" font-black text-2xl text-white">
              🚀Movement<span className="bg-white text-black">Memes</span>
              </span>
            </div>
          </div>

          <span className="text-white">Build by Pioneers ❤️</span>
          <span className="text-white">connect with us 😎</span>
        </div>
        <div className="flex flex-row gap-x-4 item-center mt-3">
          <div className=" rounded-full border-primarycolor p-2 border-[1px] ">
            <Facebook />
          </div>
          <div className=" rounded-full border-primarycolor p-2 border-[1px] ">
           <a href="https://github.com/ombaviskar18/Movement_Memes">
           <Github /></a>
          </div>
          <div className=" rounded-full border-primarycolor p-2 border-[1px] ">
            <Twitter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
