import { Link, useLocation } from 'react-router-dom';
import { FaRegHandshake, FaRegAddressCard } from 'react-icons/fa';
import { MdLocalMovies, MdNotifications } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
import { configProfileSelector } from '@/store/selectors/configSelector';
import newlyIcon from '@/assets/icons/newly.svg';
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
        <li>
          <Link to="/" className={pathname === '/' ? 'is-active' : ''}>
            <FaRegHandshake size={50} />
          </Link>
        </li>
        <li>
          <Link to="/profile" className={pathname === '/profile' ? 'is-active' : ''}>
            <FaRegAddressCard size={50} />
          </Link>
        </li>
        <li>
          <Link to="/notice" className={pathname === '/notice' ? 'is-active' : ''}>
            <MdNotifications size={50} />
          </Link>
        </li>
        <li>
          <Link to="/beginners" className={pathname === '/beginners' ? 'is-active' : ''}>
            <img src={newlyIcon} alt="初心者" style={{ width: '50px' }} />
          </Link>
        </li>
        {config.beta && (
          <li>
            <Link to="/gallery" className={pathname === '/gallery' ? 'is-active' : ''}>
              <MdLocalMovies size={50} />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default BottomNav;
