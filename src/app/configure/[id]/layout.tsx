import { getGuild } from "@/api";
import { notFound } from "next/navigation";
import React from "react";
import Sidebar from "./(components)/Sidebar";

type Props = {
  params: {
    id: string;
  };
  children: React.ReactNode;
};

const layout = async ({ params, children }: Props) => {
  const guild = await getGuild(params.id);

  if (!guild.data || guild.error) {
    notFound();
  }

  return (
    <>
      <Sidebar guild={guild.data} />
      <div className="w-[calc(100%-13rem)] h-[calc(100%-4rem)] overflow-hidden absolute top-16 left-[13rem]">
        {children}
      </div>
    </>
  );
};

export default layout;
