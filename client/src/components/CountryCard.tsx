import style from '../modules/card.module.css';
import { faMountainSun, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CountryCardProps } from "../interfaces";
import { NavLink } from "react-router-dom";

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <article className={style.cardCountry}>
      <h2>
          <NavLink to={`/country/${country.id}`}>{country.name}</NavLink>
      </h2>
      <figure className={style.figure}>
        <img src={country.flag} alt={country.name} />
      </figure>
      <section className={style.data}>
        <h3><FontAwesomeIcon icon={faMountainSun} /> <span>{country.area}</span></h3>
        <h3><FontAwesomeIcon icon={faPeopleGroup} /> <span>{country.population}</span></h3>
      </section>
    </article>
  );
}