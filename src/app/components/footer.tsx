import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import TransitionLink from "./transitionLink";

const Footer = () => {
  return (
    <footer className="bg-slate-800  text-white bottom-0">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">À propos</h3>
            <p className="text-sm text-gray-300">
              Découvrez des recettes délicieuses et faciles à préparer pour tous
              les jours.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <TransitionLink url="/" className="text-sm hover:text-gray-300">
                  Accueil
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  url="/recipes"
                  className="text-sm hover:text-gray-300"
                >
                  Recettes
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  url="/contact"
                  className="text-sm hover:text-gray-300"
                >
                  Contact
                </TransitionLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <TransitionLink
                  url="/recipes?types=Entrée"
                  className="text-sm hover:text-gray-300"
                >
                  Entrées
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  url="/recipes?types=Plat"
                  className="text-sm hover:text-gray-300"
                >
                  Plats principaux
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  url="/recipes?types=Dessert"
                  className="text-sm hover:text-gray-300"
                >
                  Desserts
                </TransitionLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Instagram size={20} />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={20} />
              <span className="text-sm">lapertfabien@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Mon Site de Recettes. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
