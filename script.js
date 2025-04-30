const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const root = document.querySelector(":root");
let darkTheme = document.body.classList.contains("dark");

if (localStorage.getItem("theme") === "dark") {
  themeChanger("white", `#111111`);
}

moonIcon.addEventListener("click", (e) => {
  themeChanger("white", `#111111`);
  localStorage.setItem("theme", "dark");
});

sunIcon.addEventListener("click", (e) => {
  themeChanger(`#000`, "#e7e3d3");
  localStorage.setItem("theme", "");
});

function themeChanger(text, background) {
  sunIcon.classList.toggle("hidden");
  moonIcon.classList.toggle("hidden");
  document.body.classList.toggle("dark");
  root.style.setProperty("--background", background);
  root.style.setProperty("--text", text);
  darkTheme = document.body.classList.contains("dark");
}
