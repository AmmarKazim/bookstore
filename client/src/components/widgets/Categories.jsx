import React, { useEffect, useRef, useState } from "react";
import MenuList from "./MenuList.jsx";
import SelectedCategoryContext from "../../state_contexts/selected_category_context.js";
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
        <div className="m-0 p-0 d-grid d-md-inline-block" ref={menuRef}>
          <button
            className="btn dropdown-menu-btn m-0 p-0 text-start"
            onClick={(e) => {
              setShowMenu((prev) => !prev);
            }}
          >
            Categories
          </button>
          {showMenu && (
            <div className="dropdown-menu-content">
              <MenuList categories={categories} />
            </div>
          )}
        </div>
      ) : (
        <small>Loading categories...</small>
      )}
    </section>
  );
}

export default Categories;
