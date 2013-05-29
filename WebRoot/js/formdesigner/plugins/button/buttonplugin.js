(function(window, undefined) {
	formdesigner.plugins.add('Button', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['Button']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/button.png' />Button</li>";
				var _pluginType = "basictype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var buttonField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Button" + "\"  style=\"position:absolute;z-index:10;width:70px;height:25px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><div class='waterfall' id=\"" + field.Name + "Waterfall\" style='width:100%;height:100%;position:absolute;'></div><input type=\"button\" id=\"" + field.Name + "button\" style=\"height:100%;width:100%\" /></div>";
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
					// alsoResize: "#" + field.Name + "button",
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
				if(!field.DefaultValue)
				field.DefaultValue="按钮";
				formdesigner.setContorlValue(field);
			}
		};
		return buttonField;

	})());
})(window, undefined)