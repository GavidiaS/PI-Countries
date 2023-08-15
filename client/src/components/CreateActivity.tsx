import style from '../modules/form.module.css';
import { SyntheticEvent, useState } from "react";
import { LocalStorageActivity, LocalStorageActivityOptional } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from 'react-router-dom';
import { postActivity } from '../store/context/activitySlice';

const initialActivity: LocalStorageActivity = {
  name: "",
  difficulty: 0,
  duration: "",
  season: "",
  userId: "",
  countries: []
};
const initialActivityError: LocalStorageActivityOptional = {
  name: "",
  difficulty: "",
  duration: "",
  season: "",
  userId: "",
  countries: ""
};

export default function CreateActivity() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, access } = useAppSelector(state => state.user);
  const { countries } = useAppSelector(state => state.country);
  const [activity, setActivity] = useState<LocalStorageActivity>(initialActivity);
  const [error, setError] = useState<LocalStorageActivityOptional>(initialActivityError);
  function validate(inputs: LocalStorageActivity) {
    const errors: LocalStorageActivityOptional = {};
    if (!inputs.name) errors.name = "Name is required";
    if (inputs.name.length <= 2) errors.name = "Must have more than 2 characters";
    if (!/^[A-Z]/.test(inputs.name)) errors.name = "The name must start with an uppercase letter";
    if (!/^[A-Z][a-z]+$/.test(inputs.name)) errors.name = "The name must start with an uppercase letter followed by lowercase letters";
    if (inputs.name.length > 20) errors.name = "The name must not exceed 20 characters";
    if (!inputs.difficulty) errors.difficulty = "Difficulty is required";
    if (!inputs.duration) errors.duration = "Duration is required";
    if (!inputs.season) errors.season = "Season is required";
    if (inputs.countries.length === 0) errors.countries = "At least one country is required";
    return errors;
  }
  function activityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      [name]: value
    });
    setError(validate({
      ...activity,
      [name]: value
    }));
  }
  function checkboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if (checked) {
      setActivity({
        ...activity,
        countries: [...activity.countries, value]
      });
      setError(validate({
        ...activity,
        countries: [...activity.countries, value]
      }));
    } else {
      setActivity({
        ...activity,
        countries: activity.countries.filter(checkbox => checkbox !== value)
      });
      setError(validate({
        ...activity,
        countries: activity.countries.filter(checkbox => checkbox !== value)
      }));
    }
  }
  function activitySubmit(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(postActivity(activity));
    setActivity(initialActivity);
    setError(initialActivityError);
    navigate("/activities");
  }
  if (!activity.userId && access) {
    setActivity({ ...activity, userId: user?.id ?? "" });
  }
  return (
    <form className={style.form} onSubmit={activitySubmit}>
      <label>
        <input autoFocus autoComplete="true" type="text" name="name" value={activity.name} onChange={activityChange} />
        <span>{error.name}</span>
      </label>
      <label>
        <input autoComplete="true" type="range" min={1} max={5} name="difficulty" value={+activity.difficulty} onChange={activityChange} />
        <span>{error.difficulty}</span>
      </label>
      <label>
        <input autoComplete="true" type="time" name="duration" value={activity.duration} onChange={activityChange} />
        <span>{error.duration}</span>
      </label>
      <label>
        <input autoComplete="true" list="season" name="season" value={activity.season} onChange={activityChange} />
        <datalist id="season">
          <option value="Summer"></option>
          <option value="Winter"></option>
          <option value="Spring"></option>
          <option value="Fall"></option>
        </datalist>
        <span>{error.season}</span>
      </label>
      <div className={style.countries}>
        {
          countries?.map(cn => {
            return <label key={cn.id} htmlFor={cn.name}>
              <input type="checkbox" id={cn.name} value={cn.id} onChange={checkboxChange} />
              <span>{cn.name}</span>
            </label>
          })
        }
      </div>
      <button disabled={Object.keys(error).length === 0 ? false : true}>Create</button>
    </form>
  );
}