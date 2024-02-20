function toggleDropdown(type) {
  const filterElement = document.getElementById("filtre_" + type);
  const downArrowElement = document.getElementById(type + "_down");
  const upArrowElement = document.getElementById(type + "_up");

  if (
    filterElement.style.display === "none" ||
    filterElement.style.display === ""
  ) {
    // L'élément est caché, le montrer
    filterElement.style.display = "block";
    downArrowElement.style.display = "none";
    upArrowElement.style.display = "block";
  } else {
    // L'élément est visible, le cacher
    filterElement.style.display = "none";
    downArrowElement.style.display = "block";
    upArrowElement.style.display = "none";
  }
}
// Attachez cette fonction aux éléments .dropdown_btn
const dropdownBtns = document.querySelectorAll(".dropdown_btn");
for (let i = 0; i < dropdownBtns.length; i++) {
  dropdownBtns[i].addEventListener("click", function (event) {
    let type = "ingredients"; // 'let' parce que cette valeur peut changer
    if (event.target.classList.contains("btn_appareils")) type = "appareils";
    if (event.target.classList.contains("btn_ustensils")) type = "ustensils";
    toggleDropdown(type);
  });
}
