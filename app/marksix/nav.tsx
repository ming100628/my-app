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
    <div>
      {links.map((link) => (
        <a key={link.name} className="px-3 py-3" href={link.path}>
          {link.name}
        </a>
      ))}
    </div>
  );
};
