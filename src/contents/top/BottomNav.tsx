import { Link, useLocation } from 'react-router-dom';
import { FaRegHandshake, FaRegAddressCard } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

const BottomNav: React.FC = () => {
  const lo = useLocation();
  return (
    <nav
      className="navbar is-hidden-tablet is-fixed-bottom"
      role="navigation"
      aria-label="main navigation"
    >
      <ul className="menu-list is-flex is-justify-content-space-between	">
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
    </nav>
  );
};
export default BottomNav;
