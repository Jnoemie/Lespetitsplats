// Définit les variables et éléments DOM nécessaires pour la recherche d'ingrédients, d'ustensiles et d'appareils.
let search_ingredients = [];
let search_ustensil = [];
let search_appareil = [];
let search_global = "";

const ingredientSearchInput = document.getElementById("ingredients_search");
const ustensilSearchInput = document.getElementById("ustensils_search");
const appareilSearchInput = document.getElementById("appareils_search");

//fonction appelée plus tard pour afficher les recettes en fonction des filtres de recherche.
async function renderRecipes(recipes) {
  const recetteSection = document.getElementById("section");
  const notFoundDiv = document.querySelector(".not_found");

  const needle = document.getElementById("field_search").value.trim();
  if (recipes.length === 0) {
    notFoundDiv.innerHTML = `
      Aucune recette ne contient ‘${needle}’. Vous pouvez chercher « tarte aux pommes », « poisson », etc...
    `;
  } else {
    notFoundDiv.innerHTML = "";
  }
  // nettoie la liste de recherche
  document.querySelector(".listeRecettes").innerHTML = "";
  // nettoie les filtres
  document.getElementById("container_ingredients").innerHTML = "";
  document.getElementById("container_ustensils").innerHTML = "";
  document.getElementById("container_appareils").innerHTML = "";
  // Traite les appareils
  renderAppareils(recipes);
  // Traite les ustensiles
  renderUstensiles(recipes);
  // Traite les ingrédients
  renderIngredients(recipes);

  recipes.forEach((recipe) => {
    const modelRecette = recetteFactory(recipe);
    const recetteCardDom = modelRecette.getFicheRecette();
    recetteSection.appendChild(recetteCardDom);
  });

  updateRecipeCount();
}

//Filtre les recettes en fonction des critères de recherche.
function filterRecipes(recipes) {
  return recipes.filter((recipe) => {
    const ingredientsMatch = search_ingredients.every((ingredient) =>
      recipe.ingredients.some(
        (recipeIngredient) =>
          recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
      )
    );

    if (!ingredientsMatch) {
      return false;
    }

    if (search_appareil.length > 0) {
      const appareilMatch = search_appareil.some((appareil) =>
        recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
      );

      if (!appareilMatch) {
        return false;
      }
    }

    if (search_ustensil.length > 0) {
      const ustensilMatch = search_ustensil.some((ustensil) =>
        recipe.ustensils.some((recipeUstensil) =>
          recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())
        )
      );

      if (!ustensilMatch) {
        return false;
      }
    }

    const queryMatch =
      recipe.name.toLowerCase().includes(search_global.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search_global.toLowerCase()) ||
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.ingredient
          .toLowerCase()
          .includes(search_global.toLowerCase())
      );

    return queryMatch;
  });
}

//Recherche les recettes en fonction des critères de recherche actuels et affiche les résultats.
function searchRecipes(recipes) {
  let results = filterRecipes(recipes);
  renderRecipes(results);
}

//fonction utilisée pour mettre à jour les listes de filtres d'ingrédients, d'ustensiles ou d'appareils lorsque l'utilisateur interagit avec l'interface utilisateur.

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

// fonction qui initialise les événements de l'interface utilisateur, notamment la gestion de la recherche globale et la gestion des filtres.
function initEvents() {
  document
    .getElementById("field_search")
    .addEventListener("input", function (event) {
      const inputValue = event.target.value.trim().toLowerCase();
      search_global = inputValue;

      if (event.target.value.length >= 3) {
        searchRecipes(recipes);
      }
    });
  initializeFiltering(
    ingredientSearchInput,
    ustensilSearchInput,
    appareilSearchInput
  );
  document
    .getElementById("field_search")
    .addEventListener("keyup", function (event) {
      const inputValue = this.value.trim().toLowerCase();
      search_global = inputValue;

      if (inputValue === "") {
        searchRecipes(recipes);
      } else if (inputValue.length >= 3) {
        searchRecipes(recipes);
      }
    });
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("field_search");
    const clearIcon = document.querySelector(".fa-x");

    function toggleClearIcon() {
      if (searchInput.value) {
        clearIcon.classList.remove("hidden");
      } else {
        clearIcon.classList.add("hidden");
      }
    }

    searchInput.addEventListener("input", toggleClearIcon);

    clearIcon.addEventListener("click", () => {
      searchInput.value = "";
      toggleClearIcon();
      search_global = ""; // Réinitialisez la variable de recherche globale
      searchRecipes(recipes); // Mettez à jour l'affichage des recettes
    });

    toggleClearIcon();
  });
}

//fonction d'initialisation principale qui est appelée au chargement de la page pour afficher les recettes et initialiser les événements.

async function init() {
  renderRecipes(recipes);
  initEvents();
}

init();
