import { Link, useLocation } from 'react-router-dom';
import { FaRegAddressCard, FaRegHandshake } from 'react-icons/fa';
import { MdLocalMovies, MdNotifications } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
import { configProfileSelector } from '@/store/selectors/configSelector';
import newlyIcon from '@/assets/icons/newly.svg';
import { basePath } from '@/constants';

const SideNav: React.FC = () => {
  const config = useAppSelector(configProfileSelector);
  const lo = useLocation();
  const pathname = lo.pathname.replace(basePath, '');

  return (
    <aside className="menu">
      <ul className="menu-list">
        {[
          { path: '/', icon: <FaRegHandshake size={50} /> },
          { path: '/profile', icon: <FaRegAddressCard size={50} /> },
          { path: '/notice', icon: <MdNotifications size={50} /> },
          {
            path: '/beginners',
            icon: <img src={newlyIcon} alt="初心者" style={{ width: '50px' }} />,
          },
        ].map((item) => (
          <li key={item.path}>
            <NavLink currentPath={pathname} path={item.path}>
              {item.icon}
            </NavLink>
          </li>
        ))}
        {config.beta && (
          <li>
            <NavLink currentPath={pathname} path="/gallery">
              <MdLocalMovies size={50} />
            </NavLink>
          </li>
        )}
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
