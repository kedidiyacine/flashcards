import { lusitana } from "./fonts";

export default function FlashLogo() {
  return (
    <div className={`${lusitana.className} leading-none`}>
      <p className="rounded-full px-4 py-2 text-[1.9rem] opacity-80 shadow-sm shadow-black">
        Flash
      </p>
    </div>
  );
}
