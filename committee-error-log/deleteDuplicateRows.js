/******************************************************************
function name |deleteDuplicateRows
summary       |重複する行を削除する
******************************************************************/
function deleteDuplicateRows(){
  //開始位置を指定
  if (COUNT == null) {COUNT = 2};
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('workspace');
  var begin = COUNT;
  var once = 100;
  var i = 0;

  var values = sh.getRange(begin,6,once,1).getValues();
  for(var j=values.length; j>=0; j--){
    //resultsの中身が1以外なら行を削除する
    if (values[j][0] > 1) {
        sh.deleteRow(j+2);
    }else{
        i++;
    };
    //一定の件数実行したらカウントを残してループを抜ける
  };
  //1以外が存在しなければ、countを更新する
  if (i == 0) {
    PropertiesService.getScriptProperties().setProperty('count',parseInt(begin)+parseInt(once));
  };
}

/******************************************************************
function name |setTrigger
summary       |トリガーをセットする
******************************************************************/
function setTrigger() {
  ScriptApp.newTrigger("deleteDuplicateRows")
    .timeBased()
    .everyMinutes(10)
    .create();
}
