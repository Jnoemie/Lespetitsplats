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
  deleteButton.addEventListener("click", () => {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'appareil du tableau search_appareil
    const index = search_ingredients.indexOf(ingredient);

    if (index !== -1) {
      search_ingredients.splice(index, 1);
       searchRecipes(recipes)
    }

   
  });
  tag.appendChild(deleteButton);
  searchRecipes(recipes);
  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);
}