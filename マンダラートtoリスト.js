/******************************************************************
function name |main
summary       |メイン機能
******************************************************************/
function main() {
  // 必要な変数を定義
  var ss = SpreadsheetApp.openById('17_O2IhzVDQzIuabiNTiUItskGIdZugYTTHj1-ppaYEI');  //スプレッドシート
  var sh = ss.getSheetByName('マンダラート');
  var sh_list = ss.getSheetByName('リスト'); //メッセージシート

  //行方向のループ
  for (i = 0; i <= 2; i++ ){
    //列方向のループ
    for (j = 0; j <= 2; j++ ){
      //配列に格納
      var values = [];
      if(i == 1 && j == 1 ){
        continue; //真ん中はスキップ
      }else{
        var values = sh.getRange(i*3+1,j*3+1,3,3).getValues();
      }
      //リストを作成
      var list = makeList(values);
      //吐き出し
      sh_list.getRange(i*24+j*8+2,2,8,2).setValues(list);
    };//列方向のループ
  };//行方向のループ
}

/******************************************************************
function name |makeList
summary       |リストを生成する
******************************************************************/
function makeList(values) {
  var list = [];
  //行方向のループ
  for (k = 0; k <= 2; k++ ){
    //列方向のループ
    for (l = 0; l <= 2; l++ ){
      if(k == 1 && l == 1 ){
        continue; //真ん中はスキップ
      }else{
        list.push([values[1][1],values[k][l]]); //値を入れる
      }
    };//列方向のループ
  };//行方向のループ
  return list
};
