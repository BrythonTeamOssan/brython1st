$(document).ready(function(){
	//プラン選択
	//プランを選択しない
//	$("#chk_plan_no_select").click(function(){ updateOrderDB('1', ''); updateOrderDB('10', '0'); selPlanOrderDB(); });
//	//ダブル2年プラン
//	$("#chk_plan_w2year").click(function(){ updateOrderDB('1', 'plan2_w2'); updateOrderDB('10', '4000'); selPlanOrderDB(); });
//	//ダブル3年プラン
//	$("#chk_plan_w3year").click(function(){ updateOrderDB('1', 'plan3_w3'); updateOrderDB('10', '3500'); selPlanOrderDB(); });
//	//トリプル3年プラン
//	$("#chk_plan_tri3year").click(function(){ updateOrderDB('1', 'plan4_tri3'); updateOrderDB('10', '3000'); selPlanOrderDB();});
//	//お任せマスター
//	$("#chk_plan_omakase").click(function(){ updateOrderDB('1', 'plan5_om'); updateOrderDB('10', '4500'); selPlanOrderDB(); });

	$("#chk_plan_no_select").click(function(){ updateOrderDB('1', '', '10', '0'); selPlanOrderDB(); });
	//ダブル2年プラン
	$("#chk_plan_w2year").click(function(){ updateOrderDB('1', 'plan2_w2', '10', '4000'); selPlanOrderDB(); });
	//ダブル3年プラン
	$("#chk_plan_w3year").click(function(){ updateOrderDB('1', 'plan3_w3', '10', '3500'); selPlanOrderDB(); });
	//トリプル3年プラン
	$("#chk_plan_tri3year").click(function(){ updateOrderDB('1', 'plan4_tri3', '10', '3000'); selPlanOrderDB();});
	//お任せマスター
	$("#chk_plan_omakase").click(function(){ updateOrderDB('1', 'plan5_om', '10', '4500'); selPlanOrderDB(); });

	//カテゴリ選択
	//TV
	//$("#chk_plan_no_select").click(function(){
	//	if($(this).prop("checked") == true) { updateOrderDB(''); }
	//});

	selectOrderDB();	//契約概要の選択状況表示
	selPlanOrderDB();	//プランの選択状況表示
});

var db;
var id;
var plan;
var id2;
var cost;

function updateOrderDB(plan_id, plan_sel, fee_id, fee_cost){
    db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);

    id   = plan_id;
    plan = plan_sel;
    id2  = fee_id;
    cost = fee_cost;

   	db.transaction(queryUpdateDB, errorCB);
    delete db;  //メモリ解放
}

function queryUpdateDB(tx) {
	//初期化
	tx.executeSql('UPDATE OrderTable SET sel_val = "" WHERE id = "2"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "" WHERE id = "3"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "" WHERE id = "4"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "0" WHERE id = "7"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "0" WHERE id = "8"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "0" WHERE id = "9"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "0" WHERE id = "10"', [], queryUpdateSuccess, errorCB);
	tx.executeSql('UPDATE OrderTable SET sel_val = "" WHERE id >= "11" and id <= "27"', [], queryUpdateSuccess, errorCB);

    tx.executeSql('UPDATE OrderTable SET sel_val = "' + plan + '" WHERE id = "'+ id + '"', [], queryUpdateSuccess, errorCB);
    tx.executeSql('UPDATE OrderTable SET sel_val = "' + cost + '" WHERE id = "'+ id2 + '"', [], queryUpdateSuccess, errorCB);
}

// 問い合わせ成功時のコールバック
function queryUpdateSuccess(tx, results) {
}

// トランザクション失敗時のコールバック
function errorCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}

//画面表示
function selPlanOrderDB(){
    db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);
    db.transaction(querySelectDB, errorSelectCB);
    delete db;  //メモリ解放
}

function querySelectDB(tx) {
    tx.executeSql('SELECT * FROM OrderTable', [], querySelectSuccess, errorCB);
}

function querySelectSuccess(tx, results) {
	var feeTotal = 0;

	var selPlan      = results.rows.item(0).sel_val;
	var feeTotalVal  = results.rows.item(6).sel_val;
	var feeSTBVal    = results.rows.item(7).sel_val;
	var feeOptionVal = results.rows.item(8).sel_val;
	var initFee      = results.rows.item(9).sel_val;

	if(selPlan == '')                {}
	else if(selPlan == 'plan2_w2')   { $("#chk_plan_w2year").prop('checked', true);    }
	else if(selPlan == 'plan3_w3')   { $("#chk_plan_w3year").prop('checked', true);    }
	else if(selPlan == 'plan4_tri3') { $("#chk_plan_tri3year").prop('checked', true);  }
	else if(selPlan == 'plan5_om')   { $("#chk_plan_omakase").prop('checked', true);   }

	feeTotal = eval(feeTotalVal + "+" + feeSTBVal + "+" + feeOptionVal);
	feeOptionVal = eval(feeOptionVal + "+" + '0');

	$("#init-total").text(initFee.toLocaleString());
	$("#fee-total").text(feeTotal.toLocaleString());
	$("#fee-option").text('+'+feeOptionVal.toLocaleString());

}
function errorSelectCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}

function changeImg() {
	if($("#chImgBtn").val() == ">>") {
		$("#chImgBtn").val("<<");
		$("#imgSrc").attr("src", "./content/plan2.bmp");

	} else {
		$("#chImgBtn").val(">>");
		$("#imgSrc").attr("src", "./content/plan1.bmp");
	}
}
