import style from '../modules/view.module.css';
import { NavLink } from "react-router-dom";
import ImageCountries from "./ImageCountries";
import Register from "./Register";

export default function ViewRegister() {
  
  return (
    <main className={style.view}>
      <article className={style.contain}>
        <ImageCountries />
        <Register />
        <footer>
          <p>Do you already have an account? <NavLink to='/login'>Sign in</NavLink></p>
        </footer>
      </article>
    </main>
  );
}