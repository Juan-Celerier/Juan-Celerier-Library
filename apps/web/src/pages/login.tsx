import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";
import { useNotifications } from "../application/hooks/useNotifications";
import { ErrorAlert } from "../components/ui/Alert";

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
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-md py-lg">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md px-lg py-2xl bg-white rounded-lg shadow-medium border border-neutral-200"
      >
        <h2 className="text-heading-md font-bold mb-lg text-center text-neutral-900">
          Iniciar sesión
        </h2>

        {serverError && (
          <ErrorAlert
            title="Error de inicio de sesión"
            message={serverError}
            onDismiss={() => setServerError(null)}
            className="mb-lg"
          />
        )}

        <div className="space-y-lg">
          <div>
            <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-md py-sm border rounded-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-body-sm ${
                errors.email
                  ? "border-error focus:border-error focus:ring-error/50"
                  : "border-neutral-300 focus:border-primary"
              }`}
              type="email"
              placeholder="tu@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-xs text-body-sm text-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
              Contraseña
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-md py-sm border rounded-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-body-sm ${
                errors.password
                  ? "border-error focus:border-error focus:ring-error/50"
                  : "border-neutral-300 focus:border-primary"
              }`}
              type="password"
              placeholder="Tu contraseña"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-xs text-body-sm text-error">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          className={`w-full mt-xl py-sm px-lg rounded-base font-medium transition-all duration-200 text-body-sm ${
            isSubmitting || !isFormValid()
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle hover:shadow-medium"
          }`}
          type="submit"
          disabled={isSubmitting || !isFormValid()}
        >
          {isSubmitting ? "Iniciando sesión..." : "Entrar"}
        </button>

        <div className="mt-xl text-center">
          <p className="text-body-sm text-neutral-600">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 hover:underline"
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
