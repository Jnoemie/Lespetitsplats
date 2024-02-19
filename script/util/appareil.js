// Affiche la liste des appareils utilisés dans les recettes et ajoute des gestionnaires d'événements pour le filtrage.
function renderAppareils(dataRecette) {
  const appareilList = document.getElementById("container_appareils");
  let appareil = [];

  for (let i = 0; i < dataRecette.length; i++) {
    const recipe = dataRecette[i];
    if (recipe.appliance !== "" && appareil.indexOf(recipe.appliance) === -1) {
      appareil.push(recipe.appliance);
      const li = document.createElement("LI");
      li.classList.add("appareils_item");
      li.textContent = recipe.appliance;
      appareilList.appendChild(li);

      li.addEventListener("click", function (event) {
        const appareil = event.target.innerText;
        if (!isTagExistAppareil(appareil)) {
          updateList("appareils", appareil);
          addAppareilTag(appareil);
        }
      });
    }
  }
}

// Vérifie si le tag (appareil) existe déjà dans le conteneur de tags.
function isTagExistAppareil(appareils) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (let i = 0; i < existingTags.length; i++) {
    const existingTag = existingTags[i];
    if (existingTag.textContent === appareils) {
      // Le tag existe déjà
      return true;
    }
  }
  return false;
}

// Gère l'action lorsqu'un utilisateur clique sur un appareil pour le sélectionner comme filtre.
function addAppareilTag(appareil) {
  const tagContainer = document.getElementById("tags_container");

  // Créez un élément de tag
  const tag = document.createElement("div");
  tag.classList.add("tag"); // Ajoutez des classes CSS au tag si nécessaire

  // Texte du tag
  const tagText = document.createElement("span");
  tagText.textContent = appareil;
  tag.appendChild(tagText);

  // Bouton de suppression du tag
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", function () {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'appareil du tableau search_appareil
    const index = search_appareil.indexOf(appareil);

    if (index !== -1) {
      search_appareil.splice(index, 1);
      searchRecipes(recipes);
    }
  });
  tag.appendChild(deleteButton);

  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);
  const appareilsList = document.getElementById("container_appareils");
  const li = document.createElement("LI");
  li.classList.add("appareil_item");
  li.textContent = appareil;
  appareilsList.insertBefore(li, appareilsList.firstChild);
}
const appareilsSearchInput = document.getElementById("appareils_search");
const clearIconAppareils = appareilsSearchInput.nextElementSibling; // Présumant que la croix est juste après l'input dans le DOM

function toggleClearIconForAppareils() {
  if (appareilsSearchInput.value) {
    clearIconAppareils.classList.remove("hidden");
  } else {
    clearIconAppareils.classList.add("hidden");
  }
}

appareilsSearchInput.addEventListener("input", toggleClearIconForAppareils);

clearIconAppareils.addEventListener("click", () => {
  appareilsSearchInput.value = ""; // Efface le contenu du champ de recherche
  toggleClearIconForAppareils(); // Cache la croix
  // Réinitialisez votre recherche d'ingrédients ici et mettez à jour l'affichage
  
  searchRecipes(recipes); // Mettez à jour les recettes affichées selon les filtres actuels
});
