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
            updateList("ustensil", ustensil);
            handleAppareilClick(ustensil);
          });
        }
      });
    });
  }
  function handleUstensilClick(ustensil) {
    // Vérifiez si le tag existe déjà dans le conteneur de tags
    const tagContainer = document.getElementById("tags_container"); // Remplacez "tags_container" par l'ID de votre conteneur de tags
    const existingTags = tagContainer.querySelectorAll(".tag");
  
    for (const existingTag of existingTags) {
      if (existingTag.textContent === ustensil) {
        // Le tag existe déjà, ne créez pas de nouveau tag
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
      // Supprimer l'ustensil du tableau search_ustensil
      const index = search_ustensil.indexOf(ustensil);
      if (index !== -1) {
        search_ustensil.splice(index, 1);
      }
      // Appelez votre fonction pour gérer les paramètres de recherche
      
    });
    tag.appendChild(deleteButton);
  
    // Ajoutez le tag à votre conteneur de tags
    tagContainer.appendChild(tag);
  
    // Ajoutez l'ustensil à votre tableau search_ustensil si nécessaire
    search_ustensil.push(ustensil);
  
    // Appelez votre fonction pour gérer les paramètres de recherche
   
  }
  