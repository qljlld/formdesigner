formdesigner.dialogs.add('SysVariable', (function() {
    function initEvent(controlID) {
        $("#configure_tabs").tabs();
        $("#save").button().click(function(event) {
            event.preventDefault();
            var controlType = "SysVariable";
            formdesigner.setContorlValue({
                DefaultValue: $("#controlValue").val(),
                ExtendData: $("#extendData").val(),
                ControlType: controlType,
                OldID: controlID,
                ID: $("#controlId").val(),
                Name: $("#controlId").val(),
                Text: $("#controlName").val(),
                Width: $("#controlWidth").val(),
                Height: $("#controlHeight").val(),
            }, 1);
            window.parent.$("#actionDialog").dialog("close");
        });
        $("#cancel").button().click(function(event) {
            event.preventDefault();
            window.parent.$("#actionDialog").dialog("close");
        });
        $("#controlId").click(function() {
            configure.getDataSource({
                ID: this.id,
                form: form
            });
        });
        $("#extendData").click(function() {
            configure.getDataSource({
                ID: this.id,
                form: form
            });
        });
        var fields = form.Fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].Name == controlID) {
                $("#controlId").val(fields[i].Name);
                $("#controlName").val(fields[i].Text);
                $("#extendData").val(fields[i].ExtendData);
                $("#controlValue").val(fields[i].DefaultValue);
                $("#controlWidth").val($("#" + controlID).width());
                $("#controlHeight").val($("#" + controlID).height());
            }
        }
    };
    var htmlAttr = '<div id="configure_tabs">' +
        '<ul style="border-bottom: 0px;">' +
        '<li><a href="#configure_data">数据</a></li>' +
        '<li><a href="#configure_show">显示</a></li>' +
        '</ul>' +
        '<div id="configure_data">' +
        '<div>' +
        '<div class="data_left">显示名称</div>' +
        '<input type="text" class="data_right" id="controlId" />' +
        '</div>' +
        '<div style="clear: both;">' +
        '<div class="data_left">关联ID</div>' +
        '<input type="text" class="data_right" id="extendData" />' +
        '</div>' +
        '<div style="clear: both;">' +
        '<div class="data_left">控件名</div>' +
        '<input type="text" class="data_right" id="controlName" />' +
        '</div>' +
        '<div style="clear: both;">' +
        '<div class="data_left">绑定的系统参数</div>' +
        '<select id="controlValue" class="data_right">' +
        '<option value="OrgID">OrgID(默认绑定登录用户组织名)</option>' +
        '<option value="UserID">UserID(默认绑定登录名)</option>' +
        '<option value="CurrentDate">CurrentDate(默认绑定当前时间)</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '<div id="configure_show" style="display: none">' +
        '<table>' +
        '<tr>' +
        '<td>宽度</td>' +
        '<td>' +
        '<input type="text" id="controlWidth" /></td>' +
        '</tr>' +
        '<tr>' +
        '<td>高度</td>' +
        '<td>' +
        '<input type="text" id="controlHeight" /></td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '<div id="btnchoose">' +
        '<input type="button" id="save" value="确定" />' +
        '<input type="button" id="cancel" value="取消" />' +
        '</div>' +
        '</div>';
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