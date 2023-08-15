import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch,
  faStream,
  faArrowRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import './_sidebar.scss';
import { useAppContext } from '../../../contexts/AppContext';
import { STORAGE_KEYS } from '../../../config/constants';

//TODO: Fix types here

const renderSideBarOption = (
  link: string,
  icon: IconDefinition,
  text: string,
  { selected }: { selected?: boolean } = {},
) => {
  return (
    <div className={cx('sidebar__option', { 'sidebar__option--selected': selected })}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

const SideBar = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleSignOutClick = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN_DATA);
    setUser(undefined);
    navigate('/sign-in');
  }, [navigate, setUser]);

  return (
    <div className="sidebar">
      {user && (
        <>
          <div className="sidebar__profile">
            <img src={user?.images[0].url} alt={user?.display_name} />
            <p>{user?.display_name}</p>

            <button className="btn-signout btn btn-secondary btn-sm" onClick={handleSignOutClick}>
              <span>Sign Out </span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="sidebar__options">
            {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
            {renderSideBarOption('/search', faSearch, 'Search')}
            {renderSideBarOption('/favourites', faHeart, 'Favourites')}
            {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
            {renderSideBarOption('/charts', faStream, 'Charts')}
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
