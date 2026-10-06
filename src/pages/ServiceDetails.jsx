import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import PageHero from "../components/PageHero";

// ======================================================
// PREDEFINED SERVICE CONTENT
// ======================================================

const serviceContent = {
  "web-development": {
    intro:
      "We create modern, responsive, secure, and high-performing websites that help businesses build a strong digital presence and achieve their business goals.",

    longDescription:
      "Our web development services are focused on creating modern, responsive, secure, and high-performing websites that support your business goals. We develop websites that are designed to provide a seamless experience across desktops, tablets, and mobile devices. From business websites and corporate portals to custom web applications, we combine clean development practices, intuitive functionality, and responsive design to deliver reliable digital solutions. Our approach includes understanding your requirements, planning the website structure, developing the required features, testing functionality and performance, and ensuring the final website is easy to maintain and scalable for future growth.",

    bulletTitle:
      "Our Web Development Process",

    bullets: [
      "Understanding your business requirements and project objectives",
      "Planning website structure, features, and user experience",
      "Developing responsive and user-friendly website interfaces",
      "Implementing required functionality and business features",
      "Testing website performance, responsiveness, and functionality",
      "Deploying and maintaining the website for long-term performance",
    ],

    provides: [
      "Responsive Website Development",
      "Corporate Website Development",
      "Business Websites",
      "Custom Web Applications",
      "Landing Page Development",
      "Website Maintenance",
    ],
  },

  "ui-ux-design": {
    intro:
      "We design intuitive and engaging digital experiences that combine visual appeal, usability, accessibility, and business objectives.",

    longDescription:
      "Our UI/UX design services focus on creating meaningful digital experiences that are visually appealing, intuitive, and easy to use. We begin by understanding your business objectives, target users, and product requirements before developing user flows, wireframes, and interface concepts. Our design process combines usability, visual consistency, accessibility, and responsive design principles to create experiences that users can navigate naturally. From initial concepts and prototypes to complete interface designs and design systems, we help transform ideas into engaging digital products that provide a smooth and consistent experience across different devices.",

    bulletTitle:
      "Our UI/UX Design Process",

    bullets: [
      "Understanding business goals and target users",
      "Researching user needs and product requirements",
      "Creating user flows and wireframes",
      "Designing modern and responsive user interfaces",
      "Creating interactive prototypes for better visualization",
      "Improving usability through testing and feedback",
    ],

    provides: [
      "User Experience Design",
      "User Interface Design",
      "Wireframing",
      "Interactive Prototyping",
      "Design Systems",
      "Responsive UI Design",
    ],
  },

  "mobile-app-development": {
    intro:
      "We build reliable, user-friendly, and high-performing mobile applications designed to provide seamless experiences across supported devices.",

    longDescription:
      "Our mobile app development services help businesses transform their ideas into reliable, user-friendly, and high-performing mobile applications. We focus on creating applications that provide smooth navigation, responsive interfaces, secure functionality, and consistent performance across supported devices. From understanding the initial concept and planning application features to designing the user experience, developing functionality, testing, and deployment, we follow a structured development process. Our solutions are designed to support business requirements while providing users with a convenient and engaging mobile experience.",

    bulletTitle:
      "Our Mobile App Development Process",

    bullets: [
      "Understanding the business idea and application requirements",
      "Planning application features and user flows",
      "Designing intuitive and responsive mobile interfaces",
      "Developing core application functionality",
      "Testing application performance and usability",
      "Preparing the application for deployment and future updates",
    ],

    provides: [
      "Business Mobile Applications",
      "Android App Development",
      "iOS App Development",
      "Cross-Platform Applications",
      "Custom Mobile Applications",
      "Mobile App Maintenance",
    ],
  },

  "seo-optimization": {
    intro:
      "We help businesses improve their online visibility, attract relevant visitors, and build a stronger presence in search engine results.",

    longDescription:
      "Our SEO Optimization services help businesses improve their online visibility, attract relevant visitors, and build a stronger presence in search engine results. We take a structured approach that begins with understanding your business, target audience, competitors, and existing website performance. Our strategy includes keyword research, on-page optimization, technical SEO, content optimization, website structure improvements, and performance monitoring. By continuously analyzing search performance and identifying areas for improvement, we work toward increasing organic visibility and helping your website reach potential customers who are actively searching for your products or services.",

    bulletTitle:
      "Our SEO Process",

    bullets: [
      "Understanding your business and target audience",
      "Performing keyword and competitor research",
      "Optimizing website content and page structure",
      "Improving technical SEO and website performance",
      "Optimizing metadata, headings, and internal links",
      "Monitoring search performance and identifying improvements",
    ],

    provides: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Content Optimization",
      "Website SEO Audit",
      "SEO Performance Monitoring",
    ],
  },

  branding: {
    intro:
      "We help businesses create strong, recognizable, and consistent brand identities that communicate their values and connect with their target audience.",

    longDescription:
      "Our branding services help businesses create a strong, consistent, and recognizable identity that communicates their values and connects with their target audience. We start by understanding your business, market, competitors, positioning, and brand objectives. Based on these insights, we develop visual elements such as logos, colors, typography, graphics, and other brand assets that create a consistent identity across different platforms. Our branding approach focuses on building a professional and memorable brand presence that can be effectively used across websites, social media, marketing materials, presentations, and other customer touchpoints.",

    bulletTitle:
      "Our Branding Process",

    bullets: [
      "Understanding your business, market, and target audience",
      "Defining brand positioning and visual direction",
      "Creating logo and visual identity concepts",
      "Selecting colors, typography, and supporting graphics",
      "Developing consistent brand guidelines",
      "Applying the brand identity across digital and marketing platforms",
    ],

    provides: [
      "Logo Design",
      "Brand Identity",
      "Color Palette",
      "Typography Selection",
      "Brand Guidelines",
      "Marketing Brand Assets",
    ],
  },

  "digital-marketing": {
    intro:
      "We create digital marketing strategies that help businesses increase online visibility, reach the right audience, and strengthen their digital presence.",

    longDescription:
      "Our digital marketing services help businesses connect with their target audiences through effective digital channels and strategies. We focus on understanding your business objectives, audience behavior, competitors, and market opportunities before developing a suitable marketing approach. Our services can include search engine optimization, social media marketing, content marketing, campaign planning, and performance analysis. By combining strategy, creative content, and continuous performance monitoring, we help businesses improve their online presence and build meaningful connections with potential customers.",

    bulletTitle:
      "Our Digital Marketing Process",

    bullets: [
      "Understanding business goals and target audience",
      "Researching market and competitor activity",
      "Creating a suitable digital marketing strategy",
      "Developing engaging marketing content",
      "Managing digital campaigns and online channels",
      "Monitoring performance and optimizing campaigns",
    ],

    provides: [
      "Digital Marketing Strategy",
      "Social Media Marketing",
      "Content Marketing",
      "Search Engine Optimization",
      "Campaign Management",
      "Marketing Analytics",
    ],
  },

  "software-development": {
    intro:
      "We develop customized software solutions designed to solve business challenges, improve operational efficiency, and support long-term growth.",

    longDescription:
      "Our software development services focus on creating customized solutions that address specific business requirements and operational challenges. We work closely with businesses to understand their processes, requirements, users, and expected outcomes before planning the solution. Our development approach focuses on building reliable, scalable, secure, and maintainable software applications. From requirement analysis and system design to development, testing, deployment, and ongoing improvements, we follow a structured process to deliver software that supports business operations and future growth.",

    bulletTitle:
      "Our Software Development Process",

    bullets: [
      "Understanding business requirements and objectives",
      "Analyzing workflows and system requirements",
      "Planning application architecture and functionality",
      "Developing customized software solutions",
      "Testing functionality, security, and performance",
      "Deploying and maintaining the software solution",
    ],

    provides: [
      "Custom Software Development",
      "Business Applications",
      "Enterprise Software",
      "Workflow Automation",
      "Database Solutions",
      "Software Maintenance",
    ],
  },

  "cloud-solutions": {
    intro:
      "We provide cloud solutions that help businesses improve scalability, flexibility, availability, and operational efficiency.",

    longDescription:
      "Our cloud solutions help businesses adopt and manage modern cloud technologies according to their operational requirements. We focus on understanding existing infrastructure, business needs, application requirements, and future scalability before planning a suitable cloud approach. Our services can support cloud migration, infrastructure setup, application deployment, storage solutions, and cloud optimization. By following structured implementation and monitoring practices, we help businesses create flexible and reliable cloud environments that can support changing business requirements.",

    bulletTitle:
      "Our Cloud Solutions Process",

    bullets: [
      "Understanding existing infrastructure and business requirements",
      "Assessing applications and workloads for cloud readiness",
      "Planning the appropriate cloud architecture",
      "Migrating applications and data when required",
      "Configuring and optimizing cloud environments",
      "Monitoring performance and supporting future improvements",
    ],

    provides: [
      "Cloud Migration",
      "Cloud Infrastructure",
      "Cloud Application Deployment",
      "Cloud Storage Solutions",
      "Cloud Optimization",
      "Cloud Support and Maintenance",
    ],
  },
};

// ======================================================
// NORMALIZE
// ======================================================

const normalizeContent = (data) => {
  if (!data) {
    return null;
  }

  return {
    intro: data.intro || "",

    longDescription:
      data.longDescription ||
      (Array.isArray(data.paragraphs)
        ? data.paragraphs.join("\n\n")
        : ""),

    bulletTitle:
      data.bulletTitle || "",

    bullets: Array.isArray(data.bullets)
      ? data.bullets.filter(Boolean)
      : [],

    provides: Array.isArray(data.provides)
      ? data.provides.filter(Boolean)
      : [],
  };
};

// ======================================================
// SERVICE DETAILS
// ======================================================

export default function ServiceDetails({
  services = [],
}) {
  const { id } = useParams();

  // ====================================================
  // FIND SERVICE
  // ====================================================

  const service = services.find(
    (item) =>
      String(item.id) === String(id)
  );

  // ====================================================
  // NOT FOUND
  // ====================================================

  if (!service) {
    return (
      <div className="min-h-screen bg-white">

        <PageHero
          title="Service Not Found"
          subtitle="The service you are looking for does not exist."
        />

        <section className="px-6 py-20 text-center">

          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Service Not Found
          </h2>

          <p className="mb-8 text-gray-600">
            The requested service could not be found.
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Back to Services
            <ArrowRight size={18} />
          </Link>

        </section>

      </div>
    );
  }

  // ====================================================
  // SERVICE KEY
  // ====================================================

  const serviceKey = service.title
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // ====================================================
  // ADMIN CONTENT CHECK
  // ====================================================

  const hasAdminContent =
    Boolean(service.intro?.trim()) ||
    Boolean(
      service.longDescription?.trim()
    ) ||
    Boolean(service.bulletTitle?.trim()) ||
    (Array.isArray(service.bullets) &&
      service.bullets.length > 0) ||
    (Array.isArray(service.provides) &&
      service.provides.length > 0);

  // ====================================================
  // CONTENT PRIORITY
  // ====================================================

  let content = null;

  if (hasAdminContent) {
    content = normalizeContent(service);
  } else if (serviceContent[serviceKey]) {
    content = normalizeContent(
      serviceContent[serviceKey]
    );
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}

      <PageHero
        title={service.title}
        subtitle={
          service.description ||
          service.shortDescription ||
          "Explore our professional services."
        }
      />

      {/* MAIN */}

      <section className="px-5 py-12 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">

          {/* LEFT */}

          <div>

            {/* INTRO */}

            {content?.intro && (

              <div className="mb-8">

                <p className="text-lg leading-8 text-gray-700">
                  {content.intro}
                </p>

              </div>

            )}

            {/* LONG DESCRIPTION */}

            {content?.longDescription && (

              <div className="mb-10">

                <h2 className="mb-5 text-2xl font-bold text-gray-900">
                  About {service.title}
                </h2>

                {content.longDescription
                  .split(/\n\s*\n/)
                  .map(
                    (
                      paragraph,
                      index
                    ) => (

                      <p
                        key={index}
                        className="mb-5 text-base leading-8 text-gray-600"
                      >
                        {paragraph}
                      </p>

                    )
                  )}

              </div>

            )}

            {/* BULLETS */}

            {content?.bullets?.length > 0 && (

              <div className="mb-12">

                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {content.bulletTitle ||
                    "How We Work"}
                </h2>

                <div className="space-y-4">

                  {content.bullets.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          size={22}
                          className="mt-1 shrink-0 text-green-600"
                        />

                        <p className="text-base leading-7 text-gray-600">
                          {item}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* PROVIDES */}

            {content?.provides?.length > 0 && (

              <div>

                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  What We Provide
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">

                  {content.provides.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:shadow-md"
                      >

                        <div className="flex items-start gap-3">

                          <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0 text-green-600"
                          />

                          <p className="font-medium text-gray-800">
                            {item}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* NO CONTENT */}

            {!content && (

              <div className="rounded-xl bg-gray-50 p-6">

                <p className="text-gray-600">
                  Detailed content for this service
                  has not been added yet.
                </p>

              </div>

            )}

          </div>

          {/* SIDEBAR */}

          <aside className="h-fit rounded-2xl bg-gray-50 p-6">

            <h3 className="mb-5 text-xl font-bold text-gray-900">
              Service Information
            </h3>

            {service.category && (

              <div className="mb-5">

                <p className="mb-1 text-sm text-gray-500">
                  Category
                </p>

                <p className="font-semibold text-gray-900">
                  {service.category}
                </p>

              </div>

            )}

            {service.status && (

              <div className="mb-5">

                <p className="mb-1 text-sm text-gray-500">
                  Status
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    service.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {service.status}
                </span>

              </div>

            )}

            <Link
              to="/services"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              All Services
              <ArrowRight size={18} />
            </Link>

          </aside>

        </div>

      </section>

    </div>
  );
}