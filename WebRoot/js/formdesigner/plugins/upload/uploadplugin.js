(function(window, undefined) {
	formdesigner.plugins.add('Upload', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['Upload']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/upload.png' />Upload</li>";
				var _pluginType = "quicktype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var uploadField = {
			addField: function(field) {
				//var item = "<div class=\"control\" controlType=\"TextBox\" " + "id=\"" + id + "\"" + "style=\"position:absolute; z-index: 10; border:1px solid #AAA;" + "width:240px;height:25px;left:" + itemleft + "px;top:" + itemtop + "px;\">" + "<div style='float:left;height:25px;line-height:25px;'>" + "<label >控件名：</label></div><div style='float:left;'>" + "<input type='text'  id=\"" + id + "textbox\" " + "style=\"height:20px;width:184px\"></input></div></div>";
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Upload" + "\"  style=\"position:absolute; z-index: 10; border:1px solid #AAA;width:240px;height:25px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><div style='float:left;height:25px;line-height:25px;'><label >附件：</label></div><div style='float:left;'><div id=\"" + field.Name + "upload\" style=\"height:25px;line-height:25px;width:184px;\"><img src='images/attachment.png' style='margin-bottom:-3px'/>上传附件/下载附件</div></div></div>";
				var formDesignerContainer = formdesigner.getConfig({}, "FormDesigner");
				$("#" + formDesignerContainer['view']).append(item);
				$("#" + field.Name).bind("mousedown", function() {
					e = window.event || arguments[0];
					var me = $(this);
					if(e.ctrlKey) {
						me.attr("selectcontrol", true);
					} else {
						$(".control").each(function() {
							if($(this).attr("standardcontrol")) {
								$(this).removeAttr("standardcontrol");
							}
						});
						$("form .ui-resizable-handle").css("display", "none");
						me.attr("standardcontrol", true);
					}
					me.find(".ui-resizable-handle").css("display", "block")
					BASE.stopPropagation();
				});
				$("#" + field.Name).resizable({
					alsoResize: "#" + field.Name + "upload",
					handles: "all"
				});
				$("#" + field.Name).draggable({
					start: function(event, ui) {
						$("#" + field.Name).attr("startDraggable_left", field.X);
						$("#" + field.Name).attr("startDraggable_top", field.Y);
					},
					cursor: "move",
					containment: "#" + formDesignerContainer['view'],
					handles: "all"
				});
				field.OldID = field.Name;
				formdesigner.setContorlValue(field);
			}
		};
		return uploadField;

	})());
})(window, undefined)