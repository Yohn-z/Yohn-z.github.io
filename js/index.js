var searchType = localStorage.getItem("searchType");
if (searchType === null) {
  searchType = "biyin";
  localStorage.setItem("searchType", searchType);
}

document.getElementById("select").getElementsByTagName("i")[0].style[
  "background-image"
] = searchTypeMap[searchType].icon;

document.getElementsByClassName('search-group')[0].action = searchTypeMap[searchType].url
document.getElementsByClassName('search-input')[0].name = searchTypeMap[searchType].name

// 定义搜索方式列表显示与隐藏事件
let body = document.body;
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
  if (
    clickedElementId === "select" ||
    event.target.className === "search-select-main"
  ) {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
});

// 定义搜索方式切换事件
let searchSelectBtns = document.getElementsByClassName("search-select-btn");
for (let i = 0; i < searchSelectBtns.length; i++) {
  searchSelectBtns[i].addEventListener("click", function (event) {
    let iconImg =
      searchSelectBtns[i].getElementsByTagName("i")[0].style[
        "background-image"
      ];
    document.getElementById("select").getElementsByTagName("i")[0].style[
      "background-image"
    ] = iconImg;
    searchType = searchSelectBtns[i].dataset.id;
    localStorage.setItem("searchType", searchSelectBtns[i].dataset.id);
    document.getElementsByClassName('search-group')[0].action = searchTypeMap[searchType].url
    document.getElementsByClassName('search-input')[0].name = searchTypeMap[searchType].name
  });
}

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
