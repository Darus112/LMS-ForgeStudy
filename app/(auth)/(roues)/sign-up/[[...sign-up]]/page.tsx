import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          cardBox: "rounded-3xl",
          formButtonPrimary: "bg-lightblue/80 shadow-none rounded-xl",
          socialButtonsBlockButton: "rounded-xl",
          formFieldInput: "rounded-xl",
        },
      }}
    />
  );
}
