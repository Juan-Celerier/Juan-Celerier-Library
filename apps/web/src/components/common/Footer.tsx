import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  Phone,
} from "lucide-react";
import Logo from "./Logo";

export const Footer = ({ className = "" }: { className?: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-white border-t border-neutral-100 pt-12 pb-8 ${className}`}
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Grilla Principal con menos gap vertical */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 mb-10">
          {/* Branding: Más compacto */}
          <div className="md:col-span-4">
            <Logo className="mb-4 scale-90 origin-left" />
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Tu puerta al conocimiento digital. Gestiona préstamos y descubre
              lecturas de forma inteligente.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <ContactItem
                icon={<Mail size={14} />}
                text="contacto@bibliosys.com"
              />
              <ContactItem icon={<Phone size={14} />} text="+54 123 456 789" />
            </div>
          </div>

          {/* Links: Agrupados para ocupar menos espacio */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">
              Explorar
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/books">Catálogo</FooterLink>
              <FooterLink to="/about">Nosotros</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">
              Cuenta
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/my/loans">Préstamos</FooterLink>
              <FooterLink to="/my/reservations">Reservas</FooterLink>
            </ul>
          </div>

          {/* Social y Badge en una sola columna compacta */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end">
            <h3 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">
              Síguenos
            </h3>
            <div className="flex gap-3 mb-6">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tight">
                Sistema Operativo 2026
              </span>
            </div>
          </div>
        </div>

        {/* Copyright simplificado en una línea */}
        <div className="pt-6 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-neutral-400">
          <p>
            © {currentYear}{" "}
            <span className="text-neutral-900 font-bold">BiblioSys</span>. Todos
            los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-900 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium">
    {icon} <span>{text}</span>
  </div>
);

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      to={to}
      className="text-xs font-bold text-neutral-500 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    className="h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
