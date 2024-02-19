function updateRecipeCount() {
  const recipeCountElement = document.getElementById("nbr_recettes");
  const recipeCards = document.querySelectorAll(".recipe-card");

  const recipeCount = recipeCards.length;
  const formattedCount = String(recipeCount).padStart(2, "0"); // Formatage en "01" ou "02", etc.
  recipeCountElement.textContent = `${formattedCount} recettes`;
}
