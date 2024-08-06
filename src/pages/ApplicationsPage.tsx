import { useGetApplications } from "@/api/admin.apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

const ApplicationsPage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { data } = useGetApplications(userId);
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-gray-50 rounded-xl min-h-screen">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        Pending Applications ({data?.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((store) => (
          <div
            key={store._id}
            className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => {
              navigate(`/applications/${store._id}`);
            }}
          >
            <div className="relative">
              <img
                src={store.imageUrl}
                alt="storeImage"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                New
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl uppercase font-semibold text-gray-900 mb-2 line-clamp-1">
                {store.storeName}
              </h2>
              <div className="flex gap-4 border">
                <img
                  src={store.license}
                  alt="license"
                  className="w-24 h-24 object-cover rounded-lg border flex-1 border-gray-200"
                />
                <img
                  src={store.ownerLivePicture}
                  alt="ownerLivePicture"
                  className="w-24 h-24 object-cover rounded-lg border flex-1 border-gray-200"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
