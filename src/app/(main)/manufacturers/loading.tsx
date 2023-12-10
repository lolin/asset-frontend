import { Puff } from "react-loading-icons";

export default function Loading() {
  return (
    <div>
      <Puff
        stroke="#1C64F2"
        fill="#1C64F2"
        width={70}
        height={70}
        className="m-0 p-0 content-center w-full"
      />
    </div>
  );
}
