import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';

const CoreLayout = () => {
  return (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header />
        <div className="main__content__child">
          <Outlet />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default CoreLayout;
