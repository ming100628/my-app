import Nav from "./nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center h-10 w-screen bg-red-800 text-white">
      <Nav />
      {children}
    </div>
  );
}
