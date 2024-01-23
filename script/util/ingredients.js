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
            const ingredients = event.target.innerText;
            if (!isTagExistAppareil(ingredients)) {
              updateList("ingredients", ingredients);
              handleIngredientsClick(ingredients);
            }
          });
        }
      });
    });
    ;

}

 //Vérifie si le tag (appareil) existe déjà dans le conteneur de tags.
function isTagExistIngredient(ingredients) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (const existingTag of existingTags) {
    if (existingTag.textContent === ingredients) {
      // Le tag existe déjà
      return true;
    }
  }
  return false;
}
//Gère l'action lorsqu'un utilisateur clique sur un appareil pour le sélectionner comme filtre.
function handleIngredientsClick(ingredients) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");
  for (const existingTag of existingTags) {
    if (existingTag.textContent === ingredients) {
      // Supprimer l'appareil du tableau search_appareil
      const index = search_ingredients.indexOf(ingredients);
      if (index !== -1) {
        search_ingredients.splice(index, 1);
      }

      // Supprimer le tag du DOM
      tagContainer.removeChild(existingTag);

      // Effectuer une nouvelle recherche avec les filtres actuels
      searchRecipes(recipes);

      // Vérifier s'il ne reste aucun tag, alors réinitialiser la recherche
      if (existingTags.length === 0) {
        resetFilters();
      }

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
    // Supprimer l'appareil du tableau search_appareil
    const index = search_ingredients.indexOf(ingredients);
    if (index !== -1) {
      search_ingredients.splice(index, 1);
    }

    // Vérifier s'il ne reste aucun tag, alors réinitialiser la recherche
    if (existingTags.length === 0) {
      resetFilters();
    }
  });
  tag.appendChild(deleteButton);

  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);

  // Ajoutez l'appareil à votre tableau search_appareil si nécessaire
  search_ingredients.push(ingredients);
}