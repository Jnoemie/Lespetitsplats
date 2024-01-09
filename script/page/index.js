function updateRecipeCount() {
  const recipeCountElement = document.getElementById("nbr_recettes");
  const recipeCards = document.querySelectorAll(".recipe-card");

  const recipeCount = recipeCards.length;
  recipeCountElement.textContent = `Nombre de recettes: ${recipeCount}`;
}

async function renderRecipes(dataRecette) {
  const recetteSection = document.getElementById("section");
  // Clear the recipe list
  document.querySelector(".listeRecettes").innerHTML = "";
  // Clear the dropdown lists (x3)
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
    recipe.ingredients.forEach((ingr) => {
      if (!ingredients.includes(ingr.ingredient)) {
        ingredients.push(ingr.ingredient);
        const li = document.createElement("LI");
        li.textContent = ingr.ingredient;
        document.getElementById("container_ingredients").appendChild(li);
      }
    });

    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
        const li = document.createElement("LI");
        li.textContent = ustensil;

        document.getElementById("container_ustensils").appendChild(li);
      }
    });
    // recipe.appliance is not a list
    if (recipe.appliance != "" && !appliance.includes(recipe.appliance)) {
      appliance.push(recipe.appliance);
      const li = document.createElement("LI");

      li.textContent = recipe.appliance;

      document.getElementById("container_appareils").appendChild(li);
    }
  });
  updateRecipeCount();
  }
  const ingredientSearchInput = document.getElementById("ingredients_search");
  const ustensilSearchInput = document.getElementById("ustensils_search");
  const appareilSearchInput = document.getElementById("appareils_search");

  ingredientSearchInput.addEventListener("input", () => {
    const searchQuery = ingredientSearchInput.value.toLowerCase();
    filterList("container_ingredients", searchQuery);
  });

  ustensilSearchInput.addEventListener("input", () => {
    const searchQuery = ustensilSearchInput.value.toLowerCase();
    filterList("container_ustensils", searchQuery);
  });

  appareilSearchInput.addEventListener("input", () => {
    const searchQuery = appareilSearchInput.value.toLowerCase();
    filterList("container_appareils", searchQuery);
  });

  function filterList(containerId, query) {
    const container = document.getElementById(containerId);
    const items = container.getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemName = item.textContent.toLowerCase();

      if (itemName.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
        
      }
    }
  }
  


function getSearchParams() {
  let search_query = document.getElementById("field_search").value;
  let search_ingredients = [];
  //selected_ingredients = document.querySelectorAll('.checkbox_ingredient').forEach(check => {
  //if (check.checked) search_ingredients.push(check.value.toLowerCase())
  // })
  console.log(search_ingredients);
  let search_ustensil = [];
  // selected_ustensil = document.querySelectorAll('.checkbox_ustensils').forEach(check => {
  //if (check.checked) search_ustensil.push(check.value.toLowerCase())
  // })
  console.log(search_ustensil);
  let search_appareil = [];
  // selected_appareil = document.querySelectorAll('.checkbox_appareils').forEach(check => {
  // if (check.checked) search_appareil.push(check.value.toLowerCase())
  //})
  console.log(search_appareil);
  // let search_ingredients = document.getElementById('ingredients_search').value;
  //let search_appareil = document.getElementById('appareils_search').value;
  //let search_ustensil = document.getElementById('ustensils_search').value;
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
      const ingredient = searchParams.search_filters.ingredients[
        j
      ].toLowerCase();
      const recipeIngredients = recipe.ingredients.map((elt) =>
        elt.ingredient.toLowerCase()
      );

      if (!recipeIngredients.includes(ingredient)) {
        ingredientMatch = false;
        break;
      }
    }

    // if (searchParams.search_filters.appareil) {
    //   const appareil = searchParams.search_filters.appareil.toLowerCase();
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
      recipe.name
        .toLowerCase()
        .includes(searchParams.search_query.toLowerCase()) ||
      recipe.description
        .toLowerCase()
        .includes(searchParams.search_query.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient
          .toLowerCase()
          .includes(searchParams.search_query.toLowerCase())
      );

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

function initEvents() {
  document
    .getElementById("field_search")
    .addEventListener("input", function (event) {
      if (event.target.value.length >= 3) {
        searchRecipes(recipes);
      }
    });

  document.querySelectorAll(".dropdown_btn").forEach((elt) =>
    elt.addEventListener("click", function (event) {
      let type = "ingredients";
      if (event.target.classList.contains("btn_appareils")) type = "appareils";
      if (event.target.classList.contains("btn_ustensils")) type = "ustensils";
      if (
        document.getElementById("filtre_" + type).style.display == "none" ||
        document.getElementById("filtre_" + type).style.display == ""
      ) {
        // element is hidden, show it
        document.getElementById("filtre_" + type).style.display = "block";
        document.getElementById(type + "_down").style.display = "none";
        document.getElementById(type + "_up").style.display = "block";
      } else {
        // element is visible, hide it
        document.getElementById("filtre_" + type).style.display = "none";
        document.getElementById(type + "_down").style.display = "block";
        document.getElementById(type + "_up").style.display = "none";
      }
    })
  );
}

async function init() {
  renderRecipes(recipes);
  initEvents();
}
init();
