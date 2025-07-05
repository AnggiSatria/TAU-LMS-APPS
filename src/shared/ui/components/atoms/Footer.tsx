import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-500 text-sm">
      © {new Date().getFullYear()} LMS Campus. All rights reserved.
    </footer>
  );
}
