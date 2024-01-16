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
 // Traite les appareils
 renderAppareils(dataRecette);

 // Traite les ustensiles
 renderUstensiles(dataRecette);

 // Traite les ingrédients
 renderIngredients(dataRecette);

 dataRecette.forEach((recipe) => {
   const modelRecette = recetteFactory(recipe);
   const recetteCardDom = modelRecette.getFicheRecette();
   recetteSection.appendChild(recetteCardDom);
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
 initializeFiltering(ingredientSearchInput, ustensilSearchInput, appareilSearchInput);

  
// Utilisation de la fonction pour traiter les clics d'appareils
const listAppareils = document.querySelectorAll(".appareils_item");

listAppareils.forEach((e) => {
  e.addEventListener("click", (event) => {
    const appareils = event.target.innerText;
    handleAppareilClick(appareils);
  });
});

// Utilisation de la fonction pour traiter les clics d'ustensiles
const listUstensils = document.querySelectorAll(".ustensil_item");

listUstensils.forEach((e) => {
  e.addEventListener("click", (event) => {
    const ustensil = event.target.innerText;
    handleUstensilClick(ustensil);
  });
});

 
  // Utilisation de la fonction pour traiter les clics d'ingrédients
  const listIngredients = document.querySelectorAll(".ingredients_item");
  
  listIngredients.forEach((e) => {
    e.addEventListener("click", (event) => {
      const ingredients = event.target.innerText;
      handleIngredientClick(ingredients);
    });
  });

}

async function init() {
  renderRecipes(recipes);
  initEvents();
}

init();