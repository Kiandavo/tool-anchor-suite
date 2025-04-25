
import React from 'react';
import { Mail, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <div>
      <div className="flex items-center mb-4 mt-6">
        <Mail size={22} className="ml-3 text-primary" />
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-100">تماس با ما</h4>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center pr-9">
        <span className="ml-2">info@helpfuladvertising.com</span>
      </div>

      <div className="flex items-center mb-4 mt-6">
        <Instagram size={22} className="ml-3 text-primary" />
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-100">اینستاگرام</h4>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center pr-9">
        <a 
          href="https://www.instagram.com/kiandavo" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline"
        >
          @kiandavo
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
