   function guideOperateList($scope) {
       var controlType = $(".source_configure").attr("controlType");
        var controlID = $(".source_configure").attr("controlID");
       var fields = form.Fields; var ListItems = new Array();
       var me=$("#"+controlID);
       for(var i = 0; i < fields.length; i++) {
           if(fields[i].Name == controlID) {
               customStyle = fields[i].CustomStyle;
               $("#controlID").val(fields[i].Name);
               if(me) {
                   $("#controlWidth").val($(me).width());
                   $("#controlHeight").val($(me).height());
               } else {
                   $("#controlWidth").val("611");
                   $("#controlHeight").val("577");
               }
               if(!fields[i].ListItems) {
                   fields[i].ListItems = new Array();
               }
               for(var j = 0; j < fields[i].ListItems.length; j++) {
                   ListItems.push(fields[i].ListItems[j]);
               }
               $scope.Lists = fields[i].ListItems;
               $scope.executeOperate = function(list) {
                   if(list.indexOf("up$#") > 0) {
                       ListName = list.substring(0, list.indexOf("up$#"));
                   } else {
                       ListName = list.substring(0, list.indexOf("down$#"));
                   }
                   angular.forEach($scope.Lists, function(List) {
                       var i = 0;
                       if(List.Value == ListName) {
                           var position = $scope.Lists.indexOf(List);
                           if(position > 0 && position < $scope.Lists.length) {
                               $scope.Lists.splice(position, 1);
                               if(list.indexOf("up$#") > 0) {
                                   $scope.Lists.splice(position - 1, 0, List);
                                   i = 1;
                               } else {
                                   $scope.Lists.splice(position + 1, 0, List);
                                   i = 1;
                               }
                           } else if(position == 0 && list.indexOf("down$#") > 0) {
                               $scope.Lists.splice(position, 1);
                               $scope.Lists.splice(position + 1, 0, List);
                               i = 1;
                           }

                       }
                       if(i == 1) {
                           ListName = null;
                       }
                   });


               };
               $scope.addParameter = function() {
                   if(!$scope.Lists) {
                       $scope.Lists = new Array();
                   }
                   var length = $scope.Lists.length;
                   $scope.Lists.push({
                       Value: "step" + length,
                       Text: "绑定容器ID" + length
                   });
               };
               $scope.delParameter = function(List) {
                   var position = $scope.Lists.indexOf(List);
                   $scope.Lists.splice(position, 1);
               };
           }
       }
   }

   formdesigner.dialogs.add(['Tabs', 'Wizard'], (function() {
       function initEvent(controlID, controlType) {
              $(".guideList").attr("controlID", controlID);
             $(".guideList").attr("controlType", controlType);
             $(".guideList").attr("ng-controller", "guideOperateList");
             angular.bootstrap($(".guideList"));
           $("#save").button().click(function(event) {
               event.preventDefault();
                   formdesigner.setContorlValue({
                       ControlType: controlType,
                       OldID: controlOldID,
                       ID: $("#controlID").val(),
                       Name: $("#controlID").val(),
                       Width: $("#controlWidth").val(),
                       Height: $("#controlHeight").val()
                   }, 1);
               window.parent.$("#actionDialog").dialog("close");
           });
           $("#cancel").button().click(function(event) {
               event.preventDefault();
                   formdesigner.setContorlValue({
                       OldID: controlID,
                       Name: controlID,
                       ListItems: ListItems
                   });
               window.parent.$("#actionDialog").dialog("close");
           });
           $("#controlId").click(function() {
               configure.getDataSource({
                   ID: this.id,
                   form: form
               });
           });
       }

       var htmlAttr = '<div id="container_data" style="padding-top: 20px">' + '<div id="configure_data">' + '<div id="configure_data_ID" class="container">' + '<div class="data_left">向导控件ID</div>' + '<input id="controlID" type="text" class="data_right" />' + '</div>' + '<div class="container">' + '<span>绑定步骤</span>' + '<div style="border-top: silver 1px solid; height: 1px; overflow: hidden"></div>' + '<div class="guideList" style="padding-left: 100px; text-align: center;height: 200px;overflow: auto"' + ' id="customcontent_main">' + ' <table>' + ' <tr>' + '  <td style="width: 165px">步骤</td>' + '  <td style="width: 165px">绑定容器</td>' + '  <td><span ng-click="addParameter();" class=\'btn_add\' title=\'添加\'></span></td>' + '</tr>' + ' <tr ng-repeat="List in Lists">' + ' <td>' + '<input type="text" ng-model="List.Value" /></td>' + '<td>' + '<input type="text" ng-model="List.Text" /></td>' + '<td><span class="btn_up" title=\'上移\' ng-click="executeOperate(List.Value+\'up$#\')"></span>' + '<span style="float: left">｜</span><span class="btn_down" title=\'下移\' ng-click="executeOperate(List.Value+\'down$#\')">' + ' </span><span style="float: left">｜</span><span class=\'btn_delete\' ng-click="delParameter(List)"' + 'title="删除"></span></td>' + ' </tr>' + ' </table>' + '</div>' + '</div>' + '<div style="clear:both;border-top: silver 1px solid; height: 1px; overflow: hidden;margin-top:8px"></div>' + ' <div id="configure_data_width" class="container">' + '<div class="data_left_two">宽度</div>' + '<input id="controlWidth" type="text" class="data_right_two" />' + '</div>' + '<div id="configure_data_height">' + '<div class="data_left_two">高度</div>' + '<input id="controlHeight" type="text" class="data_right_two" />' + '</div>' + '<div id="btnchoose">' + '<input type="button" id="save" value="确定" />' + '<input type="button" id="cancel" value="取消" />' + ' </div>' + '</div>' + '</div>';
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