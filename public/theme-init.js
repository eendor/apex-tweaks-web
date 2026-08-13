(() => {
  history.scrollRestoration = "manual";
  scrollTo(0, 0);
  const saved = localStorage.getItem("apex-theme");
  const dark = saved
    ? saved === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("spectrum--dark", dark);
  document.documentElement.classList.toggle("spectrum--light", !dark);
})();
