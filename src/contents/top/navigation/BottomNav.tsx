import { useLocation } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
import { configProfileSelector } from '@/store/selectors/configSelector';
import naviItems from './naviItems';
import { NavLink } from './NavLink';
import { basePath } from '@/constants';

const BottomNav: React.FC = () => {
  const lo = useLocation();
  const config = useAppSelector(configProfileSelector);
  const pathname = lo.pathname.replace(basePath, '');
  return (
    <nav
      className="navbar is-hidden-tablet is-fixed-bottom"
      role="navigation"
      aria-label="main navigation"
    >
      <ul className="menu-list is-flex is-justify-content-space-between	">
        {naviItems.map((item) => (
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
    </nav>
  );
};
export default BottomNav;
