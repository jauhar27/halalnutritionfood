function addDeleteForms(){$("[data-method]").append(function(){return!$(this).find("form").length>0?"\n<form action='"+$(this).attr("href")+"' method='POST' name='delete_item' style='display:none'>\n   <input type='hidden' name='_method' value='"+$(this).attr("data-method")+"'>\n   <input type='hidden' name='_token' value='"+$('meta[name="_token"]').attr("content")+"'>\n</form>\n":""}).removeAttr("href").attr("style","cursor:pointer;").attr("onclick",'$(this).find("form").submit();')}function addVerifyForms(){$("[data-method]").append(function(){return!$(this).find("form").length>0?"\n<form action='"+$(this).attr("href")+"' method='POST' name='verify_item' style='display:none'>\n   <input type='hidden' name='_method' value='"+$(this).attr("data-method")+"'>\n   <input type='hidden' name='_token' value='"+$('meta[name="_token"]').attr("content")+"'>\n</form>\n":""}).removeAttr("href").attr("style","cursor:pointer;").attr("onclick",'$(this).find("form").submit();')}$(function(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="_token"]').attr("content")}}),addDeleteForms(),addVerifyForms()}),$("body").on("keydown",".form-code",function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110])||65==e.keyCode&&e.ctrlKey===!0||67==e.keyCode&&e.ctrlKey===!0||88==e.keyCode&&e.ctrlKey===!0||e.keyCode>=35&&e.keyCode<=39||(e.shiftKey||e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)&&e.preventDefault()}),$("body").on("keydown",".form-number",function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||65==e.keyCode&&e.ctrlKey===!0||67==e.keyCode&&e.ctrlKey===!0||86==e.keyCode&&e.ctrlKey===!0||88==e.keyCode&&e.ctrlKey===!0||e.keyCode>=35&&e.keyCode<=39||(e.shiftKey||e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105)&&e.preventDefault()}),$(".form-date").inputmask("dd-mm-yyyy",{placeholder:"dd-mm-yyyy"}),$(".select2").select2({width:"100%",theme:"bootstrap"}),$(".dataTable").DataTable(),$(".productName").select2({width:"100%",tokenSeparators:[","],theme:"bootstrap",placeholder:"Click here and start typing to search.",ajax:{url:laroute.route("api.foodproduct.list"),dataType:"json",delay:250,data:function(e){return{q:e.term}},processResults:function(e){return{results:e}},cache:!0},minimumInputLength:2}).on("select2:select",function(e){window.location.href=laroute.route("foodproduct.show",{foodproduct:e.params.data.id})}),$(".additive").select2({width:"100%",tokenSeparators:[","],theme:"bootstrap",placeholder:"Click here and start typing to search.",ajax:{url:laroute.route("api.additive.list"),dataType:"json",delay:250,data:function(e){return{q:e.term}},processResults:function(e){return{results:e}},cache:!0},minimumInputLength:2}).on("select2:select",function(e){window.location.href=laroute.route("additive.show",{additive:e.params.data.id})});var add_form_max=10,add_form_wrapper=$(".input_fields_wrap"),add_certificate=$(".add_certificate"),add_source=$(".add_source"),x=1;$(add_certificate).click(function(e){e.preventDefault(),add_form_max>x&&(x++,$(add_form_wrapper).append('<div class="row"><div class="col-lg-3 col-md-4"><div class="form-group"><input class="form-control form-code" placeholder="Code" name="cCode[]" type="text"></div></div><div class="col-lg-2 col-md-3"><div class="form-group"><input class="form-control form-date" id="certexp" placeholder="dd-mm-yyyy" name="cExpire[]" type="text"></div></div><div class="col-lg-3 col-md-4"><div class="form-group"><select class="form-control select3" placeholder="Status" name="cStatus[]"><option value="0">Development</option><option value="1">New</option><option value="2">Renew</option></select></div></div><div class="col-lg-3 col-md-4 col-xs-11"><div class="form-group"><input class="halalcertorg form-control" placeholder="Halal Organization" autocomplete="off" name="cOrganization[]" type="text"></div></div><div class="col-lg-1 col-md-1 col-xs-1"><a href="#" class="btn btn-danger remove_field"><i class="fa fa-minus"></i></a></div></div>'),$(".form-date").inputmask("dd-mm-yyyy",{placeholder:"dd-mm-yyyy"}),$(".select3").select2({width:"100%",theme:"bootstrap"}),$(".halalcertorg").typeahead({ajax:{url:laroute.route("api.certOrg.list"),triggerLength:3}}))}),$(add_source).click(function(e){e.preventDefault(),add_form_max>x&&(x++,$(add_form_wrapper).append('<div class="col-lg-4 col-md-6 col-xs-12"><div class="col-md-12"><label for="halalSource">Halal Source</label></div><div class="col-md-12"><div class="form-group"><input class="hOrganization form-control" placeholder="Halal Organization" name="hOrganization[]" type="text" autocomplete="off"></div></div><div class="col-md-12"><div class="form-group"><select class=" select3 form-control" placeholder="Halal Status" name="hStatus[]"><option value="0">Halal</option><option value="1">Masbooh</option><option value="2">Haram</option></select></div></div><div class="col-md-12"><div class="form-group"><textarea class="form-control" placeholder="Enter description here" rows="10" cols="3" name="hDescription[]"></textarea></div></div><div class="col-lg-10 col-md-10 col-xs-10"><div class="form-group"><input class="url form-control" placeholder="Put URL here" name="url[]" type="text"></div></div><div class="col-md-1"><a href="#" class="btn btn-danger remove_field"><i class="fa fa-minus"></i></a></div></div>'),$(".hOrganization").typeahead({ajax:{url:laroute.route("api.halalOrg.list"),triggerLength:3}}),$(".select3").select2({width:"100%",theme:"bootstrap"}),$(".url").inputmask({alias:"url",greedy:!1}))}),$(add_form_wrapper).on("click",".remove_field",function(e){e.preventDefault(),$(this).parent("div").parent("div").remove(),x--});var foodProductTable=$("#foodProduct-table").DataTable({ajax:laroute.route("api.foodproduct.data"),columns:[{data:"fCode",name:"fCode"},{data:"fName",name:"fName"},{data:"fManufacture",name:"fManufacture"}],rowId:"id"});$("#foodProduct-table tbody").on("click","tr",function(){var e=foodProductTable.row(this).id();window.location.href=laroute.route("foodproduct.show",{foodproduct:e})}),$(".fManufacture").typeahead({ajax:{url:laroute.route("api.manufacture.list"),triggerLength:3}}),$(".halalcertorg").typeahead({ajax:{url:laroute.route("api.certOrg.list"),triggerLength:3}}),$(".ingredient").select2({width:"100%",multiple:!0,tags:!0,theme:"bootstrap",tokenSeparators:[","],placeholder:"Click here and start typing to search.",minimumInputLength:2,ajax:{url:laroute.route("api.ingredient.list"),dataType:"json",delay:250,data:function(e){return{q:e.term}},processResults:function(e){return{results:e}},cache:!0}});var additiveTable=$("#additive-table").DataTable({ajax:laroute.route("api.additive.data"),columns:[{data:"eNumber",name:"eNumber"},{data:"iName",name:"iName"}],rowId:"id"});$("#additive-table tbody").on("click","tr",function(){var e=additiveTable.row(this).id();window.location.href=laroute.route("additive.show",{additive:e})}),$(".eNumber").inputmask({mask:"E[9]{3,5}",greedy:!1}),$(".hOrganization").typeahead({ajax:{url:laroute.route("api.halalOrg.list"),triggerLength:3}});var app=angular.module("validationApp",[],["$interpolateProvider",function(e){e.startSymbol("<%"),e.endSymbol("%>")}]);app.controller("foodProductValidate",["$scope",function(e){e.submitForm=function(){e.userForm.$valid},e.Math=window.Math,"undefined"==typeof foodProduct||(e.foodName=foodProduct.fName,e.totalFat=foodProduct.totalFat,e.saturatedFat=foodProduct.saturatedFat,e.cholesterol=foodProduct.cholesterol,e.sodium=foodProduct.sodium,e.totalCarbohydrates=foodProduct.totalCarbohydrates,e.dietaryFiber=foodProduct.dietaryFiber)}]),$("#foodProductForm").length>0&&($("#foodProductForm").parsley({errorClass:"has-error",classHandler:function(e){return e.$element.closest(".form-group")},errorsWrapper:"<span class='help-block'></span>",errorTemplate:"<span></span>"}),$(".ingredient").on("change",function(){}),$(".cCode, .cExpire, .cStatus, .cOrganization").on("change",function(){$(".cCode").val().length>0||$(".cExpire").val().length>0||$(".cStatus").val().length>0||$(".cOrganization").val().length>0?$(".cCode, .cExpire, .cStatus, .cOrganization").attr("required","required"):$(".cCode, .cExpire, .cStatus, .cOrganization").removeAttr("required")})),$("#additiveForm").length>0&&($("#additiveForm").parsley({errorClass:"has-error",classHandler:function(e){return e.$element.closest(".form-group")},errorsWrapper:"<span class='help-block'></span>",errorTemplate:"<span></span>"}),$(".hOrganization, .hStatus, .hDescription, .hUrl").on("change",function(){$(".hOrganization").val().length>0||$(".hStatus").val().length>0||$(".hDescription").val().length>0||$(".hUrl").val().length>0?$(".hOrganization, .hStatus, .hDescription, .hUrl").attr("required","required"):$(".hOrganization, .hStatus, .hDescription, .hUrl").removeAttr("required")})),$(".form-signin").length>0&&$(".form-signin").parsley({errorsWrapper:"<div></div>",errorTemplate:'<div class="alert alert-danger parsley" role="alert"></div>'});