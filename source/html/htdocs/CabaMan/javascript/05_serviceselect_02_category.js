$(document).ready(function(){
	//カテゴリ選択

	//TV
	//$("#chk_category_tv").click(function(){ ($(this).prop("checked") == false) ? updateOrderDB('2', '') : updateOrderDB('2', 'tv'); });
	$("#chk_category_tv").click(function(){
		if($(this).prop("checked") == false) {
			optionInitVal = eval($("#init-total").text() + '-1500');
			updateOrderDB('2', '', '10', optionInitVal);
			selCategoryOrderDB();

			$("#categoryImg").attr("src", "./content/category0_main.bmp");
		} else {

			optionInitVal = eval($("#init-total").text() + '+1500');
			updateOrderDB('2', 'tv', '10', optionInitVal);
			selCategoryOrderDB();

			$("#categoryImg").attr("src", "./content/category1_tv.bmp");
		}
	});
	//NET
	$("#chk_category_net").click(function(){
		if($(this).prop("checked") == false){
			optionInitVal = eval($("#init-total").text() + '-2800');
			updateOrderDB('3', '', '10', optionInitVal);
			selCategoryOrderDB();
		} else {
			optionInitVal = eval($("#init-total").text() + '+2800');
			updateOrderDB('3', 'net', '10', optionInitVal);
			selCategoryOrderDB();
		}
	});
	//PHONE
	$("#chk_category_phone").click(function(){
		if($(this).prop("checked") == false){
			optionInitVal = eval($("#init-total").text() + '-400');
			updateOrderDB('4', '', '10', optionInitVal);
			selCategoryOrderDB();
		} else {
			optionInitVal = eval($("#init-total").text() + '+400');
			updateOrderDB('4', 'phone', '10', optionInitVal);
			selCategoryOrderDB();
		}
	});
	//SMART
	$("#chk_category_smart").click(function(){ ($(this).prop("checked") == false) ? updateOrderDB('5', '') : updateOrderDB('5', 'smart'); });
	//HEMS
	$("#chk_category_hems").click(function(){ ($(this).prop("checked") == false) ? updateOrderDB('6', '') : updateOrderDB('6', 'hems'); });

	selectOrderDB();		//契約概要の選択状況表示
	selCategoryOrderDB();	//カテゴリの選択状況表示

});

var optionInitVal = 0;

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
function selCategoryOrderDB(){
    db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);
    db.transaction(querySelectDB, errorSelectCB);
    delete db;  //メモリ解放
}

function querySelectDB(tx) {
    tx.executeSql('SELECT * FROM OrderTable', [], querySelectSuccess, errorCB);
}

function querySelectSuccess(tx, results) {
	var feeTotal = 0;

	var catTV        = results.rows.item(1).sel_val;
	var catNET       = results.rows.item(2).sel_val;
	var catPHONE     = results.rows.item(3).sel_val;
	var catSMART     = results.rows.item(4).sel_val;
	var catHEMS      = results.rows.item(5).sel_val;
	var feeTotalVal  = results.rows.item(6).sel_val;
	var feeSTBVal    = results.rows.item(7).sel_val;
	var feeOptionVal = results.rows.item(8).sel_val;
	var initFee      = results.rows.item(9).sel_val;

	if(catTV != '')    { $("#chk_category_tv").prop('checked', true);    }
	if(catNET != '')   { $("#chk_category_net").prop('checked', true);   }
	if(catPHONE != '') { $("#chk_category_phone").prop('checked', true); }
	if(catSMART != '') { $("#chk_category_smart").prop('checked', true); }
	if(catHEMS != '')  { $("#chk_category_hems").prop('checked', true);  }

	feeTotal = eval(feeTotalVal + "+" + feeSTBVal + "+" + feeOptionVal);
	feeOptionVal = eval(feeOptionVal + "+" + '0');

	$("#init-total").text(initFee.toLocaleString());
	$("#fee-total").text(feeTotal.toLocaleString());
	$("#fee-option").text('+'+feeOptionVal.toLocaleString());

}
function errorSelectCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}

function optionCalc(val) {
	optionInitVal = eval($("#init-total").text() + val);
	updateOrderDB('10', optionInitVal);
	selCategoryOrderDB();
}

