import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { getActivityById, resetActivity } from "../store/context/activitySlice";

export default function GetActivityDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(getActivityById(+id));
    return () => {
      dispatch(resetActivity());
    }
  });
}