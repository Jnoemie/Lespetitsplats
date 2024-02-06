// Fonction pour traiter les ustensiles
function renderUstensiles(dataRecette) {
  const ustensilsList = document.getElementById("container_ustensils");
  let ustensils = [];

  dataRecette.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
        const p = document.createElement("p");
        p.classList.add("ustensil_item");
        p.textContent = ustensil;
        ustensilsList.appendChild(p);

        p.addEventListener("click", (event) => {
          const ustensil = event.target.innerText;
          if (!isTagExistUstensil(ustensil)) {
            updateList("ustensils", ustensil);
            addUstensilTag(ustensil);
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
// Gère l'action lorsqu'un utilisateur clique sur un ustensil pour le sélectionner comme filtre.
function addUstensilTag(ustensil) {
  const tagContainer = document.getElementById("tags_container");

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
  deleteButton.addEventListener("click", function () {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'ustensil du tableau search_ustensil
    const index = search_ustensil.indexOf(ustensil);

    if (index !== -1) {
      search_ustensil.splice(index, 1);
      searchRecipes(recipes);
    }
  });
  tag.appendChild(deleteButton);

  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);
  const ustensilsList = document.getElementById("container_ustensils");
  const p = document.createElement("p");
  p.classList.add("ustensil_item");
  p.textContent = ustensil;
  ustensilsList.insertBefore(p, ustensilsList.firstChild);
}