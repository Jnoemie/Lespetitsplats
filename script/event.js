function initEvents() {
    document
      .getElementById("field_search")
      .addEventListener("input", function (event) {
        const inputValue = event.target.value.trim().toLowerCase();
        if (event.target.value.length >= 3) {
              // Vérifiez si aucun tag n'est actif
    if (search_ingredients.length === 0 && search_ustensil.length === 0 && search_appareil.length === 0) {
      // Si aucun tag n'est actif, effectuez la recherche
      searchRecipes(recipes);
    } else {
          search_ingredients = [...search_ingredients, inputValue];
    search_ustensil = [...search_ustensil, inputValue];
    search_appareil = [...search_appareil, inputValue];
    // Effectuez la recherche
    searchRecipes(recipes);
         
        }
      }else {
          // Effacez les filtres de recherche et réinitialisez la liste
          search_ingredients = [];
          search_ustensil = [];
          search_appareil = [];
          renderRecipes(recipes);
      }}
      );
  
    document.querySelectorAll(".dropdown_btn").forEach((elt) =>
      elt.addEventListener("click", function (event) {
        let type = "ingredients";
        if (event.target.classList.contains("btn_appareils")) type = "appareils";
        if (event.target.classList.contains("btn_ustensils")) type = "ustensils";
        if (
          document.getElementById("filtre_" + type).style.display == "none" ||
          document.getElementById("filtre_" + type).style.display == ""
        ) {
          // element is hidden, show it
          document.getElementById("filtre_" + type).style.display = "block";
          document.getElementById(type + "_down").style.display = "none";
          document.getElementById(type + "_up").style.display = "block";
        } else {
          // element is visible, hide it
          document.getElementById("filtre_" + type).style.display = "none";
          document.getElementById(type + "_down").style.display = "block";
          document.getElementById(type + "_up").style.display = "none";
        }
      })
    );
  
    const ingredientSearchInput = document.getElementById("ingredients_search");
    const ustensilSearchInput = document.getElementById("ustensils_search");
    const appareilSearchInput = document.getElementById("appareils_search");
    const noResultMessage = document.querySelectorAll(".ResultMessage");
  
  
    ingredientSearchInput.addEventListener("input", () => {
      const searchQuery = ingredientSearchInput.value.toLowerCase();
      filterList("container_ingredients", searchQuery);
    });
  
    ustensilSearchInput.addEventListener("input", () => {
      const searchQuery = ustensilSearchInput.value.toLowerCase();
      filterList("container_ustensils", searchQuery);
    });
  
    appareilSearchInput.addEventListener("input", () => {
      const searchQuery = appareilSearchInput.value.toLowerCase();
      filterList("container_appareils", searchQuery);
    });
  
    function filterList(containerId, query) {
      const container = document.getElementById(containerId);
      const items = container.getElementsByTagName("li");
      let noResults = true;
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemName = item.textContent.toLowerCase();
  
        if (itemName.includes(query)) {
          item.style.display = "block";
          noResults=false;
          
        } else {
          item.style.display = "none";
          
        }
        noResultMessage.forEach((message)=>{
          message.style.display= noResults ? "block":"none" ;
        });
       
      }
    }
    const listUstensils = document.querySelectorAll(".ustensil_item");
  
  listUstensils.forEach((e) => {
    e.addEventListener("click", (event) => {
      const ustensil = event.target.innerText;
  
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
        getSearchParams();
      });
      tag.appendChild(deleteButton);
  
      // Ajoutez le tag à votre conteneur de tags
      tagContainer.appendChild(tag);
  
      // Ajoutez l'ustensil à votre tableau search_ustensil si nécessaire
      search_ustensil.push(ustensil);
  
      // Appelez votre fonction pour gérer les paramètres de recherche
      getSearchParams();
    });
  });
  
  }