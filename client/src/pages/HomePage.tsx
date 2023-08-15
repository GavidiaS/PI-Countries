import ButtonScrollTop from "../components/ButtoScrollTop";
import ListCountries from "../components/ListCountries";
import PaginationCountries from "../components/PaginationCountries";

export default function HomePage() {
  return (
    <>
      <ListCountries />
      <PaginationCountries />
      <ButtonScrollTop />
    </>
  );
}