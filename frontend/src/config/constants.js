/**
 * BeClean - Site Configuration and Catalog Constants
 * 
 * Edit this file to change prices, product lists, service details, 
 * contact details, and SEO elements at any time.
 */

export const COMPANY_INFO = {
  name: "BeClean",
  legalName: "BeClean Filiale BeFacility S.A.R.L.",
  tagline: "Le partenaire propreté complet au Maroc : Services, Produits & Matériel",
  phone: "05 20 900 900",
  phoneFormatted: "05-20-900-900",
  whatsapp: "06 63 100 840",
  whatsappFormatted: "06-63-100-840",
  email: "contact@befacility.com",
  supportEmail: "support@befacility.com",
  address: "Belvedere, Casablanca, Maroc",
  ice: "003954092000044",
  cities: ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Kénitra"],
  socials: {
    linkedin: "https://linkedin.com/company/beclean-maroc",
    google: "https://g.page/r/beclean-maroc",
    facebook: "https://facebook.com/beclean.ma",
    instagram: "https://instagram.com/beclean.ma",
    tiktok: "https://tiktok.com/@beclean.ma",
    youtube: "https://youtube.com/@beclean.ma",
    twitter: "https://x.com/beclean_ma",
    pinterest: "https://pinterest.com/beclean_ma",
    snapchat: "https://snapchat.com/add/beclean.ma",
    threads: "https://threads.net/@beclean.ma"
  }
};

export const SERVICES = [
  {
    id: "residential",
    title: "Nettoyage Résidentiel",
    shortDesc: "Ménage régulier, grand nettoyage de printemps, canapés et vitrerie pour villas et appartements.",
    desc: "Prestations sur mesure pour votre domicile. Nos agents formés et déclarés prennent soin de vos espaces de vie, chambres, cuisines et sanitaires avec une discrétion absolue.",
    baseRate: 15, // MAD per m2
    features: [
      "Aide ménagère régulière (journalière/hebdomadaire)",
      "Grand ménage de printemps en profondeur",
      "Lavage haute pression des terrasses et balcons",
      "Nettoyage de vitres et fenêtres (châssis inclus)",
      "Détartrage complet des pièces d'eau"
    ],
    icon: "Home",
    seoKeywords: "nettoyage appartement casablanca, societe de menage maroc, nettoyage villa marrakech"
  },
  {
    id: "offices",
    title: "Nettoyage de Bureaux",
    shortDesc: "Entretien quotidien ou hebdomadaire de vos locaux, bureaux et sièges sociaux.",
    desc: "Optimisez l'environnement de travail de vos collaborateurs. Nous intervenons en horaires décalés (soirée ou matinée) pour assurer la propreté sans perturber votre activité commerciale.",
    baseRate: 12, // MAD per m2
    features: [
      "Dépoussiérage et désinfection des postes de travail",
      "Entretien des sanitaires et réapprovisionnement consommables",
      "Nettoyage humide des sols durs et aspiration des moquettes",
      "Gestion et tri sélectif des corbeilles",
      "Contrat mensuel flexible et adapté à vos effectifs"
    ],
    icon: "Briefcase",
    seoKeywords: "nettoyage bureau casablanca, entretien locaux professionnels rabat, devis nettoyage bureau maroc"
  },
  {
    id: "industrial",
    title: "Nettoyage Industriel",
    shortDesc: "Nettoyage technique d'usines, entrepôts logistiques et zones de production.",
    desc: "Solutions de nettoyage pour les environnements industriels et logistiques. Traitement de sols techniques, nettoyage de charpentes, dégraissage de machines en conformité avec vos normes de sécurité.",
    baseRate: 18, // MAD per m2
    features: [
      "Nettoyage de hangars et plateformes logistiques",
      "Dégraissage et décapage mécanique des sols d'ateliers",
      "Lavage à haute pression de structures métalliques",
      "Nettoyage de fin de chantiers industriels",
      "Respect strict des normes QHSE et port d'EPI"
    ],
    icon: "Factory",
    seoKeywords: "nettoyage industriel maroc, lavage usine tanger med, nettoyage hangar logistique casablanca"
  },
  {
    id: "construction",
    title: "Fin de Chantier / Après Travaux",
    shortDesc: "Remise en état complète après travaux de rénovation ou construction avant livraison.",
    desc: "Évacuation des poussières de plâtre, résidus de peinture, ciment et traces de colle. Nous rendons vos locaux ou habitations immédiatement habitables et étincelants.",
    baseRate: 22, // MAD per m2
    features: [
      "Aspiration des poussières fines sur toutes surfaces (murs, plafonds)",
      "Grattage de vitres et enlèvement des films protecteurs",
      "Décapage mono-brosse des sols cimentés et carrelages",
      "Élimination des résidus de colle, plâtre et peinture",
      "Désodorisation et aération des espaces"
    ],
    icon: "HardHat",
    seoKeywords: "nettoyage fin de chantier maroc, nettoyage apres travaux casablanca, remise en etat local neuf"
  },
  {
    id: "hygiene3d",
    title: "Hygiène 3D / 4D & Désinfection",
    shortDesc: "Dératisation, désinsectisation, déreptilisation et désinfection des locaux.",
    desc: "Protégez vos bâtiments des nuisibles. BeClean applique des protocoles agréés ONSSA / ISO 16636 pour éliminer cafards, punaises de lit, souris et désinfecter contre les virus et bactéries.",
    baseRate: 15, // MAD per m2
    features: [
      "Dératisation par pose d'appâts sécurisés",
      "Désinsectisation par nébulisation ou gel professionnel",
      "Traitement préventif et curatif anti-punaises de lit",
      "Désinfection virucide et bactéricide de grands volumes",
      "Délivrance de certificats de conformité sanitaire pour les autorités"
    ],
    icon: "ShieldAlert",
    seoKeywords: "desinfection hygiene 3D maroc, deratisation casablanca, traitement cafard entreprise rabat"
  },
  {
    id: "events",
    title: "Nettoyage Événementiel",
    shortDesc: "Entretien permanent et nettoyage avant/après vos événements, salons, mariages.",
    desc: "Un service réactif pour garantir l'éclat de vos événements. Présence d'agents d'entretien en continu pendant la manifestation et remise en état express des lieux après coup.",
    baseRate: 20, // MAD per m2
    features: [
      "Nettoyage préparatoire avant l'ouverture au public",
      "Entretien des sanitaires et poubelles en cours d'événement",
      "Remise en état rapide du site (salle, extérieur, parkings) après fermeture",
      "Gestion rapide des incidents (boissons renversées, bris de verre)",
      "Équipes coordonnées par un chef de projet sur place"
    ],
    icon: "Calendar",
    seoKeywords: "nettoyage evenementiel maroc, societe nettoyage mariage casablanca, service proprete salon"
  },
  {
    id: "outdoors",
    title: "Espaces Extérieurs & Vitrerie",
    shortDesc: "Nettoyage de façades, parkings, terrasses et entretien paysager.",
    desc: "Valorisez l'aspect extérieur de votre patrimoine. Du lavage de vitres en hauteur à l'aide de nacelles au nettoyage haute pression des dalles de parking.",
    baseRate: 14, // MAD per m2
    features: [
      "Lavage haute pression des parkings et allées",
      "Nettoyage de vitres d'accès difficile et verrières",
      "Nettoyage de façades (bardage alu, pierre, brique)",
      "Petit entretien paysager (taille de haies, tonte, nettoyage feuilles)",
      "Intervention par cordistes qualifiés pour travaux en hauteur"
    ],
    icon: "Trees",
    seoKeywords: "nettoyage vitre hauteur casablanca, nettoyage facade maroc, entretien espace vert entreprise"
  },
  {
    id: "airbnb",
    title: "Nettoyage Airbnb / Booking",
    shortDesc: "Ménage complet, blanchisserie et gestion des clés entre deux locations de courte durée.",
    desc: "Maximisez vos notes 5 étoiles sur Airbnb et Booking. BeClean assure un service de nettoyage hôtelier ultra-rapide entre le départ d'un voyageur et l'arrivée du suivant, incluant la gestion du linge de maison et des consommables.",
    baseRate: 16, // MAD per m2
    features: [
      "Nettoyage complet selon les standards hôteliers",
      "Blanchisserie pro : lavage et repassage des draps et serviettes",
      "Réapprovisionnement du kit d'accueil (savon, papier toilette, café)",
      "Check-in / check-out physique ou par boîte à clés",
      "Signalement des dégradations avec photos à l'appui"
    ],
    icon: "Key",
    seoKeywords: "nettoyage airbnb casablanca, conciergerie airbnb maroc, menage booking marrakech"
  },
  {
    id: "facility",
    title: "Facility Management",
    shortDesc: "Maintenance multi-technique légère, petite maintenance de bâtiment et logistique de bureau.",
    desc: "Assurez la pérennité et le bon fonctionnement de vos locaux de manière intégrée. BeClean prend en charge les opérations de multi-services : relamping, serrurerie, plomberie d'urgence, gestion de fournitures et assistance logistique sur site.",
    baseRate: 14,
    features: [
      "Maintenance de premier niveau (relamping, petites réparations)",
      "Intervention rapide en plomberie d'urgence et serrurerie",
      "Aménagement d'espaces et aide aux déménagements internes",
      "Gestion logistique des stocks de consommables d'hygiène",
      "Rapports de veille et de contrôle technique régulier des locaux"
    ],
    icon: "Wrench",
    seoKeywords: "facility management casablanca, multi services entreprise maroc, maintenance bureaux casablanca"
  }
];

export const PRODUCTS = [
  // CHEMICALS
  {
    id: "p1",
    name: "Dégraissant Industriel Pro-Clean",
    category: "chemicals",
    categoryLabel: "Produits d'Entretien",
    price: 180, // MAD
    unit: "Bidon de 5L",
    desc: "Dégraissant ultra-concentré pour sols d'usines, ateliers et cuisines professionnelles. Formule alcaline à haut pouvoir émulsifiant.",
    features: ["Élimine graisses d'origine minérale et végétale", "Idéal pour nettoyeurs haute pression et monobrosses", "Dilution économique (1% à 5%)"],
    inStock: true,
    rating: 4.8,
    isPopular: true
  },
  {
    id: "p2",
    name: "Désinfectant Bactéricide & Virucide 3D",
    category: "chemicals",
    categoryLabel: "Produits d'Entretien",
    price: 220, // MAD
    unit: "Bidon de 5L",
    desc: "Désinfectant à large spectre pour sanitaires, sols et surfaces de contact en milieu médical, scolaire et tertiaire. Conforme normes européennes EN.",
    features: ["Actif sur les virus enveloppés (dont Coronavirus)", "Senteur fraîcheur pin de longue durée", "Sans rinçage requis sur surfaces non-alimentaires"],
    inStock: true,
    rating: 4.9,
    isPopular: true
  },
  {
    id: "p3",
    name: "Nettoyant Vitres Brillance Absolue",
    category: "chemicals",
    categoryLabel: "Produits d'Entretien",
    price: 95, // MAD
    unit: "Bidon de 5L",
    desc: "Produit vitres professionnel. Élimine le film routier, les traces de doigts et les graisses sans laisser de traces.",
    features: ["Séchage ultra-rapide", "Effet déperlant anti-pluie", "Agréablement parfumé"],
    inStock: true,
    rating: 4.6,
    isPopular: false
  },
  
  // EQUIPMENT
  {
    id: "p4",
    name: "Aspirateur Eau et Poussière Pro 80L",
    category: "equipment",
    categoryLabel: "Matériel Professionnel",
    price: 3450, // MAD
    unit: "Unité",
    desc: "Aspirateur industriel puissant équipé de 2 moteurs de 1000W chacun. Cuve en inox de 80L avec flexible de vidange.",
    features: ["Puissance d'aspiration exceptionnelle", "Châssis robuste avec roues directionnelles", "Livré avec kit complet d'accessoires (brosses, suceurs)"],
    inStock: true,
    rating: 4.7,
    isPopular: true
  },
  {
    id: "p5",
    name: "Monobrosse Basse Vitesse CleanMaster",
    category: "equipment",
    categoryLabel: "Matériel Professionnel",
    price: 8900, // MAD
    unit: "Unité",
    desc: "Monobrosse professionnelle idéale pour le décapage, le shampouinage des moquettes et le lustrage des sols durs (marbre, carrelage).",
    features: ["Moteur haute résistance de 1200W", "Équilibrage parfait pour un travail sans fatigue", "Réservoir de solution 10L et brosses incluses"],
    inStock: true,
    rating: 4.8,
    isPopular: false
  },
  {
    id: "p6",
    name: "Chariot de Ménage Double Bac Pro",
    category: "equipment",
    categoryLabel: "Matériel Professionnel",
    price: 1250, // MAD
    unit: "Unité",
    desc: "Chariot de lavage complet avec presse à mâchoires, 2 seaux de 25L (eau propre/eau sale), support sac poubelle et paniers de rangement.",
    features: ["Structure en plastique injecté anti-choc", "Presse robuste pour serpillières espagnoles et fauberts", "Roulettes pivotantes silencieuses"],
    inStock: true,
    rating: 4.5,
    isPopular: true
  },

  // CONSUMABLES
  {
    id: "p7",
    name: "Essuie-Mains Bobine Dévidage Central",
    category: "consumables",
    categoryLabel: "Consommables & Hygiène",
    price: 280, // MAD
    unit: "Colis de 6 Bobines",
    desc: "Bobines d'essuie-mains gaufrées double épaisseur en pure ouate de cellulose. Idéal pour distributeurs dans les sanitaires professionnels.",
    features: ["Grande capacité d'absorption", "Prédécoupe nette et facile", "Certifié contact alimentaire"],
    inStock: true,
    rating: 4.4,
    isPopular: false
  },
  {
    id: "p8",
    name: "Sacs Poubelle Renforcés 110L",
    category: "consumables",
    categoryLabel: "Consommables & Hygiène",
    price: 165, // MAD
    unit: "Rouleau de 25 (Colis de 5)",
    desc: "Sacs poubelles haute résistance en polyéthylène basse densité. Épaisseur renforcée idéale pour les déchets lourds ou coupants.",
    features: ["Soudure de fond étanche anti-fuites", "Lien de fermeture intégré dans le soufflet", "Capacité 110 Litres (55 microns)"],
    inStock: true,
    rating: 4.7,
    isPopular: true
  },
  {
    id: "p9",
    name: "Gants Nitrile Noir Professionnels",
    category: "consumables",
    categoryLabel: "Consommables & Hygiène",
    price: 85, // MAD
    unit: "Boîte de 100 gants",
    desc: "Gants de protection en nitrile noir, sans poudre, haute sensibilité. Excellente résistance aux déchirures et aux agressions des produits d'entretien.",
    features: ["Sensibilité tactile maximale", "Bouts des doigts texturés anti-glisse", "Hypoallergénique (sans latex)"],
    inStock: true,
    rating: 4.6,
    isPopular: false
  }
];

export const DEVIS_CONFIG = {
  // Service multiplier
  serviceBaseRates: {
    residential: 15,
    offices: 12,
    industrial: 18,
    construction: 22,
    hygiene3d: 15,
    events: 20,
    outdoors: 14,
    airbnb: 16,
    facility: 14
  },
  // Frequence multipliers
  frequencyMultipliers: {
    ponctuel: 1.0,      // No discount for one-off
    mensuel: 0.95,      // 5% discount
    biweekly: 0.90,     // 10% discount
    weekly: 0.85        // 15% discount
  },
  // Option absolute additions (MAD)
  options: [
    { id: "ecoFriendly", name: "Produits écologiques et biodégradables", price: 150 },
    { id: "windowCleaning", name: "Vitrerie extérieure / en hauteur", price: 350 },
    { id: "carpetSofas", name: "Shampouinage canapés / tapis inclus", price: 250 },
    { id: "disinfection", name: "Désinfection virucide complète post-nettoyage", price: 200 }
  ]
};

export const BLOG_ARTICLES = [
  {
    id: "eco-cleaning",
    title: "Pourquoi passer au nettoyage écologique dans vos bureaux au Maroc ?",
    slug: "nettoyage-ecologique-bureaux-maroc",
    date: "12 Mai 2026",
    publishedAt: "2026-05-12T09:00:00.000Z",
    category: "Conseils Bureaux",
    readTime: "5 min",
    summary: "Découvrez les avantages des produits biodégradables et comment ils contribuent à la santé de vos collaborateurs et à l'image RSE de votre entreprise.",
    content: `L'entretien écologique n'est plus une simple option marketing, c'est une responsabilité environnementale et sanitaire. Au Maroc, de plus en plus d'entreprises à Casablanca, Rabat et Marrakech intègrent des critères environnementaux dans leurs cahiers des charges de nettoyage.

**Les avantages concrets pour vos bureaux**

Utiliser des éco-détergents certifiés réduit significativement les rejets de composés organiques volatils (COV) dans l'air intérieur de vos bureaux. Ces composés sont responsables de maux de tête, d'irritations respiratoires et d'allergies chez vos collaborateurs — ce que les professionnels appellent le "syndrome des bâtiments malsains".

Les produits écologiques d'entretien présentent plusieurs avantages clés :
- **Santé des collaborateurs** : moins de composés organiques volatils = moins d'absences maladie
- **Image RSE** : argument différenciant auprès de vos clients et partenaires
- **Conformité réglementaire** : anticipation des normes marocaines à venir
- **Protection de l'environnement** : biodégradabilité rapide, pas de rejet nocif dans les eaux usées

**Les labels à rechercher**

Lors du choix de vos produits ou prestataires de nettoyage, demandez les certifications Ecocert, EU Ecolabel ou Nordic Swan. BeClean propose systématiquement une gamme de produits biodégradables certifiés en option sur tous ses contrats d'entretien professionnel.

**L'impact économique**

Contrairement aux idées reçues, les produits écologiques concentrés coûtent souvent moins cher à l'usage grâce à leur très haute concentration (dilution 1/100 vs 1/20 pour les produits conventionnels). Le coût à l'usage est ainsi réduit de 20 à 40%.`,
    seoKeywords: "nettoyage ecologique maroc, RSE casablanca proprete, produit entretien ecologique bureau, ecodetergent professionnel maroc"
  },
  {
    id: "hygiene-3d-norms",
    title: "Normes ONSSA & ISO 16636 : Tout savoir sur l'hygiène 3D en milieu professionnel",
    slug: "normes-onssa-hygiene-3d-maroc",
    date: "28 Avril 2026",
    publishedAt: "2026-04-28T09:00:00.000Z",
    category: "Réglementation",
    readTime: "7 min",
    summary: "Dératisation et désinsectisation : quelles sont les obligations légales pour les restaurants, riads et écoles au Maroc ?",
    content: `La sécurité sanitaire est au cœur des contrôles de l'ONSSA (Office National de Sécurité Sanitaire des produits Alimentaires) au Maroc. Pour les métiers de bouche, l'hôtellerie à Marrakech et Agadir, ainsi que les établissements scolaires, disposer d'un plan de lutte anti-nuisibles est une **obligation légale**.

**Qu'est-ce que l'hygiène 3D / 4D ?**

- **3D** : Dératisation + Désinsectisation + Désinfection
- **4D** : Les 3D + Déreptilisation (traitement contre les reptiles nuisibles)

Ces interventions doivent être réalisées par des entreprises agréées par le Ministère de l'Agriculture et disposant de personnel certifié.

**La norme ISO 16636**

Cette norme internationale définit les exigences minimales pour les prestataires de services de lutte antiparasitaire. Elle couvre :
- La formation et certification du personnel applicateur
- Les méthodes de documentation des interventions
- La traçabilité des produits phytosanitaires utilisés
- Les protocoles de sécurité pour les occupants des bâtiments

**Obligations selon le type d'établissement**

| Établissement | Fréquence minimale | Document requis |
|---|---|---|
| Restaurant / Café | 4 fois/an | Certificat de traitement |
| Hôtel / Riad | 4 fois/an | Plan de prévention |
| École / Université | 2 fois/an | Rapport ONSSA |
| Clinique / Pharmacie | 4 fois/an | Registre d'hygiène |
| Entrepôt alimentaire | 12 fois/an | Certification HACCP |

**Que demander à votre prestataire ?**

BeClean délivre systématiquement un **certificat de conformité** signé par un technicien certifié, avec les fiches de données de sécurité (FDS) des produits utilisés — documents exigés lors des contrôles ONSSA.`,
    seoKeywords: "norme ONSSA hygiene maroc, deratisation marrakech restaurant, certificat 3D casablanca, ISO 16636 maroc, hygiene alimentaire maroc"
  },
  {
    id: "post-construction-checklist",
    title: "Checklist complète pour réussir son nettoyage de fin de chantier au Maroc",
    slug: "nettoyage-fin-de-chantier-checklist",
    date: "10 Avril 2026",
    publishedAt: "2026-04-10T09:00:00.000Z",
    category: "Chantier & BTP",
    readTime: "6 min",
    summary: "Des poussières de plâtre tenaces aux traces de peinture sur le vitrage : découvrez comment organiser votre remise en état avant la livraison.",
    content: `La livraison d'un chantier de construction ou de rénovation requiert un nettoyage minutieux pour valoriser le travail des artisans et permettre l'entrée dans les lieux dans les meilleures conditions.

**Phase 1 : Débarras et gros nettoyage (J-3)**

Avant d'intervenir avec du matériel professionnel, il faut d'abord :
- Évacuer tous les déchets de chantier (gravats, emballages, restes de matériaux)
- Protéger les sols finis avant le passage des machines
- Identifier les zones à traitement spéciaux (résidus de colle époxy, joints de silicone)

**Phase 2 : Dépoussiérage systématique (J-2)**

La poussière de plâtre est particulièrement tenace et s'infiltre partout. Le protocole BeClean prévoit :
1. **Aspiration industrielle** (HEPA H13) des murs, plafonds, et encadrements
2. **Nettoyage des gaines** et bouches de ventilation
3. **Essuyage humide** de toutes les surfaces verticales

**Phase 3 : Traitements spéciaux des sols (J-1)**

- **Carrelage** : décapage à la monobrosse avec tampon abrasif, retrait des voiles de ciment
- **Parquet** : ponçage léger si nécessaire, application de finition cire/huile
- **Béton ciré** : cristallisation ou vitrification selon le type de béton
- **Moquette** : shampouinage injection-extraction

**Phase 4 : Vitrerie et menuiseries (Jour J)**

Le grattage des vitres est une étape délicate réservée aux techniciens équipés de lames de grattage professionnelles et de produits dévitrifiants adaptés :
- Retrait des films de protection (PVC, papier)
- Nettoyage des châssis aluminium et PVC
- Polissage des vitres et miroirs

**Coûts moyens au Maroc**

Un nettoyage de fin de chantier coûte généralement entre **20 et 30 MAD/m²** pour une villa ou appartement standard, et peut dépasser 40 MAD/m² pour des finitions haut de gamme avec matériaux sensibles (marbre, parquet massif, menuiseries laquées). Demandez un devis gratuit BeClean pour votre projet.`,
    seoKeywords: "nettoyage fin de chantier casablanca, enlever ciment carrelage maroc, entreprise apres travaux maroc, tarif nettoyage chantier maroc"
  },
  {
    id: "nettoyage-industriel-logistique",
    title: "Nettoyage industriel : les 5 points clés pour choisir son prestataire à Casablanca",
    slug: "choisir-entreprise-nettoyage-industriel-casablanca",
    date: "25 Mars 2026",
    publishedAt: "2026-03-25T09:00:00.000Z",
    category: "Conseils Bureaux",
    readTime: "5 min",
    summary: "Sécurité, conformité QHSE, matériel adapté : les critères essentiels pour sélectionner une entreprise de nettoyage industriel fiable à Casablanca, Kénitra ou Tanger.",
    content: `Le nettoyage d'un site industriel — usine, entrepôt logistique, atelier de fabrication — ne s'improvise pas. Les enjeux de sécurité, de continuité d'activité et de conformité réglementaire sont critiques.

**1. La certification QHSE et les EPI**

Votre prestataire doit impérativement disposer d'une politique QHSE (Qualité, Hygiène, Sécurité, Environnement) documentée et applicable sur vos sites. Chaque technicien doit être équipé des EPI adaptés à votre environnement : casque, lunettes, gants résistants aux produits chimiques, chaussures de sécurité S3.

**2. L'adéquation du matériel**

Un nettoyage industriel efficace nécessite du matériel spécialisé :
- Autolaveuses autoportées pour les grandes surfaces de sol (≥ 500m²)
- Nettoyeurs haute pression pour dégraissage mécanique des zones de production
- Aspirateurs industriels pour copeaux métalliques et poussières explosibles (classe M ou H)

**3. La flexibilité des horaires d'intervention**

Sur un site industriel en 3x8 ou 24/24, votre prestataire doit s'adapter à vos plages de production. BeClean propose des interventions nocturnes (minuit à 5h) et de week-end pour ne jamais perturber votre chaîne de production.

**4. Les protocoles de déchets spéciaux**

La gestion des déchets industriels banals (DIB) et des déchets industriels spéciaux (DIS) — huiles, solvants, chiffons souillés — doit suivre les réglementations marocaines. Votre prestataire doit vous remettre un bordereau de suivi des déchets.

**5. La traçabilité des interventions**

Exigez un rapport d'intervention signé après chaque passage, avec les zones traitées, les produits utilisés (FDS disponibles) et l'heure de début et fin. C'est la base de toute démarche qualité ISO 9001.`,
    seoKeywords: "nettoyage industriel casablanca, entreprise nettoyage usine maroc, prestataire qhse nettoyage kenitra, societe nettoyage tanger med"
  },
  {
    id: "contrat-nettoyage-bureaux",
    title: "Contrat de nettoyage de bureaux : ce que doit absolument contenir votre accord",
    slug: "contrat-nettoyage-bureaux-maroc",
    date: "15 Mars 2026",
    publishedAt: "2026-03-15T09:00:00.000Z",
    category: "Réglementation",
    readTime: "4 min",
    summary: "Fréquences, prestations détaillées, responsabilités et garanties : les clauses indispensables d'un bon contrat de nettoyage professionnel au Maroc.",
    content: `Un contrat de nettoyage professionnel bien rédigé protège les deux parties et garantit la qualité de service sur la durée. Voici les éléments essentiels à vérifier avant de signer.

**Les prestations listées avec précision**

Un bon contrat ne se contente pas de mentionner "entretien des bureaux". Il doit détailler chaque tâche avec sa fréquence :
- Dépoussiérage des postes de travail : quotidien
- Nettoyage humide des sols : quotidien
- Désinfection des sanitaires : quotidien
- Vitrerie intérieure : hebdomadaire
- Vitrerie extérieure : mensuelle

**La superficie et le nombre de passages**

Le contrat doit mentionner la superficie totale des locaux couverts (en m²) et le nombre de passages hebdomadaires ou mensuels. C'est la base du calcul tarifaire.

**Les responsabilités en cas de dommage**

La clause de responsabilité civile est cruciale : votre prestataire doit être assuré pour les dommages causés lors des interventions. Demandez une attestation d'assurance RC Professionnelle valide.

**La déclaration CNSS du personnel**

Exigez une attestation CNSS à jour de votre prestataire. Cela vous protège en cas d'accident du travail d'un agent intervenant dans vos locaux — vous pourriez être tenu responsable si l'employé n'est pas déclaré.

**Les conditions de résiliation**

Un préavis raisonnable (1 à 3 mois selon la durée du contrat), les conditions de renouvellement tacite, et les pénalités en cas de non-respect des engagements.

**Chez BeClean**, tous nos contrats incluent ces éléments, plus un rapport qualité mensuel et un interlocuteur dédié pour chaque client B2B.`,
    seoKeywords: "contrat nettoyage bureau maroc, prestataire nettoyage professionnel casablanca, cahier charges nettoyage maroc, CNSS nettoyage maroc"
  }
];

