import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await register({ name, surname, email, password });
    if (!res.ok) setError(res.message || "Error al registrar");
    else navigate("/", { state: { toast: "Cuenta creada correctamente" } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-md py-lg">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md px-lg py-2xl bg-white rounded-lg shadow-medium border border-neutral-200"
      >
        <h2 className="text-heading-md font-bold mb-xl text-center text-neutral-900">
          Registrarse
        </h2>
        {error && (
          <div className="mb-lg px-md py-md bg-error/10 border border-error/30 rounded-base text-error text-body-sm">
            {error}
          </div>
        )}

        <div className="space-y-lg">
          <label className="block">
            <span className="text-body-sm font-medium text-neutral-900 mb-sm block">
              Nombre
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-xs block w-full rounded-base border border-neutral-300 px-md py-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            />
          </label>

          <label className="block">
            <span className="text-body-sm font-medium text-neutral-900 mb-sm block">
              Apellido
            </span>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="mt-xs block w-full rounded-base border border-neutral-300 px-md py-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            />
          </label>

          <label className="block">
            <span className="text-body-sm font-medium text-neutral-900 mb-sm block">
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-xs block w-full rounded-base border border-neutral-300 px-md py-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              type="email"
              required
            />
          </label>

          <label className="block">
            <span className="text-body-sm font-medium text-neutral-900 mb-sm block">
              Contraseña
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-xs block w-full rounded-base border border-neutral-300 px-md py-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              type="password"
              required
            />
          </label>
        </div>

        <button
          className="w-full mt-xl bg-primary text-primary-foreground py-sm px-lg rounded-base font-medium transition-all duration-200 shadow-subtle hover:shadow-medium hover:bg-primary/90 text-body-sm"
          type="submit"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
