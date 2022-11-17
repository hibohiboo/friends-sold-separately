import { Link, useLocation } from 'react-router-dom';
import { FaRegAddressCard, FaRegHandshake } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

const SideNav: React.FC = () => {
  const lo = useLocation();
  return (
    <aside className="menu">
      <ul className="menu-list">
        <li>
          <Link to="/" className={lo.pathname === '/' ? 'is-active' : ''}>
            <FaRegHandshake size={50} />
          </Link>
        </li>
        <li>
          <Link to="/profile" className={lo.pathname === '/profile' ? 'is-active' : ''}>
            <FaRegAddressCard size={50} />
          </Link>
        </li>
        <li>
          <Link to="/notice" className={lo.pathname === '/notice' ? 'is-active' : ''}>
            <MdNotifications size={50} />
          </Link>
        </li>
      </ul>
    </aside>
  );
};
export default SideNav;
