import { NavLink } from 'react-router-dom';
import { paths } from '@/routes/routes';
import { AuthStatus } from '@/components/AuthStatus';
import './Navbar.scss';

export function Navbar() {
  return (
    <div className="navbar">
      <AuthStatus />
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to={paths.characters}>Герои</NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to={paths.locations}>Локации</NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to={paths.episodes}>Эпизоды</NavLink>
        </li>
      </ul>
    </div>
  );
}
