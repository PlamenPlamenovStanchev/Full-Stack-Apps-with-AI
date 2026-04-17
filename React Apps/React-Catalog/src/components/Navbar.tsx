import { NavLink } from 'react-router-dom';

const linkBaseClass = 'text-sm font-medium';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBaseClass} ${isActive ? 'underline' : ''}`;

export function Navbar() {
  return (
    <nav className="flex items-center gap-4 border-b border-zinc-200 px-4 py-3">
      <NavLink to="/" className={getLinkClass} end>
        Home
      </NavLink>
      <NavLink to="/products" className={getLinkClass}>
        Catalog
      </NavLink>
    </nav>
  );
}
