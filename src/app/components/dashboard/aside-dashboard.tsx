import NavLinks from "./nav-links";

export default function Aside() {
  return (
    <aside className="w-full flex-none md:w-64">
      <nav>
        <ul>
          <NavLinks />
        </ul>
      </nav>
    </aside>
  );
}
