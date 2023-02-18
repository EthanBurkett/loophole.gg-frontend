import { APIGuild } from "discord.js";
import Image from "next/image";
import React from "react";
import { MdAssignmentInd } from "react-icons/md";

type Props = {
  guild: APIGuild;
};

const Sidebar = ({ guild }: Props) => {
  // crop guild name if too long
  let name = guild.name;
  if (name.length > 15) {
    name = name.slice(0, 15) + "...";
  }
  return (
    <div className="sidebar absolute top-16 left-0 z-50 h-[calc(100vh-4rem)] flex gap-6 flex-col justify-start items-start w-52 px-2 py-6 bg-[#181A20] border-r-2 border-r-[#0E1015]">
      <div className="flex flex-col items-center justify-start gap-6 w-full">
        <h1 className="text-xl font-bold" title={guild.name}>
          {name}
        </h1>
        <div className="h-[2px] w-full bg-[#2E323D]"></div>
      </div>
      {/* <div className="flex flex-col justify-start items-start gap-4 w-52">
        <div className="text-lg font-bold flex w-full flex-col gap-2 px-4">
          <h1>Moderation</h1>
          <div className="flex flex-col gap-0 justify-start items-center text-lg font-[400] w-full">
            <div className="w-full flex justify-between items-center pr-4">
              <a>Auto Roles</a>
              <MdAssignmentInd size={24} />
            </div>
          </div>
        </div>
      </div> */}
      <Category name={"Moderation"}>
        <Item name={"Auto Roles"} icon={<MdAssignmentInd size={24} />} />
      </Category>
      <Category name={"Test"}>
        <Item name={"Test"} icon={<MdAssignmentInd size={24} />} />
        <Item name={"Test"} icon={<MdAssignmentInd size={24} />} />
        <Item name={"Test"} icon={<MdAssignmentInd size={24} />} />
      </Category>
      <div className="footer absolute bottom-0 left-0 h-24 w-full text-lg p-2 bg-[#0e1015] flex items-center flex-row justify-between">
        <img
          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
          className="rounded-full w-16 h-16"
          alt="guild icon"
        />
        <button
          className="px-5 py-2 rounded-lg font-bold border-[#fecd56] border-2 bg-transparent transition-all hover:bg-[#fecd56] hover:text-[#464058]
        "
        >
          Leave
        </button>
      </div>
    </div>
  );
};

const Category = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col justify-start items-start gap-4 w-full">
    <div className="text-lg font-bold flex w-full flex-col gap-2 px-4">
      <h1>{name}</h1>
      {children}
    </div>
  </div>
);

const Item = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="z-50 sidebar-item px-2 py-1 flex flex-row gap-0 justify-between items-center text-lg font-[400] w-full cursor-pointer rounded-lg bg-[#0e1015] text-[#eeeeee] transition-all hover:text-[#464058] hover:bg-[#fecd56]">
    {/* <div className="w-full flex justify-between items-center transition-all text-inherit hover:text-inherit"> */}
    <a>{name}</a>
    <>{icon}</>
    {/* </div> */}
  </div>
);
export default Sidebar;
