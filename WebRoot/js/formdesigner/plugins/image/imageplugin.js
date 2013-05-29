(function(window, undefined) {
	formdesigner.plugins.add('Image', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['Image']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/img.png' />Image</li>";
				var _pluginType = "basictype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var imageField = {
			addField: function(field) {
				  if (!field.URL) {
                    field.URL = 'images/blankImg.png';
                }
				  var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Image" + "\"  style=\"position:absolute;z-index:10;border:1px solid #AAA;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><img style='width:100%;height:100%' id=\"" + field.Name + "Image\" alt=\""+field.Text+"\" src=\"" + field.URL + "\"</div>";
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
					// alsoResize: "#" + field.Name + "textbox",
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
				this.setContorlValue(field);
			},
			setContorlValue:function(field,configure, unresized)
			{
				var me=$("#"+field.OldID);
				me.find("img").attr("alt",field.Text);
				me.find("img").attr("src",field.URL)
                formdesigner.setContorlValue(field,configure,unresized);
			}

		};
		return imageField;

	})());
})(window, undefined)