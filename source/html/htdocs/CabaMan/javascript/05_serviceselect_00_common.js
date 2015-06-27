$(document).ready(function(){
});


//########################################################################################
// データベースに問い合わせ
function queryDB(tx) {
    tx.executeSql('SELECT * FROM OrderTable', [], querySuccess, errorCB);
}

// 問い合わせ成功時のコールバック
function querySuccess(tx, results) {
	var selPlan  = results.rows.item(0).sel_val;
	var catTV    = results.rows.item(1).sel_val;
	var catNET   = results.rows.item(2).sel_val;
	var catPHONE = results.rows.item(3).sel_val;
	var catSMART = results.rows.item(4).sel_val;
	var catHEMS  = results.rows.item(5).sel_val;
	var optTV    = results.rows.item(6).sel_val;
	var optSTB   = results.rows.item(7).sel_val;

	//プラン
	$("#lab-sel-plan").removeClass("G05-plan-label-noselect");
	if(selPlan == '') {
		$("#lab-sel-plan").removeClass("G05-sel-plan");
		$("#lab-sel-plan").addClass("G05-plan-label-noselect");
		$("#lab-sel-plan").text("未選択");
	} else {
		$("#lab-sel-plan").removeClass("G05-plan-label-noselect");
		$("#lab-sel-plan").addClass("G05-sel-plan");

		if(selPlan == 'plan2_w2')        { $("#lab-sel-plan").text("ダブル2年プラン");   }
		else if(selPlan == 'plan3_w3')   { $("#lab-sel-plan").text("ダブル3年プラン");   }
		else if(selPlan == 'plan4_tri3') { $("#lab-sel-plan").text("トリプル3年プラン"); }
		else if(selPlan == 'plan5_om')   { $("#lab-sel-plan").text("お任せマスター");    }
	}

	//カテゴリ
	//TV
	if(catTV == '') {
		$("#cat-tv").removeClass("G05-cat-select");
		$("#cat-tv").addClass("G05-plan-label-noselect");
	} else if(catTV != '') {
		$("#cat-tv").removeClass("G05-plan-label-noselect");
		$("#cat-tv").addClass("G05-cat-select");
		$("#category_tv_select").prop("checked",true);
		$("#categoryImg").attr("src", "./content/category1_tv.bmp");
	}
	//NET
	if(catNET == '') {
		$("#cat-net").removeClass("G05-cat-select");
		$("#cat-net").addClass("G05-plan-label-noselect");
	} else if(catNET != '') {
		$("#cat-net").removeClass("G05-plan-label-noselect");
		$("#cat-net").addClass("G05-cat-select");
	}
	//PHONE
	if(catPHONE == '') {
		$("#cat-phone").removeClass("G05-cat-select");
		$("#cat-phone").addClass("G05-plan-label-noselect");
	} else if(catPHONE != '') {
		$("#cat-phone").removeClass("G05-plan-label-noselect");
		$("#cat-phone").addClass("G05-cat-select");
	}
	//SMART
	if(catSMART == '') {
		$("#cat-smart").removeClass("G05-cat-select");
		$("#cat-smart").addClass("G05-plan-label-noselect");
	} else if(catSMART != '') {
		$("#cat-smart").removeClass("G05-plan-label-noselect");
		$("#cat-smart").addClass("G05-cat-select");
	}
	//HEMS
	if(catHEMS == '') {
		$("#cat-hems").removeClass("G05-cat-select");
		$("#cat-hems").addClass("G05-plan-label-noselect");
	} else if(catHEMS != '') {
		$("#cat-hems").removeClass("G05-plan-label-noselect");
		$("#cat-hems").addClass("G05-cat-select");
	}

	//オプション
	if(optTV != '') {
		if(optTV == '8800') { $("#radio_option_max").prop("checked", true); }
		else if(optTV == '6600') { $("#radio_option_big").prop("checked", true); }
		else if(optTV == '6000') { $("#radio_option_ace").prop("checked", true) }
		else if(optTV == '3700') { $("#radio_option_mini").prop("checked", true) }
	}

	if(optSTB !='') {
		if(optSTB == '6600') { $("#radio_option_bdhit").prop("checked", true); }
		else if(optSTB == '6000') { $("#radio_option_dvdhit").prop("checked", true); }
		else if(optSTB == '5700') { $("#radio_option_hit").prop("checked", true); }
		else if(optSTB == '4800') { $("#radio_option_stb").prop("checked", true); }
	}

}

// トランザクション失敗時のコールバック
function errorCB(err) {
    console.log("SQL 実行中にエラーが発生しました: "+err.code);
}

function selectOrderDB(){
    var db = window.openDatabase("OrderDB", "1.0", "OrderDatabase", 200000);
    db.transaction(queryDB, errorCB);
    delete db;  //メモリ解放
}
