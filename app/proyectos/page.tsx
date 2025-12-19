import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ProyectosPage() {
  const proyectos = [
    {
      id: 1,
      nombre: "Tarjeta Digital Pili",
      tipo: "invitación",
      año: 2025,
      url: "https://tarjeta-digital-pili.vercel.app/",
      descripcion: "Tarjeta de cumpleaños digital personalizada"
    },
    {
      id: 2,
      nombre: "Landing Café Boutique",
      tipo: "landing",
      año: 2024,
      imagen: "/placeholder-project.jpg",
      descripcion: "Landing page minimalista para cafetería especializada"
    },
    {
      id: 3,
      nombre: "Invitación XV Sofía",
      tipo: "invitación",
      año: 2024,
      imagen: "/placeholder-project.jpg",
      descripcion: "Invitación digital interactiva con RSVP"
    },
    {
      id: 4,
      nombre: "Portfolio Fotógrafo",
      tipo: "web",
      año: 2024,
      imagen: "/placeholder-project.jpg",
      descripcion: "Sitio web completo con galería y blog"
    },
    {
      id: 5,
      nombre: "Landing Wellness",
      tipo: "landing",
      año: 2023,
      imagen: "/placeholder-project.jpg",
      descripcion: "Página de servicios de bienestar"
    },
    {
      id: 6,
      nombre: "Boda Ana & Carlos",
      tipo: "invitación",
      año: 2023,
      imagen: "/placeholder-project.jpg",
      descripcion: "Invitación elegante con contador regresivo"
    },
    {
      id: 7,
      nombre: "E-commerce Artesanías",
      tipo: "web",
      año: 2023,
      imagen: "/placeholder-project.jpg",
      descripcion: "Tienda online con carrito de compras"
    },
  ];

  const tipos = {
    landing: { color: "text-lavanda", bg: "bg-lavanda/10" },
    invitación: { color: "text-violeta", bg: "bg-violeta/10" },
    web: { color: "text-lavanda-dark", bg: "bg-lavanda-dark/10" }
  };

  return (
    <main className="min-h-screen bg-humo">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-oscuro mb-6">
              Proyectos
            </h1>
            <p className="text-xl text-oscuro/70">
              Una selección de trabajos recientes que reflejan nuestra filosofía de diseño minimalista y código limpio.
            </p>
          </div>
        </div>
      </section>

      {/* Grilla de Proyectos */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="group flex flex-col items-center"
              >
                {/* Mockup de Celular */}
                <div className="relative w-full max-w-[280px] mx-auto">
                  {/* Marco del celular */}
                  <div className="relative bg-gradient-to-br from-oscuro via-oscuro/90 to-oscuro rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-oscuro rounded-b-2xl z-10"></div>
                    
                    {/* Pantalla del celular */}
                    <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5] shadow-inner">
                      {/* Contenido de la pantalla */}
                      <div className="h-full overflow-hidden">
                        {/* Header de la app */}
                        <div className="bg-gradient-to-r from-lavanda to-violeta h-12 flex items-center justify-center">
                          <div className="w-20 h-1 bg-white/30 rounded-full"></div>
                        </div>
                        
                        {/* Preview del proyecto */}
                        <div className="h-full bg-gradient-to-br from-lavanda/10 to-violeta/10">
                          <div className="bg-white h-full flex items-center justify-center overflow-hidden">
                            {proyecto.url ? (
                              // Mostrar iframe si tiene URL
                              <iframe 
                                src={proyecto.url}
                                className="w-full h-full border-0"
                                title={proyecto.nombre}
                                loading="lazy"
                              />
                            ) : (
                              // Mostrar placeholder si no tiene URL
                              <div className="text-center p-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lavanda to-violeta mx-auto mb-3 flex items-center justify-center">
                                  <span className="text-2xl text-white">
                                    {proyecto.tipo === 'landing' ? '🎯' : 
                                     proyecto.tipo === 'invitación' ? '💌' : '🌐'}
                                  </span>
                                </div>
                                <div className="text-lavanda/40 text-xs mb-2">
                                  Vista previa
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botón lateral */}
                    <div className="absolute right-0 top-24 w-1 h-12 bg-oscuro/60 rounded-l"></div>
                  </div>
                </div>

                {/* Info del Proyecto */}
                <div className="mt-6 text-center max-w-[280px] w-full">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className={`px-3 py-1 ${tipos[proyecto.tipo as keyof typeof tipos].bg} ${tipos[proyecto.tipo as keyof typeof tipos].color} text-xs font-medium rounded-full`}>
                      {proyecto.tipo}
                    </span>
                    <span className="text-sm text-oscuro/50">
                      {proyecto.año}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-oscuro mb-2 group-hover:text-lavanda transition-colors">
                    {proyecto.nombre}
                  </h3>
                  <p className="text-oscuro/70 text-sm">
                    {proyecto.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
