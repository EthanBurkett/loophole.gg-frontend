import { getUserCount } from "@/api";

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
      <div className="flex flex-col h-1/2 justify-start items-start">
        <h1 className="text-3xl">Loophole</h1>
      </div>
    </main>
  );
}
