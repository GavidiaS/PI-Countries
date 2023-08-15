import style from '../modules/view.module.css';
import activities from '../resources/activities.jpg';
import CreateActivity from "./CreateActivity";

export default function ViewCreate() {
  return (
    <main className={style.view}>
      <section className={style.contain}>
        <figure>
          <img src={activities} alt="Image Activities" />
        </figure>
        <CreateActivity />
      </section>
    </main>
  );
}