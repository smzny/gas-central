/*
***********************************************************************
参照ライブラリ
title        |Underscore for GAS
project_key  |M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
***********************************************************************
*/

var COUNT = PropertiesService.getScriptProperties().getProperty('count');

function makeSeparate() {
//開始時間
var start = new Date();
  //開始位置を指定
  if (COUNT == null) {COUNT = 2};
  if (COUNT >= 195130) {
    deleteTrigger();
    return;
  };

  //変数
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('committee');
  var begin = COUNT;
  var once = 195130;
  var values = sh.getRange(2,3,once,1).getValues();

  //からの配列を用意
  var endpoints = [];
  var content_types = [];
  var application_owner_emails = [];
  var messages = [];

//変数に格納
  for(var i=0; i<=values.length-1; i++){
      endpoints.push([getAtribute(i,values,"endpoint").replace('/api/1/', '')]);
      try {content_types.push([getAtribute(i,values,"content_type").replace('; charset=UTF-8', '')])} catch(e) {content_types.push([""])};
      application_owner_emails.push([getAtribute(i,values,"application_owner_email")]);
      messages.push([getAtribute(i,values,"message")]);
    //一定の件数実行したらカウントを残してループを抜ける
    if (i > once) {break;};
  };

  //展開
  sh.getRange(begin,4,endpoints.length,1).setValues(endpoints);
  sh.getRange(begin,5,content_types.length,1).setValues(content_types);
  sh.getRange(begin,6,application_owner_emails.length,1).setValues(application_owner_emails);
  sh.getRange(begin,7,messages.length,1).setValues(messages);

  //カウントをプロパティに保存
  PropertiesService.getScriptProperties().setProperty('count',parseInt(begin)+parseInt(i));
//終了時間
var end = new Date();
PropertiesService.getScriptProperties().setProperty('timePast',(end - start) / 1000);
}

/******************************************************************
function name |getAtribute
summary       |要素を取得する
******************************************************************/
function getAtribute(i,values,key) {
  try {
    var json=JSON.parse(values[i][0]);
    var atribute = json[key];
  } catch(e) {
    var atribute = "";
  }
  return atribute;
}
/******************************************************************
function name |deleteTrigger
summary       |トリガーを削除する
******************************************************************/
// その日のトリガーを削除する
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  ScriptApp.deleteTrigger(triggers[0]);
}

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
  var once = 1000;

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
