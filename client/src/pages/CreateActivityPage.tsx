import ViewCreate from "../components/ViewCreate";
import AccessFalse from "../functions/AccessFalse";

export default function CreateActivityPage() {
  AccessFalse();
  return (
    <>
      <ViewCreate />
    </>
  );
}