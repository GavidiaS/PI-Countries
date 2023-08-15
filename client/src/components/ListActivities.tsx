import style from '../modules/list.module.css';
import { useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { useAppDispatch, useAppSelector } from "../store";
import ActivityCard from "./ActivityCard";
import Loading from './Loading';
import { resetError, resetMessage } from '../store/context/activitySlice';

export default function ListActivities() {
  const { page, activities, loading, message, error } = useAppSelector(state => state.activity);
  const start = (page - 1) * 10;
  const end = page * 10;
  const viewActivities = activities.slice(start, end);
  const { alerts, createToast } = useAlert();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (message !== "") {
      createToast({
        text: message,
        variant: "warning"
      });
    }
    if (error) {
      createToast({
        text: error,
        variant: "danger"
      });
    }
    dispatch(resetMessage());
    dispatch(resetError());
  }, [message, error, createToast, dispatch])
  return (
    <main className={style.listActivity}>
      {alerts}
      {
        loading
        ? <Loading />
        : null
      }
      <article>
        <h2>Tourist Activities</h2>
        <h2>Difficulty</h2>
        <h2>Season</h2>
      </article>
      {
        viewActivities?.map(act => {
          return <ActivityCard key={act.id} activity={act} />
        })
      }
    </main>
  );
}