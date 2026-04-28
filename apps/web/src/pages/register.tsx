import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";
import {
  User,
  Mail,
  Lock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await register({ name, surname, email, password });
      if (!res.ok) setError(res.message || "Error al crear la cuenta");
      else navigate("/", { state: { toast: "¡Bienvenido a BiblioSys!" } });
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white lg:bg-neutral-50 p-6">
      <div className="w-full max-w-5xl rounded-[2.5rem] bg-white shadow-2xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* PANEL IZQUIERDO: Bienvenida */}
        <section className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-primary/10 via-sky-50 to-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              Nuevos horizontes
            </div>
            <h1 className="text-5xl font-black text-neutral-900 leading-tight">
              Crea tu cuenta y{" "}
              <span className="text-primary italic">descubre</span>.
            </h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed max-w-sm">
              Únete a nuestra comunidad y organiza tu vida literaria desde un
              solo lugar inteligente.
            </p>
          </div>

          <div className="mt-12 space-y-4 relative">
            <BenefitItem text="Acceso instantáneo a todo el catálogo" />
            <BenefitItem text="Historial inteligente de lecturas" />
            <BenefitItem text="Recomendaciones personalizadas" />
          </div>
        </section>

        {/* PANEL DERECHO: Formulario */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="w-full mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                Regístrate
              </h2>
              <p className="text-neutral-400 text-sm mt-2 font-medium">
                Es gratis y solo toma un minuto
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Grid Nombre y Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    Nombre
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Juan"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    Apellido
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                    <input
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Pérez"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-4 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none"
              >
                {isSubmitting ? "Creando cuenta..." : "Comenzar ahora"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-neutral-400">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-primary font-black hover:underline underline-offset-4"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
      <CheckCircle2 className="h-4 w-4 text-primary" />
    </div>
    <span className="text-sm font-bold text-neutral-700">{text}</span>
  </div>
);

export default RegisterPage;
