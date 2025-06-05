import { NavLink } from 'react-router-dom';
import { paths } from '@/routes/routes';
import { characters } from '@/data/characters';
import { location } from '@/data/location';
import { episode } from '@/data/episode';
import type { Character, Episode, Location } from '@/components/Category';
import { AuthStatus } from '@/components/AuthStatus';
import './Navbar.scss';

interface NavbarProps {
  setData: (data: Character[] | Episode[] | Location[]) => void;
}

export function Navbar(props: NavbarProps) {
  const { setData } = props;
  return (
    <div className="navbar">
      <AuthStatus />
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to={paths.characters} onClick={() => setData(characters)}>
            Герои
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to={paths.locations} onClick={() => setData(location)}>
            Локации
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to={paths.episodes} onClick={() => setData(episode)}>
            Эпизоды
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
