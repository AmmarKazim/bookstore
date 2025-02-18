import React, { useEffect, useState } from "react";

function Footer() {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    const getYear = () => {
      const date = new Date();
      setYear(date.getFullYear());
    };
    getYear();
  }, []);

  return (
    <footer className="mt-auto bg-body-secondary">
      <div className="container-fluid mt-5">
        <p className="mb-0 text-center">Amar &copy; {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
