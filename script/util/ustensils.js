// Fonction pour traiter les ustensiles
function renderUstensiles(dataRecette) {
    const ustensilsList = document.getElementById("container_ustensils");
    let ustensils = [];
  
    dataRecette.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (!ustensils.includes(ustensil)) {
          ustensils.push(ustensil);
          const li = document.createElement("LI");
          li.classList.add("ustensil_item");
          li.textContent = ustensil;
          ustensilsList.appendChild(li);

          li.addEventListener("click", (event) => {
            const ustensil = event.target.innerText;
            if (!isTagExistUstensil(ustensil)) {
              updateList("ustensils", ustensil);
              handleUstensilClick(ustensil);
            }
          });
        }
      });
    });
  }
 
  //Vérifie si le tag (appareil) existe déjà dans le conteneur de tags.
function isTagExistUstensil(ustensil) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (const existingTag of existingTags) {
    if (existingTag.textContent === ustensil) {
      // Le tag existe déjà
      return true;
    }
  }
  return false;
}
//Gère l'action lorsqu'un utilisateur clique sur un appareil pour le sélectionner comme filtre.
function handleUstensilClick(ustensil) {

  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");
  for (const existingTag of existingTags) {
    if (existingTag.textContent === ustensil) {
      // Supprimer l'appareil du tableau search_appareil
      const index = search_ustensil.indexOf(ustensil);
      if (index !== -1) {
        search_ustensil.splice(index, 1);
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
  tagText.textContent = ustensil;
  tag.appendChild(tagText);

  // Bouton de suppression du tag
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'appareil du tableau search_appareil
    const index = search_ustensil.indexOf(ustensil);
    if (index !== -1) {
      search_ustensil.splice(index, 1);
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
  search_ustensil.push(ustensil);
}