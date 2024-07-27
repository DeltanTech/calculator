(() => {
  //DOM要素の取得
  const $doc = document;
  const $buttons = $doc.querySelectorAll("button");
  const $display = $doc.getElementById("js-display");
  const $equal = $doc.getElementById("js-equal");
  const $btnLen = $buttons.length;

  //イコールボタンの初期値を無効にする
  $equal.disabled = true;

  //値を無害化する
  const checkWord = (str) => {
    // 正規表現でアルファベットを1文字以上含むパターンを指定
    const alphabet = /[a-zA-Z]/; 
    // 文字列が正規表現にマッチするかを判定
    return alphabet.test(str);
  }
 //すべてのボタンに対してイベントを投与
  let btnIndex = 0;
  while(btnIndex < $btnLen){
    $buttons[btnIndex].addEventListener("click", (e) => calc(e));
    btnIndex++;
  }
  //計算関数
  const calc = (e) => {
    //$contentに押されたボタンのvalueデータを格納
    const $content = e.target.value;
    //$contentの中身によって動作を変える
    switch($content){
      case "=":
        if(checkWord($display.value) === true){
          //何もしない
        } else {
          const result = new Function("return " + $display.value);
          $display.value = result();
        }
        break;
      case "C":
        $display.value = "";
        $equal.disabled = true;
        break;
      case "del":
        $display.value = $display.value.slice(0, -1);
        break;
      default:
        $display.value += $content;
    }
    if($display.value === "") {
      $equal.disabled = true;
    } else {
      $equal.disabled = false;
    }
  };
})();
