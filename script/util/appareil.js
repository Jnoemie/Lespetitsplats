//Affiche la liste des appareils utilisés dans les recettes et ajoute des gestionnaires d'événements pour le filtrage.
function renderAppareils(dataRecette) {
  const appareilList = document.getElementById("container_appareils");
  let appareil = [];

  dataRecette.forEach((recipe) => {
    if (recipe.appliance != "" && !appareil.includes(recipe.appliance)) {
      appareil.push(recipe.appliance);
      const li = document.createElement("LI");
      li.classList.add("appareils_item");
      li.textContent = recipe.appliance;
      appareilList.appendChild(li);

      li.addEventListener("click", (event) => {
        const appareils = event.target.innerText;
        if (!isTagExistAppareil(appareils)) {
          updateList("appareils", appareils);
          addTag(appareils);
        }
      });
    }
  });
}
//Vérifie si le tag (appareil) existe déjà dans le conteneur de tags.
function isTagExistAppareil(appareils) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (const existingTag of existingTags) {
    if (existingTag.textContent === appareils) {
      // Le tag existe déjà
      return true;
    }
  }
  return false;
}
//Gère l'action lorsqu'un utilisateur clique sur un appareil pour le sélectionner comme filtre.
function addTag(appareil) {
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
  deleteButton.addEventListener("click", () => {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'appareil du tableau search_appareil
    const index = search_appareil.indexOf(appareil);

    if (index !== -1) {
      search_appareil.splice(index, 1);
    }

    searchRecipes(recipes);
  });
  tag.appendChild(deleteButton);

  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);
}