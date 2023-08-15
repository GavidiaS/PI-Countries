import style from '../modules/image.module.css';
import countries from '../resources/countries.png';

export default function ImageCountries() {
  return (
    <figure className={style.image}>
      <img src={countries} alt="Image countries" />
    </figure>
  );
}