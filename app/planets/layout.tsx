export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="bg-red-500 h-dvh">
          {children}
      </div>
    );
  }
  