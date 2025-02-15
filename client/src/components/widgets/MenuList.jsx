import React from "react";
import MenuItem from "./MenuItem";

// return menu-item for each category entry
function MenuList(props) {
  return (
    <menu className="my-2 ps-4 pe-2">
      {props.categories.map((category, i) => (
        <MenuItem key={i} category={category} />
      ))}
    </menu>
  );
}

export default MenuList;
