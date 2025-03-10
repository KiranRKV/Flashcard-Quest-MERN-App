// client\src\pages\About.jsx

import React from "react";

const AboutUs = () => {
  window.scrollTo(0, 0);
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            About Us
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Learn more about our vision, mission, and the values that guide our
            business.
          </p>
        </div>
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl leading-8 font-extrabold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              Our mission is to provide innovative and sustainable solutions
              that improve the way people live and work. We strive to lead with
              creativity and integrity, impacting the community and the world
              positively.
            </p>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl leading-8 font-extrabold text-gray-900">
              Our Vision
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              We envision a world where technology and innovation seamlessly
              integrate to fulfill everyday needs, making life simpler and
              businesses more efficient. We aim to be at the forefront of
              technological advancement, driving progress and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
