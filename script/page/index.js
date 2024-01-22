let search_ingredients = [];
let search_ustensil = [];
let search_appareil = [];
let search_global="";

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
function searchRecipesClassic(recipes) {
  let results = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let ingredientMatch = true;
    let appareilMatch = true;
    let ustensilMatch = true;

    // Vérifier si les filtres sont définis et, le cas échéant, si la recette correspond au filtre
    for (let j = 0; j < search_ingredients.length; j++) {
      const ingredient = search_ingredients[j].toLowerCase();

      for (let k = 0; k < recipe.ingredients.length; k++) {
        const recipeIngredient = recipe.ingredients[k].ingredient.toLowerCase();

        if (ingredient === recipeIngredient) {
          ingredientMatch = true;
          break;
        } else {
          ingredientMatch = false; // Mise à jour de la variable si aucune correspondance n'est trouvée
        }
      }

      if (!ingredientMatch) {
        break;
      }
    }

    if (search_appareil.length > 0) {
      let appareilMatch = false;
      for (let l = 0; l < search_appareil.length; l++) {
        const appareil = search_appareil[l].toLowerCase();
        if (recipe.appliance.toLowerCase().includes(appareil)) {
          appareilMatch = true;
          break;
        }
      }

      if (!appareilMatch) {
        continue; // Passe à la recette suivante si aucune correspondance d'appareil n'est trouvée
      }
    }

    if (search_ustensil.length > 0) {
      let ustensilMatch = false;
      for (let m = 0; m < search_ustensil.length; m++) {
        const ustensil = search_ustensil[m].toLowerCase();
        for (let n = 0; n < recipe.ustensils.length; n++) {
          if (recipe.ustensils[n].toLowerCase().includes(ustensil)) {
            ustensilMatch = true;
            break;
          }
        }

        if (ustensilMatch) {
          break;
        }
      }

      if (!ustensilMatch) {
        continue; // Passe à la recette suivante si aucune correspondance d'ustensile n'est trouvée
      }
    }

    // Vérifier si la recette correspond à la requête de recherche (dans le nom, la description ou les ingrédients)
    
    let queryMatch = false;

    if (
      recipe.name.toLowerCase().includes(search_global.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search_global.toLowerCase())
    ) {
      queryMatch = true;
    } else {
      for (let p = 0; p < recipe.ingredients.length; p++) {
        const ingredient = recipe.ingredients[p].ingredient.toLowerCase();
        if (ingredient.includes(search_global.toLowerCase())) {
          queryMatch = true;
          break;
        }
      }
    }

    

    // Si la recette correspond à la fois à la requête de recherche et à tous les filtres, l'ajouter aux résultats
    if (queryMatch && ingredientMatch && appareilMatch && ustensilMatch) {
      results.push(recipe);
    }
  }

  return results;
}


function searchRecipes(recipes) {
  
  let results = searchRecipesClassic(recipes);
 
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
  document
.getElementById("field_search")
.addEventListener("input", function (event) {
  const inputValue = event.target.value.trim().toLowerCase();
  search_global = inputValue;

  if (event.target.value.length >= 3) {
    // Vérifiez si aucun tag n'est actif

    searchRecipes(recipes);
  }
});
initializeFiltering(
ingredientSearchInput,
ustensilSearchInput,
appareilSearchInput
);
}

async function init() {
  renderRecipes(recipes);
  initEvents();
}

init();