(function(window, undefined) {
	formdesigner.plugins.add('Radio', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['Radio']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/radio.png' />Radio</li>";
				var _pluginType = "basictype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var radioField = {
			addField: function(field) {
				//var item = "<div class=\"control\" controlType=\"TextBox\" " + "id=\"" + id + "\"" + "style=\"position:absolute; z-index: 10; border:1px solid #AAA;" + "width:240px;height:25px;left:" + itemleft + "px;top:" + itemtop + "px;\">" + "<div style='float:left;height:25px;line-height:25px;'>" + "<label >控件名：</label></div><div style='float:left;'>" + "<input type='text'  id=\"" + id + "textbox\" " + "style=\"height:20px;width:184px\"></input></div></div>";
				     var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Radio" + "\"  style=\"position:absolute;text-algin:left;z-index:10;border:1px solid #AAA;width:240px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><div style='float:left; height:25px;line-height:25px; '><input type='radio' id=\"" + field.Name + "radio\"></input></div><div style='height:25px;line-height:25px;'><label >选择项</label></div></div>";
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
			/*formdesigner.addItem({
					ID: id,
					X: itemleft,
					Y: itemtop,
					Name: id,
					ControlType: "TextBox"
				});*/
			/*	$("#" + id).bind("dblclick", function() {
					//window.parent.openDialog("actionDialog2", '配置TextBox属性', "/formdesigner/Home/ConfigureControl?ControlType=TextBox&ControlID=" + id, 650, 380, true);
					if(formdesigner.dialogs && formdesigner.dialogs.items["TextBox"]) {
						BASE.openDialog(formdesigner.dialogs.items["TextBox"]);
					}
				});*/
			//}
			/*editField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\"" + "controlType='TextBox'" + "style=\"position:absolute;z-index:10;border:1px solid #AAA;width:240px;height:25px;" + "left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\">" + "<div style='float:left;height:25px;line-height:25px;'>" + "<label >" + field.Text + "</label></div><div style='float:left;'>" + "<input type='text'  id=\"" + field.Name + "textbox\" style=\"height:20px;width:184px\">" + "</input></div></div>";
				$("#container_designer").append(item);
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
						$(".ui-resizable-handle").css("display", "none");
						me.attr("standardcontrol", true);
					}
					me.find(".ui-resizable-handle").css("display", "block")
					BASE.stopPropagation();
				});
				$("#" + field.Name).resizable({
					alsoResize: "#" + field.Name + "textbox",
					handles: "all"
				});
				$("#" + field.Name).draggable({
					start: function(event, ui) {
						$("#" + field.Name).attr("startDraggable_left", field.X);
						$("#" + field.Name).attr("startDraggable_top", field.Y);
					},
					cursor: "move",
					containment: "#container_designer",
					handles: "all"
				});
				field.OldID = field.Name;
				this.setContorlValue(field);
			},*/

		};
		return radioField;

	})());
})(window, undefined)