import { useGetApplications } from "@/api/admin.apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";

const ApplicationsPage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { data } = useGetApplications(userId);
  console.log(data);

  return <div className="border ">ApplicationsPage</div>;
};

export default ApplicationsPage;
