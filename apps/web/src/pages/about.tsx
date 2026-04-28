import MainLayout from "../layouts/MainLayout";
import { BookOpen, Users, Clock, Award, Heart, Shield } from "lucide-react";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="space-y-16">
        <section className="rounded-[32px] bg-gradient-to-r from-primary/10 via-white to-accent/10 p-12 md:p-16 shadow-sm shadow-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              BiblioSys: gestión bibliotecaria sin complicaciones
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Una biblioteca digital pensada para lectores y administradores
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Accede a libros, gestiona préstamos y reserva títulos de forma
              segura y sencilla desde cualquier dispositivo.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <BookOpen className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                Acceso universal
              </h2>
              <p className="text-gray-600 leading-7">
                Libros disponibles siempre, con una plataforma rápida y usable
                que acompaña tanto a estudiantes como a bibliotecarios.
              </p>
            </article>

            <article className="rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                <Users className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                Comunidad inteligente
              </h2>
              <p className="text-gray-600 leading-7">
                Conecta lectores, gestiona reservas y muestra información clara
                para que cada usuario encuentre lo que necesita.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900">
                ¿Por qué elegir BiblioSys?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-600">
                Una solución diseñada para simplificar la gestión de tu
                biblioteca, desde las reservas hasta los reportes
                administrativos.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Acceso 24/7
                </h3>
                <p className="text-gray-600 leading-7">
                  Consulta el catálogo y tus préstamos en cualquier momento.
                </p>
              </article>
              <article className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Seguro y confiable
                </h3>
                <p className="text-gray-600 leading-7">
                  Protección de datos y permisos claros para cada usuario.
                </p>
              </article>
              <article className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Fácil de usar
                </h3>
                <p className="text-gray-600 leading-7">
                  Una experiencia clara para cualquier perfil de usuario.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">10,000+</p>
              <p className="mt-3 text-sm text-gray-500">Libros en catálogo</p>
            </div>
            <div className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">2,500+</p>
              <p className="mt-3 text-sm text-gray-500">Usuarios activos</p>
            </div>
            <div className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">50,000+</p>
              <p className="mt-3 text-sm text-gray-500">Préstamos realizados</p>
            </div>
            <div className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="mt-3 text-sm text-gray-500">Satisfacción</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">
                Equipo de Desarrollo
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Construimos una experiencia de biblioteca digital robusta y
                agradable.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">
                Bibliotecarios
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Organizamos libros y trazamos caminos de lectura efectivos.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">
                Soporte Técnico
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Resolvemos dudas y aseguramos una experiencia sin fricciones.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-primary text-primary-foreground p-12 shadow-sm shadow-primary/10">
          <div className="text-center">
            <h2 className="text-3xl font-bold">¿Tienes alguna pregunta?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-primary-foreground/90">
              Estamos listos para ayudarte con cualquier consulta sobre
              BiblioSys.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:contacto@bibliosys.com"
                className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-8 py-3 text-sm font-semibold text-primary transition hover:bg-white hover:text-primary shadow-lg"
              >
                contacto@bibliosys.com
              </a>
              <a
                href="tel:+54123456789"
                className="inline-flex items-center justify-center rounded-full border border-primary-foreground px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                +54 123 456 789
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
