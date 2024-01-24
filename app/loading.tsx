import { Introduction } from "@/components/introduction/Introduction";

export default function Loading() {
  return (
    <div className="w-[100svw] h-[100svh] flex justify-center items-center">
      <i className="fa-solid fa-spinner-scale text-6xl animate-spin text-[red]"></i>
    </div>
  );
}
