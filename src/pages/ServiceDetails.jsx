
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import PageHero from "../components/PageHero";

// ======================================================
// SERVICE CONTENT
// ======================================================

const serviceContent = {
  // ====================================================
  // WEB DEVELOPMENT
  // ====================================================

  "web-development": {
    intro:
      "We build modern, responsive and scalable websites that help businesses establish a strong digital presence and convert visitors into customers.",

    paragraphs: [
      "Our web development process combines clean design, reliable technology and business-focused functionality. We create websites that are fast, easy to navigate and optimized for different screen sizes, from mobile phones and tablets to large desktop displays.",

      "Whether you need a corporate website, business website, landing page, customer portal or a custom web application, our team can develop a solution around your specific requirements. We focus on creating a strong technical foundation so your website can grow as your business grows.",

      "From the initial planning stage to development, testing and deployment, we work closely with you to make sure the final product reflects your brand and supports your business objectives.",
    ],

    bulletTitle: "Our Web Development Approach",

    bullets: [
      "Understanding your business goals and target audience",
      "Planning the website structure and user journey",
      "Creating responsive and user-friendly interfaces",
      "Developing secure and scalable web functionality",
      "Optimizing performance, accessibility and SEO",
      "Testing across browsers, devices and screen sizes",
    ],

    provides: [
      "Business & Corporate Websites",
      "Responsive Website Development",
      "Custom Web Applications",
      "Landing Pages",
      "Frontend Development",
      "Backend & API Integration",
      "Website Performance Optimization",
      "Deployment & Technical Support",
    ],
  },

  // ====================================================
  // MOBILE APP DEVELOPMENT
  // ====================================================

  "mobile-app-development": {
    intro:
      "We develop intuitive and reliable mobile applications designed to give your customers a seamless experience across modern mobile devices.",

    paragraphs: [
      "A successful mobile application needs more than an attractive interface. It needs thoughtful user experience, reliable performance, secure data handling and an architecture that can support future growth. Our team combines these elements to create mobile solutions that are practical and easy to use.",

      "We work with businesses to understand their application requirements, define the important features and design user flows before development begins. This helps reduce unnecessary complexity and ensures that development remains focused on the actual needs of your users.",

      "From an initial product concept to application development, testing and release, we can support the complete development lifecycle.",
    ],

    bulletTitle: "How We Build Mobile Applications",

    bullets: [
      "Understanding your application idea and business objectives",
      "Defining features and user journeys",
      "Designing simple and intuitive mobile interfaces",
      "Developing reliable application functionality",
      "Integrating APIs, databases and third-party services",
      "Testing performance and usability across devices",
    ],

    provides: [
      "Android Application Development",
      "iOS Application Development",
      "Cross-Platform Applications",
      "UI/UX Design",
      "API & Backend Integration",
      "Database Integration",
      "Application Testing",
      "App Deployment & Maintenance",
    ],
  },

  // ====================================================
  // UI/UX DESIGN
  // ====================================================

  "ui-ux-design": {
    intro:
      "We design intuitive digital experiences that make websites and applications easier to understand, navigate and use.",

    paragraphs: [
      "Good UI/UX design connects business objectives with user expectations. Our design process focuses on understanding what users need, simplifying complex interactions and creating interfaces that feel natural across different devices.",

      "We begin by understanding your product, users and business requirements. Based on these insights, we create user flows, wireframes and interface designs that establish a clear structure before development begins.",

      "The result is a consistent digital experience that combines visual quality with usability, accessibility and business functionality.",
    ],

    bulletTitle: "Our Design Process",

    bullets: [
      "Understanding your users and business requirements",
      "Creating user flows and information architecture",
      "Developing wireframes and page structures",
      "Designing modern and consistent interfaces",
      "Creating responsive layouts for different devices",
      "Preparing designs for smooth development handoff",
    ],

    provides: [
      "Website UI/UX Design",
      "Mobile App UI/UX Design",
      "Wireframing",
      "User Flow Design",
      "Responsive Interface Design",
      "Design Systems",
      "Prototype Creation",
      "Developer Design Handoff",
    ],
  },

  // ====================================================
  // DIGITAL MARKETING
  // ====================================================

  "digital-marketing": {
    intro:
      "We help businesses improve their online visibility and connect with the right audience through focused digital marketing strategies.",

    paragraphs: [
      "Digital marketing is most effective when it is connected to clear business objectives. Our approach focuses on understanding your audience, identifying opportunities and building campaigns that support measurable business outcomes.",

      "We can help businesses improve their online presence through search optimization, content strategies, social media and other digital channels. Each activity is planned according to your industry, audience and growth goals.",

      "Instead of using the same approach for every business, we focus on developing strategies that are relevant to your market and can be continuously improved using performance data.",
    ],

    bulletTitle: "Our Digital Marketing Approach",

    bullets: [
      "Understanding your target audience and market",
      "Researching relevant keywords and opportunities",
      "Planning content and digital campaigns",
      "Improving search engine visibility",
      "Monitoring campaign and website performance",
      "Using insights to continuously improve results",
    ],

    provides: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Digital Campaign Management",
      "Keyword Research",
      "Website SEO Optimization",
      "Performance Reporting",
      "Digital Growth Consulting",
    ],
  },

  // ====================================================
  // SOFTWARE DEVELOPMENT
  // ====================================================

  "software-development": {
    intro:
      "We create custom software solutions that simplify business processes, improve productivity and solve specific operational challenges.",

    paragraphs: [
      "Every business has different processes and requirements. Instead of forcing your workflow into an existing system, custom software can be designed around the way your organization actually operates.",

      "Our team works with you to understand your current processes, identify areas that can be improved and translate those requirements into practical software solutions. We focus on building systems that are reliable, maintainable and capable of supporting future growth.",

      "From internal business tools to customer-facing platforms, we can support the complete development lifecycle from planning and architecture to implementation, testing and deployment.",
    ],

    bulletTitle: "Our Software Development Process",

    bullets: [
      "Understanding business processes and requirements",
      "Planning application architecture",
      "Designing efficient user workflows",
      "Developing modular and maintainable software",
      "Integrating APIs and external systems",
      "Testing, deployment and ongoing improvements",
    ],

    provides: [
      "Custom Business Software",
      "Enterprise Applications",
      "Admin Dashboards",
      "Workflow Automation",
      "API Development",
      "Third-Party Integrations",
      "Database Solutions",
      "Maintenance & Technical Support",
    ],
  },

  // ====================================================
  // CLOUD SOLUTIONS
  // ====================================================

  "cloud-solutions": {
    intro:
      "We help businesses use cloud technologies to build scalable, reliable and flexible digital infrastructure.",

    paragraphs: [
      "Cloud infrastructure can help businesses improve scalability, reliability and operational flexibility. Our team helps organizations identify suitable cloud solutions based on their application requirements and business objectives.",

      "We can support the migration of existing applications and data to cloud environments while also helping teams establish deployment and infrastructure practices that make applications easier to manage.",

      "Our focus is on creating cloud environments that are practical, secure and capable of supporting the changing requirements of your business.",
    ],

    bulletTitle: "Our Cloud Approach",

    bullets: [
      "Understanding existing infrastructure and requirements",
      "Planning suitable cloud architecture",
      "Migrating applications and services",
      "Configuring scalable infrastructure",
      "Improving deployment and monitoring processes",
      "Supporting ongoing cloud optimization",
    ],

    provides: [
      "Cloud Infrastructure Setup",
      "Cloud Migration",
      "Application Deployment",
      "Scalable Cloud Architecture",
      "Cloud Database Solutions",
      "Monitoring & Optimization",
      "Backup & Recovery Solutions",
      "Cloud Technical Support",
    ],
  },
};

// ======================================================
// DEFAULT CONTENT
// ======================================================

const defaultContent = {
  intro:
    "We provide professional digital solutions designed around your business requirements, helping you create better customer experiences and improve the way your organization uses technology.",

  paragraphs: [
    "Our team works closely with you to understand your goals, challenges and target audience before recommending the right approach. This helps us create solutions that are aligned with your actual business requirements rather than using a one-size-fits-all approach.",

    "We combine strategy, design and technology to create digital experiences that are reliable, responsive and easy to use. Every project is planned with scalability and long-term maintainability in mind.",

    "From the initial idea through planning, development, testing and launch, we provide support throughout the project lifecycle.",
  ],

  bulletTitle: "How We Work",

  bullets: [
    "Understanding your business requirements",
    "Planning the right technical approach",
    "Creating a clear and user-friendly experience",
    "Developing and testing the solution",
    "Optimizing performance and reliability",
    "Supporting deployment and future improvements",
  ],

  provides: [
    "Requirement Analysis",
    "Strategy & Planning",
    "UI/UX Design",
    "Responsive Development",
    "Testing & Quality Assurance",
    "Performance Optimization",
    "Deployment",
    "Ongoing Support",
  ],
};

// ======================================================
// COMPONENT
// ======================================================

function ServiceDetails({ services = [] }) {
  const { id } = useParams();

  // ====================================================
  // FIND SERVICE
  // ====================================================

  const service = services.find(
    (item) => String(item.id) === String(id)
  );

  // ====================================================
  // SERVICE NOT FOUND
  // ====================================================

  if (!service) {
    return (
      <div className="px-5 py-32 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Service Not Found
        </h1>

        <Link
          to="/services"
          className="
            mt-5
            inline-block
            font-semibold
            text-indigo-600
            transition-colors
            hover:text-indigo-700
          "
        >
          Back to Services
        </Link>
      </div>
    );
  }

  // ====================================================
  // CREATE SERVICE KEY
  // ====================================================

  const serviceKey = service.title
    ?.toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // ====================================================
  // CHECK IF BACKEND HAS DETAILED CONTENT
  // ====================================================

  const hasBackendContent =
    Boolean(service.intro) ||
    (Array.isArray(service.paragraphs) &&
      service.paragraphs.length > 0) ||
    Boolean(service.bulletTitle) ||
    (Array.isArray(service.bullets) &&
      service.bullets.length > 0) ||
    (Array.isArray(service.provides) &&
      service.provides.length > 0);

  // ====================================================
  // DETERMINE CONTENT SOURCE
  // ====================================================

  let content = null;

  /*
    IMPORTANT:

    If backend has detailed content:
      → Use backend content.

    If backend does NOT have detailed content:
      → Check predefined frontend serviceContent.

    If neither exists:
      → content remains null.

    defaultContent is NOT used here.
  */

  if (hasBackendContent) {
    content = {
      intro: service.intro || "",
      paragraphs: Array.isArray(service.paragraphs)
        ? service.paragraphs
        : [],
      bulletTitle: service.bulletTitle || "",
      bullets: Array.isArray(service.bullets)
        ? service.bullets
        : [],
      provides: Array.isArray(service.provides)
        ? service.provides
        : [],
    };
  } else if (serviceContent[serviceKey]) {
    content = serviceContent[serviceKey];
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* ==================================================
          PAGE HERO
      ================================================== */}

      <PageHero
        badge="Service Details"
        title={service.title}
        description={service.description}
      />

      {/* ==================================================
          SERVICE DETAILS
      ================================================== */}

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-10
            px-4
            sm:px-6
            lg:grid-cols-3
            lg:gap-14
            lg:px-8
          "
        >
          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="min-w-0 lg:col-span-2">

            {/* ==================================================
                CATEGORY
            ================================================== */}

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-indigo-600
                sm:text-sm
                sm:tracking-widest
              "
            >
              {service.category}
            </span>

            {/* ==================================================
                TITLE
            ================================================== */}

            <h2
              className="
                mt-3
                text-3xl
                font-black
                leading-tight
                text-slate-900
                sm:mt-4
                sm:text-4xl
                lg:text-5xl
              "
            >
              {service.title}
            </h2>

            {/* ==================================================
                ONLY SHOW DETAILED CONTENT IF AVAILABLE
            ================================================== */}

            {content && (
              <>
                {/* ==================================================
                    INTRO
                ================================================== */}

                {content.intro && (
                  <p
                    className="
                      mt-5
                      text-base
                      leading-7
                      text-slate-600
                      sm:mt-6
                      sm:text-lg
                      sm:leading-8
                    "
                  >
                    {content.intro}
                  </p>
                )}

                {/* ==================================================
                    PARAGRAPH 1
                ================================================== */}

                {content.paragraphs?.[0] && (
                  <p
                    className="
                      mt-5
                      text-base
                      leading-7
                      text-slate-600
                      sm:leading-8
                    "
                  >
                    {content.paragraphs[0]}
                  </p>
                )}

                {/* ==================================================
                    BULLETS
                ================================================== */}

                {content.bullets?.length > 0 && (
                  <div className="my-8 sm:my-10">

                    <h3
                      className="
                        text-xl
                        font-black
                        text-slate-900
                        sm:text-2xl
                      "
                    >
                      {content.bulletTitle || "Our Approach"}
                    </h3>

                    <ul
                      className="
                        mt-5
                        list-disc
                        space-y-3
                        pl-5
                        marker:text-indigo-600
                      "
                    >
                      {content.bullets.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="
                            pl-1
                            text-sm
                            leading-6
                            text-slate-700
                            sm:text-base
                            sm:leading-7
                          "
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                  </div>
                )}

                {/* ==================================================
                    PARAGRAPH 2
                ================================================== */}

                {content.paragraphs?.[1] && (
                  <p
                    className="
                      text-base
                      leading-7
                      text-slate-600
                      sm:text-lg
                      sm:leading-8
                    "
                  >
                    {content.paragraphs[1]}
                  </p>
                )}

                {/* ==================================================
                    PARAGRAPH 3
                ================================================== */}

                {content.paragraphs?.[2] && (
                  <p
                    className="
                      mt-5
                      text-base
                      leading-7
                      text-slate-600
                      sm:leading-8
                    "
                  >
                    {content.paragraphs[2]}
                  </p>
                )}

                {/* ==================================================
                    WHAT WE PROVIDE
                ================================================== */}

                {content.provides?.length > 0 && (
                  <>
                    <h3
                      className="
                        mt-10
                        text-2xl
                        font-black
                        text-slate-900
                        sm:mt-12
                        sm:text-3xl
                      "
                    >
                      What We Provide
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-600
                        sm:text-base
                      "
                    >
                      Our services are tailored to the requirements
                      of your project. Depending on your goals, we
                      can provide the following solutions:
                    </p>

                    {/* Cards */}

                    <div
                      className="
                        mt-6
                        grid
                        gap-3
                        sm:grid-cols-2
                        sm:gap-4
                      "
                    >
                      {content.provides.map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                            transition-all
                            duration-300
                            hover:border-indigo-200
                            hover:bg-indigo-50/40
                          "
                        >
                          <CheckCircle2
                            size={20}
                            className="
                              mt-0.5
                              shrink-0
                              text-indigo-600
                            "
                          />

                          <span
                            className="
                              text-sm
                              font-medium
                              leading-6
                              text-slate-700
                              sm:text-base
                            "
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

          </div>

          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <aside
            className="
              h-fit
              rounded-2xl
              bg-slate-950
              p-5
              text-white
              sm:p-7
              lg:sticky
              lg:top-24
            "
          >
            <h3
              className="
                text-xl
                font-bold
                sm:text-2xl
              "
            >
              Need This Service?
            </h3>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-slate-400
                sm:text-base
              "
            >
              Tell us about your project requirements and our team
              will help you plan the right digital solution.
            </p>

            {/* Get Quote */}

            <Link
              to="/get-quote"
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-indigo-600
                px-5
                py-3.5
                text-sm
                font-bold
                transition-colors
                hover:bg-indigo-700
                sm:mt-7
                sm:py-4
                sm:text-base
              "
            >
              Get A Quote
              <ArrowRight size={17} />
            </Link>

            {/* Contact */}

            <Link
              to="/contact"
              className="
                mt-3
                block
                text-center
                text-sm
                font-semibold
                text-indigo-400
                transition-colors
                hover:text-indigo-300
              "
            >
              Contact Us
            </Link>
          </aside>

        </div>
      </section>
    </>
  );
}

export default ServiceDetails;

