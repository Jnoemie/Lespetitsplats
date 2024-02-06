function recetteFactory(data) {
  const { id, image, name, ingredients, time, description } = data;
  const picture = `./assets/images/${image}`;

  function getFicheRecette() {
    //Affichage de la recette
    const content = document.querySelector(".listeRecettes");
    const divRecipe = document.createElement("article");
    divRecipe.className = "recipe-card";
    divRecipe.id = id;
    //time
    const timeRecipe = document.createElement("span");
    timeRecipe.className = "recipe-time";
    timeRecipe.textContent = time + "min";
    //image
    const imgRecipe = document.createElement("img");
    imgRecipe.className = "recipe-image";
    imgRecipe.setAttribute("src", picture);
    imgRecipe.setAttribute("alt", name);
    //content
    const divContentRecipe = document.createElement("div");
    divContentRecipe.className = "recipe-section";
    const titleRecipe = document.createElement("h2");
    titleRecipe.textContent = name;

    const titleDescriptionRecipe = document.createElement("h3");
    titleDescriptionRecipe.textContent = "Recette";
    const divDescriptionRecipe = document.createElement("div");
    divDescriptionRecipe.className = "recipe-description";
    divDescriptionRecipe.textContent = description;

    const titleIngredientsRecipe = document.createElement("h3");
    titleIngredientsRecipe.textContent = "Ingrédients";
    const divIngredientsRecipe = document.createElement("div");
    divIngredientsRecipe.className = "recipe-titleIngredients";

    let listIngredientsRecipe = ingredients;
    for (let ingredient of listIngredientsRecipe) {
      const divIngredient = document.createElement("div");
      divIngredient.className = "recipe-ingredient";

      const titleIngredient = document.createElement("h4");
      if (ingredient["ingredient"] !== undefined) {
        titleIngredient.textContent = ingredient["ingredient"];
      }

      const quantityIngredient = document.createElement("span");
      if (ingredient["quantity"] !== undefined) {
        quantityIngredient.textContent += ingredient["quantity"];
      }
      if (ingredient["unit"] !== undefined) {
        quantityIngredient.textContent += ingredient["unit"];
      }

      divIngredientsRecipe.appendChild(divIngredient);
      divIngredient.appendChild(titleIngredient);
      divIngredient.appendChild(quantityIngredient);
    }

    //add node
    content.appendChild(divRecipe);
    divRecipe.appendChild(timeRecipe);
    divRecipe.appendChild(imgRecipe);
    divRecipe.appendChild(divContentRecipe);
    divContentRecipe.appendChild(titleRecipe);
    divContentRecipe.appendChild(titleDescriptionRecipe);
    divContentRecipe.appendChild(divDescriptionRecipe);
    divContentRecipe.appendChild(titleIngredientsRecipe);
    divContentRecipe.appendChild(divIngredientsRecipe);

    return content;
  }

  return { name, image, getFicheRecette };
}
