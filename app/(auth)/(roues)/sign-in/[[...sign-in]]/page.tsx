import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "bg-white/80",
          cardBox: "rounded-3xl",
          formButtonPrimary: "bg-lightblue/80 shadow-none rounded-xl",
          socialButtonsBlockButton: "rounded-xl",
          formFieldInput: "rounded-xl",
        },
      }}
    />
  );
}
