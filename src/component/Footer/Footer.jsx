import React from "react";
import { Link } from "react-router";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-base-200 text-base-content">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div className="flex justify-center space-x-3 lg:justify-start text-3xl">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="FoodShare Logo"
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
              />
           
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase font-bold">Product</h3>
            <ul className="space-y-1">
              <li>
                <Link to="#" className="link link-hover">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="tracking-wide uppercase font-bold">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link to="#" className="link link-hover">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="uppercase font-bold">Developers</h3>
            <ul className="space-y-1">
              <li>
                <Link to="#" className="link link-hover">
                  Public API
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="link link-hover">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="uppercase font-bold">Social media</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/Tajuddin80"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-circle btn-primary"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              <a
                href="mailto:tajuddin.cse.dev@gmail.com"
                className="btn btn-sm btn-circle btn-primary"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com/TajuddinCSE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-circle btn-primary"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 text-sm text-center">
        © 2025 Company Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
