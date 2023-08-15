import style from '../modules/search.module.css';
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { getCountriesByName, resetCountries, resetPage } from "../store/context/countrySlice";
import { SearchProps } from "../interfaces";

export default function Searchbar({ fnClose }: SearchProps) {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  function nameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function nameSubmit() {
    if (name !== "") {
      dispatch(getCountriesByName(name));
      dispatch(resetPage());
      setName("");
      fnClose();
    }
  }
  function reset() {
    dispatch(resetCountries());
    dispatch(resetPage());
    fnClose();
  }
  return (
    <aside className={style.search}>
      <article className={style.contain}>
        <button className={style.close} onClick={fnClose}><FontAwesomeIcon icon={faX} /></button>
        <input autoFocus autoComplete='true' type="text" onChange={nameChange} placeholder="Search country by name" />
        <button className={style.btn} onClick={nameSubmit} disabled={name === "" ? true : false}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        <button className={style.reset} onClick={reset}>Reset</button>
      </article>
    </aside>
  );
}