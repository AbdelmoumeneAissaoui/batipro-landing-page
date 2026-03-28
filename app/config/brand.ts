import { BrandConfig } from '@/lib/types';

export const brandConfig: BrandConfig = {
  colors: {
    primary: "#003CE8",
    secondary: "#1e293b",
    accent: "#bd3b07",
    dark: "#0f172a",
    surface: "#ffffff",
    textPrimary: "#0f172a",
    textMuted: "#0046a8",
  },
  sections: {
    showHero: true,
    showStats: true,
    showCategories: true,
    showFeaturedProducts: true,
    showPartners: true,
    showTeam: true,
    showNewsletterBanner: false,
    showFooter: true,
  },
  i18n: {
    fr: {
      brand: {
        name: "Boukabes Céramique",
        tagline: "L'excellence pour vos chantiers et votre maison.",
      },
      hero: {
        headline: "Construisez l'Avenir",
        subheadline: "Matériaux de construction, sanitaire, céramique, plomberie et équipement de la maison de qualité professionnelle.",
        ctaLabel: "Voir le catalogue",
        ctaLink: "#categories",
        secondaryCtaLabel: "nous contacter",
        backgroundVideo: "/videos/video1.mp4",
        backgroundImage: "https://scontent.fcdg2-1.fna.fbcdn.net/v/t39.30808-6/492458367_122127116264772194_587359010015536324_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=xNsC5CH7M5cQ7kNvwHCQQDY&_nc_oc=AdknX5DQFeibZ4CEUugvrq2UbL_0CuepJvV-UEnCpq4aDw8FUfj50PVwScfHkO0gHa3P2etTMJ8NEOgfn6G0LFty&_nc_zt=23&_nc_ht=scontent.fcdg2-1.fna&_nc_gid=MXmC_qn4FIbjougkFxIPOg&_nc_ss=8&oh=00_Afzs8qQg5s4aAZqnv51B0c4b1XQAQ2ILzr3SlflatZIYlQ&oe=69BCED0C",

      },
      ui: {
        categoriesTitle: "Nos Rayons",
        productsTitle: "Produits à la Une",
        productsLink: "Voir tout le catalogue \u2192",
        partnersTitle: "Ils nous font confiance",
        teamTitle: "Notre Équipe à votre écoute",
        teamSubtitle: "Besoin d'un conseil technique ou d'un devis personnalisé ? Contactez directement nos experts.",
        quickLinks: "Liens Rapides",
        contactUs: "Contact",
      },
      categories: [
        { id: 1, label: "Gros Œuvre & Matériaux", icon: "BrickWall", image: "https://picsum.photos/seed/bricks/400/300", productIds: [4] },
        { id: 2, label: "Sanitaire & Plomberie", icon: "Bath", image: "https://picsum.photos/seed/bathroom/400/300", productIds: [3] },
        { id: 3, label: "Céramique & Revêtements", icon: "Layers", image: "https://picsum.photos/seed/tiles/400/300", productIds: [2] },
        { id: 4, label: "Quincaillerie & Outillage", icon: "Wrench", image: "https://picsum.photos/seed/tools/400/300", productIds: [1] },
        { id: 5, label: "Équipement Maison", icon: "Home", image: "https://picsum.photos/seed/homeeq/400/300", productIds: [] },
        { id: 6, label: "Électricité", icon: "Zap", image: "https://picsum.photos/seed/electric/400/300", productIds: [] },
      ],
      featuredProducts: [
        { id: 1, name: "Perceuse à percussion Pro 18V", price: "189.99€", badge: "Promo", rating: 4.8, image: "https://picsum.photos/seed/drill/400/400" },
        { id: 2, name: "Carrelage Effet Marbre 60x60", price: "24.50€ / m²", badge: "Tendance", rating: 4.9, image: "https://picsum.photos/seed/marble/400/400" },
        { id: 3, name: "Mitigeur Lavabo Design Noir", price: "85.00€", badge: null, rating: 4.5, image: "https://picsum.photos/seed/faucet/400/400" },
        { id: 4, name: "Ciment Portland 35kg", price: "7.50€", badge: "Essentiel", rating: 4.7, image: "https://picsum.photos/seed/cement/400/400" },
      ],
      stats: [
        { value: "15K+", label: "Professionnels nous font confiance" },
        { value: "50K+", label: "Références en stock" },
        { value: "98%", label: "Clients Satisfaits" },
      ],
      partners: [
        { id: 1, name: "Vinci Construction", logo: "https://picsum.photos/seed/vinci/200/100" },
        { id: 2, name: "Bouygues Immobilier", logo: "https://picsum.photos/seed/bouygues/200/100" },
        { id: 3, name: "Eiffage", logo: "https://picsum.photos/seed/eiffage/200/100" },
        { id: 4, name: "Artisans Réunis", logo: "https://picsum.photos/seed/artisans/200/100" },
        { id: 5, name: "Habitat Pro", logo: "https://picsum.photos/seed/habitat/200/100" },
      ],
      team: [
        { id: 1, firstName: "Marc", lastName: "Dubois", role: "Directeur Commercial", avatar: "https://picsum.photos/seed/marc/200/200", phone: "+33 6 12 34 56 78" },
        { id: 2, firstName: "Sophie", lastName: "Laurent", role: "Experte Sanitaire & Céramique", avatar: "https://picsum.photos/seed/sophie/200/200", phone: "+33 6 98 76 54 32" },
        { id: 3, firstName: "Thomas", lastName: "Martin", role: "Conseiller Gros Œuvre", avatar: "https://picsum.photos/seed/thomas/200/200", phone: "+33 6 11 22 33 44" },
      ],
      navLinks: [
        { label: "Accueil", to: "/" },
        { label: "Catégories", to: "#categories" },
        { label: "Produits", to: "#products" },
        { label: "Contact", to: "#contact" },
      ],
      footer: {
        copyright: "© 2026 BatiPro. Tous droits réservés.",
        socials: [
          { icon: "Instagram", url: "#" },
          { icon: "Facebook", url: "https://www.facebook.com/profile.php?id=61573165835606" },
        ],
      },
    },
    ar: {
      brand: {
        name: "باتي برو",
        tagline: "التميز لمشاريعك ومنزلك.",
      },
      hero: {
        headline: "ابنِ المستقبل",
        subheadline: "مواد بناء، أدوات صحية، سيراميك، خردوات ومعدات منزلية بجودة احترافية.",
        ctaLabel: "عرض الكتالوج",
        ctaLink: "#categories",
        secondaryCtaLabel: "طلب عرض أسعار",
        backgroundVideo: "/videos/video1.mp4",
        backgroundImage: "https://scontent.fcdg2-1.fna.fbcdn.net/v/t39.30808-6/492458367_122127116264772194_587359010015536324_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=xNsC5CH7M5cQ7kNvwHCQQDY&_nc_oc=AdknX5DQFeibZ4CEUugvrq2UbL_0CuepJvV-UEnCpq4aDw8FUfj50PVwScfHkO0gHa3P2etTMJ8NEOgfn6G0LFty&_nc_zt=23&_nc_ht=scontent.fcdg2-1.fna&_nc_gid=MXmC_qn4FIbjougkFxIPOg&_nc_ss=8&oh=00_Afzs8qQg5s4aAZqnv51B0c4b1XQAQ2ILzr3SlflatZIYlQ&oe=69BCED0C",
      },
      ui: {
        categoriesTitle: "أقسامنا",
        productsTitle: "منتجات مميزة",
        productsLink: "\u2190 عرض الكتالوج الكامل",
        partnersTitle: "شركاؤنا في النجاح",
        teamTitle: "فريقنا في خدمتك",
        teamSubtitle: "هل تحتاج إلى نصيحة فنية أو عرض أسعار مخصص؟ اتصل بخبرائنا مباشرة.",
        quickLinks: "روابط سريعة",
        contactUs: "اتصل بنا",
        legal: "الشروط القانونية",
        cgv: "شروط البيع",
        securePayment: "دفع آمن",
        fastDelivery: "توصيل خلال 24/48 ساعة",
      },
      categories: [
        { id: 1, label: "البناء والمواد", icon: "BrickWall", image: "https://picsum.photos/seed/bricks/400/300" },
        { id: 2, label: "الأدوات الصحية والسباكة", icon: "Bath", image: "https://picsum.photos/seed/bathroom/400/300" },
        { id: 3, label: "السيراميك والأرضيات", icon: "Layers", image: "https://picsum.photos/seed/tiles/400/300" },
        { id: 4, label: "الخردوات والأدوات", icon: "Wrench", image: "https://picsum.photos/seed/tools/400/300" },
        { id: 5, label: "معدات المنزل", icon: "Home", image: "https://picsum.photos/seed/homeeq/400/300" },
        { id: 6, label: "الكهرباء", icon: "Zap", image: "https://picsum.photos/seed/electric/400/300" },
      ],
      featuredProducts: [
        { id: 1, name: "مثقاب مطرقي احترافي 18 فولت", price: "189.99€", badge: "تخفيض", rating: 4.8, image: "https://picsum.photos/seed/drill/400/400" },
        { id: 2, name: "سيراميك بتأثير الرخام 60x60", price: "24.50€ / m²", badge: "شائع", rating: 4.9, image: "https://picsum.photos/seed/marble/400/400" },
        { id: 3, name: "خلاط حوض بتصميم أسود", price: "85.00€", badge: null, rating: 4.5, image: "https://picsum.photos/seed/faucet/400/400" },
        { id: 4, name: "أسمنت بورتلاند 35 كجم", price: "7.50€", badge: "أساسي", rating: 4.7, image: "https://picsum.photos/seed/cement/400/400" },
      ],
      stats: [
        { value: "+15K", label: "محترف يثقون بنا" },
        { value: "+50K", label: "منتج في المخزون" },
        { value: "98%", label: "عملاء راضون" },
      ],
      partners: [
        { id: 1, name: "Vinci Construction", logo: "https://picsum.photos/seed/vinci/200/100" },
        { id: 2, name: "Bouygues Immobilier", logo: "https://picsum.photos/seed/bouygues/200/100" },
        { id: 3, name: "Eiffage", logo: "https://picsum.photos/seed/eiffage/200/100" },
        { id: 4, name: "Artisans Réunis", logo: "https://picsum.photos/seed/artisans/200/100" },
        { id: 5, name: "Habitat Pro", logo: "https://picsum.photos/seed/habitat/200/100" },
      ],
      team: [
        { id: 1, firstName: "مارك", lastName: "دوبوا", role: "المدير التجاري", avatar: "https://picsum.photos/seed/marc/200/200", phone: "+33 6 12 34 56 78" },
        { id: 2, firstName: "صوفي", lastName: "لوران", role: "خبيرة الأدوات الصحية والسيراميك", avatar: "https://picsum.photos/seed/sophie/200/200", phone: "+33 6 98 76 54 32" },
        { id: 3, firstName: "توماس", lastName: "مارتن", role: "مستشار البناء", avatar: "https://picsum.photos/seed/thomas/200/200", phone: "+33 6 11 22 33 44" },
      ],
      navLinks: [
        { label: "الرئيسية", to: "/" },
        { label: "الأقسام", to: "#categories" },
        { label: "المنتجات", to: "#products" },
        { label: "اتصل بنا", to: "#contact" },
      ],
      footer: {
        copyright: "© 2026 باتي برو. جميع الحقوق محفوظة.",
        socials: [
          { icon: "Instagram", url: "#" },
          { icon: "Facebook", url: "https://www.facebook.com/profile.php?id=61573165835606" },
        ],
      },
    }
  }
};
