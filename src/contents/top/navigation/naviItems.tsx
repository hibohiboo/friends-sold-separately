import { FaRegAddressCard, FaRegHandshake } from 'react-icons/fa';
import { IoIosConstruct } from 'react-icons/io';
import { MdNotifications, MdRamenDining } from 'react-icons/md';

const items = [
  { path: '/', icon: <FaRegHandshake size={50} /> },
  { path: '/profile', icon: <FaRegAddressCard size={50} /> },
  { path: '/notice', icon: <MdNotifications size={50} /> },
  // {
  //   path: '/beginners',
  //   icon: <img src={newlyIcon} alt="初心者" style={{ width: '50px' }} />,
  // },
  {
    path: '/udonarium',
    icon: <MdRamenDining size={50} />,
  },
  { path: '/links', icon: <IoIosConstruct size={50} /> },
];

export default items;
