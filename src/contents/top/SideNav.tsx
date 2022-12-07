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
        <li>
          <Link to="/beginners" className={pathname === '/beginners' ? 'is-active' : ''}>
            <MdLocalMovies size={50} />
          </Link>
        </li>
      </ul>
    </aside>
  );
};
export default SideNav;
