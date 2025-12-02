import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import BlogPage from "./components/Blog"; // ← Ne
import SinglePost from "./components/SinglePost";
import AdminLogin from "./admin/AdminLogin"; // ← New
import AdminProtectedRoute from "./admin/AdminProtectedRoutes";
import AdminDashboard from "./admin/AdminDashboard";
import CreatePost from "./admin/CreatePost";
import EditPost from "./admin/EditPost";
import AdminLayout from "./components/AdminLayout";
import { HashLink as Link } from "react-router-hash-link";

import { Post } from "./api/usePost";

import { Box } from "@chakra-ui/react";
import "./App.css";
import BlogNavbar from "./components/BlogNavbar";
import ScrollToHash from "./components/ScrollHashLink";

const App = () => {
  const NavbarItems = [
    { title: "Home", link: "/", type: "route" },
    { title: "About", link: "/#about", type: "scroll" },
    { title: "Projects", link: "/#projects", type: "scroll" },
    { title: "Services", link: "/#services", type: "scroll" },
    { title: "Blog", link: "/blog", type: "route" },
    { title: "Contact", link: "/#contact", type: "scroll" },
  ];

  const avatar =
    "https://res.cloudinary.com/dico80rwt/image/upload/f_auto,q_auto/logo_bemxyj.png";
  const avatar2 =
    "https://res.cloudinary.com/dico80rwt/image/upload/f_auto,q_auto/logo3_uxlawu.png";

  return (
    <Routes>
      {/* --------------------------------------------- */}
      {/* 1️⃣ HOME PAGE (scrolling one-page layout)       */}
      {/* --------------------------------------------- */}
      <Route
        path="/"
        element={
          <>
          <ScrollToHash/>
            <Box id="home">
              <div className="house">
                <Navbar listItems={NavbarItems} logo={avatar} logo3={avatar2} />
                <Hero
                  subtitle="I'm Charles, a Full-Stack Developer."
                  highlight="Full-Stack Developer"
                />
              </div>
            </Box>

            <Box id="about">
              <About />
            </Box>

            <Box id="projects">
              <Portfolio />
            </Box>

            <Box id="services">
              <Services />
            </Box>

            <Box id="contact">
              <Contact />
            </Box>

            <Footer />
          </>
        }
      />

      {/* --------------------------------------------- */}
      {/* 2️⃣ BLOG ROUTES                                 */}
      {/* --------------------------------------------- */}

      <Route
        path="/blog"
        element={
          <>
             <BlogNavbar listItems={NavbarItems} logo={avatar} logo3={avatar2} />
            <BlogPage />
            <Footer />
          </>
        }
      />

      <Route path="/blog/:id" element={<SinglePost />} />
      {/* <Route path="/blog/:id" element={<BlogPostPage />} /> */}

      {/* --------------------------------------------- */}
      {/* 3️⃣ ADMIN ROUTES                                */}
      {/* --------------------------------------------- */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout children />
          </AdminProtectedRoute>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <AdminProtectedRoute>
            <CreatePost onCreate={() => console.log("post created")} />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <AdminProtectedRoute>
            <EditPost />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
