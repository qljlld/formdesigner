     function sourceOperateList($scope) {
         var controlType = $(".source_configure").attr("controlType");
         var controlID = $(".source_configure").attr("controlID");
         var fields = form.Fields;
         for(var i = 0; i < fields.length; i++) {
             if(fields[i].Name == controlID) {
                 $("#controlId").val(fields[i].Name);
                 $("#sql_data").val(fields[i].DataSource);
                 $("#data_url").val(fields[i].URL);
                 $("#class_custom_param").val(fields[i].CustomStyle);
                 if(fields[i].DataSource) {
                     $("#data_type").val("sql");
                     $("#customsql_data").show();
                     $("#rest_data").hide();
                 } else if(fields[i].URL) {
                     $("#data_type").val("rest");
                     $("#customsql_data").hide();
                     $("#rest_data").show();
                 }
                 if(fields[i].Required) {
                     $("#cloumnTree").attr("checked", "checked");
                 } else {
                     $("#cloumnTree").removeAttr("checked");
                 }
                 if(controlType == "Grid") {
                     $("#pageGrid").show();
                     $("#showlist_way").hide();
                     $("#showlist_remarks").hide();
                     if(fields[i].DefaultValue) {
                         $scope.paging = true;
                         $("#page_grid").val(fields[i].DefaultValue);
                     }

                 }
                 if(fields[i].Width.toString().indexOf("%") > 0) {
                     $("#controlWidth").val(fields[i].Width);
                 } else {
                     $("#controlWidth").val($("#"+controlID).width());
                 }
                 // $("#controlWidth").val($(me).width());
                 $("#controlHeight").val($("#"+controlID).height());
                 if(!fields[i].ListItems) {
                     fields[i].ListItems = new Array();
                 }
                 $scope.Lists = fields[i].ListItems;
                 $scope.upOperate = function(list) {
                     var position = $scope.Lists.indexOf(list);
                     if(position > 0 && position < $scope.Lists.length) {
                         $scope.Lists.splice(position, 1);
                         $scope.Lists.splice(position - 1, 0, list);
                     }
                 };
                 $scope.downOperate = function(list) {
                     var position = $scope.Lists.indexOf(list);
                     if(position < $scope.Lists.length) {
                         $scope.Lists.splice(position, 1);
                         $scope.Lists.splice(position + 1, 0, list);
                     }
                 };
                 $scope.addParameter = function() {
                     if(!$scope.Lists) {
                         $scope.Lists = new Array();
                     }
                     $scope.Lists.push({
                         Value: "列名",
                         Text: "显示名"
                     });
                 };
                 $scope.delParameter = function(List) {
                     var position = $scope.Lists.indexOf(List);
                     $scope.Lists.splice(position, 1);
                 };

             }
         }
     }

     formdesigner.dialogs.add(['dataTable', 'Grid'], (function() {
         function initEvent(controlID, controlType) {
             $("#configure_tabs").tabs();
             $("#data_type").change(function() {
                 var value = $(this).val();
                 switch(value) {
                 case "sql":
                     $("#customsql_data").show();
                     $("#rest_data").hide();
                     break;
                 case "rest":
                     $("#customsql_data").hide();
                     $("#rest_data").show();
                     break;
                 }
             });
             $(".source_configure").attr("controlID", controlID);
             $(".source_configure").attr("controlType", controlType);
             $(".source_configure").attr("ng-controller", "sourceOperateList");
             angular.bootstrap($(".source_configure"));
             $("#save").button().click(function(event) {
                 event.preventDefault();
                 var required = true;
                 if($("#cloumnTree").attr("checked") != "checked") {
                     required = false;
                 }
                 formdesigner.setContorlValue({
                     DefaultValue: $("#page_grid").val(),
                     Required: required,
                     CustomStyle: $("#class_custom_param").val(),
                     DataSource: $("#sql_data").val(),
                     URL: $("#data_url").val(),
                     ControlType: controlType,
                     OldID: controlID,
                     ID: $("#controlId").val(),
                     Name: $("#controlId").val(),
                     Width: $("#controlWidth").val(),
                     Height: $("#controlHeight").val()
                 }, 1);
                 window.parent.$("#actionDialog").dialog("close");

             });
             $("#cancel").button().click(function(event) {
                 event.preventDefault();
                 window.parent.$("#actionDialog").dialog("close");
             });
             /*    $("#controlId").click(function() {
        configure.getDataSource({
            ID: this.id,
            form: form
        });
    });*/
             // angular.element(document).ready(function() {
             /*  angular.bootstrap($(".commonangular"));*/
             // });
         }

         var htmlAttr = '<div id="configure_data" class="source_configure">' + '<div class="container">' + '<div class="data_left">数据控件ID</div>' + '<input type="text" class="data_right" id="controlId" />' + '</div>' + '<div class="container">' + '<div class="data_left">数据源来源</div>' + ' <select id="data_type" class="data_right">' + '<option value="sql">sql语句</option>' + '<option value="rest">rest方式</option>' + '</select>' + '</div>' + '<div id="customsql_data">' + '<div class="container">' + '<div class="data_left">自定义sql语句</div>' + '<textarea class="data_right" id="sql_data" style="height: 175px"></textarea>' + '</div>' + '<div class="container">' + '<div class="data_left">备注:</div>' + '<div>' + '<p class="data_right">' + '自定义可以是sql或存储过程，但返回的结果集中包含所要显示的列）' + '<br>' + '如 select  ID ,c2 as Name ,c3 as Org ,c4 as age from' + 'tablename显示绑定的列为ID，Name ,Org,age.' + '</p>' + '</div>' + '</div>' + '</div>' + '<div id="rest_data" style="display: none">' + '<div class="container">' + '<div class="data_left">URL</div>' + '<input type="text" class="data_right" id="data_url" />' + '</div>' + '</div>' + '<div class="container" id="showlist_way">' + '<div class="data_left">是否横向展示列</div>' + '<input type="checkbox" style="margin-top: 13px;" id="cloumnTree" checked="checked"  />' + '</div>' + '<div class="container" id="showlist_remarks">' + '<div class="data_left">备注：</div>' + '<div class="data_right">' + '<br/>' + '横向展示列项为：<table><tr><td>列名|</td><td>列名</td></tr><tr><td>数据|</td><td>数据</td></tr></table>' + ' <br/>' + '非横向展示列项为：<table><tr><td>列名|</td><td>数据</td></tr><tr><td>列名|</td><td>数据</td></tr></table>' + '</div>' + '</div>' + '<div style="padding-left: 100px; text-align: center" id="contextmenucontent_main"' + 'class="container">' + '<table>' + '<tr>' + '<td style="width: 165px">绑定列</td>' + '<td style="width: 165px">显示列名</td>' + '<td><span ng-click="addParameter();" class=\'' + 'btn_add \' title=\'添加\'></span></td>' + '</tr>' + '<tr ng-repeat="List in Lists">' + '<td>' + '<input type="text" ng-model="List.Value" /></td>' + '<td>' + '<input type="text" ng-model="List.Text" /></td>' + ' <td><span class="btn_up" title=\'上移\' ng-click="upOperate(List)"></span>' + ' <span style="float: left">｜</span><span class="btn_down" title=\'下移\' ng-click="downOperate(List)">' + ' </span><span style="float: left">｜</span><span class=\'' + ' btn_delete \' ng-click="delParameter(List)"' + ' title="删除"></span></td>' + '</tr>' + '</table>' + '</div>' + '<div class="container">' + '<div class="data_left">样式来源</div>' + '<select id="class_type" class="data_right">' + '<option value="custom">自定义样式</option>' + '<option value="template">模板样式</option>' + '</select>' + '</div>' + '<div id="custom_class_data">' + '<div class="container">' + '<div class="data_left">自定义样式</div>' + ' <textarea class="data_right" id="class_custom_param" style="height: 175px"></textarea>' + '</div>' + '<div class="container">' + ' <div class="data_left">数据格式为：</div>' + ' <div class="data_right">' + ' <p>' + ' <br/>' + ' table{text-align:center}  th{color:#eee},tr{},td{}...' + '  <br/>' + ' </p>' + '</div>' + '</div>' + '</div>' + '<div id="template_class_data">' + '<div class="container">' +

         '</div>' + '</div>' + '<div class="container" style="display:none" id="pageGrid">' + '<div class="data_left">是否分页</div>' + '<input type="checkbox" style="margin-top: 13px;" id="checkboxTree"  ng-model="paging" />' + '</div>' + '<div class="container" ng-show="paging">' + '<div class="data_left">每页显示条数</div>' + ' <input type="text" style="margin-top:7px" id="page_grid" />条/页' + '</div>' +

         '<div id="configure_data_width" class="container">' + '<div class="data_left_two">宽度</div>' + '<input id="controlWidth" type="text" class="data_right_two" />' + '</div>' + '<div id="configure_data_height">' + '<div class="data_left_two">高度</div>' + '<input id="controlHeight" type="text" class="data_right_two" />' + ' </div>' + ' <div id="btnchoose">' + '<input type="button" id="save" value="确定" />' + '<input type="button" id="cancel" value="取消" />' + ' </div>' + '</div>';
         var dialog = {
             dialogContent: {
                 title: "配置窗口",
                 width: 702,
                 content: htmlAttr
             },
             dialogScript: initEvent
         };
         return dialog;
     })())