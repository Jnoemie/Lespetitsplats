function initializeFiltering(ingredientInput, ustensilInput, appareilInput) {
    ingredientInput.addEventListener("input", () => {
      const searchQuery = ingredientInput.value.toLowerCase();
      filterList("container_ingredients", searchQuery);
    });

    ustensilInput.addEventListener("input", () => {
      const searchQuery = ustensilInput.value.toLowerCase();
      filterList("container_ustensils", searchQuery);
    });

    appareilInput.addEventListener("input", () => {
      const searchQuery = appareilInput.value.toLowerCase();
      filterList("container_appareils", searchQuery);
    });

    function filterList(containerId, query) {
      const container = document.getElementById(containerId);
      const items = container.getElementsByTagName("li");

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemName = item.textContent.toLowerCase();

        if (itemName.includes(query)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    }
  }
 
  
