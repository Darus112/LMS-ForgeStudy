import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative w-[100px] p-3 bg-white rounded-3xl shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
      <Image
        height={100}
        width={100}
        alt="logo"
        src="/logo.svg"
        className="rounded-none object-contain"
      />
    </div>
  );
};
