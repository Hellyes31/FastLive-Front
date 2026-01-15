"use client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account");
    };

  
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h2 className="text-3xl font-bold">
        Bienvenue sur FastLive 
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <button
            type="submit"
            className="mt-2 rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 transition"
          >
            Modifier le compte
          </button>
        </form>
    </main>
  );
}
