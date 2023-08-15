import style from '../modules/view.module.css';
import { NavLink } from 'react-router-dom';
import ImageCountries from "./ImageCountries";
import Login from "./Login";
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { resetError, resetMessage } from '../store/context/userSlice';

export default function ViewLogin() {
  const { message, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {alerts, createToast} = useAlert();
  useEffect(() => {
    if (message !== "") {
      createToast({
        text: message,
        variant: "success"
      });
    }
    if (error) {
      createToast({
        text: error,
        variant: "danger"
      });
    }
    dispatch(resetMessage());
    dispatch(resetError())
  }, [message, error, createToast, dispatch]);
  return (
    <main className={style.view}>
      {alerts}
      <article className={style.contain}>
        <ImageCountries />
        <Login />
        <footer>
          <p>You do not have an account ? <NavLink to='/register'>Sign up</NavLink></p>
        </footer>
      </article>
    </main>
  );
}