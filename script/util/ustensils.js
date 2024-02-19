// Fonction pour traiter les ustensiles
function renderUstensiles(dataRecette) {
  const ustensilsList = document.getElementById("container_ustensils");
  let ustensils = [];

  for (let i = 0; i < dataRecette.length; i++) {
    const recipe = dataRecette[i];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
        const li = document.createElement("LI");
        li.classList.add("ustensil_item");
        li.textContent = ustensil;
        ustensilsList.appendChild(li);

        li.addEventListener("click", function (event) {
          const ustensil = event.target.innerText;
          if (!isTagExistUstensil(ustensil)) {
            updateList("ustensils", ustensil);
            addUstensilTag(ustensil);
          }
        });
      }
    }
  }
}

// Vérifie si le tag (ustensil) existe déjà dans le conteneur de tags.
function isTagExistUstensil(ustensil) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (let i = 0; i < existingTags.length; i++) {
    const existingTag = existingTags[i];
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
  const li = document.createElement("LI");
  li.classList.add("ustensil_item");
  li.textContent = ustensil;
  ustensilsList.insertBefore(li, ustensilsList.firstChild);
}
const ustensilsSearchInput = document.getElementById("ustensils_search");
const clearIconUstensils = ustensilsSearchInput.nextElementSibling; // Présumant que la croix est juste après l'input dans le DOM

function toggleClearIconForUstensils() {
  if (ustensilsSearchInput.value) {
    clearIconUstensils.classList.remove("hidden");
  } else {
    clearIconUstensils.classList.add("hidden");
  }
}

ustensilsSearchInput.addEventListener("input", toggleClearIconForUstensils);

clearIconUstensils.addEventListener("click", () => {
  ustensilsSearchInput.value = ""; // Efface le contenu du champ de recherche
  toggleClearIconForUstensils(); // Cache la croix
  // Réinitialisez votre recherche d'ingrédients ici et mettez à jour l'affichage
  search_ustensils = []; // Si vous souhaitez réinitialiser les filtres d'ustensils
  searchRecipes(recipes); // Mettez à jour les recettes affichées selon les filtres actuels
});
