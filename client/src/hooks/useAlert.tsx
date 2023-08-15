import style from '../modules/alert.module.css';
import { useState } from "react";
import Alert from "../components/Alert";
import { UseAlert } from "../interfaces";

export function useAlert() {
  const [list, setList] = useState<UseAlert[]>([]);

  function createToast(toast: UseAlert): void {
    setList([...list, toast]);
    setTimeout(() => {
      setList(l => l.slice(1));
    },4000);
  }

  const alerts = (
    <div className={style.contain}>
      {list.map(obj => <Alert variant={obj.variant}>{obj.text}</Alert>)}
    </div>
  );

  return { alerts, createToast };
}