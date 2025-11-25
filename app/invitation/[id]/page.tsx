"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Calendar, MapPin, Users, Gift, Download, Copy, Check, Music } from "lucide-react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { invitationStorage } from "@/lib/storage";
import { Invitation } from "@/lib/types";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    guests: '1',
    attending: '',
    dietary: '',
    song: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Cargar invitación desde localStorage
  useEffect(() => {
    const data = invitationStorage.getById(id);
    if (data) {
      setInvitation(data);
    }
  }, [id]);

  // Datos de ejemplo con todas las nuevas características
  const invitationData: Invitation = invitation || {
    id: 'preview',
    templateId: 1,
    eventType: "XV Años",
    title: "MIS XV",
    names: "ICHU",
    date: "2026-09-05",
    time: "21:30",
    location: "VICENZZA EVENTOS",
    address: "Dirección del evento",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168896064837!2d-58.38375908477028!3d-34.60373098045857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb9f8ff113%3A0x22fd08269530e2df!2sObelisco!5e0!3m2!1ses!2sar!4v1234567890",
    message: "QUIERO QUE SEAS PARTE DE ESTE MOMENTO TAN IMPORTANTE PARA MÍ",
    ceremonyTime: "21:30",
    receptionTime: "22:30",
    rsvpEnabled: true,
    galleryEnabled: true,
    countdownEnabled: true,
    photoUrls: [
      "/logo.png",
      "/logo.png",
      "/logo.png",
    ],
    bankAccount: {
      cbu: "0000003100010123456789",
      alias: "FIESTA.ICHU.XV",
      titular: "María Rodriguez",
      banco: "Banco Ejemplo"
    },
    dressCode: "ELEGANTE",
    hashtag: "#ELMEJORXV",
    giftMessage: "NADA ES MÁS IMPORTANTE QUE TU PRESENCIA, PERO SI DESEAS HACERME UN PRESENTE PUEDES DEPOSITARLO EN LA SIGUIENTE CUENTA",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Contador regresivo
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateTime = invitationData.time 
        ? `${invitationData.date}T${invitationData.time}:00`
        : `${invitationData.date}T00:00:00`;
      
      const difference = new Date(eventDateTime).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    if (!invitationData.countdownEnabled || !invitationData.date) return;
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [invitationData.countdownEnabled, invitationData.date, invitationData.time]);

  // Copiar al portapapeles
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Descargar como PDF
  const downloadAsPDF = async () => {
    const element = document.getElementById('invitation-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invitacion-${invitationData.names.replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  };

  // Manejar envío de formulario RSVP
  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (aquí irá la integración con backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        guests: '1',
        attending: '',
        dietary: '',
        song: ''
      });
    }, 1500);
  };

  // Si no existe la invitación
  if (!invitation && id !== 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Invitación no encontrada</h1>
          <p className="text-gray-600 mb-8">Esta invitación no existe o ha sido eliminada.</p>
          <a 
            href="/admin" 
            className="inline-block bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
          >
            Crear una invitación
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50" id="invitation-content">
      {/* Botón de descarga flotante */}
      <button
        onClick={downloadAsPDF}
        className="fixed top-4 right-4 z-50 bg-violet-600 text-white p-3 rounded-full shadow-lg hover:bg-violet-700 transition-all hover:scale-110"
        title="Descargar como PDF"
      >
        <Download className="w-6 h-6" />
      </button>

      {/* Hero Section con animación */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-500/10 to-pink-500/20" />
        
        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-violet-300 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-32 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse delay-500" />
        </div>

        <div className="relative text-center max-w-4xl mx-auto z-10">
          <div className="mb-8 animate-fade-in">
            <Heart className="w-20 h-20 mx-auto mb-6 text-violet-500 fill-violet-500 animate-bounce" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-800 mb-4 animate-slide-up">
            {invitationData.title}
          </h1>
          <h2 className="text-5xl md:text-7xl font-serif text-violet-600 mb-8 animate-slide-up delay-200">
            {invitationData.names}
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12 animate-fade-in delay-400">
            {invitationData.message}
          </p>

          <button 
            onClick={() => document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-violet-700 transition-all transform hover:scale-105 shadow-xl animate-fade-in delay-600"
          >
            INGRESAR
          </button>
        </div>
      </section>

      {/* Contador Regresivo Mejorado */}
      {invitationData.countdownEnabled && (
        <section id="countdown" className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
              {invitationData.eventType}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mt-12">
              <CountdownCard value={timeLeft.days} label="DÍAS" />
              <CountdownCard value={timeLeft.hours} label="HORAS" />
              <CountdownCard value={timeLeft.minutes} label="MINUTOS" />
              <CountdownCard value={timeLeft.seconds} label="SEGUNDOS" />
            </div>
          </div>
        </section>
      )}

      {/* Sección de Detalles del Evento */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-center text-gray-800 mb-4">
            NO AYUNES, VENÍ Y DEVORÁ
          </h3>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mt-16">
            {/* Cuándo */}
            <div className="text-center">
              <Calendar className="w-16 h-16 mx-auto mb-6 text-violet-600" />
              <h4 className="text-2xl font-bold text-gray-800 mb-4">¿CUÁNDO?</h4>
              <p className="text-3xl font-serif text-violet-600 mb-2">
                {new Date(invitationData.date).toLocaleDateString('es-ES', { 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }).toUpperCase()}
              </p>
              <p className="text-xl text-gray-600">{invitationData.ceremonyTime} HS</p>
            </div>

            {/* Dónde */}
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-6 text-violet-600" />
              <h4 className="text-2xl font-bold text-gray-800 mb-4">¿DÓNDE?</h4>
              <p className="text-2xl font-semibold text-gray-800 mb-4">{invitationData.location}</p>
              <button 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitationData.address)}`, '_blank')}
                className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition-all inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                CÓMO LLEGAR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Integrado */}
      {invitationData.mapUrl && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <iframe
                src={invitationData.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Carrusel de Fotos */}
      {invitationData.galleryEnabled && invitationData.photoUrls && invitationData.photoUrls.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-center text-gray-800 mb-12">
              GALERÍA
            </h3>
            <div className="max-w-4xl mx-auto">
              <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={5000}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                {invitationData.photoUrls.map((url, index) => (
                  <div key={index} className="h-96 md:h-[600px] bg-gray-200 relative">
                    <Image
                      src={url}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* Dress Code & Hashtag */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-12">
            HAGAMOS QUE SEA UNA NOCHE ¡INOLVIDABLE!
          </h3>
          
          {invitationData.dressCode && (
            <div className="mb-12">
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">DRESS CODE</p>
              <p className="text-4xl font-bold text-violet-600">{invitationData.dressCode}</p>
            </div>
          )}

          {invitationData.hashtag && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
              <Music className="w-12 h-12 mx-auto mb-4 text-violet-600" />
              <h4 className="text-2xl font-bold text-gray-800 mb-4">QUIERO VER TUS FOTOS</h4>
              <p className="text-gray-600 mb-4">
                PUEDEN USAR MI # EN TODAS SUS PUBLICACIONES DE INSTAGRAM
              </p>
              <p className="text-3xl font-bold text-violet-600">{invitationData.hashtag}</p>
            </div>
          )}
        </div>
      </section>

      {/* Mesa de Regalos con Datos Bancarios */}
      {invitationData.bankAccount && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Gift className="w-16 h-16 mx-auto mb-6 text-violet-600" />
              <h3 className="text-4xl font-serif font-bold text-gray-800 mb-6">REGALOS</h3>
              <p className="text-lg text-gray-600 mb-8">
                {invitationData.giftMessage || "TU PRESENCIA ES NUESTRO MEJOR REGALO"}
              </p>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-gray-800 mb-6">DATOS PARA TRANSFERENCIA</h4>
                
                <div className="space-y-4 text-left max-w-md mx-auto">
                  {invitationData.bankAccount.titular && (
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Titular</p>
                      <p className="text-lg font-semibold text-gray-800">{invitationData.bankAccount.titular}</p>
                    </div>
                  )}

                  {invitationData.bankAccount.banco && (
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Banco</p>
                      <p className="text-lg font-semibold text-gray-800">{invitationData.bankAccount.banco}</p>
                    </div>
                  )}

                  {invitationData.bankAccount.cbu && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">CBU</p>
                          <p className="text-lg font-mono font-semibold text-gray-800">{invitationData.bankAccount.cbu}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(invitationData.bankAccount!.cbu!, 'cbu')}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          {copied === 'cbu' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {invitationData.bankAccount.alias && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Alias</p>
                          <p className="text-lg font-mono font-semibold text-gray-800">{invitationData.bankAccount.alias}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(invitationData.bankAccount!.alias!, 'alias')}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          {copied === 'alias' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RSVP Mejorado */}
      {invitationData.rsvpEnabled && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <Users className="w-16 h-16 mx-auto mb-6 text-violet-600" />
                <h3 className="text-4xl font-serif font-bold text-gray-800 mb-4">CONFIRMÁ TU ASISTENCIA</h3>
                <p className="text-lg text-gray-600">
                  ANTES DEL {new Date(invitationData.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
                </p>
              </div>

              {submitSuccess ? (
                <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                  <Check className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por confirmar!</h4>
                  <p className="text-gray-600">Nos vemos en la fiesta</p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número de personas a confirmar
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Confirmas tu asistencia? *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          value="yes"
                          checked={formData.attending === 'yes'}
                          onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                          className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                          required
                        />
                        <span className="text-gray-700">¡Confirmo!</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          value="no"
                          checked={formData.attending === 'no'}
                          onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                          className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                        />
                        <span className="text-gray-700">No podré asistir</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Algún requerimiento en la alimentación?
                    </label>
                    <input
                      type="text"
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      placeholder="Ninguno"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Qué canción no puede faltar?
                    </label>
                    <input
                      type="text"
                      value={formData.song}
                      onChange={(e) => setFormData({ ...formData, song: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-violet-600 text-white py-4 rounded-lg font-semibold hover:bg-violet-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? 'Enviando...' : 'Confirmar'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white text-center">
        <h3 className="text-3xl font-serif font-bold mb-4">TE ESPERO</h3>
        <p className="text-lg mb-6">{invitationData.names}</p>
        <div className="flex justify-center gap-6 mb-8">
          <Link href="/" className="hover:text-violet-200 transition">Inicio</Link>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-200 transition">Instagram</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-200 transition">WhatsApp</a>
        </div>
        <p className="text-sm opacity-80">© 2025 Estudio Nomade - Invitaciones Digitales</p>
      </footer>
    </div>
  );
}

// Componente de Contador
function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all">
      <div className="text-5xl md:text-6xl font-bold mb-2">{value}</div>
      <div className="text-sm md:text-base uppercase tracking-widest opacity-90">{label}</div>
    </div>
  );
}
