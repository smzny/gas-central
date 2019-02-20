/******************************************************************
function name |main
summary       |メイン機能
******************************************************************/
function main() {
  // 必要な変数を定義
  var ss = SpreadsheetApp.openById('');  //スプレッドシート
  var sh_count = ss.getSheetByName('人別カウント');  //人別メッセージ数のシート
  var sh_message = ss.getSheetByName('メッセージ'); //メッセージシート
  var tgt_hc = sh_count.getLastRow();  //送信先のヘッドカウント_ループ処理の回数にする
  var start_row = 2;

  //送信先データを配列に格納
  var send_info = sh_count.getRange(2,1,sh_count.getLastRow()-1,3).getValues();

  //メール送信設定
  var subject = "test";  //件名を入力してください
  var bcc = "2019aribaku@c-fo.com"; //bcc

  //人数分のループ処理
  for (i = 0; i <= tgt_hc-1; i++ ){ //データの開始行を変更する場合は-1を変えてください。
    //ループごとの変数
    var to = send_info[i][0]; //宛先のアドレス
    var to_name = send_info[i][1]; //宛先の名前
    var tgt_count = send_info[i][2] //メッセージの件数
    var sender_info = sh_message.getRange(start_row,2,tgt_count,2).getValues();  //送り主の情報をカウント数分だけ取得

    //本文を作成
    var body = makeBody(sender_info);

    //メールを送信
    var options = {};
    if (bcc) options.bcc = bcc;
    if (to) {MailApp.sendEmail(to, subject, body, options);};
    //次の開始位置を指定
    var start_row = start_row + send_info[i][2];
  };
}

/******************************************************************
function name |makeBody
summary       |文面を作成する
******************************************************************/
function makeBody(to_name,tgt_count,sender_info) {

  //固定部分前
  var fixed_body_front
  = to_name + "さん！\n"
  + "ハッピーバレンタイン！\n\n"
  + "本日15時にfreeeありがとう爆弾がバクハツし、溜まっていた" + to_name + "さん宛のありがとうが届きました。\n"
  + "\n";

  //固定部分後
  var fixed_body_rear
  = "以上となります！いつもお疲れ様です！\n"
  + "このメールを受け取った方にはfreeeから特別なチョコレートをプレゼントいたしますので、本日16時までにほげほげほげ"
  + "\n\n"
  + "https://freee.facebook.com/groups/1055166354563829/permalink/2130806113666509/\n"
  + "感謝のキモチが飛び交うfreeeへ\n"
  + "\n"
  + "2019　freeersバレンタイン”ありバク”実行委員会";

  //変動部分(人の名前とメッセージ)
  var variable_body = "";
  //メッセージの数だけループ
  for (j = 1; j <= tgt_count; j++ ) {
    variable_body = variable_body
    + "===== " + sender_info[j-1][0] + "さんより ======\n"
    + sender_info[j-1][1]
    + "====\n\n"
  };

  //本文を作成
  var body = fixed_body_front + variable_body + fixed_body_rear;
  return = body;
};
