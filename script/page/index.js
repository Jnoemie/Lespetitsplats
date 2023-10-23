async function getRecipes(dataRecette){
    const recetteSection = document.getElementById ("section");

    dataRecette.forEach((recipe) => {
        const modelRecette = recetteFactory(recipe);
        const recetteCardDom = modelRecette.getFicheRecette();
        recetteSection.appendChild(recetteCardDom)
    });

}
async function init(){
    getRecipes(recipes);
}
init();