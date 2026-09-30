
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
import AdminTeam from "./pages/admin/Team";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminEnquiries from "./pages/admin/Enquiries";
import Settings from "./pages/admin/Settings";

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
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// ======================================================
// ADMIN AUTHENTICATION
// ======================================================

function isAdminLoggedIn() {
  return (
    localStorage.getItem("agency_admin_logged_in") === "true" ||
    localStorage.getItem("adminLoggedIn") === "true"
  );
}

// ======================================================
// PROTECTED ADMIN ROUTE
// ======================================================

function ProtectedAdminRoute({ children }) {
  const loggedIn = isAdminLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/" replace />;
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

  const [projects, setProjects] = useState(() =>
    loadData(
      STORAGE_KEYS.projects,
      initialProjects
    )
  );

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

  const [team, setTeam] = useState(() =>
    loadData(
      STORAGE_KEYS.team,
      initialTeam
    )
  );

  // ====================================================
  // TESTIMONIALS
  // ====================================================

  const [testimonials, setTestimonials] = useState(() =>
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
        service.id === updatedService.id
          ? updatedService
          : service
      )
    );
  };

  const deleteService = (id) => {
    setServices((currentServices) =>
      currentServices.filter(
        (service) => service.id !== id
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
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== id
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
        blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      )
    );
  };

  const deleteBlog = (id) => {
    setBlogs((currentBlogs) =>
      currentBlogs.filter(
        (blog) => blog.id !== id
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
        member.id === updatedMember.id
          ? updatedMember
          : member
      )
    );
  };

  const deleteTeamMember = (id) => {
    setTeam((currentTeam) =>
      currentTeam.filter(
        (member) => member.id !== id
      )
    );
  };

  // ====================================================
  // TESTIMONIAL FUNCTIONS
  // ====================================================

  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      ...testimonial,
      id: testimonial.id || Date.now(),
    };

    setTestimonials((currentTestimonials) => [
      ...currentTestimonials,
      newTestimonial,
    ]);
  };

  const updateTestimonial = (updatedTestimonial) => {
    setTestimonials((currentTestimonials) =>
      currentTestimonials.map((testimonial) =>
        testimonial.id === updatedTestimonial.id
          ? updatedTestimonial
          : testimonial
      )
    );
  };

  const deleteTestimonial = (id) => {
    setTestimonials((currentTestimonials) =>
      currentTestimonials.filter(
        (testimonial) =>
          testimonial.id !== id
      )
    );
  };

  // ====================================================
  // ENQUIRY FUNCTIONS
  // ====================================================

  const addEnquiry = (enquiry) => {
    const newEnquiry = {
      ...enquiry,

      id: enquiry.id || Date.now(),

      status:
        enquiry.status || "New",

      createdAt:
        enquiry.createdAt ||
        new Date().toISOString(),
    };

    setEnquiries((currentEnquiries) => [
      newEnquiry,
      ...currentEnquiries,
    ]);
  };

  const updateEnquiry = (updatedEnquiry) => {
    setEnquiries((currentEnquiries) =>
      currentEnquiries.map((enquiry) =>
        enquiry.id === updatedEnquiry.id
          ? updatedEnquiry
          : enquiry
      )
    );
  };

  const deleteEnquiry = (id) => {
    setEnquiries((currentEnquiries) =>
      currentEnquiries.filter(
        (enquiry) => enquiry.id !== id
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
    // Current entity states
    services,
    projects,
    blogs,
    team,
    testimonials,
    enquiries,

    // State setters (expected by admin CRUD components)
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

        {/* /admin/login redirect: if not logged in -> /, if logged in -> /admin */}
        <Route
          path="/admin/login"
          element={
            isAdminLoggedIn() ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        {/* ==================================================
            ADMIN PANEL
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

              URL:
              /admin and /admin/dashboard
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

              URL:
              /admin/services
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

              URL:
              /admin/projects
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

              URL:
              /admin/blogs
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

              URL:
              /admin/team
          ================================================== */}

          <Route
            path="team"
            element={
              <AdminTeam
                {...adminProps}
              />
            }
          />


          {/* ==================================================
              ADMIN TESTIMONIALS

              URL:
              /admin/testimonials
          ================================================== */}

          <Route
            path="testimonials"
            element={
              <AdminTestimonials
                {...adminProps}
              />
            }
          />


          {/* ==================================================
              ADMIN ENQUIRIES

              URL:
              /admin/enquiries
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

              URL:
              /admin/settings
          ================================================== */}

          <Route
            path="settings"
            element={
              <Settings
                {...adminProps}
              />
            }
          />

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

