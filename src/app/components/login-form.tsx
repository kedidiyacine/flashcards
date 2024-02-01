import googleLogo from "@/../public/assets/icons/google-logo.svg";

import Image from "next/image";

import { signIn } from "@/server/auth";
import { googleProvider } from "../lib/utils";
import { Button } from "./ui/button";

export default function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(googleProvider.id);
      }}
    >
      <Button
        className="bg-green text-md flex w-[19rem] items-center
          gap-x-3 border-[1px] border-gray-400 px-2 py-6
           hover:bg-gray-100"
      >
        <Image src={googleLogo as string} alt="Google logo" />
        <span>Continue with {googleProvider.name}</span>
      </Button>
    </form>
  );
}
