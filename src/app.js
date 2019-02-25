"use strict";

import Home from "./views/components/Home.js";
import Error from "./views/components/Error.js";
import List from "./views/components/List.js";
import Friends from "./views/components/Friends.js";
import Logout from "./views/components/Logout.js";
import Navbar from "./views/components/Navbar.js";
import Footer from "./views/components/Footer.js";

import Utils from "./services/Utils.js";

// Supported routes that won't throw an error
const routes = {
  "/": Home,
  "/p/:id": List,
  "/p/:listName": List,
  "/friends": Friends,
  "/logout": Logout,
  "/error": Error
};

// Takes URL, checks the supported routes and renders content
const router = async () => {
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");
  const footer = null || document.getElementById("footer_container");

  // Navbar and footer
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Parsed URL from the addressbar
  let request = Utils.parseRequestURL();

  // Check if the URL has id
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Error
  let page = routes[parsedURL] ? routes[parsedURL] : Error;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Hash change
window.addEventListener("hashchange", router);

// Page load
window.addEventListener("load", router);
