formdesigner.dialogs.add('Image', (function() {
  function initEvent(controlID) {
    $("#save").button().click(function(event) {
      event.preventDefault();
      var controlType = "Image";
      formdesigner.plugins.items["Image"].setContorlValue({
        ControlType: controlType,
        OldID: controlID,
        ID: $("#control_id").val(),
        Name: $("#controlId").val(),
        Text: $("#controlName").val(),
        URL: $("#control_img").val(),
        Width: $("#controlWidth").val(),
        Height: $("#controlHeight").val()
      }, 1);
      $("#actionDialog").dialog("close");

    });
    $("#cancel").button().click(function(event) {
      event.preventDefault();
      $("#actionDialog").dialog("close");
    });
    $("#controlId").click(function() {
      configure.getDataSource({
        ID: this.id,
        form: form
      });
    });
    var fields = form.Fields;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].Name == controlID) {
        $("#control_id").val(fields[i].Name);
        $("#controlName").val(fields[i].Text);
        $("#control_img").val(fields[i].URL);
        $("#controlWidth").val($("#" + controlID).width());
        $("#controlHeight").val($("#" + controlID).height());
      }
    }
  };
  var htmlAttr = '<div id="container_data" style="padding-top: 20px">' +
    ' <div id="configure_data">' +
    ' <div id="configure_data_ID" class="container">' +
    ' <div class="data_left">图片ID</div>' +
    ' <input id="control_id" type="text" class="data_right" />' +
    ' </div>' + ' <div id="configure_data_name" class="container">' +
    ' <div class="data_left">提示文本</div>' +
    ' <input id="controlName" type="text" class="data_right" />' +
    ' </div>' + ' <div id="configure_data_img" class="container">' +
    '<div class="data_left">图片</div>' +
    '<input id="control_img" type="text" class="data_right" />' + ' </div>' +
    ' <div id="configure_data_width" class="container">' +
    '   <div class="data_left_two">宽度</div>' +
    '  <input id="controlWidth" type="text" class="data_right_two" />' + '  </div>' +
    '  <div id="configure_data_height">' + '  <div class="data_left_two">高度</div>' +
    ' <input id="controlHeight" type="text" class="data_right_two" />' + ' </div>' +
    '  <div id="btnchoose">' + ' <input type="button" id="save" value="确定" />' +
    ' <input type="button" id="cancel" value="取消" />' + ' </div>' + '  </div>' + '  </div>'
  var dialog = {
    dialogContent: {
      title: "配置图片信息",
      width: 702,
      content: htmlAttr
    },
    dialogScript: initEvent
  };
  return dialog;
})());