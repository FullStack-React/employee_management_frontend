import React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from '@/components/Tooltip';
import { useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/AuthSlice';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [Identity, setIdentity] = React.useState('HR');

  const pagesHR = [
    {
      description: <Link to="/profiles_hr">Employee Profiiles</Link>,
    },
    {
      description: <Link to="/visa_hr">Visa Status Management</Link>,
    },
    {
      description: <Link to="/hiring_hr">Hiring Management</Link>,
    },
  ];

  const pagesEmployee = [
    {
      description: <Link to="/onboarding">Onboarding</Link>,
    },
    {
      description: <Link to="/personal-info">Personal Information</Link>,
    },
    {
      description: <Link to="/visa">Visa Status Management</Link>,
    },
  ];

  const pages = Identity === 'HR' ? pagesHR : pagesEmployee;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="sticky top-0 flex backdrop-filter backdrop-blur-md bg-opacity-30 bg-slate-200 py-4 justify-around items-center z-[100]">
      <div className="font-bold text-3xl ">Company A</div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Hover to Navigate</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[200px] py-2">
                {pages.map((component, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-accent cursor-pointer"
                  >
                    {component.description}
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="text-gray-500 hover:text-black" onClick={handleLogout}>
        <Tooltip main="Log Out" hover="Click to Log Out" />
      </div>
    </div>
  );
};

export default Navigation;
