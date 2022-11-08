document.addEventListener("click", () => {
  import(/* webpackPrefetch: true */ "./click").then(({ default: fnc }) => {
    fnc();
  });
});
