import ViewLogin from "../components/ViewLogin";
import AccessTrue from "../functions/AccessTrue";

export default function SignInPage() {
  AccessTrue();
  return (
    <>
      <ViewLogin />
    </>
  );
}