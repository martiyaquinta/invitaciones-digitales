import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-oscuro text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Marca */}
          <div>
            <h3 className="text-2xl font-blanka text-lavanda mb-4">
              ESTUDIO NÓMADE
            </h3>
            <p className="text-white/70">
              Diseño y código en movimiento.
              <br />
              Desde cualquier lugar del mundo.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/proyectos" className="text-white/70 hover:text-lavanda transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-white/70 hover:text-lavanda transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/70 hover:text-lavanda transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Conecta</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:estudionomade2025@gmail.com" className="text-white/70 hover:text-violeta transition-colors">
                  estudionomade2025@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-violeta transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-violeta transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <p>© {currentYear} Estudio Nómade. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
