(function(window, undefined) {
	formdesigner.plugins.add('CheckBox', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['CheckBox']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/checkBox.png' />CheckBox</li>";
				var _pluginType = "basictype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var checkBoxField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "CheckBox "+ "\"  style=\"position:absolute;z-index:10;border:1px solid #AAA;width:240px;height:25px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><div style='float:left; height:28px;line-height:28px;'><input type='checkbox' id=\"" + field.Name + "checkbox\"></input></div><div style='float:left; height:25px;line-height:25px;'><label >选择项</label></div></div>";
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
					//alsoResize: "#" + field.Name + "textbox",
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
				formdesigner.setContorlValue(field,false,true);
			}
		};
		return checkBoxField;

	})());
})(window, undefined)