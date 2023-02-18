import { getGuild } from "@/api";
import { notFound } from "next/navigation";
import React from "react";
import Sidebar from "../../configure/[id]/(components)/Sidebar";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const guild = await getGuild(params.id);

  console.log(guild);

  if (
    guild.error ||
    !guild.data ||
    (guild.data as any).msg?.toLowerCase() == "error"
  ) {
    notFound();
  }

  return (
    <>
      <Sidebar guild={guild.data} />
      <div className="w-full h-full overflow-hidden flex justify-center items-center"></div>
    </>
  );
};

export default page;
