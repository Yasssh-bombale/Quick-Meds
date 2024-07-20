import { UserNameAndDp_Type } from "@/pages/OwnerConversation";

type Props = {
  profile: string;
  userName: string;
  message: string;
  userId: string;
  setClickedUserId: React.Dispatch<React.SetStateAction<string>>;
  setClickedUserAndDp: React.Dispatch<React.SetStateAction<UserNameAndDp_Type>>;
};

const LeftUsers = ({
  profile,
  userName,
  message,
  setClickedUserId,
  userId,
  setClickedUserAndDp,
}: Props) => {
  const clickHandler = () => {
    setClickedUserId(userId);
    setClickedUserAndDp({
      userName: userName,
      userProfile: profile,
    });
  };

  return (
    <li
      onClick={clickHandler}
      className="border flex items-center gap-3 p-1 rounded-md cursor-pointer"
    >
      <img
        src={profile}
        alt="dp"
        className="w-8 h-8 object-cover border rounded-full"
      />
      <div className="flex flex-col">
        <h1 className="text-lg">{userName}</h1>
        <p className="line-clamp-1 text-zinc-500 font-light text-sm">
          {message}
        </p>
      </div>
    </li>
  );
};

export default LeftUsers;
