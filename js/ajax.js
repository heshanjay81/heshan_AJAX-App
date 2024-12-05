(() => {
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("loading-spinner");
  loadingSpinner.innerHTML = "<span>Loading...</span>"; 
  materialList.parentElement.insertBefore(loadingSpinner, materialList);

  function loadMaterialInfo() {
     
      loadingSpinner.style.display = "block";
      materialList.style.display = "none";

      fetch("https://swiftpixel.com/earbud/api/materials")
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then((materialListData) => {
              materialListData.forEach((material) => {
                  const clone = materialTemplate.content.cloneNode(true);

                  const materialHeading = clone.querySelector(".material-heading");
                  materialHeading.textContent = material.heading;

                  const materialDescription = clone.querySelector(".material-description");
                  materialDescription.textContent = material.description;

                  materialList.appendChild(clone);
              });

            
              loadingSpinner.style.display = "none";
              materialList.style.display = "block";
          })
          .catch((error) => {
              console.error("Failed to load materials:", error);

         
              loadingSpinner.innerHTML = "<span>Error loading materials. Please try again later.</span>";
          });
  }

  loadMaterialInfo();
})();
