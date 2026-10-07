import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  CheckCircle2,
} from "lucide-react";

import { nextId } from "../../utils";

// ======================================================
// PREDEFINED SERVICE CONTENT
// ======================================================

const serviceContent = {
  "web-development": {
    intro:
      "We create modern, responsive, secure, and high-performing websites that help businesses build a strong digital presence and achieve their business goals.",

    longDescription:
      "Our web development services are focused on creating modern, responsive, secure, and high-performing websites that support your business goals. We develop websites that are designed to provide a seamless experience across desktops, tablets, and mobile devices. From business websites and corporate portals to custom web applications, we combine clean development practices, intuitive functionality, and responsive design to deliver reliable digital solutions. Our approach includes understanding your requirements, planning the website structure, developing the required features, testing functionality and performance, and ensuring the final website is easy to maintain and scalable for future growth.",

    bulletTitle: "Our Web Development Process",

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

    bulletTitle: "Our UI/UX Design Process",

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

    bulletTitle: "Our Mobile App Development Process",

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

    bulletTitle: "Our SEO Process",

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

    bulletTitle: "Our Branding Process",

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

    bulletTitle: "Our Digital Marketing Process",

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

    bulletTitle: "Our Software Development Process",

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

    bulletTitle: "Our Cloud Solutions Process",

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
// NORMALIZE CONTENT
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

    bulletTitle: data.bulletTitle || "",

    bullets: Array.isArray(data.bullets)
      ? data.bullets.filter(Boolean)
      : [],

    provides: Array.isArray(data.provides)
      ? data.provides.filter(Boolean)
      : [],
  };
};

// ======================================================
// COMPONENT
// ======================================================

function Services({
  services = [],
  setServices,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewingService, setViewingService] = useState(null);

  const emptyForm = {
    title: "",
    category: "",
    description: "",
    status: "Active",

    intro: "",
    longDescription: "",
    bulletTitle: "",
    bulletsText: "",
    providesText: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const modalRef = useRef(null);
  const viewModalRef = useRef(null);

  // ======================================================
  // CATEGORIES
  // ======================================================

  const categories = useMemo(() => {
    const values = services
      .map((service) => service.category)
      .filter(Boolean);

    return [
      "All",
      ...Array.from(new Set(values)),
    ];
  }, [services]);

  // ======================================================
  // FILTER SERVICES
  // ======================================================

  const filteredServices = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !searchValue ||
        service.title
          ?.toLowerCase()
          .includes(searchValue) ||
        service.category
          ?.toLowerCase()
          .includes(searchValue) ||
        service.description
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        service.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        service.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    services,
    search,
    statusFilter,
    categoryFilter,
  ]);

  // ======================================================
  // GET CONTENT FOR SERVICE
  // ======================================================

  const getViewContent = (service) => {
    if (!service) {
      return null;
    }

    const serviceKey = service.title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const hasAdminContent =
      Boolean(service.intro?.trim()) ||
      Boolean(service.longDescription?.trim()) ||
      Boolean(service.bulletTitle?.trim()) ||
      (Array.isArray(service.bullets) &&
        service.bullets.length > 0) ||
      (Array.isArray(service.provides) &&
        service.provides.length > 0);

    if (hasAdminContent) {
      return normalizeContent(service);
    }

    if (serviceContent[serviceKey]) {
      return normalizeContent(
        serviceContent[serviceKey]
      );
    }

    return null;
  };

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingService(null);

    setFormData({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (service) => {
    setEditingService(service);

    const serviceKey = service.title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const hasAdminContent =
      Boolean(service.intro?.trim()) ||
      Boolean(service.longDescription?.trim()) ||
      Boolean(service.bulletTitle?.trim()) ||
      (Array.isArray(service.bullets) &&
        service.bullets.length > 0) ||
      (Array.isArray(service.provides) &&
        service.provides.length > 0);

    const content = hasAdminContent
      ? normalizeContent(service)
      : serviceContent[serviceKey]
        ? normalizeContent(
            serviceContent[serviceKey]
          )
        : {
            intro: "",
            longDescription: "",
            bulletTitle: "",
            bullets: [],
            provides: [],
          };

    setFormData({
      title: service.title || "",

      category:
        service.category || "",

      description:
        service.description || "",

      status:
        service.status || "Active",

      intro:
        content.intro || "",

      longDescription:
        content.longDescription || "",

      bulletTitle:
        content.bulletTitle || "",

      bulletsText: Array.isArray(
        content.bullets
      )
        ? content.bullets.join("\n")
        : "",

      providesText: Array.isArray(
        content.provides
      )
        ? content.provides.join("\n")
        : "",
    });

    setShowModal(true);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);

    setFormData({
      ...emptyForm,
    });
  };

  // ======================================================
  // OPEN VIEW MODAL
  // ======================================================

  const openViewModal = (service) => {
    setViewingService(service);
  };

  // ======================================================
  // CLOSE VIEW MODAL
  // ======================================================

  const closeViewModal = () => {
    setViewingService(null);
  };

  // ======================================================
  // FORM SUBMIT
  // ======================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter service title.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter service category.");
      return;
    }

    const bullets = formData.bulletsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const provides = formData.providesText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    // ====================================================
    // UPDATE SERVICE
    // ====================================================

    if (editingService) {
      const updatedService = {
        ...editingService,

        title:
          formData.title.trim(),

        category:
          formData.category.trim(),

        description:
          formData.description.trim(),

        status:
          formData.status,

        intro:
          formData.intro.trim(),

        longDescription:
          formData.longDescription.trim(),

        bulletTitle:
          formData.bulletTitle.trim(),

        bullets,

        provides,
      };

      setServices((currentServices) =>
        currentServices.map((service) =>
          String(service.id) ===
          String(updatedService.id)
            ? updatedService
            : service
        )
      );

      if (
        viewingService &&
        String(viewingService.id) ===
          String(updatedService.id)
      ) {
        setViewingService(updatedService);
      }

      closeModal();

      return;
    }

    // ====================================================
    // ADD SERVICE
    // ====================================================

    const newService = {
      id: nextId(services),

      title:
        formData.title.trim(),

      category:
        formData.category.trim(),

      description:
        formData.description.trim(),

      status:
        formData.status,

      isCustom: true,

      intro:
        formData.intro.trim(),

      longDescription:
        formData.longDescription.trim(),

      bulletTitle:
        formData.bulletTitle.trim(),

      bullets,

      provides,
    };

    setServices((currentServices) => [
      ...currentServices,
      newService,
    ]);

    closeModal();
  };

  // ======================================================
  // DELETE SERVICE
  // ======================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    setServices((currentServices) =>
      currentServices.filter(
        (service) =>
          String(service.id) !==
          String(id)
      )
    );

    if (
      viewingService &&
      String(viewingService.id) ===
        String(id)
    ) {
      setViewingService(null);
    }
  };

  // ======================================================
  // ESCAPE KEY
  // ======================================================

  useEffect(() => {
    if (!showModal && !viewingService) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (showModal) {
        closeModal();
        return;
      }

      if (viewingService) {
        closeViewModal();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    showModal,
    viewingService,
  ]);

  // ======================================================
  // LOCK BACKGROUND SCROLL
  // ======================================================

  useEffect(() => {
    if (!showModal && !viewingService) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    const originalPaddingRight =
      document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    document.body.style.overflow =
      "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight =
        `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow =
        originalOverflow;

      document.body.style.paddingRight =
        originalPaddingRight;
    };
  }, [
    showModal,
    viewingService,
  ]);

  // ======================================================
  // FOCUS MODAL
  // ======================================================

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const timer = setTimeout(() => {
      modalRef.current?.focus();
    }, 100);

    return () =>
      clearTimeout(timer);
  }, [showModal]);

  // ======================================================
  // FOCUS VIEW MODAL
  // ======================================================

  useEffect(() => {
    if (!viewingService) {
      return;
    }

    const timer = setTimeout(() => {
      viewModalRef.current?.focus();
    }, 100);

    return () =>
      clearTimeout(timer);
  }, [viewingService]);

  // ======================================================
  // STATUS CLASS
  // ======================================================

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Inactive") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const viewContent =
    getViewContent(viewingService);

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <div className="min-h-screen w-full min-w-0 bg-gray-50 p-3 sm:p-6 lg:p-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">
            Services
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your services and their content.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* ==================================================
          FILTERS
      ================================================== */}

      <div className="mb-5 w-full min-w-0">

        <div className="grid grid-cols-1 gap-3 min-[350px]:grid-cols-2 lg:grid-cols-5">

          {/* SEARCH */}

          <div className="relative min-w-0 min-[350px]:col-span-2 lg:col-span-3">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search services..."
              className="w-full min-w-0 rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
            />

          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="min-w-0 w-full cursor-pointer rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            className="min-w-0 w-full cursor-pointer rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* ==================================================
          DESKTOP TABLE
      ================================================== */}

      <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-gray-50 text-xs uppercase text-gray-500">

              <tr>

                <th className="px-5 py-4">
                  ID
                </th>

                <th className="px-5 py-4">
                  Service
                </th>

                <th className="px-5 py-4">
                  Category
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredServices.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No services found.
                  </td>
                </tr>
              ) : (
                filteredServices.map(
                  (service) => (
                    <tr
                      key={service.id}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-5 py-4 text-sm font-medium text-gray-600">
                        {service.id}
                      </td>

                      <td className="px-5 py-4">

                        <div className="font-semibold text-gray-900">
                          {service.title}
                        </div>

                        <div className="mt-1 max-w-md truncate text-xs text-gray-500">
                          {service.description ||
                            "No description"}
                        </div>

                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {service.category}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            service.status
                          )}`}
                        >
                          {service.status}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openViewModal(
                                service
                              )
                            }
                            className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                            title="View"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                service
                              )
                            }
                            className="cursor-pointer rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            title="Edit"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                service.id
                              )
                            }
                            className="cursor-pointer rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==================================================
          MOBILE CARDS
      ================================================== */}

      <div className="space-y-4 md:hidden">

        {filteredServices.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            No services found.
          </div>
        ) : (
          filteredServices.map(
            (service) => (
              <div
                key={service.id}
                className="min-w-0 rounded-xl bg-white p-4 shadow-sm"
              >

                <div className="flex min-w-0 items-start justify-between gap-3">

                  <div className="min-w-0">

                    <div className="text-xs font-medium text-gray-400">
                      {service.id}
                    </div>

                    <h3 className="mt-1 truncate text-base font-semibold text-gray-900">
                      {service.title}
                    </h3>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {service.category}
                    </p>

                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      service.status
                    )}`}
                  >
                    {service.status}
                  </span>

                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {service.description ||
                    "No description available."}
                </p>

                <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">

                  <button
                    type="button"
                    onClick={() =>
                      openViewModal(service)
                    }
                    className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(service)
                    }
                    className="cursor-pointer rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        service.id
                      )
                    }
                    className="cursor-pointer rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>
            )
          )
        )}

      </div>

      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 p-3 pt-3 backdrop-blur-sm sm:p-5 sm:pt-5"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div
            ref={modalRef}
            tabIndex="-1"
            className="mt-0 flex max-h-[calc(100vh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none sm:max-h-[calc(100vh-2.5rem)]"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">

              <div className="min-w-0">

                <h2 className="text-lg font-bold text-gray-900">
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editingService
                    ? "Update the service details and content."
                    : "Add a new service to your website."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="ml-3 shrink-0 cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >

              {/* SCROLLABLE CONTENT */}

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">

                <div className="grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 min-[350px]:gap-5">

                  {/* SERVICE TITLE */}

                  <div className="min-w-0">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Service Title
                    </label>

                    <input
                      type="text"
                      value={formData.title}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          title:
                            event.target.value,
                        })
                      }
                      placeholder="Enter service title"
                      className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                    />

                  </div>

                  {/* CATEGORY */}

                  <div className="min-w-0">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Category
                    </label>

                    <input
                      type="text"
                      value={formData.category}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          category:
                            event.target.value,
                        })
                      }
                      placeholder="Enter category"
                      className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                    />

                  </div>

                  {/* STATUS */}

                  <div className="min-w-0">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Status
                    </label>

                    <select
                      value={formData.status}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          status:
                            event.target.value,
                        })
                      }
                      className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </div>

                  {/* DESCRIPTION */}

                  <div className="min-w-0 min-[350px]:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          description:
                            event.target.value,
                        })
                      }
                      placeholder="Enter short service description"
                      className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                    />

                  </div>

                  {/* INTRODUCTION */}

                  <div className="min-w-0 min-[350px]:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Introduction
                    </label>

                    <textarea
                      rows="4"
                      value={formData.intro}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          intro:
                            event.target.value,
                        })
                      }
                      placeholder="Enter introduction"
                      className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-slate-500"
                    />

                  </div>

                  {/* LONG DESCRIPTION */}

                  <div className="min-w-0 min-[350px]:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Long Description
                    </label>

                    <textarea
                      rows="7"
                      value={
                        formData.longDescription
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          longDescription:
                            event.target.value,
                        })
                      }
                      placeholder="Enter detailed service description. Use a blank line to create separate paragraphs."
                      className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-slate-500"
                    />

                  </div>

                  {/* BULLET TITLE */}

                  <div className="min-w-0 min-[350px]:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Process / Bullet Section Title
                    </label>

                    <input
                      type="text"
                      value={
                        formData.bulletTitle
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          bulletTitle:
                            event.target.value,
                        })
                      }
                      placeholder="Example: Our Web Development Process"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                    />

                  </div>

                  {/* PROCESS POINTS */}

                  <div className="min-w-0">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Process Points
                    </label>

                    <textarea
                      rows="8"
                      value={
                        formData.bulletsText
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          bulletsText:
                            event.target.value,
                        })
                      }
                      placeholder="Enter one point per line"
                      className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-slate-500"
                    />

                    <p className="mt-1 text-xs text-gray-400">
                      Enter each point on a new line.
                    </p>

                  </div>

                  {/* WHAT WE PROVIDE */}

                  <div className="min-w-0">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      What We Provide
                    </label>

                    <textarea
                      rows="8"
                      value={
                        formData.providesText
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          providesText:
                            event.target.value,
                        })
                      }
                      placeholder="Enter one service per line"
                      className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-slate-500"
                    />

                    <p className="mt-1 text-xs text-gray-400">
                      Enter each item on a new line.
                    </p>

                  </div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-200 bg-white px-4 py-3 sm:flex-row sm:justify-end sm:px-6 sm:py-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full cursor-pointer rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                >
                  {editingService
                    ? "Update Service"
                    : "Add Service"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==================================================
          VIEW MODAL
      ================================================== */}

      {viewingService && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 p-3 pt-3 backdrop-blur-sm sm:p-5 sm:pt-5"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeViewModal();
            }
          }}
        >

          <div
            ref={viewModalRef}
            tabIndex="-1"
            className="mt-0 flex max-h-[calc(100vh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none sm:max-h-[calc(100vh-2.5rem)]"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            {/* VIEW HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">

              <div className="min-w-0">

                <h2 className="truncate text-lg font-bold text-gray-900">
                  {viewingService.title}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Service Details
                </p>

              </div>

              <button
                type="button"
                onClick={closeViewModal}
                className="ml-3 shrink-0 cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>

            </div>

            {/* VIEW CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">

              {/* BASIC INFO */}

              <div className="grid grid-cols-1 gap-3 min-[350px]:grid-cols-2 sm:grid-cols-3 sm:gap-4">

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs font-medium uppercase text-gray-400">
                    Service ID
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {viewingService.id}
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs font-medium uppercase text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {viewingService.category}
                  </p>

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs font-medium uppercase text-gray-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      viewingService.status
                    )}`}
                  >
                    {viewingService.status}
                  </span>

                </div>

              </div>

              {/* DESCRIPTION */}

              {viewingService.description && (
                <section className="mt-6">

                  <h3 className="text-base font-bold text-gray-900">
                    Description
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {viewingService.description}
                  </p>

                </section>
              )}

              {/* CONTENT */}

              {viewContent ? (
                <>

                  {/* INTRO */}

                  {viewContent.intro && (
                    <section className="mt-6">

                      <h3 className="text-base font-bold text-gray-900">
                        Introduction
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {viewContent.intro}
                      </p>

                    </section>
                  )}

                  {/* LONG DESCRIPTION */}

                  {viewContent.longDescription && (
                    <section className="mt-6">

                      <h3 className="text-base font-bold text-gray-900">
                        About{" "}
                        {viewingService.title}
                      </h3>

                      <div className="mt-3 space-y-4">

                        {viewContent.longDescription
                          .split(/\n\s*\n/)
                          .map(
                            (
                              paragraph,
                              index
                            ) => (
                              <p
                                key={index}
                                className="text-sm leading-7 text-gray-600"
                              >
                                {paragraph}
                              </p>
                            )
                          )}

                      </div>

                    </section>
                  )}

                  {/* PROCESS */}

                  {viewContent.bullets
                    .length > 0 && (
                    <section className="mt-6">

                      <h3 className="text-base font-bold text-gray-900">
                        {viewContent.bulletTitle ||
                          "Our Process"}
                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                        {viewContent.bullets.map(
                          (
                            bullet,
                            index
                          ) => (
                            <div
                              key={index}
                              className="flex min-w-0 gap-3 rounded-xl bg-gray-50 p-4"
                            >

                              <CheckCircle2
                                size={19}
                                className="mt-0.5 shrink-0 text-green-600"
                              />

                              <p className="min-w-0 text-sm leading-6 text-gray-600">
                                {bullet}
                              </p>

                            </div>
                          )
                        )}

                      </div>

                    </section>
                  )}

                  {/* PROVIDES */}

                  {viewContent.provides
                    .length > 0 && (
                    <section className="mt-6">

                      <h3 className="text-base font-bold text-gray-900">
                        What We Provide
                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-3 min-[350px]:grid-cols-2 lg:grid-cols-3">

                        {viewContent.provides.map(
                          (
                            item,
                            index
                          ) => (
                            <div
                              key={index}
                              className="min-w-0 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm font-medium text-gray-700"
                            >
                              {item}
                            </div>
                          )
                        )}

                      </div>

                    </section>
                  )}

                </>
              ) : (
                <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center">

                  <p className="text-sm text-gray-500">
                    No detailed content is available for this service.
                  </p>

                </div>
              )}

            </div>

            {/* VIEW FOOTER */}

            <div className="flex shrink-0 justify-end border-t border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">

             

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Services;