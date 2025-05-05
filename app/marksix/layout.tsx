import Announcements from "./announcements";
import Nav from "./nav";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:h-screen flex flex-col bg-gray-100">
      <Nav />
      <Announcements />
      {children}
    </div>
  );
}
