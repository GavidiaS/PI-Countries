import style from '../modules/detail.module.css';
import { useAppSelector } from "../store";
import Loading from './Loading';

export default function ActivityDetail() {
  const { activity, loading } = useAppSelector(state => state.activity);
  return (
    <main className={style.detail}>
      {
        loading
        ? <Loading />
        : null
      }
      <section className={style.contain}>
        <article className={style.dataAct}>
          <h1>{activity?.name}</h1>
          <h3>{activity?.difficulty}</h3>
          <h3>{activity?.duration}</h3>
          <h3>{activity?.season}</h3>
        </article>
        <article className={style.userAct}>
          {
            !activity?.User 
            ? null
            : <>
              <h2>{activity.User.name}</h2>
              <h2>{activity.User.surname}</h2>
              <h2>{activity.User.email}</h2>
            </>
          }
        </article>
        <article className={style.countryAct}>
          {
            activity?.Countries.length === 0
            ? null
            : <table>
              <caption>Countries</caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {
                  activity?.Countries.map(cn => {
                    return <tr key={cn.id}>
                      <td>{cn.name}</td>
                      <td><img src={cn.flag} alt={cn.name} /></td>
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