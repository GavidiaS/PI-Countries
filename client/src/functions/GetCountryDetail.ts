import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { getCountryById, resetCountry } from "../store/context/countrySlice";

export default function GetCountryDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(getCountryById(id));
    return () => {
      dispatch(resetCountry());
    }
  });
}