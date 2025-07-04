import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function AuthPage() {
  const handleAuth = async (formData: FormData) => {
    "use server";
    const supabase = await createSupabaseServerClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const isSignUp = formData.get("isSignUp") === "true";

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Sign up error:", error.message);
        return redirect(`/auth?error=${error.message}`);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Sign in error:", error.message);
        return redirect(`/auth?error=${error.message}`);
      }
    }
    return redirect("/");
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-4">
      <form
        action={handleAuth}
        className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold">Sign In or Sign Up</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          name="isSignUp"
          value="false"
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign In
        </button>
        <button
          type="submit"
          name="isSignUp"
          value="true"
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
