import { Link, useLocation } from 'react-router-dom';
import { FaRegAddressCard, FaRegHandshake } from 'react-icons/fa';
import { MdLocalMovies, MdNotifications } from 'react-icons/md';
import newlyIcon from '@/assets/icons/newly.svg';
import { basePath } from '@/constants';

const SideNav: React.FC = () => {
  const lo = useLocation();
  const pathname = lo.pathname.replace(basePath, '');

  return (
    <aside className="menu">
      <ul className="menu-list">
        <li>
          <NavLink currentPath={pathname} path="/">
            <FaRegHandshake size={50} />
          </NavLink>
        </li>
        <li>
          <NavLink currentPath={pathname} path="/profile">
            <FaRegAddressCard size={50} />
          </NavLink>
        </li>
        <li>
          <NavLink currentPath={pathname} path="/notice">
            <MdNotifications size={50} />
          </NavLink>
        </li>
        <li>
          <NavLink currentPath={pathname} path="/beginners">
            <img src={newlyIcon} alt="初心者" style={{ width: '50px' }} />
          </NavLink>
        </li>
        <li>
          <NavLink currentPath={pathname} path="/garallery">
            <MdLocalMovies size={50} />
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
export default SideNav;
const NavLink: React.FC<{ currentPath: string; path: string; children: React.ReactNode }> = ({
  currentPath,
  children,
  path,
}) => (
  <Link to={`${path}`} className={currentPath === path ? 'is-active' : ''}>
    {children}
  </Link>
);
