$(document).ready(function(){
	createOrderDB();
});


//次のサービス選択画面で使用するため、ここの画面でDBを作成
function createOrderDB(){
    var db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);
    db.transaction(executeQuery, errorCB);
    delete db;  //メモリ解放
}

function executeQuery(tx) {

    tx.executeSql('DROP TABLE IF EXISTS OrderTable');
    tx.executeSql('CREATE TABLE IF NOT EXISTS OrderTable (id unique, sel_val)');

    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("1", "")');			//プラン
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("2", "")');			//カテゴリ(TV)
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("3", "")');			//カテゴリ(NET)
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("4", "")');			//カテゴリ(PHONE)
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("5", "")');			//カテゴリ(SMART)
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("6", "")');			//カテゴリ(HEMS)
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("7", "0")');		//月額費用（計）
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("8", "0")');		//月額費用（STB）
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("9", "0")');		//月額費用（オプション）
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("10", "0")');		//初期費用
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("11", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("12", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("13", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("14", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("15", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("16", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("17", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("18", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("19", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("20", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("21", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("22", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("23", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("24", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("25", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("26", "")');		//オプションチャンネル
    tx.executeSql('INSERT INTO OrderTable (id, sel_val) VALUES ("27", "")');		//オプションチャンネル


}

//トランザクション失敗時のコールバック
function errorCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}
