async function renderRecipes(dataRecette){
    const recetteSection = document.getElementById ("section");
    document.querySelector(".listeRecettes").innerHTML="";

    let ingredients = []

    dataRecette.forEach((recipe) => {
        const modelRecette = recetteFactory(recipe);
        const recetteCardDom = modelRecette.getFicheRecette();
        recetteSection.appendChild(recetteCardDom)
        recipe.ingredients.forEach(ingr => {
            if (!ingredients.includes(ingr.ingredient)) {
                ingredients.push(ingr.ingredient)
                li = document.createElement('LI')
                check = document.createElement('INPUT')
                check.type = 'checkbox'
                check.value = ingr.ingredient
                check.classList.add('checkbox_ingredient')
                li.appendChild(check)
                span = document.createElement('SPAN')
                span.innerHTML = ingr.ingredient
                li.appendChild(span)
                document.getElementById('container_ingredients').appendChild(li)
            }
        })

    });
}
function getSearchParams(){
    let search_query = document.getElementById('field_search').value;
    let search_ingredients = []
    selected_ingredients = document.querySelectorAll('.checkbox_ingredient').forEach(check => {
        if (check.checked) search_ingredients.push(check.value.toLowerCase())
    })
    console.log(search_ingredients)
    // let search_ingredients = document.getElementById('ingredients_search').value; 
    let search_appareil = document.getElementById('appareils_search').value; 
    let search_ustensil = document.getElementById('ustensils_search').value; 
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
        console.log(recipe.ingredients)
        // Vérifier si les filtres sont définis et, le cas échéant, si la recette correspond au filtre
        recipe_ingredient_list = recipe.ingredients.map(elt => elt.ingredient.toLowerCase())
        if (searchParams.search_filters.ingredients && !searchParams.search_filters.ingredients.every(ingredient => recipe_ingredient_list.includes(ingredient))) {
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
                         recipe.ingredients.some(ingredient=> ingredient.ingredient.toLowerCase().includes(searchParams.search_query.toLowerCase()));

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

    document.querySelectorAll('.dropdown_btn').forEach(elt => elt.addEventListener('click', function(event) {
        console.log(event.target)
        console.log(event.target.classList)
        let type = 'ingredients'
        if (event.target.classList.contains('btn_appareils')) type = 'appareils'
        if (event.target.classList.contains('btn_ustensils')) type = 'ustensils'        
        console.log(type)
    console.log(document.getElementById('filtre_' + type).style.display)
        if (document.getElementById('filtre_' + type).style.display == 'none') {
            // element is hidden, show it
            document.getElementById('filtre_' + type).style.display = 'block';
            document.getElementById(type + '_down').style.display = 'none';
            document.getElementById(type + '_up').style.display = 'block';            
        } else {
            // element is visible, hide it
            document.getElementById('filtre_' + type).style.display = 'none';
            document.getElementById(type + '_down').style.display = 'block';
            document.getElementById(type + '_up').style.display = 'none';            
        }
    }));

}
async function init(){
    renderRecipes(recipes);
    initEvents();
}
init();