import { ApiUrl, getDiscordUser, getGuilds, PartialGuild } from "@/api";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Guild } from "discord.js";
import { ScriptProps } from "next/script";
import Link from "next/link";

type Props = {};

const page = async (props: Props) => {
  const api = {
    user: await getDiscordUser()!,
    guilds: await getGuilds()!,
  };
  for (const res in api) {
    if (!(api as any)[res].data || (api as any)[res].error) {
      redirect(ApiUrl + "/auth/discord");
    }
  }
  if ((api.guilds.data as any).retry_after) {
    redirect("/dashboard");
  }
  const { nonbotGuilds, mutuals, botGuilds } = api.guilds.data!;
  console.log(botGuilds);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ul className=" relative w-full h-3/4 flex flex-wrap flex-shrink gap-x-6 gap-y-12 justify-center items-center overflow-y-scroll px-2 py-12">
        {mutuals.map((guild) => (
          <GuildEl botGuilds={botGuilds} key={guild.id} guild={guild} />
        ))}
        {nonbotGuilds.map((guild) => (
          <GuildEl
            buttonText="Add to Server"
            botGuilds={botGuilds}
            key={guild.id}
            guild={guild}
          />
        ))}
      </ul>
    </div>
  );
};

const GuildEl = ({
  guild,
  buttonText = "Configure",
  botGuilds,
  className,
}: {
  guild: PartialGuild;
  botGuilds: (Guild | undefined)[];
  buttonText?: string;
} & ScriptProps) => (
  <div className="w-96 h-44 bg-[#181A20] relative px-5 flex justify-start items-center">
    <div className="flex flex-row justify-between">
      <Image
        src={
          guild.icon === null
            ? "https://cdn.discordapp.com/attachments/1075223169939558400/1075571363273773096/no-icon.png"
            : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
        }
        alt="Guild Icon"
        width={72}
        height={72}
        className="rounded-full absolute -top-[20%] border-4 border-[#0e1015] bg-[#181A20]"
      />
    </div>
    <div className="flex flex-col gap-2 p-2 py-5 h-1/2 justify-start items-start">
      <div className="text-lg font-bold whitespace-pre-line">{guild.name}</div>
      {botGuilds.find((g) => g?.id === guild.id) ? (
        <div className="text-lg px-5 py-2 bg-[#2E323D] rounded-lg cursor-default">
          {botGuilds.find((g) => g?.id === guild.id)?.memberCount} members
        </div>
      ) : (
        <div className="text-lg px-5 py-2 bg-[#2E323D] rounded-lg cursor-default">
          {guild.id}
        </div>
      )}
    </div>
    <div className="absolute top-0 right-0 flex flex-row gap-2 p-5">
      <div className="flex flex-row items-center gap-2">
        <Link
          target={
            botGuilds.find((g) => g?.id === guild.id) ? "_self" : "_blank"
          }
          href={
            botGuilds.find((g) => g?.id === guild.id)
              ? `/dashboard/${guild.id}`
              : `https://discord.com/oauth2/authorize?scope=bot%20applications.commands&permissions=296150887647&client_id=1067254655932968990&guild_id=${guild.id}`
          }>
          <div className="flex flex-row items-center gap-4 text-lg font-semibold border-2 border-[#fecd56] p-1 px-2 rounded-lg cursor-pointer hover:text-[#464058] hover:bg-[#fecd56] transition-all">
            {buttonText}
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default page;
