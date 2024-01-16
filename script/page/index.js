let search_ingredients = [];
let search_ustensil = [];
let search_appareil = [];

const ingredientSearchInput = document.getElementById("ingredients_search");
  const ustensilSearchInput = document.getElementById("ustensils_search");
  const appareilSearchInput = document.getElementById("appareils_search");


//fonction affichage de liste de filtres
async function renderRecipes(dataRecette) {
  const recetteSection = document.getElementById("section");
  // nettoie la liste de recherche
  document.querySelector(".listeRecettes").innerHTML = "";
  // nettoie les filtres
  document.getElementById("container_ingredients").innerHTML = "";
  document.getElementById("container_ustensils").innerHTML = "";
  document.getElementById("container_appareils").innerHTML = "";

  let ingredients = [];
  let ustensils = [];
  let appliance = [];

  dataRecette.forEach((recipe) => {
    const modelRecette = recetteFactory(recipe);
    const recetteCardDom = modelRecette.getFicheRecette();
    recetteSection.appendChild(recetteCardDom);

    //ingredients
    recipe.ingredients.forEach((ingr) => {
      if (!ingredients.includes(ingr.ingredient)) {
        ingredients.push(ingr.ingredient);
        const li = document.createElement("LI");
        li.classList.add("ingredients_item");
        li.textContent = ingr.ingredient;
        document.getElementById("container_ingredients").appendChild(li);
      }
    });
    // ustensils
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
        const li = document.createElement("LI");
        li.classList.add("ustensil_item");
        li.textContent = ustensil;
        document.getElementById("container_ustensils").appendChild(li);
      }
    });
  
    // appareils

    if (recipe.appliance != "" && !appliance.includes(recipe.appliance)) {
      appliance.push(recipe.appliance);
      const li = document.createElement("LI");
      li.classList.add("appareils_item");
      li.textContent = recipe.appliance;
      document.getElementById("container_appareils").appendChild(li);
    }
  });

  updateRecipeCount();
  
}

function getSearchParams() {
  let search_query = document.getElementById("field_search").value;

  return {
    search_query: search_query,
    search_filters: {
      ingredients: search_ingredients,
      appareil: search_appareil,
      ustensil: search_ustensil,
    },
  };
}

function searchRecipesClassic(recipes, searchParams) {
  let results = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let ingredientMatch = true;
    let appareilMatch = true;
    let ustensilMatch = true;

    // Vérifier si les filtres sont définis et, le cas échéant, si la recette correspond au filtre
    for (let j = 0; j < searchParams.search_filters.ingredients.length; j++) {
      const ingredient = searchParams.search_filters.ingredients[j].toLowerCase();
      const recipeIngredients = recipe.ingredients.map((elt) => elt.ingredient.toLowerCase());

      if (!recipeIngredients.includes(ingredient)) {
        ingredientMatch = false;
        break;
      }
    }

    //if (searchParams.search_filters.appareil) {
    // const appareil = searchParams.search_filters.appareil.toLowerCase();
    // if (!recipe.appliance.toLowerCase().includes(appareil)) {
    //  appareilMatch = false;
    //  }
    //}

    //if (searchParams.search_filters.ustensil) {
    //  const ustensil = searchParams.search_filters.ustensil.toLowerCase();
    //if (!recipe.ustensils.some(ust => ust.toLowerCase().includes(ustensil))) {
    //    ustensilMatch = false;
    //}
    //}

    // Vérifier si la recette correspond à la requête de recherche (dans le nom, la description ou les ingrédients)
    const queryMatch =
      recipe.name.toLowerCase().includes(searchParams.search_query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchParams.search_query.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>ingredient.ingredient.toLowerCase().includes(searchParams.search_query.toLowerCase()));

    // Si la recette correspond à la fois à la requête de recherche et à tous les filtres, l'ajouter aux résultats
    if (queryMatch && ingredientMatch && appareilMatch && ustensilMatch) {
      results.push(recipe);
    }
  }

  return results;
}


function searchRecipes(recipes) {
  let searchParams = getSearchParams();
  let results = searchRecipesClassic(recipes, searchParams);
  renderRecipes(results);
}

function updateList(type, value) {
  // Mettez à jour la liste d'ingrédients, d'ustensiles ou d'appareils en fonction de l'interaction de l'utilisateur
  if (type === "ingredients" && !search_ingredients.includes(value)) {
    search_ingredients.push(value);
    searchRecipes(recipes); // Effectuez la recherche
  } else if (type === "ustensils" && !search_ustensil.includes(value)) {
    search_ustensil.push(value);
    searchRecipes(recipes); // Effectuez la recherche
  } else if (type === "appareils" && !search_appareil.includes(value)) {
    search_appareil.push(value);
    searchRecipes(recipes); // Effectuez la recherche
  }
}







function initEvents() {
  document.getElementById("field_search").addEventListener("input", function (event) {
      const inputValue = event.target.value.trim().toLowerCase();

      if (event.target.value.length >= 3) {
        // Vérifiez si aucun tag n'est actif
        if (search_ingredients.length === 0 &&
          search_ustensil.length === 0 &&
          search_appareil.length === 0) {
          // Si aucun tag n'est actif, effectuez la recherche
          searchRecipes(recipes);
        } else {
          search_ingredients = [...search_ingredients, inputValue];
          search_ustensil = [...search_ustensil, inputValue];
          search_appareil = [...search_appareil, inputValue];
          // Effectuez la recherche
          searchRecipes(recipes);
        }
      } else {
        // Effacez les filtres de recherche et réinitialisez la liste
        search_ingredients = [];
        search_ustensil = [];
        search_appareil = [];
        renderRecipes(recipes);
      }
    });

    function toggleDropdown(type) {
      const filterElement = document.getElementById("filtre_" + type);
      const downArrowElement = document.getElementById(type + "_down");
      const upArrowElement = document.getElementById(type + "_up");
    
      if (filterElement.style.display === "none" || filterElement.style.display === "") {
        // L'élément est caché, le montrer
        filterElement.style.display = "block";
        downArrowElement.style.display = "none";
        upArrowElement.style.display = "block";
      } else {
        // L'élément est visible, le cacher
        filterElement.style.display = "none";
        downArrowElement.style.display = "block";
        upArrowElement.style.display = "none";
      }
    }
    
    // Attachez cette fonction aux éléments .dropdown_btn
    document.querySelectorAll(".dropdown_btn").forEach((elt) => elt.addEventListener("click", function (event) {
      let type = "ingredients";
      if (event.target.classList.contains("btn_appareils")) type = "appareils";
      if (event.target.classList.contains("btn_ustensils")) type = "ustensils";
      toggleDropdown(type);
    }));
  
  initializeFiltering(ingredientSearchInput, ustensilSearchInput, appareilSearchInput);

  //////////// Ustensil ///////
  const listUstensils = document.querySelectorAll(".ustensil_item");

  listUstensils.forEach((e) => {
    e.addEventListener("click", (event) => {
      const ustensil = event.target.innerText;

      // Vérifiez si le tag existe déjà dans le conteneur de tags
      const tagContainer = document.getElementById("tags_container"); // Remplacez "tags_container" par l'ID de votre conteneur de tags
      const existingTags = tagContainer.querySelectorAll(".tag");

      for (const existingTag of existingTags) {
        if (existingTag.textContent === ustensil) {
          // Le tag existe déjà, ne créez pas de nouveau tag
          return;
        }
      }

      // Créez un élément de tag
      const tag = document.createElement("div");
      tag.classList.add("tag"); // Ajoutez des classes CSS au tag si nécessaire



      // Texte du tag
      const tagText = document.createElement("span");
      tagText.textContent = ustensil;
      tag.appendChild(tagText);

      // Bouton de suppression du tag
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        // Supprimer le tag du DOM
        tagContainer.removeChild(tag);
        // Supprimer l'ustensil du tableau search_ustensil
        const index = search_ustensil.indexOf(ustensil);
        if (index !== -1) {
          search_ustensil.splice(index, 1);
        }
        // Appelez votre fonction pour gérer les paramètres de recherche
        getSearchParams();
      });
      tag.appendChild(deleteButton);

      // Ajoutez le tag à votre conteneur de tags
      tagContainer.appendChild(tag);

      // Ajoutez l'ustensil à votre tableau search_ustensil si nécessaire
      search_ustensil.push(ustensil);

      // Appelez votre fonction pour gérer les paramètres de recherche
      getSearchParams();
    });
  });



  const listAppareils = document.querySelectorAll(".appareils_item");

  listAppareils.forEach((e) => {
    e.addEventListener("click", (event) => {
      const appareils = event.target.innerText;

      // Vérifiez si le tag existe déjà dans le conteneur de tags
      const tagContainer = document.getElementById("tags_container"); // Remplacez "tags_container" par l'ID de votre conteneur de tags
      const existingTags = tagContainer.querySelectorAll(".tag");

      for (const existingTag of existingTags) {
        if (existingTag.textContent === appareils) {
          // Le tag existe déjà, ne créez pas de nouveau tag
          return;
        }
      }

      // Créez un élément de tag
      const tag = document.createElement("div");
      tag.classList.add("tag"); // Ajoutez des classes CSS au tag si nécessaire



      // Texte du tag
      const tagText = document.createElement("span");
      tagText.textContent = appareils;
      tag.appendChild(tagText);

      // Bouton de suppression du tag
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        // Supprimer le tag du DOM
        tagContainer.removeChild(tag);
        // Supprimer l'ustensil du tableau search_ustensil
        const index = search_appareil.indexOf(appareils);
        if (index !== -1) {
          search_appareil.splice(index, 1);
        }
        // Appelez votre fonction pour gérer les paramètres de recherche
        getSearchParams();
      });
      tag.appendChild(deleteButton);

      // Ajoutez le tag à votre conteneur de tags
      tagContainer.appendChild(tag);

      // Ajoutez l'ustensil à votre tableau search_ustensil si nécessaire
      search_appareil.push(appareils);

      // Appelez votre fonction pour gérer les paramètres de recherche
      getSearchParams();
    });
  });
  //// ingredient ////////
  const listIngredients = document.querySelectorAll(".ingredients_item");

  listIngredients.forEach((e) => {
    e.addEventListener("click", (event) => {
      const ingredients = event.target.innerText;

      // Vérifiez si le tag existe déjà dans le conteneur de tags
      const tagContainer = document.getElementById("tags_container"); // Remplacez "tags_container" par l'ID de votre conteneur de tags
      const existingTags = tagContainer.querySelectorAll(".tag");

      for (const existingTag of existingTags) {
        if (existingTag.textContent === ingredients) {
          // Le tag existe déjà, ne créez pas de nouveau tag
          return;
        }
      }

      // Créez un élément de tag
      const tag = document.createElement("div");
      tag.classList.add("tag"); // Ajoutez des classes CSS au tag si nécessaire



      // Texte du tag
      const tagText = document.createElement("span");
      tagText.textContent = ingredients;
      tag.appendChild(tagText);

      // Bouton de suppression du tag
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        // Supprimer le tag du DOM
        tagContainer.removeChild(tag);
        // Supprimer l'ustensil du tableau search_ustensil
        const index = search_ingredients.indexOf(ingredients);
        if (index !== -1) {
          search_ingredients.splice(index, 1);
        }
        // Appelez votre fonction pour gérer les paramètres de recherche
        getSearchParams();
      });
      tag.appendChild(deleteButton);

      // Ajoutez le tag à votre conteneur de tags
      tagContainer.appendChild(tag);

      // Ajoutez l'ustensil à votre tableau search_ustensil si nécessaire
      search_ingredients.push(ingredients);

      // Appelez votre fonction pour gérer les paramètres de recherche
      getSearchParams();
    });
  });

}

async function init() {
  renderRecipes(recipes);
  initEvents();
}

init();