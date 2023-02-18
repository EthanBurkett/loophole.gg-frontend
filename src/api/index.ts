export const Production = true;
import { cookies } from "next/headers";
import { Guild, Client, APIGuild } from "discord.js";
export const ApiUrl = Production
  ? "https://api.loophole.gg"
  : "http://localhost:3001/v2";

export const validateCookies = () => {
  const sessionID = cookies().get("connect.sid")?.value;

  return sessionID
    ? {
        Cookie: `connect.sid=${sessionID}`,
      }
    : false;
};

export interface IResponse<T> {
  data?: T;
  error?: {
    message: string;
    detailed: any;
  };
}

export const Fetch = async <T>({
  url,
  headers,
  withAuth = true,
}: {
  url: string;
  headers?: { [key: string]: string };
  withAuth?: boolean;
}): Promise<IResponse<T>> => {
  const response = (await fetch(`${ApiUrl}${url}`, {
    headers: {
      ...headers,
      ...(withAuth ? validateCookies() : {}),
    },
  })
    .then(async (d) => {
      const data = await d.json();
      if (data.error) throw new Error(data.error);
      return {
        data,
      };
    })
    .catch((e) => {
      return {
        error: {
          message: e.message,
          detailed: e,
        },
      };
    })) as IResponse<T>;

  return response;
};

export interface IUser {
  discordId: string;
  accessToken: string;
  refreshToken: string;
}

export interface IDiscordUser {
  id: string;
  bot: false;
  system: false;
  flags: BigInt;
  username: string;
  discriminator: string;
  avatar: string;
  createdTimestamp: Date;
  defaultAvatarURL: string;
  tag: string;
  avatarURL: string;
  displayAvatarURL: string;
}

export interface PartialGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
}

export const getCurrentUser = async () => {
  return await Fetch<IUser>({
    url: "/auth/status",
  });
};

export const getDiscordUser = async () => {
  let res = await Fetch<IDiscordUser>({
    url: "/discord/user",
  });

  return res;
};

export const getGuilds = async () => {
  return await Fetch<{
    mutuals: PartialGuild[];
    nonbotGuilds: PartialGuild[];
    botGuilds: Guild[];
  }>({
    url: "/discord/guilds",
  });
};

export const getGuild = async (id: string) => {
  return await Fetch<APIGuild>({
    url: `/discord/guilds/${id}`,
  });
};

export const getUserCount = async () => {
  return await Fetch<{ count: number }>({
    url: "/discord/usercount",
  });
};
