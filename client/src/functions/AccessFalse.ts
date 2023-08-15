import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { useEffect } from "react";

export default function AccessFalse() {
  const navigate = useNavigate();
  const { access } = useAppSelector(state => state.user);
  useEffect(() => {
    if (!access) navigate("/login");
  });
}