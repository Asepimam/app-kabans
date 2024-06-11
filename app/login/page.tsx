import { LoginForm } from "@/components/LoginForm";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-slate-700">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
