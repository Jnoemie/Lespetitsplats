function toggleDropdown(type) {
    const filterElement = document.getElementById("filtre_" + type);
    const downArrowElement = document.getElementById(type + "_down");
    const upArrowElement = document.getElementById(type + "_up");
  
    if (filterElement.style.display === "none" || filterElement.style.display === "") {
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