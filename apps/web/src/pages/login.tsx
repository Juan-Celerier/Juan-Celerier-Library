import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (!res.ok) setError(res.message || "Error de autenticación");
    else navigate("/", { state: { toast: "Sesión iniciada correctamente" } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2"
            type="email"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Contraseña</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2"
            type="password"
            required
          />
        </label>

        <button
          className="w-full bg-emerald-600 text-white py-2 rounded"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
