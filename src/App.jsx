import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

// ======================================================
// LAYOUTS
// ======================================================

import WebsiteLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";

// ======================================================
// PUBLIC PAGES
// ======================================================

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";

import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

import Team from "./pages/Team";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";
import FAQ from "./pages/FAQ";
import Pricing from "./pages/Pricing";

// ======================================================
// ADMIN PAGES
// ======================================================

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminProjects from "./pages/admin/Projects";
import AdminBlogs from "./pages/admin/Blogs";

import AdminEnquiries from "./pages/admin/Enquiries";


// ======================================================
// DATA
// ======================================================

import {
  initialServices,
  initialProjects,
  initialBlogs,
  initialEnquiries,
  initialTeam,
  initialTestimonials,
} from "./data";

// ======================================================
// LOCAL STORAGE KEYS
// ======================================================

const STORAGE_KEYS = {
  services: "agency_services",
  projects: "agency_projects",
  blogs: "agency_blogs",
  enquiries: "agency_enquiries",
  team: "agency_team",
  testimonials: "agency_testimonials",
};

// ======================================================
// LOAD DATA FROM LOCAL STORAGE
// ======================================================

function loadData(key, defaultData) {
  try {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
      return defaultData;
    }

    const parsedData = JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      return defaultData;
    }

    return parsedData;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);

    return defaultData;
  }
}

// ======================================================
// SAVE DATA TO LOCAL STORAGE
// ======================================================

function saveData(key, data) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// ======================================================
// MERGE PROJECT DATA
// ======================================================
//
// This allows new fields added to initialProjects,
// such as:
//
// - longDescription
// - shortDescription
//
// to automatically appear in old localStorage data.
//
// At the same time, Admin edits are preserved.
//
// ======================================================

function mergeProjects(savedProjects) {
  // ----------------------------------------------------
  // No saved projects
  // ----------------------------------------------------

  if (!Array.isArray(savedProjects)) {
    return initialProjects;
  }

  // ----------------------------------------------------
  // Merge existing initial projects
  // ----------------------------------------------------

  const mergedProjects = initialProjects.map(
    (initialProject) => {
      const savedProject = savedProjects.find(
        (project) =>
          String(project.id) ===
          String(initialProject.id)
      );

      // ------------------------------------------------
      // Project does not exist in localStorage
      // ------------------------------------------------

      if (!savedProject) {
        return initialProject;
      }

      // ------------------------------------------------
      // Project exists
      // ------------------------------------------------

      return {
        // Latest structure from initialProjects
        ...initialProject,

        // Preserve Admin/localStorage changes
        ...savedProject,

        // ------------------------------------------------
        // LONG DESCRIPTION
        // ------------------------------------------------
        //
        // If saved project already has a long description,
        // keep it.
        //
        // If it doesn't, use the latest initialProjects
        // longDescription.
        //
        longDescription:
          savedProject.longDescription?.trim()
            ? savedProject.longDescription
            : initialProject.longDescription || "",

        // ------------------------------------------------
        // SHORT DESCRIPTION
        // ------------------------------------------------

        shortDescription:
          savedProject.shortDescription?.trim()
            ? savedProject.shortDescription
            : initialProject.shortDescription || "",
      };
    }
  );

  // ----------------------------------------------------
  // KEEP ADMIN-CREATED PROJECTS
  // ----------------------------------------------------
  //
  // If a project was created from the Admin panel and
  // does not exist in initialProjects, keep it.
  //
  const customProjects = savedProjects.filter(
    (savedProject) =>
      !initialProjects.some(
        (initialProject) =>
          String(initialProject.id) ===
          String(savedProject.id)
      )
  );

  // ----------------------------------------------------
  // Final project list
  // ----------------------------------------------------

  return [
    ...mergedProjects,
    ...customProjects,
  ];
}

// ======================================================
// ADMIN AUTHENTICATION
// ======================================================

function isAdminLoggedIn() {
  return (
    localStorage.getItem(
      "agency_admin_logged_in"
    ) === "true" ||
    localStorage.getItem(
      "adminLoggedIn"
    ) === "true"
  );
}

// ======================================================
// PROTECTED ADMIN ROUTE
// ======================================================

function ProtectedAdminRoute({ children }) {
  const loggedIn = isAdminLoggedIn();

  if (!loggedIn) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

// ======================================================
// MAIN APP
// ======================================================

function App() {
  // ====================================================
  // SERVICES
  // ====================================================

  const [services, setServices] = useState(() =>
    loadData(
      STORAGE_KEYS.services,
      initialServices
    )
  );

  // ====================================================
  // PROJECTS
  // ====================================================
  //
  // IMPORTANT:
  //
  // Instead of directly loading:
  //
  // loadData(
  //   STORAGE_KEYS.projects,
  //   initialProjects
  // )
  //
  // we merge the saved projects with initialProjects.
  //
  // This allows new longDescription fields to appear
  // without deleting localStorage manually.
  //
  // ====================================================

  const [projects, setProjects] = useState(() => {
    const savedProjects = loadData(
      STORAGE_KEYS.projects,
      null
    );

    return mergeProjects(savedProjects);
  });

  // ====================================================
  // BLOGS
  // ====================================================

  const [blogs, setBlogs] = useState(() =>
    loadData(
      STORAGE_KEYS.blogs,
      initialBlogs
    )
  );

  // ====================================================
  // ENQUIRIES
  // ====================================================

  const [enquiries, setEnquiries] = useState(() =>
    loadData(
      STORAGE_KEYS.enquiries,
      initialEnquiries
    )
  );

  // ====================================================
  // TEAM
  // ====================================================

  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem(
      STORAGE_KEYS.team
    );

    if (!savedTeam) {
      return initialTeam;
    }

    try {
      const parsedTeam = JSON.parse(
        savedTeam
      );

      if (!Array.isArray(parsedTeam)) {
        return initialTeam;
      }

      // Keep latest images from initialTeam
      // while preserving saved team information.
      return parsedTeam.map((member) => {
        const defaultMember =
          initialTeam.find(
            (item) =>
              item.id === member.id
          );

        if (!defaultMember) {
          return member;
        }

        return {
          ...member,
          image: defaultMember.image,
        };
      });
    } catch (error) {
      console.error(
        "Error loading team:",
        error
      );

      return initialTeam;
    }
  });

  // ====================================================
  // TESTIMONIALS
  // ====================================================

  const [testimonials, setTestimonials] =
    useState(() =>
      loadData(
        STORAGE_KEYS.testimonials,
        initialTestimonials
      )
    );

  // ====================================================
  // SAVE SERVICES
  // ====================================================

  useEffect(() => {
    saveData(
      STORAGE_KEYS.services,
      services
    );
  }, [services]);

  // ====================================================
  // SAVE PROJECTS
  // ====================================================

  useEffect(() => {
    saveData(
      STORAGE_KEYS.projects,
      projects
    );
  }, [projects]);

  // ====================================================
  // SAVE BLOGS
  // ====================================================

  useEffect(() => {
    saveData(
      STORAGE_KEYS.blogs,
      blogs
    );
  }, [blogs]);

  // ====================================================
  // SAVE ENQUIRIES
  // ====================================================

  useEffect(() => {
    saveData(
      STORAGE_KEYS.enquiries,
      enquiries
    );
  }, [enquiries]);

  // ====================================================
  // SAVE TEAM
  // ====================================================

  useEffect(() => {
    saveData(
      STORAGE_KEYS.team,
      team
    );
  }, [team]);

  // ====================================================
  // SAVE TESTIMONIALS
  // ====================================================

  useEffect(() => {
    saveData(
      STORAGE_KEYS.testimonials,
      testimonials
    );
  }, [testimonials]);

  // ====================================================
  // SERVICE FUNCTIONS
  // ====================================================

  const addService = (service) => {
    const newService = {
      ...service,
      id: service.id || Date.now(),
    };

    setServices((currentServices) => [
      ...currentServices,
      newService,
    ]);
  };

  const updateService = (updatedService) => {
    setServices((currentServices) =>
      currentServices.map((service) =>
        String(service.id) ===
        String(updatedService.id)
          ? updatedService
          : service
      )
    );
  };

  const deleteService = (id) => {
    setServices((currentServices) =>
      currentServices.filter(
        (service) =>
          String(service.id) !==
          String(id)
      )
    );
  };

  // ====================================================
  // PROJECT FUNCTIONS
  // ====================================================

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: project.id || Date.now(),
    };

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ]);
  };

  const updateProject = (updatedProject) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        String(project.id) ===
        String(updatedProject.id)
          ? updatedProject
          : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) =>
          String(project.id) !==
          String(id)
      )
    );
  };

  // ====================================================
  // BLOG FUNCTIONS
  // ====================================================

  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: blog.id || Date.now(),
    };

    setBlogs((currentBlogs) => [
      ...currentBlogs,
      newBlog,
    ]);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((currentBlogs) =>
      currentBlogs.map((blog) =>
        String(blog.id) ===
        String(updatedBlog.id)
          ? updatedBlog
          : blog
      )
    );
  };

  const deleteBlog = (id) => {
    setBlogs((currentBlogs) =>
      currentBlogs.filter(
        (blog) =>
          String(blog.id) !==
          String(id)
      )
    );
  };

  // ====================================================
  // TEAM FUNCTIONS
  // ====================================================

  const addTeamMember = (member) => {
    const newMember = {
      ...member,
      id: member.id || Date.now(),
    };

    setTeam((currentTeam) => [
      ...currentTeam,
      newMember,
    ]);
  };

  const updateTeamMember = (updatedMember) => {
    setTeam((currentTeam) =>
      currentTeam.map((member) =>
        String(member.id) ===
        String(updatedMember.id)
          ? updatedMember
          : member
      )
    );
  };

  const deleteTeamMember = (id) => {
    setTeam((currentTeam) =>
      currentTeam.filter(
        (member) =>
          String(member.id) !==
          String(id)
      )
    );
  };

  // ====================================================
  // TESTIMONIAL FUNCTIONS
  // ====================================================

  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      ...testimonial,
      id:
        testimonial.id ||
        Date.now(),
    };

    setTestimonials(
      (currentTestimonials) => [
        ...currentTestimonials,
        newTestimonial,
      ]
    );
  };

  const updateTestimonial = (
    updatedTestimonial
  ) => {
    setTestimonials(
      (currentTestimonials) =>
        currentTestimonials.map(
          (testimonial) =>
            String(testimonial.id) ===
            String(updatedTestimonial.id)
              ? updatedTestimonial
              : testimonial
        )
    );
  };

  const deleteTestimonial = (id) => {
    setTestimonials(
      (currentTestimonials) =>
        currentTestimonials.filter(
          (testimonial) =>
            String(testimonial.id) !==
            String(id)
        )
    );
  };

  // ====================================================
  // ENQUIRY FUNCTIONS
  // ====================================================

  const addEnquiry = (enquiry) => {
    const newEnquiry = {
      ...enquiry,

      id:
        enquiry.id ||
        Date.now(),

      status:
        enquiry.status ||
        "New",

      createdAt:
        enquiry.createdAt ||
        new Date().toISOString(),
    };

    setEnquiries(
      (currentEnquiries) => [
        newEnquiry,
        ...currentEnquiries,
      ]
    );
  };

  const updateEnquiry = (
    updatedEnquiry
  ) => {
    setEnquiries(
      (currentEnquiries) =>
        currentEnquiries.map(
          (enquiry) =>
            String(enquiry.id) ===
            String(updatedEnquiry.id)
              ? updatedEnquiry
              : enquiry
        )
    );
  };

  const deleteEnquiry = (id) => {
    setEnquiries(
      (currentEnquiries) =>
        currentEnquiries.filter(
          (enquiry) =>
            String(enquiry.id) !==
            String(id)
        )
    );
  };

  // ====================================================
  // RESET ALL DATA
  // ====================================================

  const resetAllData = () => {
    setServices(initialServices);
    setProjects(initialProjects);
    setBlogs(initialBlogs);
    setEnquiries(initialEnquiries);
    setTeam(initialTeam);
    setTestimonials(initialTestimonials);

    saveData(
      STORAGE_KEYS.services,
      initialServices
    );

    saveData(
      STORAGE_KEYS.projects,
      initialProjects
    );

    saveData(
      STORAGE_KEYS.blogs,
      initialBlogs
    );

    saveData(
      STORAGE_KEYS.enquiries,
      initialEnquiries
    );

    saveData(
      STORAGE_KEYS.team,
      initialTeam
    );

    saveData(
      STORAGE_KEYS.testimonials,
      initialTestimonials
    );
  };

  // ====================================================
  // PUBLIC PAGE PROPS
  // ====================================================

  const publicProps = {
    services,
    projects,
    blogs,
    team,
    testimonials,
    enquiries,

    setEnquiries,

    addEnquiry,
  };

  // ====================================================
  // ADMIN PAGE PROPS
  // ====================================================

  const adminProps = {
    // Current data
    services,
    projects,
    blogs,
    team,
    testimonials,
    enquiries,

    // State setters
    setServices,
    setProjects,
    setBlogs,
    setTeam,
    setTestimonials,
    setEnquiries,

    // Services CRUD
    addService,
    updateService,
    deleteService,

    // Projects CRUD
    addProject,
    updateProject,
    deleteProject,

    // Blogs CRUD
    addBlog,
    updateBlog,
    deleteBlog,

    // Team CRUD
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,

    // Testimonials CRUD
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,

    // Enquiries CRUD
    addEnquiry,
    updateEnquiry,
    deleteEnquiry,

    // Settings
    resetAllData,
  };

  // ====================================================
  // ROUTING
  // ====================================================

  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* ==================================================
            PUBLIC WEBSITE ROUTES
        ================================================== */}

        <Route element={<WebsiteLayout />}>

          {/* HOME */}

          <Route
            path="/"
            element={
              <Home
                {...publicProps}
              />
            }
          />

          {/* ABOUT */}

          <Route
            path="/about"
            element={
              <About
                {...publicProps}
              />
            }
          />

          {/* SERVICES */}

          <Route
            path="/services"
            element={
              <Services
                {...publicProps}
              />
            }
          />

          {/* SERVICE DETAILS */}

          <Route
            path="/services/:id"
            element={
              <ServiceDetails
                services={services}
              />
            }
          />

          {/* PROJECTS */}

          <Route
            path="/projects"
            element={
              <Projects
                {...publicProps}
              />
            }
          />

          {/* PROJECT DETAILS */}

          <Route
            path="/projects/:id"
            element={
              <ProjectDetails
                projects={projects}
              />
            }
          />

          {/* BLOG */}

          <Route
            path="/blog"
            element={
              <Blog
                {...publicProps}
              />
            }
          />

          {/* BLOG DETAILS */}

          <Route
            path="/blog/:id"
            element={
              <BlogDetails
                blogs={blogs}
              />
            }
          />

          {/* TEAM */}

          <Route
            path="/team"
            element={
              <Team
                {...publicProps}
              />
            }
          />

          {/* CONTACT */}

          <Route
            path="/contact"
            element={
              <Contact
                {...publicProps}
              />
            }
          />

          {/* GET QUOTE */}

          <Route
            path="/get-quote"
            element={
              <GetQuote
                {...publicProps}
              />
            }
          />

          {/* FAQ */}

          <Route
            path="/faq"
            element={
              <FAQ
                {...publicProps}
              />
            }
          />

          {/* PRICING */}

          <Route
            path="/pricing"
            element={
              <Pricing
                {...publicProps}
              />
            }
          />

        </Route>

        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        {/* ==================================================
            ADMIN LOGIN REDIRECT
        ================================================== */}

        <Route
          path="/admin/login"
          element={
            isAdminLoggedIn() ? (
              <Navigate
                to="/admin"
                replace
              />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />

        {/* ==================================================
            PROTECTED ADMIN PANEL
        ================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >

          {/* ==================================================
              ADMIN DASHBOARD
          ================================================== */}

          <Route
            index
            element={
              <Dashboard
                {...adminProps}
              />
            }
          />

          <Route
            path="dashboard"
            element={
              <Dashboard
                {...adminProps}
              />
            }
          />

          {/* ==================================================
              ADMIN SERVICES
          ================================================== */}

          <Route
            path="services"
            element={
              <AdminServices
                {...adminProps}
              />
            }
          />

          {/* ==================================================
              ADMIN PROJECTS
          ================================================== */}

          <Route
            path="projects"
            element={
              <AdminProjects
                {...adminProps}
              />
            }
          />

          {/* ==================================================
              ADMIN BLOGS
          ================================================== */}

          <Route
            path="blogs"
            element={
              <AdminBlogs
                {...adminProps}
              />
            }
          />

          {/* ==================================================
              ADMIN TEAM
          ================================================== */}

          

          {/* ==================================================
              ADMIN TESTIMONIALS
          ================================================== */}

         

          {/* ==================================================
              ADMIN ENQUIRIES
          ================================================== */}

          <Route
            path="enquiries"
            element={
              <AdminEnquiries
                {...adminProps}
              />
            }
          />

          {/* ==================================================
              ADMIN SETTINGS
          ================================================== */}

          

        </Route>

        {/* ==================================================
            UNKNOWN URL
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </>
  );
}

export default App;