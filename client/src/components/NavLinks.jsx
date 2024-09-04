import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';

const NavLinks = ({ isDarkThemeEnabled }) => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

NavLinks.propTypes = {
  isDarkThemeEnabled: PropTypes.bool
};

export default NavLinks;