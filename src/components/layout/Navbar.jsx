import React from 'react';
import PropTypes from 'prop-types';

/* Credit to Tailwind documentation https://tailwindui.com/components/application-ui/navigation/navbars for a quick navBar setup */
function Navbar({ title }) {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center text-white">
              <h1>Weather App</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2">
                <a
                  href="/"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </a>

                <a
                  href="sign-in"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.defaultProps = {
  title: 'Weather App',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
