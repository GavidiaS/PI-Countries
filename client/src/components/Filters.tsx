import style from '../modules/filter.module.css';
import { useState } from "react";
import { FilterProps, FilterState } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../store";
import { filterActivity, filterContinent, orderArea, orderName, orderPopulation, resetCountries, resetPage } from "../store/context/countrySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const initialFilter: FilterState = {
  activity: "",
  continent: "",
  name: "",
  area: "",
  population: ""
}

export default function Filters({ fnClose }: FilterProps) {
  const { activities } = useAppSelector(state => state.activity);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  function filterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  }
  function filterSubmit() {
    if (filter.activity !== "") dispatch(filterActivity({ activities: activities, activity: +filter.activity }));
    if (filter.continent !== "") dispatch(filterContinent(filter.continent));
    if (filter.name !== "") dispatch(orderName(filter.name));
    if (filter.area !== "") dispatch(orderArea(filter.area));
    if (filter.population !== "") dispatch(orderPopulation(filter.population));
    if (filter.activity !== "" || filter.continent !== "" || filter.name !== "" || filter.area !== "" || filter.population !== "") {
      dispatch(resetPage());
      fnClose();
    }
  }
  function reset() {
    dispatch(resetCountries());
    dispatch(resetPage());
    fnClose();
  }
  return (
    <aside className={style.filter}>
      <section className={style.contain}>
        <button className={style.close} onClick={fnClose}><FontAwesomeIcon icon={faX} /></button>
        <button className={style.btn} onClick={filterSubmit}>Apply</button>
        <button className={style.reset} onClick={reset}>Reset</button>
        <section className={style.items}>
          <article>
            <h2>Filter by tourist activity</h2>
            <div onChange={filterChange}>
              {
                activities?.map(act => {
                  return <label htmlFor={act.name} key={act.id}>
                    <input id={act.name} type="radio" name="activity" value={act.id} />
                    <span>{act.name}</span>
                  </label>
                })
              }
            </div>
          </article>
          <article>
            <h2>Filter by continent</h2>
            <div onChange={filterChange}>
              <label htmlFor="africa">
                <input id="africa" type="radio" name="continent" value="Africa" />
                <span>Africa</span>
              </label>
              <label htmlFor="antarctica">
                <input id="antarctica" type="radio" name="continent" value="Antarctica" />
                <span>Antarctica</span>
              </label>
              <label htmlFor="asia">
                <input id="asia" type="radio" name="continent" value="Asia" />
                <span>Asia</span>
              </label>
              <label htmlFor="europe">
                <input id="europe" type="radio" name="continent" value="Europe" />
                <span>Europe</span>
              </label>
              <label htmlFor="northamerica">
                <input id="northamerica" type="radio" name="continent" value="North America" />
                <span>North America</span>
              </label>
              <label htmlFor="oceania">
                <input id="oceania" type="radio" name="continent" value="Oceania" />
                <span>Oceania</span>
              </label>
              <label htmlFor="southamerica">
                <input id="southamerica" type="radio" name="continent" value="South America" />
                <span>South America</span>
              </label>
            </div>
          </article>
          <article className={style.order}>
            <h2>Order by name</h2>
            <div onChange={filterChange}>
              <label htmlFor="asc">
                <input id="asc" type="radio" name="name" value="A-Z" disabled={filter.area !== "" || filter.population !== "" ? true : false} />
                <span>Ascending(A-Z)</span>
              </label>
              <label htmlFor="des">
                <input id="des" type="radio" name="name" value="Z-A" disabled={filter.area !== "" || filter.population !== "" ? true : false} />
                <span>Descending(Z-A)</span>
              </label>
            </div>
          </article>
          <article className={style.order}>
            <h2>Order by area</h2>
            <div onChange={filterChange}>
              <label htmlFor="asca">
                <input id="asca" type="radio" name="area" value="ASC" disabled={filter.name !== "" || filter.population !== "" ? true : false} />
                <span>Ascending(1-∞)</span>
              </label>
              <label htmlFor="desa">
                <input id="desa" type="radio" name="area" value="DES" disabled={filter.name !== "" || filter.population !== "" ? true : false} />
                <span>Descending(∞-1)</span>
              </label>
            </div>
          </article>
          <article className={style.order}>
            <h2>Order by population</h2>
            <div onChange={filterChange}>
              <label htmlFor="ascp">
                <input id="ascp" type="radio" name="population" value="ASC" disabled={filter.name !== "" || filter.area !== "" ? true : false} />
                <span>Ascending(1-∞)</span>
              </label>
              <label htmlFor="desp">
                <input id="desp" type="radio" name="population" value="DES" disabled={filter.name !== "" || filter.area !== "" ? true : false} />
                <span>Descending(∞-1)</span>
              </label>
            </div>
          </article>
        </section>
      </section>
    </aside>
  );
}