import style from '../modules/form.module.css';
import { SyntheticEvent, useState } from "react";
import { LocalStorageLogin, LocalStorageLoginOptional } from "../interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../store/context/userSlice";
import { useNavigate } from "react-router-dom";

const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const initialUser: LocalStorageLogin = {
  email: "",
  password: ""
}

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useLocalStorage<LocalStorageLogin>("userLogin", initialUser);
  const [error, setError] = useState<LocalStorageLoginOptional>(initialUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function validate(inputs: LocalStorageLogin) {
    const errors: LocalStorageLoginOptional = {};
    if (!inputs.email) errors.email = "Email is required";
    if (inputs.email.length <= 2) errors.email = "Must have more than 2 characters";
    if (inputs.email.length > 35) errors.email = "The email must not exceed 35 characters";
    if (!regexMail.test(inputs.email)) errors.email = "A valid email is required";
    if (inputs.email.includes(" ")) errors.email = "No whitespace is allowed";
    if (!inputs.password) errors.password = "Password is required";
    if (inputs.password.length < 8) errors.password = "Must have a minimum of 8 characters";
    if (inputs.password.length > 16) errors.password = "The password must not exceed 16 characters";
    if (inputs.password.includes(" ")) errors.password = "No whitespace is allowed";
    if (!/(?=.*[A-Z])/.test(inputs.password)) errors.password = "At least one uppercase letter is required";
    if (!/(?=.*\d)/.test(inputs.password)) errors.password = "At least one number is required";
    if (!/(?=.*[@$!%*?&])/.test(inputs.password)) errors.password = "Required to use at least one: @, $, !, %, *, ?, or &";
    return errors;
  }
  function visibleChange() {
    setVisible(!visible);
  }
  function userChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    setError(validate({
      ...user,
      [name]: value
    }));
  }
  function userSubmit(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(login(user));
    setUser(initialUser);
    setError(initialUser);
    navigate("/");
  }
  return (
    <form className={style.form} onSubmit={userSubmit}>
      <label>
        <input autoFocus type="text" name="email" onChange={userChange} value={user.email} placeholder="example@example.com" />
        <span>{error.email}</span>
      </label>
      <label>
        <input type={visible ? "text" : "password"} name="password" onChange={userChange} value={user.password} placeholder="********" />
        <span>{error.password}</span>
        <a onClick={visibleChange}>{visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</a>
      </label>
      <button disabled={Object.keys(error).length === 0 ? false : true}>Sign up</button>
    </form>
  );
}