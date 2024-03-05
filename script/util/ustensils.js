let selectedUstensils = []; // Tableau pour garder la trace des ustensiles sélectionnés

// Fonction pour vérifier si un tag (ustensile) existe déjà dans le conteneur de tags
function isTagExistUstensil(ustensil) {
  const tagContainer = document.getElementById("tags_container");
  const existingTags = tagContainer.querySelectorAll(".tag");
  return Array.from(existingTags).some(tag => tag.textContent === ustensil);
}

// Fonction pour ajouter un écouteur d'événements à un élément LI pour les ustensiles
function addClickListenerToUstensilLi(li) {
  li.addEventListener("click", (event) => {
    const ustensil = event.target.textContent; // Utilisez textContent pour les éléments LI
    if (!isTagExistUstensil(ustensil)) {
      addUstensilTag(ustensil);
      updateList("ustensils", ustensil); // Supposons que vous avez une fonction updateList adaptée
    }
  });
}

// Fonction pour traiter et afficher les ustensiles
function renderUstensils(recipes) {
  const ustensilsList = document.getElementById("container_ustensils");
  ustensilsList.innerHTML = ''; // Nettoie la liste avant de la remplir
  let ustensils = [];

  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
      }
    });
  });

  ustensils.forEach(ustensil => {
    const li = document.createElement("LI");
    li.classList.add("ustensil_item");
    li.textContent = ustensil;
    if (!selectedUstensils.includes(ustensil)) {
      addClickListenerToUstensilLi(li);
    } else {
      li.classList.add("selected");
    }
    ustensilsList.appendChild(li);
  });
}

// Fonction pour ajouter un ustensile en tant que tag et le marquer comme sélectionné
function addUstensilTag(ustensil) {
  if (!isTagExistUstensil(ustensil)) {
    const tagContainer = document.getElementById("tags_container");
    const tag = document.createElement("div");
    tag.classList.add("tag");
    const tagText = document.createElement("span");
    tagText.textContent = ustensil;
    tag.appendChild(tagText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
      tagContainer.removeChild(tag);
      const index = search_ustensil.indexOf(ustensil);
      if (index !== -1) {
        search_ustensil.splice(index, 1);
        // Supposons que vous avez une fonction searchRecipes pour réactualiser l'affichage des recettes
        searchRecipes(recipes); 
      }
    });
    tag.appendChild(deleteButton);
    tagContainer.appendChild(tag);
    selectedUstensils.push(ustensil);
  }
}

// Fonctions pour le champ de recherche et le bouton d'effacement des ustensiles
const ustensilsSearchInput = document.getElementById("ustensils_search");
const clearIconUstensils = ustensilsSearchInput.nextElementSibling;

function toggleClearIconForUstensils() {
  clearIconUstensils.classList.toggle("hidden", !ustensilsSearchInput.value);
}

ustensilsSearchInput.addEventListener("input", toggleClearIconForUstensils);

clearIconUstensils.addEventListener("click", () => {
  ustensilsSearchInput.value = "";
  toggleClearIconForUstensils();
  searchRecipes(recipes); // Mettez à jour l'affichage des recettes en fonction du champ de recherche nettoyé
});

// Supposons que vous ayez déjà une liste de recettes initialisée quelque part
renderUstensils(recipes); // Initialisez l'affichage des ustensiles basé sur les recettes initiales
