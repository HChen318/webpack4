// 懒加载
async function getComponent() {
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ "lodash"
  );
  const ele = document.createElement("div");
  ele.innerHTML = _.join(["CH", "HXF"], "-");
  return ele;
}

document.addEventListener("click", () => {
  getComponent().then((ele) => {
    document.body.appendChild(ele);
  });
});
