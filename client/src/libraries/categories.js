import axios from "axios";

async function fetchAllCategories() {
  const categoriesResponse = await axios.get(
    "http://localhost:3000/categories"
  );
  const categories = createCategoriesTree(categoriesResponse.data);
  return categories;
}

function createCategoriesTree(flatCategoriesFromServer) {
  // create a map of categories to show in UI
  let categoriesMap = new Map();
  flatCategoriesFromServer.forEach((categoryInServer) => {
    categoriesMap.set(categoryInServer.id, {
      id: categoryInServer.id,
      title: categoryInServer.title,
      subCategories: [],
    });
  });

  // assign children to parent categories, if applicable
  flatCategoriesFromServer.forEach((categoryFromServer) => {
    if (categoryFromServer.parentid) {
      const parent = categoriesMap.get(categoryFromServer.parentid);
      if (parent) {
        parent.subCategories.push(categoriesMap.get(categoryFromServer.id));
      }
    }
  });

  // filter main categories with no parents in given categories from server
  let mainCategoriesInServer = flatCategoriesFromServer.filter(
    (categoryFromServer) => {
      if (!categoryFromServer.parentid) {
        return categoryFromServer;
      }
    }
  );

  // get corresponding root categories for UI from categories map
  let rootCategories = [];
  mainCategoriesInServer.forEach((categoryInServer) => {
    rootCategories.push(categoriesMap.get(categoryInServer.id));
  });

  // return root categories
  return rootCategories;
}

export default fetchAllCategories;
