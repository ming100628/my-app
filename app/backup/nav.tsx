export default () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Racecourse Experience", path: "/" },
    { name: "Horse Racing", path: "/" },
    { name: "Football", path: "/" },
    { name: "Membership", path: "/" },
    { name: "Charities & Community", path: "/" },
    { name: "About HKJC", path: "/" },
  ];
  return (
    <div className="flex items-center h-10 bg-red-800 text-white text-sm">
      {links.map((link) => (
        <a key={link.name} className="px-3 py-3 truncate" href={link.path}>
          {link.name}
        </a>
      ))}
    </div>
  );
};
