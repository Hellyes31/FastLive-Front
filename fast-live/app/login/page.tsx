"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const data = await res.json();
      console.log("Login response:", data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.id,
          username: data.username,
          email: data.email,
        })
      );
      router.push("/streamPage");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion");
      return;
    }

    console.log(form);
  };

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200 shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-semibold italic tracking-tight text-zinc-900">
            Fast<span className="text-emerald-500">Live</span>
          </h1>

          <div className="mt-4 flex justify-center">
            <span className="h-[2px] w-16 bg-emerald-500 rounded-full" />
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            Connecte-toi à ton compte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Nom d’utilisateur"
            value={form.username}
            onChange={handleChange}
            required
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-400 text-zinc-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-400 text-zinc-500"
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Pas encore de compte ?{" "}
          <button
            onClick={() => router.push("/")}
            className="text-emerald-600 hover:underline font-medium"
          >
            Créer un compte
          </button>
        </p>
      </div>
    </main>
  );
}
