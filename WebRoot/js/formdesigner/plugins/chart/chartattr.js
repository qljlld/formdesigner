formdesigner.dialogs.add('Chart', (function() {
    function initEvent(controlID, controlType) {
        function getValue(retValue, retItems) {
            alert(retItems);
            $("#control_datasource").val(retItems);
            field.DataSource = retItems;
        }
        $("#save")
            .button()
            .click(function(event) {
            event.preventDefault();
            formdesigner.setContorlValue({
                ExtendData: $("#extendData").val(),
                DataSource: $("#control_datasource").val(),
                ControlType: controlType,
                DataType: $("#data_type").val(),
                OldID: controlID,
                ID: $("#controlId").val(),
                Name: $("#controlId").val(),
                Text: $("#controlName").val(),
                Width: $("#controlWidth").val(),
                Height: $("#controlHeight").val()
            }, true);
            window.parent.$("#actionDialog").dialog("close");
        });
        $("#cancel")
            .button()
            .click(function(event) {
            event.preventDefault();
            window.parent.$("#actionDialog").dialog("close");
        });
        $("#extendData").click(function() {
            configure.getDataSource({
                ID: this.id,
                form: form
            });
        });
        $("#control_datasource").click(function() {
            BASE.openDialog({
                container: "actionDialog2",
                content: '<div id="tree"  class="container"> </div>',
                showModal: true,
                width: 470,
                resizable: false,
                customdialogSylte: {
                    footer: "border:0px;text-align:center;"
                },
                buttons: {
                    '确 定': function() {
                        configure.getTreeDataSource({
                            id: "tree"
                        }, getValue);
                        $(this).dialog('close');
                    }
                }
            });
            configure.getTreeDataSource({
                id: "tree",
                checkedItems: $("#control_datasource").val(),
                dataSource: form.DataSource
            });
        });
        var fields = form.Fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].Name == controlID) {
                $("#controlId").val(fields[i].Name);
                $("#controlName").val(fields[i].Text);
                $("#data_type").val(fields[i].DataType);
                $("#extendData").val(fields[i].ExtendData);
                $("#controlWidth").val($("#" + controlID).width());
                $("#controlHeight").val($("#" + controlID).height());
                if (fields[i].DataSource) {
                    $("#control_datasource").val(fields[i].DataSource);
                }
                field = fields[i];
            }
        }
    };
    var htmlAttr = '<div id="configure_data">' +
        '<div class="container">' +
        '<div class="data_left">控件ID</div>' +
        '<input type="text" class="data_right" id="controlId" />' +
        '</div>' +
        '<div class="container">' +
        '<div class="data_left">关联ID</div>' +
        '<input type="text" class="data_right" id="extendData" />' +
        '</div>' +
        '<div class="container">' +
        '<div class="data_left">标题</div>' +
        '<input type="text" class="data_right" id="controlName" />' +
        '</div>' +
        '<div class="container">' +
        '<div class="data_left">数据源</div>' +
        '<input type="text" class="data_right" id="control_datasource" />' +
        '</div>' +
        '<div class="container">' +
        ' <div class="data_left">类型</div>' +
        '<select id="data_type" class="data_right">' +
        '<option value="line">曲线图</option>' +
        '<option value="column">柱状图</option>' +
        '<option value="pie">饼图</option>' +
        '<option value="area">区域图</option>' +
        '</select>' +
        '</div>' +
        '<div id="configure_data_width" class="container">' +
        '<div class="data_left_two">宽度</div>' +
        '<input id="controlWidth" type="text" class="data_right_two" />' +
        '</div>' +
        '<div id="configure_data_height">' +
        '<div class="data_left_two">高度</div>' +
        '<input id="controlHeight" type="text" class="data_right_two" />' +
        '</div>' +
        '<div id="btnchoose">' +
        '<input type="button" id="save" value="确定" />' +
        '<input type="button" id="cancel" value="取消" />' +
        '</div>'
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