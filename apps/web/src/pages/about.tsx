import MainLayout from "../layouts/MainLayout";
import { BookOpen, Users, Clock, Award, Heart, Shield } from "lucide-react";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre <span className="text-emerald-600">BiblioSys</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tu biblioteca digital inteligente. Gestionamos miles de libros para que tú te enfoques
              en lo que realmente importa: leer, aprender y disfrutar del conocimiento.
            </p>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
            <p className="text-lg text-gray-600">
              Democratizar el acceso al conocimiento y facilitar la gestión bibliotecaria
              en la era digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <BookOpen className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceso Universal</h3>
              <p className="text-gray-600">
                Creemos que el conocimiento debe estar al alcance de todos.
                Nuestra plataforma permite acceder a miles de libros desde cualquier lugar y dispositivo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <Users className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Fomentamos una comunidad de lectores apasionados, conectando a
                personas con intereses similares a través de nuestros recursos.
              </p>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir BiblioSys?</h2>
              <p className="text-lg text-gray-600">
                Tecnología de vanguardia para una experiencia bibliotecaria excepcional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceso 24/7</h3>
                <p className="text-gray-600">
                  Tu biblioteca nunca duerme. Accede a tus libros favoritos
                  en cualquier momento del día.
                </p>
              </div>

              <div className="text-center">
                <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Seguro y Confiable</h3>
                <p className="text-gray-600">
                  Tus datos están protegidos con los más altos estándares de seguridad
                  y privacidad.
                </p>
              </div>

              <div className="text-center">
                <Heart className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fácil de Usar</h3>
                <p className="text-gray-600">
                  Interfaz intuitiva diseñada pensando en la experiencia del usuario
                  para todos los niveles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Números</h2>
            <p className="text-lg text-gray-600">
              El impacto que hemos generado en la comunidad lectora
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600">Libros en catálogo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2,500+</div>
              <div className="text-gray-600">Usuarios activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">50,000+</div>
              <div className="text-gray-600">Préstamos realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfacción</div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
              <p className="text-lg text-gray-600">
                Personas apasionadas por la tecnología y el conocimiento
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Equipo de Desarrollo</h3>
                <p className="text-gray-600 text-sm">
                  Ingenieros apasionados por crear soluciones innovadoras
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bibliotecarios</h3>
                <p className="text-gray-600 text-sm">
                  Expertos en gestión del conocimiento y catalogación
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Soporte Técnico</h3>
                <p className="text-gray-600 text-sm">
                  Equipo dedicado a garantizar la mejor experiencia
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="bg-emerald-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Tienes Preguntas?</h2>
            <p className="text-xl mb-8 text-emerald-100">
              Estamos aquí para ayudarte. Contáctanos para cualquier consulta
              sobre nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contacto@bibliosys.com"
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                contacto@bibliosys.com
              </a>
              <a
                href="tel:+54123456789"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
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
