let selectedIngredients = []; // Tableau pour garder la trace des ingrédients sélectionnés

// Fonction pour vérifier si un tag (ingrédient) existe déjà dans le conteneur de tags
function isTagExistIngredient(ingredient) {
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");
  return Array.from(existingTags).some((tag) => tag.textContent === ingredient);
}

// Fonction pour ajouter un écouteur d'événements à un élément LI
function addClickListenerToIngredientLi(li) {
  li.addEventListener("click", (event) => {
    const ingredient = event.target.getAttribute("data-ingredient");
    if (!isTagExistIngredient(ingredient)) {
      addIngredientTag(ingredient);
      updateList("ingredients", ingredient); // Mise à jour de l'affichage des recettes en fonction des ingrédients sélectionnés
    }
  });
}

// Fonction pour traiter et afficher les ingrédients
function renderIngredients(recipes) {
  const ingredientsList = document.getElementById("container_ingredients");
  ingredientsList.innerHTML = ""; // Nettoie la liste avant de la remplir
  let ingredients = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingr) => {
      if (!ingredients.includes(ingr.ingredient)) {
        ingredients.push(ingr.ingredient);
      }
    });
  });

  // Trie les ingrédients pour mettre ceux sélectionnés en haut
  ingredients.sort((a, b) =>
    selectedIngredients.includes(a)
      ? -1
      : selectedIngredients.includes(b)
      ? 1
      : 0
  );

  ingredients.forEach((ingredient) => {
    const li = document.createElement("LI");
    li.classList.add("ingredients_item");
    li.setAttribute("data-ingredient", ingredient);
    li.textContent = ingredient;
    if (!selectedIngredients.includes(ingredient)) {
      addClickListenerToIngredientLi(li);
    } else {
      li.classList.add("selected");
    }
    ingredientsList.appendChild(li);
  });
}

// Fonction pour ajouter un ingrédient en tant que tag et le marquer comme sélectionné
function addIngredientTag(ingredient) {
  if (!isTagExistIngredient(ingredient)) {
    const tagContainer = document.getElementById("tags_container");
    const tag = document.createElement("div");
    tag.classList.add("tag");
    const tagText = document.createElement("span");
    tagText.textContent = ingredient;
    tag.appendChild(tagText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
      tagContainer.removeChild(tag);

      const index = selectedIngredients.indexOf(ingredient);

      if (index !== -1) {
        selectedIngredients.splice(index, 1);
      }

      const indexSearch = search_ingredients.indexOf(ingredient);
      if (indexSearch !== -1) {
        search_ingredients.splice(indexSearch, 1);
        searchRecipes(recipes); // Réactualiser l'affichage des recettes et des ingrédients
      }
    });
    tag.appendChild(deleteButton);
    tagContainer.appendChild(tag);
    selectedIngredients.push(ingredient);
  }
}

// Fonctions pour le champ de recherche et le bouton d'effacement
const ingredientsSearchInput = document.getElementById("ingredients_search");
const clearIconIngredients = ingredientsSearchInput.nextElementSibling;

function toggleClearIconForIngredients() {
  clearIconIngredients.classList.toggle(
    "hidden",
    !ingredientsSearchInput.value
  );
}

ingredientsSearchInput.addEventListener("input", toggleClearIconForIngredients);

clearIconIngredients.addEventListener("click", () => {
  ingredientsSearchInput.value = "";
  toggleClearIconForIngredients();
  updateList(); 
  searchRecipes(recipes);
});

// Initialisez votre application en rendant les ingrédients basés sur les recettes initiales
renderIngredients(recipes);