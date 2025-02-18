import React, { useEffect, useRef, useState } from "react";
import MenuList from "./MenuList.jsx";
import SelectedCategoryContext from "../../state_contexts/selected_category_context.js";
// to show categories menu
function Categories({ categories }) {
  // manage categories menu state
  const [showMenu, setShowMenu] = useState(false);
  // state for currently selected category (to highlight that visually)
  const [selectedCategory, setSelectedCategory] = useState("");
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
              <SelectedCategoryContext.Provider
                value={{ selectedCategory, setSelectedCategory }}
              >
                <MenuList categories={categories} />
              </SelectedCategoryContext.Provider>
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
