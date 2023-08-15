import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { getCountries } from "../store/context/countrySlice";
import { getActivities } from "../store/context/activitySlice";

export default function GetLists() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  });
}