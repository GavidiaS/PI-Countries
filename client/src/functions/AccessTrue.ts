import { useEffect } from "react";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

export default function AccessTrue() {
  const navigate = useNavigate();
  const { access } = useAppSelector(state => state.user);
  useEffect(() => {
    if (access) navigate("/");
  });
}