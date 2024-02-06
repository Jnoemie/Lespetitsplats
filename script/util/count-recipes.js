function updateRecipeCount() {
  const recipeCountElement = document.getElementById("nbr_recettes");
  const recipeCards = document.querySelectorAll(".recipe-card");

  const recipeCount = recipeCards.length;
  recipeCountElement.textContent = `${recipeCount} recettes`;
}
