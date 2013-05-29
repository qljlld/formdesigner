(function(window, undefined) {
	formdesigner.plugins.add('TextArea', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['TextArea']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/textarea.png' />TextArea</li>";
				var _pluginType = "basictype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var textAreaField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "TextArea" + "\"  style=\"position:absolute;z-index:10;border:1px solid #AAA;width:240px;height:83px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><div style='float:left;height:25px;line-height:25px;'><label >控件名：</label></div><div style='float:left;'><textarea id=\"" + field.Name + "textarea\"  style=\"height:80px;width:184px\"></textarea></div></div>";
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
					alsoResize: "#" + field.Name + "textarea",
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
		return textAreaField;

	})());
})(window, undefined)