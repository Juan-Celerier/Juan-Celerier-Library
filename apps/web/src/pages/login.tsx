import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";
import { useNotifications } from "../application/hooks/useNotifications";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotifications();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "El email es requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Ingresa un email válido";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) return "La contraseña es requerida";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";
    return "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validación en tiempo real
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    // Limpiar error del servidor cuando el usuario empiece a escribir
    if (serverError) setServerError(null);
  };

  const isFormValid = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    return (
      !emailError &&
      !passwordError &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== ""
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await login(formData.email, formData.password);
      if (!res.ok) {
        setServerError(res.message || "Error de autenticación");
      } else {
        showNotification("Sesión iniciada correctamente", "success");
        navigate("/");
      }
    } catch (error) {
      setServerError("Error inesperado. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Iniciar sesión
        </h2>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{serverError}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300"
              }`}
              type="email"
              placeholder="tu@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.password
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300"
              }`}
              type="password"
              placeholder="Tu contraseña"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          className={`w-full mt-6 py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting || !isFormValid()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
          type="submit"
          disabled={isSubmitting || !isFormValid()}
        >
          {isSubmitting ? "Iniciando sesión..." : "Entrar"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
