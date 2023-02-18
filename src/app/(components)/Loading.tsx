import React from "react";

type Props = {
  text?: string;
};

const Loading = ({ text }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-row gap-6">
      <div className="spinner"></div>
      <h1 className="text-5xl">Loading{text ? ` ${text}` : ""}...</h1>
    </div>
  );
};

export default Loading;
