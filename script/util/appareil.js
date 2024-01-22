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
        if (!isTagExist(appareils)) {
          updateList("appareils", appareils);
          handleAppareilClick(appareils);
        }
        });
    }
  });
  
}
function isTagExist(appareils) {
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

function handleAppareilClick(appareils) {
  // Vérifiez si le tag existe déjà dans le conteneur de tags
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");

  for (const existingTag of existingTags) {
    if (existingTag.textContent === appareils) {
      // Le tag existe déjà, ne créez pas de nouveau tag
      return;
    }
  }

  // Créez un élément de tag
  const tag = document.createElement("div");
  tag.classList.add("tag"); // Ajoutez des classes CSS au tag si nécessaire

  // Texte du tag
  const tagText = document.createElement("span");
  tagText.textContent = appareils;
  tag.appendChild(tagText);

  // Bouton de suppression du tag
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => {
    // Supprimer le tag du DOM
    tagContainer.removeChild(tag);
    // Supprimer l'appareil du tableau search_appareil
    const index = search_appareil.indexOf(appareils);
    if (index !== -1) {
      search_appareil.splice(index, 1);
    }
    // Appelez votre fonction pour gérer les paramètres de recherche
   
  });
  tag.appendChild(deleteButton);

  // Ajoutez le tag à votre conteneur de tags
  tagContainer.appendChild(tag);

  // Ajoutez l'appareil à votre tableau search_appareil si nécessaire
  search_appareil.push(appareils);

  // Appelez votre fonction pour gérer les paramètres de recherche
}