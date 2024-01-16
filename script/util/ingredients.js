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
        }
      });
    });
  }
  function handleIngredientClick(ingredients) {
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
      // Supprimer l'ingrédient du tableau search_ingredients
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
  
    // Ajoutez l'ingrédient à votre tableau search_ingredients si nécessaire
    search_ingredients.push(ingredients);
  
    // Appelez votre fonction pour gérer les paramètres de recherche
    getSearchParams();
  }
  
  