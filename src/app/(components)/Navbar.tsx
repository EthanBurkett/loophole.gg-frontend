import { ApiUrl, IDiscordUser, IResponse } from "@/api";
import React from "react";
import Logo from "./Logo";
import { MdLogin } from "react-icons/md";
import Link from "next/link";
import { User } from "discord.js";
import Image from "next/image";

type Props = {
  user: IResponse<IDiscordUser>;
};

const Navbar = ({ user }: Props) => {
  return (
    <div className="w-screen h-16 flex justify-between items-center px-12 absolute bg-[#181A20] border-b-[2px] border-b-[#0E1015] py-6">
      <div className="flex flex-row items-center gap-12">
        <Link href="/">
          <div className="flex flex-row items-center justify-center">
            <Logo size={64} />
            <h1 className="font-bold text-2xl ml-4 underline title">
              loophole
            </h1>
          </div>
        </Link>
        <div className="flex flex-row items-center gap-6">
          <NavItem text="Discord" link="https://discord.gg/loophole" />
          <NavItem
            text="Github"
            link="https://www.github.com/ethanburkett/loophole.gg-frontend"
          />
          <NavItem text="Docs" link="/" />
        </div>
      </div>
      <div className="flex flex-row items-center w-1/2 gap-6 justify-end overflow-y-visible overflow-x-hidden">
        <Link href={user.data ? `/dashboard` : `${ApiUrl}/auth/discord`}>
          <div className="flex flex-row items-center gap-4 text-lg font-semibold border-2 bg-transparent hover:bg-[#2E323D] border-[#2E323D] p-1 px-2 rounded-lg cursor-pointer transition-all">
            Add to Server
          </div>
        </Link>
        <Link href={user.data ? `/dashboard` : `${ApiUrl}/auth/discord`}>
          <div className="flex flex-row items-center gap-4 text-lg font-semibold border-2 border-[#fecd56] p-1 px-2 rounded-lg cursor-pointer hover:text-[#464058] hover:bg-[#fecd56] transition-all">
            Dashboard
          </div>
        </Link>
      </div>
    </div>
  );
};

const NavItem = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link}>
      <h1 className="nav-item text-lg px-1 font-bold">{text}</h1>
    </Link>
  );
};

export default Navbar;
