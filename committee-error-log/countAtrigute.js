/******************************************************************
function name |countAtributes
summary       |何回目の登場かを判定
******************************************************************/
function countAtributes() {

var start = new Date();
  //開始位置を指定
  if (COUNT == null) {COUNT = 2};
  if (COUNT >= 30000) {
    deleteTrigger();
    return;
  };

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('workspace');
  var begin = COUNT;
  var once = 1000;

  var values = sh.getRange(begin,5,once,1).getValues();
  //var tValues = sh.getRange(2,5,begin-1,2).getValues();
  var tmpValues = [];
  var results = [];

  for(var i=0; i<=values.length-1; i++){
    tmpValues.push(values[i][0]);
    //カウント結果をresultsに返す
    results.push([countA(values[i],tmpValues)]);
    //一定の件数実行したらカウントを残してループを抜ける
    if (i > once) {break;};
  };

  sh.getRange(begin,6,once,1).setValues(results);

  //カウントをプロパティに保存
  PropertiesService.getScriptProperties().setProperty('count',parseInt(begin)+parseInt(once));
//終了時間
var end = new Date();
PropertiesService.getScriptProperties().setProperty('timePast',(end - start) / 1000);
}

/******************************************************************
function name |countA
summary       |要素の出現回数を返す
******************************************************************/
function countA(tgt,arr){
  var count = 0 ;
  for (var i = 0; i < arr.length; i++) {
    var key = tgt;
    if(arr[i] == key){count++;};
  };
  Logger.log(count);
  return count;
}
