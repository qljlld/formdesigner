formdesigner.dialogs.add(['TextBox','Email'], (function() {
    function initEvent(controlID,controlType) {
        $("#configure_tabs").tabs();
        $("#save").button().click(function(event) {
            event.preventDefault();
           // var controlType="TextBox";
            formdesigner.setContorlValue({
                Required: $("#required")[0].checked,
                Rows: $("#controlRow").val(),
                Cols: $("#controlCol").val(),
                ControlType: controlType,
                OldID: controlID,
                ID: $("#controlId").val(),
                Name: $("#controlId").val(),
                Text: $("#controlName").val(),
                DefaultValue: $("#controlValue").val(),
                DataType: $("#datatype").val(),
                AccessPattern: $("#accesspattern").val(),
                Width: $("#controlWidth").val(),
                Height: $("#controlHeight").val(),
                DataSource: $("#controlDataSource").val()
            }, 1);
            $("#actionDialog").dialog("close");

        });
        $("#cancel").button().click(function(event) {
            event.preventDefault();
           $("#actionDialog").dialog("close");
        });
      /*  $("#controlId").click(function() {
            configure.getDataSource({
                ID: this.id,
                form: form
            });
        });*/
        var fields = form.Fields;
        for(var i = 0; i < fields.length; i++) {
            if(fields[i].Name == controlID) {
                $("#controlId").val(fields[i].Name);
                $("#controlName").val(fields[i].Text);
                $("#controlValue").val(fields[i].DefaultValue);
                $("#datatype").val(fields[i].DataType);
                $("#required")[0].checked = fields[i].Required;
                if(fields[i].DataSource) $("#controlDataSource").val(fields[i].DataSource);
                $("#accesspattern").val(fields[i].AccessPattern);
                $("#controlWidth").val($("#"+controlID).width());
                $("#controlHeight").val($("#"+controlID).height());
            }
        }
    };
    var htmlAttr = '<div id="configure_tabs"><ul style="border-bottom: 0px;">' + '<li><a  href="#configure_data">数据</a></li>' + '<li><a  href="#configure_show">显示</a></li></ul>' + '<div id="configure_data"><div><div class="data_left">控件ID</div>' + '<input type="text" class="data_right" id="controlId" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">控件名</div>' + '<input type="text" class="data_right" id="controlName" />' + '</div>' + '<table style="clear: both">' + '<tr>' + '<td class="data_left">默认值</td>' + ' <td>' + '<input type="text" id="controlValue" /></td>' + '<td class="data_left">数据源</td>' + '<td>' + '<input type="text" id="controlDataSource" disabled="disabled" /><span id="configure">' + '</span></td>' + '</tr>' + '<tr>' + '<td class="data_left">数据类型</td>' + '<td>' + '<select id="datatype">' + '<option value="Integer" selected="selected">整数</option>' + '<option value="Float">浮点数</option>' + '<option value="DateTime">日期</option>' + '<option value="String">字符串</option>' + '<option value="Boolean">布尔型</option>' + '</select></td>' + '</tr>' + '</table>' + '<div style="clear: both;">' + '<div class="data_left">约束</div>' + '<input type="text" class="data_right" id="controlBind" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">是否可为空</div>' + '<input type="checkbox" id="required" style="height: 25px; line-height: 25px;" />' + '</div>' + '</div>' + '<div id="configure_show" style="display: none">' + '<table>' + '<tr>' + '<td>读写状态</td>' + '<td>' + '<select id="accesspattern">' + '<option value="Write">读写</option>' + '<option value="ReadOnly">只读</option>' + '</select></td>' + '</tr>' + '<tr>' + '<td>宽度</td>' + '<td>' + '<input type="text" id="controlWidth" /></td>' + '</tr>' + '<tr>' + '<td>高度</td>' + '<td>' + '<input type="text" id="controlHeight" /></td>' + '</tr>' + '<tr style="display: none">' + '<td>列数</td>' + '<td>' + '<input type="text" id="controlCol" value="1" /></td>' + '</tr>' + '<tr style="display: none">' + '<td>行数</td>' + '<td>' + '<input type="text" id="controlRow" value="1" /></td>' + '</tr>' + '</table>' + '</div>' + '<div id="btnchoose">' + '<input type="button" id="save" value="确定" />' + '<input type="button" id="cancel" value="取消" />' + '</div>' + '</div>';
    var dialog = {
        dialogContent: {
            title: "配置窗口",
            width:702,
            content: htmlAttr
        },
        dialogScript: initEvent
    };
    return dialog;
})());