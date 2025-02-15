import React, { useEffect, useRef, useState } from "react";
import MenuList from "./MenuList.jsx";

// to show categories menu
function Categories({ categories }) {
  // manage categories menu state
  const [showMenu, setShowMenu] = useState(false);
  // ref to handle outside click
  const menuRef = useRef(null);

  // to hide/unhide categories menu when touched outside of menu
  useEffect(() => {
    const handleClickOutsideOfMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideOfMenu);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideOfMenu);
  }, [menuRef]);

  return (
    <section className="m-0 p-0">
      {categories && categories.length > 0 ? (
        <div className="m-0 p-0" ref={menuRef}>
          <div className="d-grid">
            <button
              className="btn dropdown-menu-btn m-0 p-0 text-start"
              onClick={(e) => {
                setShowMenu((prev) => !prev);
              }}
            >
              Categories
            </button>
          </div>
          {showMenu && (
            <div className="dropdown-menu-content">
              <MenuList categories={categories} />
            </div>
          )}
        </div>
      ) : (
        <p className="white-space-none">Loading categories...</p>
      )}
    </section>
  );
}

export default Categories;
