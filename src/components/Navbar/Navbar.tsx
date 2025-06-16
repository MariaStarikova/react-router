import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { paths } from '@/routes/routes';
import { AuthStatus } from '@/components/AuthStatus';
import { PermIdentity, Room, Wysiwyg } from '@mui/icons-material';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BottomNavigation } from '@mui/material';
import './Navbar.scss';

export function Navbar() {
  const location = useLocation();
  const [value, setValue] = useState<number | false>(false);

  useEffect(() => {
    switch (location.pathname) {
      case paths.characters:
        setValue(0);
        break;
      case paths.locations:
        setValue(1);
        break;
      case paths.episodes:
        setValue(2);
        break;
      default:
        setValue(false);
    }
  }, [location]);

  return (
    <Box className="navbar">
      <AuthStatus />
      <BottomNavigation
        value={value}
        showLabels
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="navbar__list"
        sx={{ backgroundColor: 'rgb(220, 221, 221)' }}
      >
        <BottomNavigationAction
          label="Герои"
          icon={<PermIdentity />}
          component={NavLink}
          to={paths.characters}
          value={0}
        />
        <BottomNavigationAction
          label="Локации"
          icon={<Room />}
          component={NavLink}
          to={paths.locations}
          value={1}
        />
        <BottomNavigationAction
          label="Эпизоды"
          icon={<Wysiwyg />}
          component={NavLink}
          to={paths.episodes}
          value={2}
        />
      </BottomNavigation>
    </Box>
  );
}
