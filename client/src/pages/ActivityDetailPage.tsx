import ActivityDetail from "../components/ActivityDetail";
import GetActivityDetail from "../functions/GetActivityDetail";

export default function ActivityDetailPage() {
  GetActivityDetail();
  return (
    <>
      <ActivityDetail />
    </>
  );
}