import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

import logo from '../../icons/logo-default.svg';
import settings from '../../icons/settings.svg';
import account from '../../icons/account.svg';

const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <Link to="/">
        <img className={classes.logo} src={logo} alt="Logo"/>
      </Link>
      <div className={classes.settings}>
        <img className={classes.options} src={settings} alt="Settings"/>
        <img className={classes.options} src={account} alt="Account"/>
      </div>
    </div>
  );
};

export default Header;