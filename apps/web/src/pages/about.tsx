import MainLayout from "../layouts/MainLayout";
import { BookOpen, Users, Clock, Award, Heart, Shield } from "lucide-react";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="space-y-3xl">
        {/* Hero Section */}
        <section className="text-center py-3xl bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
          <div className="max-w-4xl mx-auto px-lg">
            <h1 className="text-display-lg font-bold text-neutral-900 mb-lg">
              Sobre <span className="text-primary">BiblioSys</span>
            </h1>
            <p className="text-heading-md text-neutral-600 leading-relaxed">
              Tu biblioteca digital inteligente. Gestionamos miles de libros
              para que tú te enfoques en lo que realmente importa: leer,
              aprender y disfrutar del conocimiento.
            </p>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-lg text-gray-600">
              Democratizar el acceso al conocimiento y facilitar la gestión
              bibliotecaria en la era digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-xl">
            <div className="bg-white px-lg py-lg rounded-lg shadow-subtle border border-neutral-200">
              <BookOpen className="h-3xl w-3xl text-primary mb-lg" />
              <h3 className="text-heading-md font-semibold text-neutral-900 mb-md">
                Acceso Universal
              </h3>
              <p className="text-gray-600">
                Creemos que el conocimiento debe estar al alcance de todos.
                Nuestra plataforma permite acceder a miles de libros desde
                cualquier lugar y dispositivo.
              </p>
            </div>

            <div className="bg-white px-lg py-lg rounded-lg shadow-subtle border border-neutral-200">
              <Users className="h-3xl w-3xl text-primary mb-lg" />
              <h3 className="text-heading-md font-semibold text-neutral-900 mb-md">
                Comunidad
              </h3>
              <p className="text-gray-600">
                Fomentamos una comunidad de lectores apasionados, conectando a
                personas con intereses similares a través de nuestros recursos.
              </p>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="bg-neutral-50 py-3xl">
          <div className="max-w-6xl mx-auto px-lg">
            <div className="text-center mb-2xl">
              <h2 className="text-heading-lg font-bold text-neutral-900 mb-md">
                ¿Por qué elegir BiblioSys?
              </h2>
              <p className="text-body-lg text-neutral-600">
                Tecnología de vanguardia para una experiencia bibliotecaria
                excepcional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-xl">
              <div className="text-center">
                <Clock className="h-4xl w-4xl text-primary mx-auto mb-lg" />
                <h3 className="text-heading-md font-semibold text-neutral-900 mb-md">
                  Acceso 24/7
                </h3>
                <p className="text-body-md text-neutral-600">
                  Tu biblioteca nunca duerme. Accede a tus libros favoritos en
                  cualquier momento del día.
                </p>
              </div>

              <div className="text-center">
                <Shield className="h-4xl w-4xl text-primary mx-auto mb-lg" />
                <h3 className="text-heading-md font-semibold text-neutral-900 mb-md">
                  Seguro y Confiable
                </h3>
                <p className="text-body-md text-neutral-600">
                  Tus datos están protegidos con los más altos estándares de
                  seguridad y privacidad.
                </p>
              </div>

              <div className="text-center">
                <Heart className="h-4xl w-4xl text-primary mx-auto mb-lg" />
                <h3 className="text-heading-md font-semibold text-neutral-900 mb-md">
                  Fácil de Usar
                </h3>
                <p className="text-body-md text-neutral-600">
                  Interfaz intuitiva diseñada pensando en la experiencia del
                  usuario para todos los niveles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="max-w-4xl mx-auto px-lg">
          <div className="text-center mb-2xl">
            <h2 className="text-heading-lg font-bold text-neutral-900 mb-md">
              Nuestros Números
            </h2>
            <p className="text-body-lg text-neutral-600">
              El impacto que hemos generado en la comunidad lectora
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-xl">
            <div className="text-center">
              <div className="text-heading-lg font-bold text-primary mb-md">
                10,000+
              </div>
              <div className="text-body-md text-neutral-600">
                Libros en catálogo
              </div>
            </div>
            <div className="text-center">
              <div className="text-heading-lg font-bold text-primary mb-md">
                2,500+
              </div>
              <div className="text-body-md text-neutral-600">
                Usuarios activos
              </div>
            </div>
            <div className="text-center">
              <div className="text-heading-lg font-bold text-primary mb-md">
                50,000+
              </div>
              <div className="text-body-md text-neutral-600">
                Préstamos realizados
              </div>
            </div>
            <div className="text-center">
              <div className="text-heading-lg font-bold text-primary mb-md">
                98%
              </div>
              <div className="text-body-md text-neutral-600">Satisfacción</div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="bg-white py-3xl">
          <div className="max-w-4xl mx-auto px-lg">
            <div className="text-center mb-2xl">
              <h2 className="text-heading-lg font-bold text-neutral-900 mb-md">
                Nuestro Equipo
              </h2>
              <p className="text-body-lg text-neutral-600">
                Personas apasionadas por la tecnología y el conocimiento
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-xl">
              <div className="text-center">
                <div className="h-3xl w-3xl bg-primary/10 rounded-full mx-auto mb-lg flex items-center justify-center">
                  <Users className="h-2xl w-2xl text-primary" />
                </div>
                <h3 className="text-heading-md font-semibold text-neutral-900 mb-sm">
                  Equipo de Desarrollo
                </h3>
                <p className="text-body-sm text-neutral-600">
                  Ingenieros apasionados por crear soluciones innovadoras
                </p>
              </div>

              <div className="text-center">
                <div className="h-3xl w-3xl bg-accent/10 rounded-full mx-auto mb-lg flex items-center justify-center">
                  <BookOpen className="h-2xl w-2xl text-accent" />
                </div>
                <h3 className="text-heading-md font-semibold text-neutral-900 mb-sm">
                  Bibliotecarios
                </h3>
                <p className="text-body-sm text-neutral-600">
                  Expertos en gestión del conocimiento y catalogación
                </p>
              </div>

              <div className="text-center">
                <div className="h-3xl w-3xl bg-secondary/10 rounded-full mx-auto mb-lg flex items-center justify-center">
                  <Award className="h-2xl w-2xl text-secondary" />
                </div>
                <h3 className="text-heading-md font-semibold text-neutral-900 mb-sm">
                  Soporte Técnico
                </h3>
                <p className="text-body-sm text-neutral-600">
                  Equipo dedicado a garantizar la mejor experiencia
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="bg-primary text-primary-foreground py-3xl">
          <div className="max-w-4xl mx-auto px-lg text-center">
            <h2 className="text-heading-lg font-bold mb-md">
              ¿Tienes Preguntas?
            </h2>
            <p className="text-body-lg mb-xl text-primary-foreground/90">
              Estamos aquí para ayudarte. Contáctanos para cualquier consulta
              sobre nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-lg justify-center">
              <a
                href="mailto:contacto@bibliosys.com"
                className="bg-primary-foreground text-primary px-lg py-sm rounded-base font-medium hover:bg-neutral-100 transition-all duration-200 shadow-subtle hover:shadow-medium"
              >
                contacto@bibliosys.com
              </a>
              <a
                href="tel:+54123456789"
                className="border border-primary-foreground text-primary-foreground px-lg py-sm rounded-base font-medium hover:bg-primary/90 transition-all duration-200"
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
