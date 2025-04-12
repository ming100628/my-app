import Announcements from "./announcements";
import Nav from "./nav";
import Number_Selector from "./number";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100">
      <Nav />
      <Announcements />
      <Number_Selector />
      {children}
    </div>
  );
}
