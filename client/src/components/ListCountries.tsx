import style from '../modules/list.module.css';
import { useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { useAppDispatch, useAppSelector } from "../store";
import CountryCard from "./CountryCard";
import Loading from './Loading';
import { resetError } from '../store/context/countrySlice';
import { resetError as resetE, resetMessage as resetM } from '../store/context/userSlice'

export default function ListCountries() {
  const { page, countries, loading, error } = useAppSelector(state => state.country);
  const umessage = useAppSelector(state => state.user.message);
  const uerror = useAppSelector(state => state.user.error);
  const start = (page - 1) * 8;
  const end = page * 8;
  const viewCountries = countries.slice(start, end);
  const { alerts, createToast } = useAlert();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error) {
      createToast({
        text: error,
        variant: "danger"
      });
    }
    if (umessage !== "") {
      createToast({
        text: umessage,
        variant: "success"
      });
    }
    if (uerror) {
      createToast({
        text: uerror,
        variant: "danger"
      });
    }
    dispatch(resetError());
    dispatch(resetM());
    dispatch(resetE());
  }, [error, umessage, uerror, createToast, dispatch]);
  return (
    <main className={style.listCountry}>
      {alerts}
      {
        loading
        ? <Loading />
        : null
      }
      {
        viewCountries?.map(cn => {
          return <CountryCard key={cn.id} country={cn} />
        })
      }
    </main>
  );
}
