/******************************************************************
function name |copyPaste
summary       |コピペ
******************************************************************/
function copyPaste() {

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
  var once = 195130;

  var values = sh.getRange(begin,4,once,4).getValues();
  var results = [];

  for(var i=0; i<=values.length-1; i++){
    var endpoint = values[i][0];
    var content_type = values[i][1];
    var application_owner_email = values[i][2];
    var message = values[i][3];
    var unique = endpoint + content_type + application_owner_email + message
    Logger.log(unique);
    results.push([unique]);
    //一定の件数実行したらカウントを残してループを抜ける
    if (i > once) {break;};
  };

  sh.getRange(begin,8,once,1).setValues(results);

  //カウントをプロパティに保存
  PropertiesService.getScriptProperties().setProperty('count',parseInt(begin)+parseInt(once));
//終了時間
var end = new Date();
PropertiesService.getScriptProperties().setProperty('timePast',(end - start) / 1000);
}
