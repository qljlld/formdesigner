(function(window, undefined) {
	formdesigner.plugins.add('Text', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if (controlType['Text']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/text.png' />Text</li>";
				var _pluginType = "basictype";
				$("." + _pluginType).append(_plugin);
			}
		});

		function editeText(field) {
			$("#" + field.Name).bind("dblclick", function() {
				$("#" + field.Name).resizable('destroy');
				var editid = field.Name + "editlable";
				var value;
				if (!document.getElementById(editid)) {
					value = $("#" + field.Name).html();
					$("#" + field.Name).html("");
					var inputitem = "<textarea id=\"" + editid + "\" type='text' style='width:100%;height:100%;border:0px;'></textarea>";
					$(this).append(inputitem);
				} else {
					$("#" + editid).show();
				}
				if (value) {
					value = BASE.html_decode(value);
					$("#" + editid).val(value);
					$("#" + editid).bind("click", function(e) {
						BASE.stopPropagation();
					});
					$(document).bind("click", function() {
						var value = $("#" + editid).val();
						value = BASE.html_encode(value);
						$("#" + editid).hide();
						$("#" + field.Name).html(value);
						document.onmousedown = null;
						formdesigner.editItem({
							ID: field.Name,
							OldID: field.Name,
							Text: value
						});
						$("#" + field.Name).resizable({
							handles: "all"
						});
						$("form .ui-resizable-handle").css("display", "none");
						$("#" + field.Name).enableContextMenu();
						$("#container_designer").enableContextMenu();
						$(document).unbind("click");
					});
				}
				$("#" + field.Name).disableContextMenu();
				$("#container_designer").disableContextMenu();
			});
			$("#" + field.Name).resizable({
				handles: "all"
			});
		};
		var textField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Text" + "\" style=\"position:absolute;z-index:10;border:1px solid #AAA;width:" + field.Width + "px;height:" + field.Height + "px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\">" + field.Text + "</div>";
				var formDesignerContainer = formdesigner.getConfig({}, "FormDesigner");
				$("#" + formDesignerContainer['view']).append(item);
				$("#" + field.Name).bind("mousedown", function() {
					e = window.event || arguments[0];
					var me = $(this);
					if (e.ctrlKey) {
						me.attr("selectcontrol", true);
					} else {
						$(".control").each(function() {
							if ($(this).attr("standardcontrol")) {
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
				editeText(field);
				field.OldID = field.Name;
				this.setContorlValue(field);
			},
			//配置特有属性重写父formdesinger的setControlValue方法。
			setContorlValue: function(options,configure) {
			   eval(decodeURIComponent(form.Script));
                var oldID = options.OldID;
                var me = $("#" + oldID);
                me.attr("ID", options.Name);
				if (options.CustomStyle && options.CustomStyle.split(";").length > 0) {
					for (var i = 0; i < options.CustomStyle.split(";").length; i++) {
						var cssText = options.CustomStyle.split(";")[i];
						var cssProperty = cssText.split(":")[0];
						var cssValue = cssText.split(":")[1];
						me.css(cssProperty, cssValue);
					}
				//	options.CustomStyle = me.attr("style");
					me.text(options.Text);
					me.resizable("destroy");
					me.resizable({
						handles: "all"
					});
				}
				me.css("width", options.Width + "px");
                me.css("height", options.Height + "px");
				formdesigner.editItem(options);
                if(configure) alert("保存成功");
			}
		};
		return textField;

	})());
})(window, undefined)