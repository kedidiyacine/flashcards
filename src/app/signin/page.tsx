import FlashLogo from "../components/flash-logo";
import LoginForm from "../components/login-form";

export default async function SignIn() {
  return (
    <div className="flex flex-col items-center space-y-72 py-4">
      <FlashLogo />
      <div className="flex h-[60%] flex-col justify-center gap-y-12">
        <h1
          className={`text-center text-[1.9rem] font-semibold leading-10 tracking-wide`}
        >
          Welcome Back
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
