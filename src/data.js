// ======================================================
// PROJECT IMAGES
// ======================================================

import marketHubImage from "./assets/projects/markethub.png";
import finoraDashboardImage from "./assets/projects/finora-dashboard.png";
import travelNestImage from "./assets/projects/travelnest.png";
import novaCorporateImage from "./assets/projects/nova-corporate.png";


// ======================================================
// BLOG IMAGES
// ======================================================

import websiteGrowthImage from "./assets/blogs/website-growth.png";
import uiPrinciplesImage from "./assets/blogs/ui-principles.png";
import technicalSeoImage from "./assets/blogs/technical-seo.png";

// ======================================================
// TEAM IMAGES
// ======================================================

import johnSmithImage from "./assets/team/john-smith.png";
import sarahLeeImage from "./assets/team/sarah-lee.png";
import mikeChenImage from "./assets/team/mike-chen.png";
import emmaWilsonImage from "./assets/team/emma-wilson.png";

// ======================================================
// SERVICES
// ======================================================

export const initialServices = [
  {
    id: 1,
    title: "Web Development",
    category: "Development",
    description:
      "Modern, responsive and high-performance websites for businesses.",
    icon: "Code2",
    status: "Active",
  },

  {
    id: 2,
    title: "UI/UX Design",
    category: "Design",
    description:
      "User-friendly interfaces designed to improve customer experience.",
    icon: "Palette",
    status: "Active",
  },

  {
    id: 3,
    title: "Mobile App Development",
    category: "Development",
    description:
      "Scalable mobile applications for Android and iOS platforms.",
    icon: "Smartphone",
    status: "Active",
  },

  {
    id: 4,
    title: "Digital Marketing",
    category: "Marketing",
    description:
      "Data-driven marketing strategies that help businesses grow.",
    icon: "Megaphone",
    status: "Active",
  },

  {
    id: 5,
    title: "SEO Optimization",
    category: "Marketing",
    description:
      "Improve your website visibility and search engine rankings.",
    icon: "Search",
    status: "Active",
  },

  {
    id: 6,
    title: "Branding",
    category: "Design",
    description:
      "Build a strong and memorable brand identity.",
    icon: "Sparkles",
    status: "Active",
  },
];

// ======================================================
// PROJECTS
// ======================================================

// ======================================================
// PROJECTS
// ======================================================

export const initialProjects = [
  {
    id: 1,
    title: "MarketHub",
    category: "Web Development",
    client: "MarketHub",
    year: "2026",

    shortDescription:
      "A modern e-commerce platform designed for growing businesses.",

    description:
      "MarketHub is a comprehensive e-commerce platform developed for growing businesses that want to establish a professional online presence and provide customers with a smooth digital shopping experience. The project combines modern visual design, intuitive navigation, responsive layouts and carefully structured product experiences to create a consistent experience across desktop, tablet and mobile devices.",

    overview:
      "The goal of MarketHub was to create a scalable online shopping platform that makes product discovery simple while providing the business with a flexible foundation for future growth. The experience was designed around clear navigation, strong visual presentation and a streamlined customer journey.",

    challenge:
      "The main challenge was creating a shopping experience that could handle a growing product catalog while remaining simple and easy to use. Customers needed to find products quickly, understand product information clearly and move through the purchasing process without unnecessary steps.",

    solution:
      "We designed and developed a responsive e-commerce experience with structured navigation, product categories, detailed product pages and a streamlined shopping flow. Reusable interface components were used throughout the platform to maintain consistency and make future development easier.",

    features: [
      "Responsive e-commerce website",
      "Product catalog and categories",
      "Detailed product pages",
      "Customer-focused shopping experience",
      "Responsive checkout flow",
      "Mobile-friendly interface",
      "Scalable component architecture",
      "Performance-focused development",
    ],

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Responsive Design",
      "REST API",
    ],

    image: marketHubImage,
    status: "Completed",
  },

  {
    id: 2,
    title: "Finora Dashboard",
    category: "UI/UX Design",
    client: "Finora",
    year: "2026",

    shortDescription:
      "A modern financial analytics dashboard designed for clear and efficient data management.",

    description:
      "Finora Dashboard is a modern financial analytics interface designed to transform complex financial information into a clear, organized and easy-to-understand digital experience. The project focuses on information architecture, visual hierarchy and usability while maintaining a professional financial technology aesthetic.",

    overview:
      "The objective was to create a dashboard that allows users to quickly understand important financial information while still providing access to detailed analytics. The interface was structured around clear sections, summary cards, reports and interactive data components.",

    challenge:
      "Financial dashboards often contain large amounts of information, which can make interfaces difficult to understand. The challenge was to organize this information in a way that allows users to identify important metrics quickly without creating unnecessary visual complexity.",

    solution:
      "We created a structured dashboard system with clear information hierarchy, reusable cards, organized navigation and responsive layouts. Important metrics are presented prominently while detailed information remains accessible through secondary sections.",

    features: [
      "Modern financial dashboard",
      "Analytics and reporting sections",
      "Summary metric cards",
      "Interactive data areas",
      "Responsive dashboard layout",
      "Clean information hierarchy",
      "Reusable UI components",
      "Professional visual design",
    ],

    technologies: [
      "Figma",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
    ],

    image: finoraDashboardImage,
    status: "Completed",
  },

  {
    id: 3,
    title: "TravelNest",
    category: "Mobile App",
    client: "TravelNest",
    year: "2025",

    shortDescription:
      "A mobile travel booking experience designed for simple destination discovery and reservations.",

    description:
      "TravelNest is a mobile travel booking experience created to help users discover destinations, explore accommodation options and organize their travel plans through a simple and intuitive application. The project focuses on creating a smooth journey from destination discovery through property selection and booking.",

    overview:
      "The objective was to create a convenient mobile experience where travelers could discover destinations, search available accommodation, review important information and continue through the booking process with minimal friction.",

    challenge:
      "The main challenge was presenting a large amount of travel information on smaller mobile screens without making the interface feel crowded. Users needed access to search, filtering, destination information and booking actions while keeping navigation simple.",

    solution:
      "We created a mobile-first interface with clear navigation, touch-friendly components, structured search functionality and visually engaging destination sections. The booking journey was divided into logical steps to make the overall experience easier to understand.",

    features: [
      "Mobile-first design",
      "Destination discovery",
      "Accommodation search",
      "Search and filtering",
      "Property detail screens",
      "Booking flow",
      "Touch-friendly interactions",
      "Responsive interface",
    ],

    technologies: [
      "React Native",
      "JavaScript",
      "Mobile UI Design",
      "Responsive Design",
      "API Integration",
    ],

    image: travelNestImage,
    status: "Completed",
  },

  {
    id: 4,
    title: "Nova Corporate",
    category: "Branding",
    client: "Nova",
    year: "2025",

    shortDescription:
      "A complete corporate brand identity created for a modern technology company.",

    description:
      "Nova Corporate is a complete corporate branding project developed for a technology company that wanted to establish a stronger, more consistent and recognizable identity across its digital presence. The project focuses on creating a modern visual language that communicates innovation, professionalism and reliability.",

    overview:
      "The project involved creating a flexible brand identity that could be consistently applied across the company's website, marketing materials, presentations, social media content and other digital communication channels.",

    challenge:
      "The company needed an identity that looked modern and technology-focused while remaining professional enough for corporate communication. The branding also needed to work consistently across different digital platforms and marketing materials.",

    solution:
      "We created a cohesive visual system covering typography, colors, layouts, graphic elements and digital presentation styles. Clear design guidelines were established to help maintain consistency as the company continues to create new content.",

    features: [
      "Complete brand identity",
      "Corporate visual language",
      "Typography system",
      "Color system",
      "Digital brand guidelines",
      "Marketing design direction",
      "Social media visual direction",
      "Website branding",
    ],

    technologies: [
      "Adobe Illustrator",
      "Figma",
      "Adobe Photoshop",
      "Brand Strategy",
      "Visual Design",
    ],

    image: novaCorporateImage,
    status: "Completed",
  },
];




// ======================================================
// BLOGS
// ======================================================

export const initialBlogs = [
  {
    id: 1,
    title:
      "How a Professional Website Helps Your Business Grow",
    category: "Web Development",
    author: "John Smith",
    date: "September 20, 2026",
    readTime: "5 min read",
    image: websiteGrowthImage,
    excerpt:
      "A professional website can help your business build trust and attract more customers.",
    status: "Published",
  },

  {
    id: 2,
    title:
      "Simple UI Principles for Better Digital Products",
    category: "UI/UX",
    author: "Sarah Lee",
    date: "September 15, 2026",
    readTime: "4 min read",
    image: uiPrinciplesImage,
    excerpt:
      "Learn simple principles that make interfaces easier to use.",
    status: "Published",
  },

  {
    id: 3,
    title:
      "A Beginner's Guide to Technical SEO",
    category: "SEO",
    author: "Mike Chen",
    date: "September 10, 2026",
    readTime: "6 min read",
    image: technicalSeoImage,
    excerpt:
      "Understand the basic technical SEO concepts every website owner should know.",
    status: "Published",
  },
];

// ======================================================
// ENQUIRIES
// ======================================================

export const initialEnquiries = [
  {
    id: 1,
    name: "Arjun Rao",
    email: "arjun@example.com",
    phone: "+91 9876543210",
    service: "Web Development",
    budget: "$5,000 - $10,000",
    message:
      "I need a business website for my company.",
    date: "2026-09-28",
    status: "New",
  },

  {
    id: 2,
    name: "Priya Shah",
    email: "priya@example.com",
    phone: "+91 9876543211",
    service: "UI/UX Design",
    budget: "$2,000 - $5,000",
    message:
      "We need a redesign for our existing application.",
    date: "2026-09-27",
    status: "Contacted",
  },

  {
    id: 3,
    name: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "+91 9876543212",
    service: "Digital Marketing",
    budget: "$1,000 - $3,000",
    message:
      "We want to improve our online presence.",
    date: "2026-09-26",
    status: "Proposal Sent",
  },
];

// ======================================================
// TEAM
// ======================================================

export const initialTeam = [
  {
    id: 1,
    name: "John Smith",
    role: "Founder & CEO",
    email: "john@example.com",
    image: johnSmithImage,
    status: "Active",
  },

  {
    id: 2,
    name: "Sarah Lee",
    role: "UI/UX Designer",
    email: "sarah@example.com",
    image: sarahLeeImage,
    status: "Active",
  },

  {
    id: 3,
    name: "Mike Chen",
    role: "Full Stack Developer",
    email: "mike@example.com",
    image: mikeChenImage,
    status: "Active",
  },

  {
    id: 4,
    name: "Emma Wilson",
    role: "Marketing Specialist",
    email: "emma@example.com",
    image: emmaWilsonImage,
    status: "Active",
  },
];

// ======================================================
// TESTIMONIALS
// ======================================================


export const initialTestimonials = [
  {
    id: 1,
    name: "Daniel Carter",
    role: "CEO, TechFlow",
    message:
      "The team delivered an excellent website and understood our requirements perfectly.",
    rating: 5,
    status: "Published",
  },

  {
    id: 2,
    name: "Ananya Kumar",
    role: "Founder, MarketHub",
    message:
      "Professional team, excellent communication and great design.",
    rating: 5,
    status: "Published",
  },

  {
    id: 3,
    name: "David Brown",
    role: "Director, Finora",
    message:
      "They transformed our old platform into a modern digital experience.",
    rating: 5,
    status: "Published",
  },
];