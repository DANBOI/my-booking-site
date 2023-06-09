import { PuffLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className=" flex_center h-screen flex-col">
      <PuffLoader size={100} color="#14b8a6" />
    </div>
  );
}
