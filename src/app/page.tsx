import { getUserCount } from "@/api";
export const dynamic = "force-dynamic";

export default async function Home() {
  const userCount = await getUserCount();
  if (userCount.error || !userCount.data)
    return <>{userCount.error?.message}</>;
  return (
    <main className="w-full h-full flex justify-evenly items-center">
      <div className="flex flex-col h-1/2 justify-start items-start">
        <h1 className="text-3xl font-black">loophole.gg</h1>
        <p>
          Protecting{" "}
          <a className="border-b-2 border-b-[#fecd56] a">
            {userCount.data.count}
          </a>{" "}
          users.
        </p>
        <p></p>
      </div>
      <div className="flex flex-col h-1/2 w-1/2 justify-start text-center items-start">
        <h1 className="text-3xl w-3/4 whitespace-pre-wrap text-center">
          THIS SITE IS UNFINISHED. Sole purpose of it being public is to test
          API calls to make sure everything is functional in production linear
          to development.
        </h1>
      </div>
    </main>
  );
}
