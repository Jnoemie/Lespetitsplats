async function renderRecipes(dataRecette){
    const recetteSection = document.getElementById ("section");
    document.querySelector(".listeRecettes").innerHTML="";

    dataRecette.forEach((recipe) => {
        const modelRecette = recetteFactory(recipe);
        const recetteCardDom = modelRecette.getFicheRecette();
        recetteSection.appendChild(recetteCardDom)
    });
}
function getSearchParams(){
    let search_query = document.getElementById('field_search').value;
    let search_ingredients = document.getElementById('ingredients_search').value; 
    let search_appareil = document.getElementById('appareil_search').value; 
    let search_ustensil = document.getElementById('ustensil_search').value; 
    return {
        search_query: search_query,
        search_filters: {
            ingredients: search_ingredients,
            appareil: search_appareil,
            ustensil: search_ustensil
        }
    };
}
function searchRecipesClassic(recipes, searchParams) {
    let results = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let ingredientMatch = true, appareilMatch = true, ustensilMatch = true;

        // Vérifier si les filtres sont définis et, le cas échéant, si la recette correspond au filtre
        if (searchParams.search_filters.ingredients && !recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchParams.search_filters.ingredients.toLowerCase()))) {
            ingredientMatch = false;
        }

        if (searchParams.search_filters.appareil && !recipe.appareil.toLowerCase().includes(searchParams.search_filters.appareil.toLowerCase())) {
            appareilMatch = false;
        }

        if (searchParams.search_filters.ustensil && !recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchParams.search_filters.ustensil.toLowerCase()))) {
            ustensilMatch = false;
        }

        // Vérifier si la recette correspond à la requête de recherche (dans le nom, la description ou les ingrédients)
        let queryMatch = recipe.name.toLowerCase().includes(searchParams.search_query.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchParams.search_query.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchParams.search_query.toLowerCase()));

        // Si la recette correspond à la fois à la requête de recherche et à tous les filtres, l'ajouter aux résultats
        if (queryMatch && ingredientMatch && appareilMatch && ustensilMatch) {
            results.push(recipe);
        }
    }
    return results;
}
function searchRecipes(recipes) {
    let searchParams = getSearchParams();
    let results = searchRecipesClassic(recipes, searchParams);
    renderRecipes(results);
}

function initEvents() {
    document.getElementById('search_button').addEventListener('click', function(event) {        
        searchRecipes(recipes);
    });
}
async function init(){
    renderRecipes(recipes);
    initEvents();
}
init();