import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center">
      {" "}
      <Image
        src="/bg4.png"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        unoptimized={true}
        priority={true}
      />
      {children}
    </div>
  );
};

export default AuthLayout;
