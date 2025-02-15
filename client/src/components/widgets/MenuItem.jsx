import React, { useState, useContext } from "react";
import MenuList from "./MenuList";
import ProductsContext from "../../state_contexts/products_context";

// return each item, recursively call menu item if sub-categories present
function MenuItem(props) {
  const { category } = props;
  // managing these states
  const [expand, setExpand] = useState(false);
  // accessing products state context
  const { products, setProducts, allProducts } = useContext(ProductsContext);

  return (
    <li className="category-list-item">
      {
        <button
          className="m-0 p-0 btn"
          onClick={(e) => {
            // todo: show currently selected category visually (by bolding etc)
            // -------------- Categories to show Books from ---------------
            let categoriesToShowResultsFor = [category.title];
            // get all subcategories of each subcategory for given category (doing it recursively, here)
            const getAllSubCategories = (category) => {
              if (category.subCategories.length > 0) {
                category.subCategories.forEach((cat) => {
                  categoriesToShowResultsFor.push(cat.title);
                  getAllSubCategories(cat);
                });
              }
            };
            // start collecting subcategories from this given category
            getAllSubCategories(category);

            // -------------- Books to show for each Category ---------------
            let booksToShowForEachCategory = [];
            // get all products for each one of above categories
            const getBooksForCategories = (categories) => {
              categories.forEach((category) => {
                const productsOfThisCategory = allProducts.filter(
                  (product, i) => product.category == category
                );
                booksToShowForEachCategory.push(...productsOfThisCategory);
              });
            };
            // start collecting books for these categories
            getBooksForCategories(categoriesToShowResultsFor);

            // showing/setting the results in UI
            setProducts(booksToShowForEachCategory);
          }}
        >
          {category.title}
        </button>
      }
      {/* expand/collapse functionality */}
      {category.subCategories.length > 0 &&
        (expand ? (
          <button className="m-0 p-0 btn" onClick={(_) => setExpand(false)}>
            <i className="bi bi-chevron-up"></i>
          </button>
        ) : (
          <button className="m-0 p-0 btn" onClick={(_) => setExpand(true)}>
            <i className="bi bi-chevron-down"></i>
          </button>
        ))}
      {/* sub menu list */}
      {category.subCategories.length > 0 && expand && (
        <MenuList categories={category.subCategories} />
      )}
    </li>
  );
}

export default MenuItem;
