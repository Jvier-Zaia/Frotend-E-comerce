import { Layout } from "../components/Layout"
import "../styles/pages/AboutUs.css"

const AboutUs = () => {
  return (
    <Layout>
      <div className="about-wrapper">
        <div className="about-container">
          
          {/* Hero Section */}
          <section className="about-hero">
            <div className="hero-content">
              <h1 className="hero-title">Sobre Nosotros</h1>
              <p className="hero-subtitle">
                Conoce más sobre nuestro proyecto y la tecnología detrás de nuestra tienda online
              </p>
            </div>
          </section>

          {/* Main Content */}
          <main className="about-content">
            
            {/* Sección 1: De qué trata el proyecto */}
            <section className="about-section">
              <div className="section-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="section-content">
                <h2 className="section-title">¿De qué trata nuestro proyecto?</h2>
                <div className="section-text">
                  <p>
                    Nuestro proyecto es una <strong>tienda online moderna y funcional</strong> que permite 
                    a los usuarios explorar, buscar y gestionar productos de manera intuitiva y eficiente.
                  </p>
                  <p>
                    El sistema cuenta con dos tipos de usuarios: <strong>visitantes</strong> que pueden 
                    navegar y explorar el catálogo de productos, y <strong>administradores</strong> que 
                    tienen la capacidad de gestionar el inventario completo.
                  </p>
                  <div className="features-list">
                    <div className="feature-item">
                      <i className="fas fa-search"></i>
                      <span>Sistema de búsqueda y filtrado avanzado</span>
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-mobile-alt"></i>
                      <span>Diseño responsive y moderno</span>
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-cogs"></i>
                      <span>Panel de administración completo</span>
                    </div>
                    <div className="feature-item">
                      <i className="fas fa-shield-alt"></i>
                      <span>Sistema de autenticación seguro</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 2: A quién está dirigido */}
            <section className="about-section">
              <div className="section-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="section-content">
                <h2 className="section-title">¿A quién está dirigido?</h2>
                <div className="section-text">
                  <p>
                    Este proyecto está diseñado para satisfacer las necesidades de diferentes tipos de usuarios:
                  </p>
                  
                  <div className="target-audience">
                    <div className="audience-card">
                      <div className="audience-icon">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <h3>Compradores Online</h3>
                      <p>
                        Usuarios que buscan una experiencia de compra fluida, con herramientas 
                        de búsqueda potentes y una interfaz intuitiva para encontrar productos fácilmente.
                      </p>
                    </div>
                    
                    <div className="audience-card">
                      <div className="audience-icon">
                        <i className="fas fa-store"></i>
                      </div>
                      <h3>Administradores de Tienda</h3>
                      <p>
                        Gestores que necesitan una plataforma robusta para administrar inventarios, 
                        editar productos y mantener actualizado el catálogo de manera eficiente.
                      </p>
                    </div>
                    
                    <div className="audience-card">
                      <div className="audience-icon">
                        <i className="fas fa-code"></i>
                      </div>
                      <h3>Desarrolladores</h3>
                      <p>
                        Profesionales que buscan un ejemplo de implementación de e-commerce 
                        con tecnologías modernas y buenas prácticas de desarrollo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 3: Tecnologías utilizadas */}
            <section className="about-section">
              <div className="section-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <div className="section-content">
                <h2 className="section-title">Tecnologías y enfoques utilizados</h2>
                <div className="section-text">
                  <p>
                    Nuestro proyecto utiliza un stack tecnológico moderno y probado para 
                    garantizar rendimiento, escalabilidad y mantenibilidad:
                  </p>
                  
                  <div className="tech-stack">
                    <div className="tech-category">
                      <h4 className="tech-category-title">
                        <i className="fab fa-react"></i>
                        Frontend
                      </h4>
                      <div className="tech-items">
                        <span className="tech-item">React 18</span>
                        <span className="tech-item">React Router</span>
                        <span className="tech-item">Context API</span>
                        <span className="tech-item">CSS3 Moderno</span>
                        <span className="tech-item">Font Awesome</span>
                      </div>
                    </div>
                    
                    <div className="tech-category">
                      <h4 className="tech-category-title">
                        <i className="fas fa-server"></i>
                        Backend & API
                      </h4>
                      <div className="tech-items">
                        <span className="tech-item">Fake Store API</span>
                        <span className="tech-item">REST API</span>
                        <span className="tech-item">JSON</span>
                        <span className="tech-item">HTTP Methods</span>
                      </div>
                    </div>
                    
                    <div className="tech-category">
                      <h4 className="tech-category-title">
                        <i className="fas fa-tools"></i>
                        Herramientas
                      </h4>
                      <div className="tech-items">
                        <span className="tech-item">Vite</span>
                        <span className="tech-item">JavaScript ES6+</span>
                        <span className="tech-item">Git</span>
                        <span className="tech-item">NPM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="approach-section">
                    <h4>Enfoques de desarrollo:</h4>
                    <div className="approach-list">
                      <div className="approach-item">
                        <i className="fas fa-mobile-alt"></i>
                        <div>
                          <strong>Mobile First</strong>
                          <p>Diseño responsive que prioriza la experiencia móvil</p>
                        </div>
                      </div>
                      <div className="approach-item">
                        <i className="fas fa-puzzle-piece"></i>
                        <div>
                          <strong>Componentes Reutilizables</strong>
                          <p>Arquitectura modular para facilitar el mantenimiento</p>
                        </div>
                      </div>
                      <div className="approach-item">
                        <i className="fas fa-user-shield"></i>
                        <div>
                          <strong>Seguridad</strong>
                          <p>Implementación de rutas protegidas y autenticación</p>
                        </div>
                      </div>
                      <div className="approach-item">
                        <i className="fas fa-rocket"></i>
                        <div>
                          <strong>Optimización</strong>
                          <p>Código eficiente y carga rápida de la aplicación</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
              <div className="cta-content">
                <h3 className="cta-title">¿Listo para explorar?</h3>
                <p className="cta-text">
                  Descubre todos los productos disponibles en nuestra tienda
                </p>
                <a href="/" className="cta-button">
                  <i className="fas fa-arrow-left"></i>
                  Volver a la tienda
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </Layout>
  )
}

export { AboutUs }