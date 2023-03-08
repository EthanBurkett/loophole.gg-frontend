import { getRoles } from "@/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Roles = async ({ params }: Props) => {
  const roles = await getRoles(params.id);

  if (!roles.data || roles.error) {
    notFound();
  }

  return (
    <div className="w-full h-full flex justify-between items-center p-12 gap-12">
      <div className="w-1/6 h-full bg-[#181A20] flex flex-col justify-start items-center rounded-lg p-6 gap-2 overflow-y-scroll">
        {roles.data
          .filter((r) => r.name != "@everyone")
          .map((role) => (
            <Link
              href={`/configure/${params.id}/roles/${role.id}`}
              key={role.id}
              className="flex flex-row justify-between items-center gap-6 w-full h-14 bg-[#0e1015] py-2 px-5 rounded-lg cursor-pointer transition-all hover:bg-[#08090c]"
            >
              <div
                className="w-6 h-6 bg-[#2F3136] rounded-full"
                style={{
                  backgroundColor: `#${role.color.toString(16)}`,
                }}
              ></div>
              <h1>{role.name}</h1>
            </Link>
          ))}
      </div>
      <div className="w-5/6 h-full bg-[#181A20] flex flex-col justify-start items-center rounded-lg">
        role settings
      </div>
    </div>
  );
};

export default Roles;
