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

  if (!guild.data || guild.error) {
    notFound();
  }

  return <>main</>;
};

export default page;
