// Fonction pour traiter les ingrédients
function renderIngredients(dataRecette) {
  const ingredientsList = document.getElementById("container_ingredients");
  let ingredients = [];

  dataRecette.forEach((recipe) => {
    recipe.ingredients.forEach((ingr) => {
      if (!ingredients.includes(ingr.ingredient)) {
        ingredients.push(ingr.ingredient);
        const li = document.createElement("LI");
        li.classList.add("ingredients_item");
        li.textContent = ingr.ingredient;
        ingredientsList.appendChild(li);

        li.addEventListener("click", (event) => {
          const ingredient = event.target.innerText;
          if (!isTagExistIngredient(ingredient)) {
            updateList("ingredients", ingredient);
            addIngredientTag(ingredient);
          }
        });
      }
    });
  });
}

//Vérifie si le tag (appareil) existe déjà dans le conteneur de tags.
function isTagExistIngredient(ingredient) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (const existingTag of existingTags) {
    if (existingTag.textContent === ingredient) {
      // Le tag existe déjà
      return true;
    }
  }
  return false;
}

function addIngredientTag(ingredient) {
  const tagContainer = document.getElementById("tags_container");

  // Créez un élément de tag
  const tag = document.createElement("div");
  tag.classList.add("tag"); // Ajoutez des classes CSS au tag si nécessaire

  // Texte du tag
  const tagText = document.createElement("span");
  tagText.textContent = ingredient;
  tag.appendChild(tagText);

  // Bouton de suppression du tag
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", function () {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'ingrédient du tableau search_ingredients
    const index = search_ingredients.indexOf(ingredient);

    if (index !== -1) {
      search_ingredients.splice(index, 1);
      searchRecipes(recipes);
    }
  });
  tag.appendChild(deleteButton);

  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);
  const ingredientsList = document.getElementById("container_ingredients");
  const p = document.createElement("LI");
  li.classList.add("ingredients_item");
  li.textContent = ingredient;
  ingredientsList.insertBefore(li, ingredientsList.firstChild);
}
const ingredientsSearchInput = document.getElementById("ingredients_search");
const clearIconIngredients = ingredientsSearchInput.nextElementSibling; // Présumant que la croix est juste après l'input dans le DOM

function toggleClearIconForIngredients() {
  if (ingredientsSearchInput.value) {
    clearIconIngredients.classList.remove("hidden");
  } else {
    clearIconIngredients.classList.add("hidden");
  }
}

ingredientsSearchInput.addEventListener("input", toggleClearIconForIngredients);

clearIconIngredients.addEventListener("click", () => {
  ingredientsSearchInput.value = ""; // Efface le contenu du champ de recherche
  toggleClearIconForIngredients(); // Cache la croix
  // Réinitialisez votre recherche d'ingrédients ici et mettez à jour l'affichage
  search_ingredients = []; // Si vous souhaitez réinitialiser les filtres d'ingrédients
  searchRecipes(recipes); // Mettez à jour les recettes affichées selon les filtres actuels
});
