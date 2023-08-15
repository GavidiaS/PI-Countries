import style from '../modules/form.module.css';
import { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LocalStorageRegister, LocalStorageRegisterOptional } from "../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { register } from "../store/context/userSlice";
import { useNavigate } from "react-router-dom";

const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const initialUser: LocalStorageRegister = {
  name: "",
  surname: "",
  email: "",
  password: "",
  countryId: ""
}

export default function Register() {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useLocalStorage<LocalStorageRegister>("userRegister", initialUser);
  const [error, setError] = useState<LocalStorageRegisterOptional>(initialUser);
  const { countries } = useAppSelector(state => state.country);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function validate(inputs: LocalStorageRegister) {
    const errors: LocalStorageRegisterOptional = {};
    if (!inputs.name) errors.name = "Name is required";
    if (!inputs.surname) errors.surname = "Surname is required";
    if (inputs.name.length <= 2) errors.name = "Must have more than 2 characters";
    if (inputs.surname.length <= 2) errors.surname = "Must have more than 2 characters";
    if (!/^[A-Z]/.test(inputs.name)) errors.name = "The name must start with an uppercase letter";
    if (!/^[A-Z]/.test(inputs.surname)) errors.surname = "The surname must start with an uppercase letter";
    if (!/^[A-Z][a-z]+$/.test(inputs.name)) errors.name = "The name must start with an uppercase letter followed by lowercase letters";
    if (!/^[A-Z][a-z]+$/.test(inputs.surname)) errors.surname = "The surname must start with an uppercase letter followed by lowercase letters";
    if (inputs.name.length > 15) errors.name = "The name must not exceed 15 characters";
    if (inputs.surname.length > 15) errors.surname = "The surname must not exceed 15 characters";
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
    if (!/(?=.*[@$!%*?&])/.test(inputs.password)) errors.password = "At least one of the following characters is required: @, $, !, %, *, ?, or &";
    if (!inputs.countryId) errors.countryId = "Country is required";
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
    dispatch(register(user));
    setUser(initialUser);
    setError(initialUser);
    navigate("/login");
  }
  return (
    <form className={style.form} onSubmit={userSubmit}>
      <label>
        <input autoFocus autoComplete='true' type="text" name="name" onChange={userChange} value={user.name} placeholder="Your name" />
        <span>{error.name}</span>
      </label>
      <label>
        <input autoComplete='true' type="text" name="surname" onChange={userChange} value={user.surname} placeholder="Your surname" />
        <span>{error.surname}</span>
      </label>
      <label>
        <input autoComplete='true' type="email" name="email" onChange={userChange} value={user.email} placeholder="example@example.com" />
        <span>{error.email}</span>
      </label>
      <label>
        <input autoComplete='true' type={visible ? "text" : "password"} name="password" onChange={userChange} value={user.password} placeholder="********" />
        <span>{error.password}</span>
        <a onClick={visibleChange}>{visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</a>
      </label>
      <label>
        <input autoComplete='true' list="countryId" name="countryId" onChange={userChange} value={user.countryId} placeholder="Select your nationality" />
        <datalist id="countryId">
          {
            countries.map(cn => {
              return <option key={cn.id} value={cn.id}>{cn.name}</option>
            })
          }
        </datalist>
        <span>{error.countryId}</span>
      </label>
      <button disabled={Object.keys(error).length === 0 ? false : true}>Enter</button>
    </form>
  );
}