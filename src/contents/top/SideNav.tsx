import { Link, useLocation } from 'react-router-dom';
import { FaRegAddressCard, FaRegHandshake } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import { basePath } from '@/constants';

const SideNav: React.FC = () => {
  const lo = useLocation();
  const pathname = lo.pathname.replace(basePath, '');
  console.log(lo);
  console.log(pathname);
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
      </ul>
    </aside>
  );
};
export default SideNav;