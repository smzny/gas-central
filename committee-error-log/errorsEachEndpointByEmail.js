/******************************************************************
function name |countAtributes
summary       |何回目の登場かを判定
******************************************************************/
function errorsEachEndpointByEmail() {

var start = new Date();
  //開始位置を指定
  if (COUNT == null) {COUNT = 2};
  if (COUNT >= 195130) {
    deleteTrigger();
    return;
  };

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('committee');
  var begin = COUNT;
  var once = 100;

  var values = sh.getRange(begin,8,once,1).getValues();
  var tmpValues = sh.getRange(1,8,begin-1,1).getValues();
  Logger.log('before = ' + tmpValues);
  var results = [];

  for(var i=0; i<=values.length-1; i++){
    tmpValues.push([values[i][0]]);
    //Logger.log('after = ' + tmpValues);
    //カウント結果をresultsに返す
    results.push([countA(values[i],tmpValues)]);
    //一定の件数実行したらカウントを残してループを抜ける
    if (i > once) {break;};
  };

  sh.getRange(begin,9,once,1).setValues(results);

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
    if(arr[i][0] == key){count++;};
  };
  Logger.log(count);
  return count;
}
