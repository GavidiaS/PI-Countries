import style from '../modules/detail.module.css';
import { useAppSelector } from "../store";
import Loading from './Loading';

export default function CountryDetail() {
  const { country, loading } = useAppSelector(state => state.country);
  return (
    <main className={style.detail}>
      {
        loading
        ? <Loading />
        : null
      }
      <section className={style.contain}>
        <article className={style.data}>
          <figure>
            <img src={country?.flag} alt={country?.name} />
          </figure>
          <div>
            <h1>{country?.name}</h1>
            <h4>capital: <span>{country?.capital}</span></h4>
            <h4>continent: <span>{country?.continent}</span></h4>
            <h4>subregion: <span>{country?.subregion}</span></h4>
            <h4>area: <span>{country?.area}</span></h4>
            <h4>population: <span>{country?.population}</span></h4>
          </div>
        </article>
        <article className={style.activity}>
          {
            country?.Activities.length === 0
            ? null
            : <table>
              <caption>Activities</caption>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Season</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {
                  country?.Activities.map(act => {
                    return <tr key={act.id}>
                      <td>{act.name}</td>
                      <td>{act.season}</td>
                      <td>{act.difficulty}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          }
        </article>
        <article className={style.user}>
          {
            country?.Users.length === 0
            ? null
            : <table>
              <caption>Users from this country</caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  country?.Users.map(user => {
                    return <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          }
        </article>
      </section>
    </main>
  );
}