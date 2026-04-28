import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";
import { useNotifications } from "../application/hooks/useNotifications";

import { Mail, Lock, LogIn, CheckCircle2 } from "lucide-react"; // Añadimos iconos

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotifications();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ... (mantenemos tus funciones de validación igual)
  const validateEmail = (email: string) => {
    if (!email.trim()) return "El email es requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Ingresa un email válido";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) return "La contraseña es requerida";
    if (password.length < 6) return "Mínimo 6 caracteres";
    return "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error =
      name === "email" ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (serverError) setServerError(null);
  };

  const isFormValid = () =>
    !validateEmail(formData.email) && !validatePassword(formData.password);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await login(formData.email, formData.password);
      if (!res.ok) setServerError(res.message || "Credenciales incorrectas");
      else {
        showNotification("¡Bienvenido de nuevo!", "success");
        navigate("/");
      }
    } catch (error) {
      setServerError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white lg:bg-neutral-50 p-6">
      {/* Contenedor Principal con Bordes súper redondeados */}
      <div className="w-full max-w-5xl rounded-[2.5rem] bg-white shadow-2xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden lg:grid lg:grid-cols-2">
        {/* PANEL IZQUIERDO: Branding y Features */}
        <section className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-primary/10 via-primary/5 to-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <div className="relative">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              BiblioSys Cloud
            </span>
            <h1 className="mt-6 text-5xl font-black text-neutral-900 leading-tight">
              Tu próxima <span className="text-primary italic">aventura</span>{" "}
              comienza aquí.
            </h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed max-w-sm">
              Inicia sesión para gestionar tus préstamos y descubrir
              recomendaciones personalizadas.
            </p>
          </div>

          <div className="mt-12 space-y-4 relative">
            <FeatureItem text="Control total de préstamos" />
            <FeatureItem text="Reservas en tiempo real" />
            <FeatureItem text="Acceso a 1,200+ títulos" />
          </div>
        </section>

        {/* PANEL DERECHO: Formulario */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                Iniciar Sesión
              </h2>
              <p className="text-neutral-400 text-sm mt-2 font-medium">
                ¡Qué bueno verte de nuevo!
              </p>
            </div>

            {serverError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                {serverError}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 outline-none ${
                      errors.email
                        ? "border-rose-200 bg-rose-50/30"
                        : "border-neutral-100 bg-neutral-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-bold text-rose-500 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 outline-none ${
                      errors.password
                        ? "border-rose-200 bg-rose-50/30"
                        : "border-neutral-100 bg-neutral-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-[10px] font-bold text-rose-500 ml-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                  isSubmitting || !isFormValid()
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                    : "bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? "Autenticando..." : "Ingresar ahora"}
                {!isSubmitting && <LogIn size={18} />}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-neutral-400">
                ¿Aún no eres miembro?{" "}
                <Link
                  to="/register"
                  className="text-primary font-black hover:underline underline-offset-4"
                >
                  Crea tu cuenta gratis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las features
const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
      <CheckCircle2 className="h-4 w-4 text-primary" />
    </div>
    <span className="text-sm font-bold text-neutral-700">{text}</span>
  </div>
);

export default LoginPage;
