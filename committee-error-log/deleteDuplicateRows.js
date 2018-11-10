/******************************************************************
function name |deleteDuplicateRows
summary       |重複する行を削除する
******************************************************************/
function deleteDuplicateRows(){

var start = new Date();
  //開始位置を指定
  if (COUNT == null) {COUNT = 2};
  if (COUNT >= 195130) {
    deleteTrigger();
    return;
  };

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('workspace');
  var once = 350;

  var values = sh.getRange(2,5,once,1).getValues();
  var tmpValues = [];
  var results = [];

  //重複行を判定する
  for(var i=0; i<=values.length-1; i++){
    //tmpValuesに対象値を入力する
    tmpValues.push([values[i][0]]);
    //カウント結果をresultsに返す
    results.push([countA(values[i],tmpValues)]);
  };

  //重複行を削除する
  for(var j=results.length; j>=0; j--){
    //resultsの中身が1以外なら行を削除する
    if (results[j][0] > 1) {sh.deleteRow(j+2)};
    //一定の件数実行したらカウントを残してループを抜ける
  };

  //カウントをプロパティに保存
  PropertiesService.getScriptProperties().setProperty('count',parseInt(begin)+parseInt(once));
//終了時間
var end = new Date();
PropertiesService.getScriptProperties().setProperty('timePast',(end - start) / 1000);
}
