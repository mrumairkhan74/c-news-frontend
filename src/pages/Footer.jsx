import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center bg-gray-100 py-2 text-sm text-gray-600">
      &copy; {new Date().getFullYear()} All Rights Reserved by <span className="font-semibold text-blue-600">C-News</span>
    </footer>
  );
};

export default Footer;
  