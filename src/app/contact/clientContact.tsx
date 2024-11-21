"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setIsTransitionActive } = useStore();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const masterTimeline = gsap.timeline({
        paused: true,
        onComplete: () => setIsTransitionActive(false),
      });

      timelineRef.current = masterTimeline;

      masterTimeline
        .from(".contact-title", {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".contact-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".contact-info",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".info-item",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".contact-form",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      masterTimeline.play();
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div ref={containerRef} className="container mx-auto mb-28 pt-20">
      <h1 className="contact-title text-4xl font-bold mb-2 text-center">
        Contactez-nous
      </h1>
      <p className="contact-subtitle text-xl text-gray-600 mb-12 text-center">
        Une question, une suggestion ? N&apos;hésitez pas à nous écrire !
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="contact-info bg-gray-100 p-8 rounded-lg shadow-md h-full">
          <h2 className="text-2xl font-semibold mb-6">Informations</h2>
          <div className="space-y-6">
            <div className="info-item flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">lapertfabien@gmail.com</p>
              </div>
            </div>

            <div className="info-item flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Téléphone</h3>
                <p className="text-gray-600">+33 6 78 91 23</p>
              </div>
            </div>

            <div className="info-item flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Adresse</h3>
                <p className="text-gray-600">
                  21 Rue du Molinel,
                  <br />
                  59000 Lille
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-8 rounded-lg shadow-md"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Envoyer</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
