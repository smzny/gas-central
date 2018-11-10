var COUNT = PropertiesService.getScriptProperties().getProperty('count');

function main() {
  if (COUNT == null) {COUNT = 2};
  if (COUNT >= 31585) {
    deleteTrigger();
    return;
  };
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getActiveSheet();
  var row = sh.getLastRow()-1;
  var begin = COUNT;
 //Logger.log('begin'+begin);
  var once = 1000;
  var domains = sh.getRange(begin,5,once,1).getValues();
 //Logger.log('domains'+domains.length);
  var results = [];
  for(var i=0; i<=domains.length-1; i++){
    var jedge = judgeGsuite(i,domains);
    if ( jedge !== -1) {
      results.push(['May not use Gsuite']);
    }else{
      results.push(['Gsuiteユーザーです']);
    }
    //一定の件数実行したらカウントを残してループを抜ける
    if (i > once) {break;};
  };
 //Logger.log('results'+results.length);
 //Logger.log('i'+i);
  sh.getRange(begin,6,results.length,1).setValues(results);
  PropertiesService.getScriptProperties().setProperty('count',parseInt(begin)+parseInt(i));
}

function judgeGsuite(i,domains) {
  var url = "https://www.google.com/a/" + domains[i] + "/ServiceLogin?hl=ja"; //Gsuiteアカウントの入口
  try {
    var request = UrlFetchApp.fetch(url) //http responseの取得
    var content = request.getContentText();
    var jedge = content.search(/G Suite を使用していないドメインのログインページにアクセスしました/)
  } catch(e) {
    var jedge = 2948
  };
Logger.log('jedge'+jedge);
  return jedge
}

/******************************************************************
function name |deleteTrigger
summary       |トリガーを削除する
******************************************************************/
// その日のトリガーを削除する
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log(triggers);
  ScriptApp.deleteTrigger(triggers[0]);
}
