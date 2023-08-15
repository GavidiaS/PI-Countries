import style from '../modules/card.module.css';
import { NavLink } from "react-router-dom";
import { ActivityCardProps } from "../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className={style.cardActivity}>
      <h2>{activity.name}</h2>
      <h2>{activity.difficulty}</h2>
      <h2>{activity.season}</h2>
      <NavLink to={`/activity/${activity.id}`}><FontAwesomeIcon icon={faCircleInfo} /></NavLink>
    </article>
  );
}