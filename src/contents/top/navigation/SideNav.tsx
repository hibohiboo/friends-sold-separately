import { useLocation } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
import { configProfileSelector } from '@/store/selectors/configSelector';
import naviItems from './naviItems';
import { NavLink } from './NavLink';
import { basePath } from '@/constants';

const SideNav: React.FC = () => {
  const config = useAppSelector(configProfileSelector);
  const lo = useLocation();
  const pathname = lo.pathname.replace(basePath, '');

  return (
    <aside className="menu">
      <ul className="menu-list">
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
    </aside>
  );
};
export default SideNav;
