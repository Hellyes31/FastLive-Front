"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-zinc-200 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-semibold italic tracking-tight text-zinc-900">
            Fast<span className="text-emerald-500">Live</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Lance ton live, simplement.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <span className="h-px w-24 bg-emerald-500/70" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Nom d’utilisateur"
            value={form.username}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-400 text-zinc-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-400 text-zinc-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-400 text-zinc-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={form.confirmPassword}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-zinc-400 text-zinc-500"
          />
          <button
            type="submit"
            className="mt-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition"
          >
            Créer mon compte
          </button>
        </form>
      </div>
    </main>
  );
}
