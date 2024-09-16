"use strict";

const btns = document.querySelectorAll("button");
const showOverlay = document.querySelector(".showOverlay");
const overlay = document.querySelector(".overlay");
const subOverlay = document.querySelector(".sub_overlay");
const dropArea = document.querySelector(".drop_area");
const inputFiles = document.querySelector("#file_upload");
const preview = document.querySelector(".image_preview");

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("active_btn")) {
      btn.classList.remove("active_btn");
    } else {
      btn.classList.add("active_btn");
    }
  });
});
// ========== For Modal ==========
showOverlay.addEventListener("click", function () {
  setTimeout(function () {
    overlay.style.transform = "translateY(-50rem)";
  }, 300);
  subOverlay.classList.add("active_modal");
});
subOverlay.addEventListener("click", function (event) {
  event.stopPropagation();
});

// =========== Drag and Drop Section =============
// dropArea.addEventListener("click", function () {
//   inputFiles.click();
// });
inputFiles.addEventListener("change", function (event) {
  handleFiles(event.target.files);
});

dropArea.addEventListener("dragover", function (event) {
  event.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", function () {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", function (event) {
  event.preventDefault();
  dropArea.classList.remove("dragover");
  handleFiles(event.dataTransfer.files);
});

// ========= Handling The files =============
function handleFiles(files) {
  const fileArray = [...files]; //OR  Array.from()
  fileArray.forEach(function (file) {
    if (!file.type.startsWith("image/")) return;

    const imageContainer = createImageContainer();
    const spinner = createSpinner();
    imageContainer.appendChild(spinner);

    //   ======= CREATING AN IMAGE ===========
    const img = document.createElement("img");
    img.style.display = "none";

    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
      imageContainer.style.backgroundColor = "rgba(0, 0, 0, 0.1)";

      // ====== SetTimeout ========
      setTimeout(function () {
        imageContainer.style.backgroundColor = "transparent";
        spinner.style.display = "none";
        img.style.display = "block";
      }, 800);
    };
    reader.readAsDataURL(file);

    imageContainer.appendChild(img);
    preview.appendChild(imageContainer);
  });
}

// ======= CREATING A DIV CONTAINER FOR IMAGE(S)  ========
function createImageContainer() {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image_container");

  // ========= CREATING AN ELEMENT CALLED BUTTON ========
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete_btn");
  deleteBtn.innerHTML = "<i class='fa fa-trash-can'></i>";
  deleteBtn.onclick = () => {
    preview.removeChild(imageContainer);
  };
  imageContainer.appendChild(deleteBtn);
  return imageContainer;
}

// ===== CREATING A SPINNING DIV =======
function createSpinner() {
  const spinner = document.createElement("div");
  spinner.classList.add("loading_spinner");
  return spinner;
}
