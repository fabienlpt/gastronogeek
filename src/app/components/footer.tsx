import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">À propos</h3>
            <p className="text-sm text-gray-300">
              Découvrez des recettes délicieuses et faciles à préparer pour tous les jours.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-gray-300">Accueil</Link></li>
              <li><Link href="/search" className="text-sm hover:text-gray-300">Recettes</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Catégories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/entrees" className="text-sm hover:text-gray-300">Entrées</Link></li>
              <li><Link href="/category/plats-principaux" className="text-sm hover:text-gray-300">Plats principaux</Link></li>
              <li><Link href="/category/desserts" className="text-sm hover:text-gray-300">Desserts</Link></li>
              <li><Link href="/category/boissons" className="text-sm hover:text-gray-300">Boissons</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Instagram size={20} />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={20} />
              <span className="text-sm">contact@monsite.com</span>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mon Site de Recettes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;