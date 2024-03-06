let selectedAppareils = []; // Tableau pour garder la trace des appareils sélectionnés

// Fonction pour vérifier si un tag (appareil) existe déjà dans le conteneur de tags
function isTagExistAppareil(appareil) {
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");
  return Array.from(existingTags).some(tag => tag.textContent === appareil);
}
// Fonction pour ajouter un écouteur d'événements à un élément LI
function addClickListenerToAppareilLi(li) {
  li.addEventListener("click", (event) => {
    const appareil = event.target.getAttribute('data-appareil');
    if (!isTagExistAppareil(appareil) ) {
      addAppareilTag(appareil);
      updateList("appareils",appareil); // Mise à jour de l'affichage des recettes en fonction des ingrédients sélectionnés
    }
  });
}


// Fonction pour traiter et afficher les appareils
function renderAppareils(recipes) {
  const appareilsList = document.getElementById("container_appareils");
  appareilsList.innerHTML = ''; // Nettoie la liste avant de la remplir
  let appareils = [];

  recipes.forEach(recipe => {
    if (!appareils.includes(recipe.appliance)) {
      appareils.push(recipe.appliance);
    }
  });
  // Triez les appareils pour mettre ceux sélectionnés en haut
  appareils.sort((a, b) => selectedAppareils.includes(a) ? -1 : selectedAppareils.includes(b) ? 1 : 0);

  appareils.forEach(appareil => {
    const li = document.createElement("LI");
    li.classList.add("appareil_item");
    li.setAttribute("data-appareil", appareil);
    li.textContent = appareil;
    if (!selectedAppareils.includes(appareil)) {
      addClickListenerToAppareilLi(li);
    } else {
      li.classList.add("selected");
    }
    appareilsList.appendChild(li);
  });
}


// Fonction pour ajouter un appareil en tant que tag et le marquer comme sélectionné
function addAppareilTag(appareil) {
  if (!isTagExistAppareil(appareil)) {
    const tagContainer = document.getElementById("tags_container");
    const tag = document.createElement("div");
    tag.classList.add("tag");
    const tagText = document.createElement("span");
    tagText.textContent = appareil;
    tag.appendChild(tagText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
      tagContainer.removeChild(tag);

      const index = search_appareil.indexOf(appareil);
      if (index !== -1) {
        search_appareil.splice(index, 1);
        searchRecipes(recipes); // Supposons que vous avez une fonction searchRecipes pour réactualiser l'affichage des recettes
      }
    });
    tag.appendChild(deleteButton);
    tagContainer.appendChild(tag);
    selectedAppareils.push(appareil);
  }
}

// Fonctions pour le champ de recherche et le bouton d'effacement des appareils
const appareilsSearchInput = document.getElementById("appareils_search");
const clearIconAppareils = appareilsSearchInput.nextElementSibling;

function toggleClearIconForAppareils() {
  clearIconAppareils.classList.toggle("hidden", !appareilsSearchInput.value);
}

appareilsSearchInput.addEventListener("input", toggleClearIconForAppareils);

clearIconAppareils.addEventListener("click", () => {
  appareilsSearchInput.value = "";
  toggleClearIconForAppareils();
  updateList(); // Mettez à jour l'affichage des recettes en fonction du champ de recherche nettoyé
});

// Supposons que vous ayez déjà une liste de recettes initialisée quelque part
renderAppareils(recipes); // Initialisez l'affichage des appareils basé sur les recettes initiales
