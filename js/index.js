/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stdDBName = "STD-DB";
var stdRelationName = "StdData";
var connToken = "90932830|-31949281621983466|90948228";

$("#stdid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data); 
    localStorage.setItem("recno", lvData.rec_no);
}
  
function getStdIdAsJsonObj() { 
    var stdid = $("#stdid").val();
    var jsonStr = {
    id: stdid
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record; 
    $("#stdname").val(record.name);
    $("#clas").val(record.clas);
    $("#bd").val(record.bd);
    $("#ad").val(record.ad);
    $("#ed").val(record.ed);
}

function resetForm() {
    $("#stdid").val();
    $("#stdname").val("");
    $("#clas").val("");
    $("#bd").val("");
    $("#ad").val(""); 
    $("#ed").val("");
    $("#stdid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stdid").focus();
}

function validateData() {
    var stdid, stdname, clas , bd, ad, ed;
    stdid = $("#stdid").val(); 
    stdname = $("#stdname").val();
    clas = $("#clas").val();
    ed = $("#ed").val();
    bd = $("#ra").val();
    ad = $("#ad").val();
    
    if (stdid === '') {
        alert("Student ID missing");
         $("#stdid").focus();
        return "";
    }
    if (stdname === '') {   
        alert('Student Name missing');
        $("#stdname").focus();
        return "";
    }
    if (clas === '') {
        alert("Student Class missing"); 
        $("#clas").focus();
        return "";
    }
    if (bd === "") {
        alert('Birth Date missing'); 
        $('#bd').focus();
        return "";
    }  
    if (ad === "") {
        alert("Address missing");
        $("#ad").focus();
        return "";
    }

    if (ed ===""){
        alert("Enrollement Date missing"); 
        $("#ed").focus(); 
        return "";
    }

    var jsonStrObj ={
        id: stdid,
        name: stdname,
        clas: clas,
        bd: bd,
        ad: ad,
        ed: ed
    };
    return JSON.stringify(jsonStrObj);
}




function getStd() {
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest= createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdname").focus();
    } else if (resJsonObj.status === 200) {
        $("#stid").prop("disable", true);
        fillData(resJsonObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdname").focus();
    }
}


function saveData() {
var jsonStrObj = validateData();
if (jsonStrObj === '') {
return "";
} 
var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
jQuery.ajaxSetup({async: false});
var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML); 
jQuery.ajaxSetup({async: true});
resetForm();
$('#stdid').focus();

}


function changeData() {
$("#change").prop("disabled", true);
jsonChg = validateData(); 
var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName, localStorage.getItem("recno"));
jQuery.ajaxSetup({async: false });
var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
jQuery.ajaxSetup({async: true}); 
console.log(resJsonObj);
resetForm();
$('#stdid').focus();
} 