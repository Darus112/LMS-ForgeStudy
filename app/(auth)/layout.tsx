import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-white dark:bg-dark">
      {" "}
      <Image
        src="/bg4.png"
        fill
        style={{ objectFit: "cover" }}
        alt="Background"
      />
      ;{children}
    </div>
  );
};

export default AuthLayout;
