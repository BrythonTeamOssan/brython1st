$(document).ready(function(){

	//TVは選択済み
	updateOrderDB('2', 'tv', '', '');

	selectOrderDB();		//契約概要の選択状況表示
	selFeeDB();				//月額費用の表示

	//TV基本コース選択
	$("#chk_opt1").click(function(){
		location.href ='./05_serviceselect_03_option_tv_01.html';
	});

	//STB選択
	$("#chk_opt2").click(function(){
		location.href ='./05_serviceselect_03_option_tv_02.html';
	});

	//オプションチャンネル選択
	$("#chk_opt3").click(function(){
		location.href ='./05_serviceselect_03_option_tv_03.html';
	});

	//月額費用
	//TV基本コース
	$("#radio_option_max").click(function(){ updateOrderDB('7', '8800', '', '');  selFeeDB(); });
	$("#radio_option_big").click(function(){ updateOrderDB('7', '6600', '', '');  selFeeDB(); });
	$("#radio_option_ace").click(function(){ updateOrderDB('7', '6000', '', '');  selFeeDB(); });
	$("#radio_option_mini").click(function(){ updateOrderDB('7', '3700', '', ''); selFeeDB(); });

	//STB
	$("#radio_option_bdhit").click(function(){ updateOrderDB('8', '6600', '', ''); selFeeDB(); });
	$("#radio_option_dvdhit").click(function(){ updateOrderDB('8', '6000', '', ''); selFeeDB(); });
	$("#radio_option_hit").click(function(){ updateOrderDB('8', '5700', '', ''); selFeeDB(); });
	$("#radio_option_stb").click(function(){ updateOrderDB('8', '4800', '', ''); selFeeDB(); });

	//オプションチャンネル
	$("#chk_option_tv2").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+2000', '11', 'chk_option_tv2');}  else {optionCalc('-2000', '11', '');}});
	$("#chk_option_tv3").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+2300', '12', 'chk_option_tv3');}  else {optionCalc('-2300', '12', '');}});
	$("#chk_option_tv4").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+3000', '13', 'chk_option_tv4');}  else {optionCalc('-3000', '13', '');}});
	$("#chk_option_tv5").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+2500', '14', 'chk_option_tv5');}  else {optionCalc('-2500', '14', '');}});
	$("#chk_option_tv6").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+2500', '15', 'chk_option_tv6');}  else {optionCalc('-2500', '15', '');}});
	$("#chk_option_tv7").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+600',  '16', 'chk_option_tv7');}  else {optionCalc('-600',  '16', '');}});
	$("#chk_option_tv8").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+600',  '17', 'chk_option_tv8');}  else {optionCalc('-600',  '17', '');}});
	$("#chk_option_tv9").click(function(){ if($(this).prop("checked") == true)  {optionCalc('+1500', '18', 'chk_option_tv9');}  else {optionCalc('-1500', '18', '');}});
	$("#chk_option_tv10").click(function(){ if($(this).prop("checked") == true) {optionCalc('+1200', '19', 'chk_option_tv10');} else {optionCalc('-1200', '19', '');}});
	$("#chk_option_tv11").click(function(){ if($(this).prop("checked") == true) {optionCalc('+600',  '20', 'chk_option_tv11');} else {optionCalc('-600',  '20', '');}});
	$("#chk_option_tv12").click(function(){ if($(this).prop("checked") == true) {optionCalc('+700',  '21', 'chk_option_tv12');} else {optionCalc('-700',  '21', '');}});
	$("#chk_option_tv13").click(function(){ if($(this).prop("checked") == true) {optionCalc('+1200', '22', 'chk_option_tv13');} else {optionCalc('-1200', '22', '');}});
	$("#chk_option_tv14").click(function(){ if($(this).prop("checked") == true) {optionCalc('+1500', '23', 'chk_option_tv14');} else {optionCalc('-1500', '23', '');}});
	$("#chk_option_tv15").click(function(){ if($(this).prop("checked") == true) {optionCalc('+1600', '24', 'chk_option_tv15');} else {optionCalc('-1600', '24', '');}});
	$("#chk_option_tv16").click(function(){ if($(this).prop("checked") == true) {optionCalc('+1600', '25', 'chk_option_tv16');} else {optionCalc('-1600', '25', '');}});
	$("#chk_option_tv17").click(function(){ if($(this).prop("checked") == true) {optionCalc('+1600', '26', 'chk_option_tv17');} else {optionCalc('-1600', '26', '');}});
	$("#chk_option_tv18").click(function(){ if($(this).prop("checked") == true) {optionCalc('+2000', '27', 'chk_option_tv18');} else {optionCalc('-2000', '27', '');}});
});

function optionCalc(val, id2, channel) {
	optionTotalVal = eval(optionTotalVal + val);		//今回更新されたオプション合計
	updateOrderDB('9', optionTotalVal, id2, channel);
	selFeeDB();
}


var optionTotalVal = '0';

var db;
var id;
var plan;
var id2 = '';
var chan = '';
function updateOrderDB(plan_id, plan_sel, opt_id2, opt_channel){
    db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);

    id   = plan_id;
    plan = plan_sel;
    id2  = opt_id2;
    chan = opt_channel;

   	db.transaction(queryUpdateDB, errorCB);
    delete db;  //メモリ解放
}

function queryUpdateDB(tx) {
    tx.executeSql('UPDATE OrderTable SET sel_val = "' + plan + '" WHERE id = "'+ id + '"', [], queryUpdateSuccess, errorCB);

    //オプションチャンネルが選択されている場合
    if(id2 != '') {
    	tx.executeSql('UPDATE OrderTable SET sel_val = "' + chan + '" WHERE id = "'+ id2 + '"', [], queryUpdateSuccess, errorCB);
    }

}

// 問い合わせ成功時のコールバック
function queryUpdateSuccess(tx, results) {
}

// トランザクション失敗時のコールバック
function errorCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}

function selFeeDB(){
    db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);
    db.transaction(querySelectDB, errorSelectCB);
    delete db;  //メモリ解放
}

function querySelectDB(tx) {
    tx.executeSql('SELECT * FROM OrderTable', [], querySelectSuccess, errorCB);
}

function querySelectSuccess(tx, results) {
	var feeTotal = 0;

	var feeTotalVal  = results.rows.item(6).sel_val;
	var feeSTBVal    = results.rows.item(7).sel_val;
	var feeOptionVal = results.rows.item(8).sel_val;
	var initFee      = results.rows.item(9).sel_val;

	var chan2  = results.rows.item(10).sel_val;
	var chan3  = results.rows.item(11).sel_val;
	var chan4  = results.rows.item(12).sel_val;
	var chan5  = results.rows.item(13).sel_val;
	var chan6  = results.rows.item(14).sel_val;
	var chan7  = results.rows.item(15).sel_val;
	var chan8  = results.rows.item(16).sel_val;
	var chan9  = results.rows.item(17).sel_val;
	var chan10 = results.rows.item(18).sel_val;
	var chan11 = results.rows.item(19).sel_val;
	var chan12 = results.rows.item(20).sel_val;
	var chan13 = results.rows.item(21).sel_val;
	var chan14 = results.rows.item(22).sel_val;
	var chan15 = results.rows.item(23).sel_val;
	var chan16 = results.rows.item(24).sel_val;
	var chan17 = results.rows.item(25).sel_val;
	var chan18 = results.rows.item(26).sel_val;


	feeTotal = eval(feeTotalVal + "+" + feeSTBVal + "+" + feeOptionVal);
	feeOptionVal = eval(feeOptionVal + "+" + '0');

	$("#init-total").text(initFee.toLocaleString());
	$("#fee-total").text(feeTotal.toLocaleString());
	$("#fee-option").text('+'+feeOptionVal.toLocaleString());

	optionTotalVal = feeOptionVal;

	(chan2  != '') ? $("#chk_option_tv2").prop("checked",  true) : $("#chk_option_tv2").prop("checked",  false);
	(chan3  != '') ? $("#chk_option_tv3").prop("checked",  true) : $("#chk_option_tv3").prop("checked",  false);
	(chan4  != '') ? $("#chk_option_tv4").prop("checked",  true) : $("#chk_option_tv4").prop("checked",  false);
	(chan5  != '') ? $("#chk_option_tv5").prop("checked",  true) : $("#chk_option_tv5").prop("checked",  false);
	(chan6  != '') ? $("#chk_option_tv6").prop("checked",  true) : $("#chk_option_tv6").prop("checked",  false);
	(chan7  != '') ? $("#chk_option_tv7").prop("checked",  true) : $("#chk_option_tv7").prop("checked",  false);
	(chan8  != '') ? $("#chk_option_tv8").prop("checked",  true) : $("#chk_option_tv8").prop("checked",  false);
	(chan9  != '') ? $("#chk_option_tv9").prop("checked",  true) : $("#chk_option_tv9").prop("checked",  false);
	(chan10 != '') ? $("#chk_option_tv10").prop("checked", true) : $("#chk_option_tv10").prop("checked", false);
	(chan11 != '') ? $("#chk_option_tv11").prop("checked", true) : $("#chk_option_tv11").prop("checked", false);
	(chan12 != '') ? $("#chk_option_tv12").prop("checked", true) : $("#chk_option_tv12").prop("checked", false);
	(chan13 != '') ? $("#chk_option_tv13").prop("checked", true) : $("#chk_option_tv13").prop("checked", false);
	(chan14 != '') ? $("#chk_option_tv14").prop("checked", true) : $("#chk_option_tv14").prop("checked", false);
	(chan15 != '') ? $("#chk_option_tv15").prop("checked", true) : $("#chk_option_tv15").prop("checked", false);
	(chan16 != '') ? $("#chk_option_tv16").prop("checked", true) : $("#chk_option_tv16").prop("checked", false);
	(chan17 != '') ? $("#chk_option_tv17").prop("checked", true) : $("#chk_option_tv17").prop("checked", false);
	(chan18 != '') ? $("#chk_option_tv18").prop("checked", true) : $("#chk_option_tv18").prop("checked", false);
}
function errorSelectCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}
