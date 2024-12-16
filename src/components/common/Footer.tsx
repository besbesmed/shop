// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-8 dark:bg-gray-700">
      <div className="container mx-auto px-4">

        {/* Informations en haut du footer */}
        <div className="flex flex-wrap justify-between items-center mb-8">

          {/* Livraison */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* Remplacez par une icône appropriée */}
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <div>
              <p className="text-sm">Livraison en 24h (**) Hors confinement</p>
            </div>
          </div>

          {/* Horaires */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* Remplacez par une icône appropriée */}
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <div>
              <p className="text-sm">Ouvert tous les jours de 8h00 à 19h00</p>
            </div>
          </div>

          {/* Téléphone */}
          <div className="flex items-center space-x-4">
            {/* Remplacez par une icône appropriée */}
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <div>
              <p className="text-sm">Contactez-nous au +216 31 31 00 00</p>
            </div>
          </div>

          {/* Livraison grand Tunis */}
          <div>
            <p className="text-sm text-gray-200">(**) Livraison sur le grand Tunis & Commande passée avant 14h sinon le lendemain matin</p>
          </div>
        </div>

        {/* Séparateur */}
        <hr className="border-gray-200 my-8" />

        {/* Contenu principal du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">NOTRE SOCIÉTÉ</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Contactez-nous</a></li>
              <li><a href="#" className="hover:underline">À propos</a></li>
              <li><a href="#" className="hover:underline">Nos Magasins</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">INFORMATIONS LÉGALES</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Livraison</a></li>
              <li><a href="#" className="hover:underline">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:underline">Paiement sécurisé</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">VOTRE COMPTE</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Informations personnelles</a></li>
              <li><a href="#" className="hover:underline">Commandes</a></li>
              <li><a href="#" className="hover:underline">Avoirs</a></li>
              <li><a href="#" className="hover:underline">Adresses</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Tunisianet</span>
              </li>
              <li>
                10 Rue Saint Augustin
              </li>
              <li>
                1002 Tunis
              </li>
              <li>
                Tunisia
              </li>
              <li>
                <span className="font-semibold">Tel:</span> +216 31 31 00 00
              </li>
              <li>
                <span className="font-semibold">Fax:</span> +216 32 40 66 06
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;