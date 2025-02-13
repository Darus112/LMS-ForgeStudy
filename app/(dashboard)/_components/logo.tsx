import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative w-[100px]  ">
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
