// 获取body元素
let body = document.body;

// 为body元素添加事件监听器
body.addEventListener("click", function (event) {
  let target = event.target;
  let clickedElementId;

  while (target !== body) {
    if (target.id === "select") {
      clickedElementId = "select";
      break;
    }
    target = target.parentNode;
  }
  let element = document.getElementsByClassName("search-select")[0];
  if (clickedElementId === "select") {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
});

// 定义搜索方式按钮事件
let selectBtn = document.getElementById("select");
selectBtn.addEventListener("click", function () {
  let element = document.getElementsByClassName("search-select")[0];
  element.style.display = "flex";
});

// 定义导航按钮事件
let juejinBtn = document.getElementById("juejin");
let githubBtn = document.getElementById("github");
let blogBtn = document.getElementById("blog");
let yuqueBtn = document.getElementById("yuque");
juejinBtn.addEventListener("click", function () {
  window.location.href = "https://juejin.cn/user/3448531401316829";
});
githubBtn.addEventListener("click", function () {
  window.location.href = "https://github.com/Yohn-z";
});
blogBtn.addEventListener("click", function () {
  window.location.href = "https://yohn-z.cn";
});
yuqueBtn.addEventListener("click", function () {
  window.location.href = "https://www.yuque.com";
});
