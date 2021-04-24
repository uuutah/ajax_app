function check() {
  const posts = document.querySelectorAll(".post"); // post要素の取得
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => { 
      const postId = post.getAttribute("data-id");  // 処理内容
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          // エラーが出たときに以下の処理をしないようにする
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    }); 
  }); // クリック時にイベント起こる
}
setInterval(check, 1000); // 1秒に一回チェック関数が実行される