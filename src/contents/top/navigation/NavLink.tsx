import { Link } from 'react-router-dom';

export const NavLink: React.FC<{
  currentPath: string;
  path: string;
  children: React.ReactNode;
}> = ({ currentPath, children, path }) => (
  <Link to={`${path}`} className={currentPath === path ? 'is-active' : ''}>
    {children}
  </Link>
);
