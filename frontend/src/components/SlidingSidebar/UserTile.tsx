import { User } from "../../store/UserStore/useBulkUsersStore";

export default function UserTile(user : User
) {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-neutral-500 rounded-xl font-semibold cursor-pointer">
      <div className="h-10 w-10 rounded-full overflow-hidden shadow-lg">
        <img
        className="object-cover"
          src="https://i.pinimg.com/736x/fd/82/61/fd8261b84d8528a287d8871c1a0fcc13.jpg"
          alt=""
        />
      </div>
      <div>
        <h1>{user.email}</h1>
      </div>
    </div>
  );
}