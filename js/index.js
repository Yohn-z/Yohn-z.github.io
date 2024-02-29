let googleBtn = document.getElementById("google");
let githubBtn = document.getElementById("github");
let noteBtn = document.getElementById("note");
let baiduBtn = document.getElementById("baidu");
googleBtn.addEventListener("click", function(){
    window.location.href = "https://www.google.com/search?hl=zh"
});
githubBtn.addEventListener("click", function(){
    window.location.href = "https://github.com/Yohn-z"
});
noteBtn.addEventListener("click", function(){
    // window.location.href = "https://www.yuque.com/jiansi-8mwuq/pptmay"
    window.location.href = "http://yohn-z.cn"
});
baiduBtn.addEventListener("click", function(){
    let wd = document.getElementById("ms").value;
    window.location.href = "https://www.baidu.com/s?wd="+wd
});