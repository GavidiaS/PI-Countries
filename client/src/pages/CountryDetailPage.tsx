import CountryDetail from "../components/CountryDetail";
import GetCountryDetail from "../functions/GetCountryDetail";

export default function CountryDetailPage() {
  GetCountryDetail();
  return (
    <>
      <CountryDetail />
    </>
  );
}