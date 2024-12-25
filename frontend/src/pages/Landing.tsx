import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen bg-neutral-900">
      <nav>
        <ul className="flex justify-end p-4">
          <Link
            to={"/login"}
            replace
            className="text-white font-semibold cursor-pointer"
          >
            Login
          </Link>
        </ul>
      </nav>
      <h1 className="font-bold text-white text-4xl text-center pt-20">
        Chat App
      </h1>
    </div>
  );
}
