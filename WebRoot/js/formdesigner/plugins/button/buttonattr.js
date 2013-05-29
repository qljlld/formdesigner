formdesigner.dialogs.add(['Button','Upload'], (function() {
    function initEvent(controlID,controlType) {
        $("#configure_tabs").tabs();
        $("#save").button().click(function(event) {
            event.preventDefault();
            //var controlType = "Button";
            formdesigner.setContorlValue({
                ControlType: controlType,
                OldID: controlID,
                ID: $("#controlId").val(),
                Name: $("#controlId").val(),
                DefaultValue: $("#controlName").val(),
                Text:$("#controlName").val(),
                AccessPattern: $("#accesspattern").val(),
                Width: $("#controlWidth").val(),
                Height: $("#controlHeight").val(),
                URL: encodeURIComponent($("#controlUrl").val())
            }, true);
            window.parent.$("#actionDialog").dialog("destroy");
        });
        $("#cancel").button().click(function(event) {
            event.preventDefault();
            window.parent.$("#actionDialog").dialog("destroy");
        });
        /*$("#controlId").click(function() {
            configure.getDataSource({
                ID: this.id,
                form: form
            });
        });*/
        var fields = form.Fields;
        for(var i = 0; i < fields.length; i++) {
            if(fields[i].Name == controlID) {
                $("#controlId").val(fields[i].Name);
                if(controlType=="Button")
                $("#controlName").val(fields[i].DefaultValue);
            else
                $("#controlName").val(fields[i].Text);
                $("#controlUrl").val(decodeURIComponent(fields[i].URL));
                $("#accesspattern").val(fields[i].AccessPattern);
                $("#controlWidth").val($("#" + controlID).width());
                $("#controlHeight").val($("#" + controlID).height());
            }
        }
    }
    var htmlAttr = '<div id="configure_tabs">' + '<ul style="border-bottom: 0px;">' + '<li><a  href="#configure_data">数据</a></li>' + '<li><a  href="#configure_show">显示</a></li>' + '</ul>' + '<div id="configure_data">' + '<div>' + ' <div class="data_left">控件ID</div>' + '<input type="text" class="data_right" id="controlId" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">控件名</div>' + '<input type="text" class="data_right" id="controlName" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">URL</div>' + '<input type="text" class="data_right" id="controlUrl" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">自定义方法</div>' + '<textarea class="data_right" id="controlBind"></textarea>' + '</div>' + '</div>' + '<div id="configure_show" style="display: none">' + '<table>' + '<tr>' + '<td>读写状态</td>' + '<td>' + '<select id="accesspattern">' + '<option value="Write">读写</option>' + '<option value="ReadOnly">只读</option>' + '</select></td>' + '</tr>' + '<tr>' + '<td>宽度</td>' + '<td>' + '<input type="text" id="controlWidth" /></td>' + '</tr>' + '<tr>' + '<td>高度</td>' + '<td>' + ' <input type="text" id="controlHeight" /></td>' + '</tr>' + '</table>' + '</div>' + '<div id="btnchoose">' + '<input type="button" id="save" value="确定" />' + '<input type="button" id="cancel" value="取消" />' + '</div>' + '</div>';
    var dialog = {
        dialogContent: {
            title: "配置窗口",
            width: 702,
            content: htmlAttr
        },
        dialogScript: initEvent
    };
    return dialog;
})());