"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function AccountPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.userId);
      setForm({
        username: parsedUser.username || "",
        email: parsedUser.email || "",
        password: "",
        confirmPassword: "",
      });
    } else {
      router.push("/login");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      router.push("/streamPage");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification du compte");
    }

    console.log("Modification du compte :", form);

    alert("Profil mis à jour avec succès !");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-zinc-200 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-semibold italic tracking-tight text-zinc-900">
            Fast<span className="text-emerald-500">Live</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">Modifier mon compte</p>
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
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       placeholder-zinc-400 text-zinc-700"
          />

          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       placeholder-zinc-400 text-zinc-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Nouveau mot de passe (optionnel)"
            value={form.password}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       placeholder-zinc-400 text-zinc-700"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le nouveau mot de passe"
            value={form.confirmPassword}
            onChange={handleChange}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       placeholder-zinc-400 text-zinc-700"
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold
                       text-white hover:bg-emerald-600 transition"
          >
            Enregistrer les modifications
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          <button
            onClick={() => router.back()}
            className="text-emerald-600 hover:underline font-medium"
          >
            ← Retour
          </button>
        </p>
      </div>
    </main>
  );
}
