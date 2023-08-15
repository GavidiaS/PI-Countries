import style from '../modules/nav.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faHouse, faMagnifyingGlass, faPersonSkiingNordic, faRightFromBracket, faSquarePlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/context/userSlice';
import { NavVisible } from '../interfaces';
import Searchbar from './Searchbar';
import Filters from './Filters';

const initialVisible: NavVisible = {
  search: false,
  filter: false
}

export default function Navbar() {
  const [visible, setVisible] = useState<NavVisible>(initialVisible);
  const { access } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  function logoutUser() {
    dispatch(logout());
  }
  function visibleSearch() {
    setVisible({ ...visible, search: !visible.search });
  }
  function visibleFilter() {
    setVisible({ ...visible, filter: !visible.filter });
  }
  return (
    <nav className={style.nav}>
      <NavLink title='Home' to='/'><FontAwesomeIcon icon={faHouse} /></NavLink>
      {
        location.pathname === "/"
        ? <>
          <NavLink title='Search Country' onClick={visibleSearch} to=''><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
          <NavLink title='Filters' onClick={visibleFilter} to=''><FontAwesomeIcon icon={faFilter} /></NavLink>
        </>
        : null
      }
      <NavLink title='Activities' to='/activities'><FontAwesomeIcon icon={faPersonSkiingNordic} /></NavLink>
      <NavLink title='Add Activity' to='/add'><FontAwesomeIcon icon={faSquarePlus} /></NavLink>
      <NavLink title='Log in' to='/login'><FontAwesomeIcon icon={faUser} /></NavLink>
      {
        !access
        ? null
        : <NavLink title='Log out' onClick={logoutUser} to='/'><FontAwesomeIcon icon={faRightFromBracket} /></NavLink>
      }
      {
        visible.search
        ? <Searchbar fnClose={visibleSearch} />
        : null
      }
      {
        visible.filter
        ? <Filters fnClose={visibleFilter} />
        : null
      }
    </nav>
  );
}