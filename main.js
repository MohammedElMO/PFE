import translation from "./translation";

// start language btn
let btn_lang = document.getElementById("langauge_btn");
btn_lang.addEventListener("click", () => {
  switch (btn_lang.innerHTML.trim()) {
    case "Fr":
      btn_lang.innerHTML = "Ar";
      setLanguage("ar");
      break;
    case "Ar":
      btn_lang.innerHTML = "En";
      setLanguage("en");
      break;
    case "En":
      btn_lang.innerHTML = "Fr";
      setLanguage("fr");

      break;
  }
});
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data_i18n]");
  elements.forEach((ele) => {
    const translationKey = ele.getAttribute("data_i18n");
    // console.log(translation[lang][translationKey]);
    ele.textContent = translation[lang][translationKey];
  });
  if (lang === "ar") {
    document.dir = "rtl";
    document.querySelector(".flex-row").style.flexDirection = "row-reverse";
  } else {
    document.dir = "ltr";
    document.querySelector(".flex").style.flexDirection = "row";
  }
}

// end language btn
document.querySelector(".favorite").addEventListener("mouseenter", () => {
  document.querySelector(".fav_element").style.display = "block";
});
document.querySelector(".fav_element").addEventListener("mouseenter", () => {
  document.querySelector(".fav_element").style.display = "block";
});
document.querySelector(".favorite").addEventListener("mouseleave", () => {
  document.querySelector(".fav_element").style.display = "none";
});
document.querySelector(".fav_element").addEventListener("mouseleave", () => {
  document.querySelector(".fav_element").style.display = "none";
});
