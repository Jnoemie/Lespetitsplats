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
    const items = Array.from(container.getElementsByTagName("LI")); // Convertir en tableau pour utiliser forEach
  
    items.forEach(item => {
      const itemName = item.textContent.toLowerCase();
      item.style.display = itemName.includes(query) ? "block" : "none";
    });
  }
}
