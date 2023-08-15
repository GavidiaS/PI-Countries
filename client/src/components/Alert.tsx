import style from '../modules/alert.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertProps } from "../interfaces";
import { faCircleCheck, faCircleExclamation, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Alert({ variant = "success", children }: AlertProps) {
  const classVariants = {
    success: {
      color: "green",
      icon: <FontAwesomeIcon icon={faCircleCheck} />
    },
    danger: {
      color: "red",
      icon: <FontAwesomeIcon icon={faCircleXmark} />
    },
    warning: {
      color: "yellow",
      icon: <FontAwesomeIcon icon={faCircleExclamation} />
    }
  }
  return <div className={`${style.alert} ${style[classVariants[variant].color]}`}>
    <span>{classVariants[variant].icon}</span>
    {children}
  </div>
}