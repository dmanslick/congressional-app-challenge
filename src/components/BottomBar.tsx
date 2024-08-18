import { Box } from '@chakra-ui/react';
import { BotIcon, CameraIcon, CircleHelpIcon, HomeIcon, UsersIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  to: string;
  ariaLabel: string;
  component: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    to: '/app/help',
    ariaLabel: 'Help link',
    component: <CircleHelpIcon />,
  },
  {
    to: '/app/camera',
    ariaLabel: 'Camera link',
    component: <CameraIcon />,
  },
  {
    to: '/app',
    ariaLabel: 'Home link',
    component: <HomeIcon />,
  },
  {
    to: '/app/chatbot',
    ariaLabel: 'AI Chat link',
    component: <BotIcon />,
  },
  {
    to: '/app/community',
    ariaLabel: 'Community link',
    component: <UsersIcon />,
  },
];

const inactiveColor = '#bababa';
const activeColor = 'blue.500';

export default function BottomBar() {
  const location = useLocation();

  return (
    <Box
      h='56px'
      bg='white'
      display='flex'
      flexDirection='row'
      justifyContent='space-around'
      alignItems='center'
      position='fixed'
      bottom={0}
      w='100%'
      zIndex={10}
      boxShadow='0 -2px 6px rgba(0, 0, 0, 0.1)'
    >
      {navLinks.map(({ to, component, ariaLabel }) => {
        let condition = location.pathname === to;
        if (to === '/app/community') condition = condition || location.pathname.includes('/app/post');

        return (
          <Link to={to} aria-label={ariaLabel} key={to}>
            <Box
              color={condition ? activeColor : inactiveColor}
              position={to === '/app' ? 'relative' : 'static'}
              transform={to === '/app' ? 'translateY(-5px)' : 'none'}
            >
              {to === '/app' && (
                <Box
                  position='absolute'
                  top='calc(50% + 5px)'
                  left='50%'
                  transform='translate(-50%, -50%)'
                  borderRadius='50%'
                  bg='#e0f2ff' // Lighter blue color
                  w='30px'
                  h='30px'
                  zIndex='-1'
                />
              )}
              {component}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}