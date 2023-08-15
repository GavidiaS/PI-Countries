import ViewRegister from "../components/ViewRegister";
import AccessTrue from "../functions/AccessTrue";

export default function SignUpPage() {
  AccessTrue();
  return (
    <>
      <ViewRegister />
    </>
  );
}