formdesigner.dialogs.add('Text', (function() {
  function hex(x) {
    return("0" + parseInt(x).toString(16)).slice(-2);
  }

  function initEvent(controlID) {
    var customStyle;
    $('#controlcolor').ColorPicker({
      color: '#0000ff',
      onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },
      onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },
      onChange: function(hsb, hex, rgb) {
        $('#controlcolor').css('backgroundColor', '#' + hex);
        $('#controlcolor').val('#' + hex);
      }
    });
    $('#controlbackground').ColorPicker({
      color: '#0000ff',
      onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },
      onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },
      onChange: function(hsb, hex, rgb) {
        $('#controlbackground').css('backgroundColor', '#' + hex);
        $('#controlbackground').val('#' + hex);
      }
    });

    $("#save").button().click(function(event) {
      event.preventDefault();
      var controlType = "Text";
      var fontFormat = "";
      switch($("#controlformat").val()) {
      case "normal":
        fontFormat = "font-weight: normal;";
        break;
      case "weight":
        fontFormat = "font-weight: bold;";
        break;
      case "oblique":
        fontFormat = "font-style: italic;";
        break;
      case "underline":
        fontFormat = "text-decoration: underline;";
        break;
      case "line-through":
        fontFormat = "text-decoration: line-through;";
        break;
      case "sup":
        fontFormat = "vertical-align: sup;";
        break;
      case "sub":
        fontFormat = "vertical-align: sub;";
        break;
      }
      var backgroundContent = $('#controlbackground').val();
      if($("#control_background").val().indexOf("url") >= 0) {

        backgroundContent = encodeURIComponent($("#control_background").val());
      }
      if(customStyle) {
        customStyle = customStyle + ";" + fontFormat + "background:" + backgroundContent + ";font-size:" + $("#controlsize").val() + ";font-family:" + $("#controlfamily").val() + ";color:" + $("#controlcolor").val() + ";border:" + $("#controlborder").val();
      } else {
        customStyle = fontFormat + "background:" + backgroundContent + ";font-size:" + $("#controlsize").val() + ";font-family:" + $("#controlfamily").val() + ";color:" + $("#controlcolor").val() + ";border:" + $("#controlborder").val();
      }
      formdesigner.plugins.items["Text"].setContorlValue({
        CustomStyle: customStyle,
        ControlType: "Text",
        OldID: controlID,
        ID: $("#controlID").val(),
        Name: $("#controlID").val(),
        Text: $("#controlName").val(),
        Width: $("#controlWidth").val(),
        Height: $("#controlHeight").val()
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
    var fields = form.Fields;
    for(var i = 0; i < fields.length; i++) {
      if(fields[i].Name == controlID) {
        customStyle = fields[i].CustomStyle;
        $("#controlID").val(fields[i].Name);
        $("#configure_data_ID").css("display", "none");
        var me = $("#" + controlID);
        $("#controlName").val(fields[i].Text);
        $("#controlWidth").val($(me).width());
        $("#controlHeight").val($(me).height());
        $("#controlsize").val($(me).css("font-size"));
        $("#controlcolor").val($(me).css("color"));
        $("#controlfamily").val($(me).css("font-family"));
        $("#controlborder").val(document.getElementById(controlID).style.border);
        var meBackground = "";
        if($(me).css("backgroundColor")) {
          meBackground = meBackground + $(me).css("backgroundColor");
          $("#controlbackground").val($(me).css("backgroundColor"));
        }
        if($(me).css("backgroundImage")) {
          var backgroundImg = $(me).css("backgroundImage");
          meBackground = meBackground + " " + backgroundImg;
        }
        if($(me).css("backgroundRepeat")) {
          meBackground = meBackground + " " + $(me).css("backgroundRepeat");
        }
        if($(me).css("backgroundAttachment")) {
          meBackground = meBackground + " " + $(me).css("backgroundAttachment");
        }
        if($(me).css("backgroundPosition")) {
          meBackground = meBackground + " " + $(me).css("backgroundPosition");
        }
        $("#control_background").val(meBackground);
        if($(me).css("font-weight") == "normal") {
          $("#controlformat").val("normal");
        }
        if($(me).css("font-weight") == "bold") {
          $("#controlformat").val("bold");
        }
        if($(me).css("font-style") == "italic") {
          $("#controlformat").val("italic");
        }
        if($(me).css("text-decoration") == "underline") {
          $("#controlformat").val("underline");
        }
        if($(me).css("text-decoration") == "line-through") {
          $("#controlformat").val("line-through");
        }
        if($(me).css("vertical-align") == "sup") {
          $("#controlformat").val("sup");
        }
        if($(me).css("vertical-align") == "sub") {
          $("#controlformat").val("sub");
        }
      }
    }

  };
  var htmlAttr = ' <div id="container_data" style="padding-top: 20px">' + ' <div id="configure_data">' + ' <div id="configure_data_ID" class="container">' + ' <div class="data_left">容器ID</div>' + ' <input id="controlID" type="text" class="data_right" />' + ' </div>' + '  <div id="configure_data_name" class="container">' + '  <div class="data_left">文本</div>' + '   <input id="controlName" type="text" class="data_right" />' + '  </div>' + ' <div id="configure_data_background" class="container">' + '  <div class="data_left">背景图片</div>' + '  <input id="control_background" type="text" class="data_right" />' + ' </div>' + ' <div id="configure_data_size" class="container">' + ' <div class="data_left_two">大小</div>' + ' <select id="controlsize" class="data_right_two">' + '  <option value="8px">8</option>' + '   <option value="10px">10</option>' + '    <option value="12px" selected="selected">12</option>' + '   <option value="14px">14</option>' + '   <option value="18px">18</option>' + '   <option value="24px">24</option>' + '  <option value="36px">36</option>' + '  </select>' + ' </div>' + '  <div id="configure_data_format">' + '  <div class="data_left_two">字体格式</div>' + ' <select id="controlformat" class="data_right_two">' + '  <option value="normal" selected="selected">正常</option>' + '  <option value="bold">加粗</option>' + '  <option value="italic">倾斜</option>' + '   <option value="underline">下划线</option>' + '  <option value="line-through">删除线</option>' + '  <option value="sup">上标</option>' + '  <option value="sub">下标</option>' + '  </select>' + '  </div>' + ' <div id="configure_data_color" class="container">' + ' <div class="data_left_two">字体颜色</div>' + '  <input id="controlcolor" type="text" class="data_right_two" />' + ' </div>' + '  <div id="configure_data_family">' + '  <div class="data_left_two">字体</div>' + '   <input id="controlfamily" type="text" class="data_right_two" />' + '  </div>' + ' <div id="configure_data_backgroundcolor" class="container">' + '   <div class="data_left_two">背景颜色</div>' + '    <input id="controlbackground" type="text" class="data_right_two" />' + ' </div>' + '  <div id="configure_data_border">' + '  <div class="data_left_two">边框</div>' + '   <input id="controlborder" type="text" class="data_right_two" />' + '  </div>' + ' <div id="configure_data_width" class="container">' + '   <div class="data_left_two">宽度</div>' + '  <input id="controlWidth" type="text" class="data_right_two" />' + '  </div>' + '  <div id="configure_data_height">' + '  <div class="data_left_two">高度</div>' + ' <input id="controlHeight" type="text" class="data_right_two" />' + ' </div>' + '  <div id="btnchoose">' + ' <input type="button" id="save" value="确定" />' + ' <input type="button" id="cancel" value="取消" />' + ' </div>' + '  </div>' + '  </div>'
  // var htmlAttr = '<div id="configure_tabs"><ul style="border-bottom: 0px;">' + '<li><a  href="#configure_data">数据</a></li>' + '<li><a  href="#configure_show">显示</a></li></ul>' + '<div id="configure_data"><div><div class="data_left">控件ID</div>' + '<input type="text" class="data_right" id="controlId" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">控件名</div>' + '<input type="text" class="data_right" id="controlName" />' + '</div>' + '<table style="clear: both">' + '<tr>' + '<td class="data_left">默认值</td>' + ' <td>' + '<input type="text" id="controlValue" /></td>' + '<td class="data_left">数据源</td>' + '<td>' + '<input type="text" id="controlDataSource" disabled="disabled" /><span id="configure">' + '</span></td>' + '</tr>' + '<tr>' + '<td class="data_left">数据类型</td>' + '<td>' + '<select id="datatype">' + '<option value="Integer" selected="selected">整数</option>' + '<option value="Float">浮点数</option>' + '<option value="DateTime">日期</option>' + '<option value="String">字符串</option>' + '<option value="Boolean">布尔型</option>' + '</select></td>' + '</tr>' + '</table>' + '<div style="clear: both;">' + '<div class="data_left">约束</div>' + '<input type="text" class="data_right" id="controlBind" />' + '</div>' + '<div style="clear: both;">' + '<div class="data_left">是否可为空</div>' + '<input type="checkbox" id="required" style="height: 25px; line-height: 25px;" />' + '</div>' + '</div>' + '<div id="configure_show" style="display: none">' + '<table>' + '<tr>' + '<td>读写状态</td>' + '<td>' + '<select id="accesspattern">' + '<option value="Write">读写</option>' + '<option value="ReadOnly">只读</option>' + '</select></td>' + '</tr>' + '<tr>' + '<td>宽度</td>' + '<td>' + '<input type="text" id="controlWidth" /></td>' + '</tr>' + '<tr>' + '<td>高度</td>' + '<td>' + '<input type="text" id="controlHeight" /></td>' + '</tr>' + '<tr style="display: none">' + '<td>列数</td>' + '<td>' + '<input type="text" id="controlCol" value="1" /></td>' + '</tr>' + '<tr style="display: none">' + '<td>行数</td>' + '<td>' + '<input type="text" id="controlRow" value="1" /></td>' + '</tr>' + '</table>' + '</div>' + '<div id="btnchoose">' + '<input type="button" id="save" value="确定" />' + '<input type="button" id="cancel" value="取消" />' + '</div>' + '</div>';
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