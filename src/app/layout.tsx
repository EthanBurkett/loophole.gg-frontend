import { getDiscordUser } from "@/api";
import Navbar from "./(components)/Navbar";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getDiscordUser();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="relative h-screen w-screen bg dark-grey text-[#eeeeee] overflow-hidden">
        <Navbar user={user} />
        <div className="h-[calc(100vh-9.25rem)] w-screen absolute top-[7.25rem]">
          {children}
        </div>
        <svg
          className="absolute bottom-0 w-screen -z-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320">
          <path
            fill="#fecd56"
            fill-opacity="1"
            d="M0,64L30,53.3C60,43,120,21,180,32C240,43,300,85,360,106.7C420,128,480,128,540,138.7C600,149,660,171,720,197.3C780,224,840,256,900,261.3C960,267,1020,245,1080,213.3C1140,181,1200,139,1260,112C1320,85,1380,75,1410,69.3L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
        </svg>
      </body>
    </html>
  );
}
