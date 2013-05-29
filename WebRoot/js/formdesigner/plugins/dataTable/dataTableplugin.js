(function(window, undefined) {
	formdesigner.plugins.add('DataTable', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if (controlType['DataTable']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/datatable.png' />DataTable</li>";
				var _pluginType = "containertype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var dataTableField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "DataTable" + "\"  style=\"position:absolute;z-index:10;border:1px solid #AAA;width:240px;height:25px;left:" + field.X + "px;top:" + field.Y + "px;\" id=\"" + field.Name + "\"></div>";
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
				field.OldID = field.Name;
				if (options.DataSource) {
					$.post("/FormDesigner/Home/GetTableSource", {
						DataSource: options.DataSource
					}, function(retValue) {
						var ListItems = null;
						if (form.Fields && form.Fields.length > 0) {
							for (var i = 0; i < form.Fields.length; i++) {
								if (form.Fields[i].Name == options.OldID) {
									ListItems = form.Fields[i].ListItems;
								}
							}
						}
						if (options.Required) {
							var tableItem = "<table  style='width:100%;height:100%' id='" + options.Name + "table'><thead><tr>";
							for (var j = 0; j < ListItems.length; j++) {
								var headItem = "<th>" + ListItems[j].Text + "</th>";
								tableItem = tableItem + headItem;
							}
							tableItem = tableItem + "</tr></thead><tbody>";
							for (var m = 0; m < retValue.length; m++) {
								var trItem = "<tr>";
								for (var n = 0; n < ListItems.length; n++) {
									var tdItem = "<td>" + retValue[m][ListItems[n].Value] + "</td>";
									var trItem = trItem + tdItem;
								}
								trItem = trItem + "</tr>";
								tableItem = tableItem + trItem;
							}
							tableItem = tableItem + "</tbody></table>";
							me.empty();
							me.append(tableItem);
							me.resizable('destroy');
							me.resizable({
								alsoResize: "#" + options.Name + "table",
								handles: "all"
							});
							$("form .ui-resizable-handle").css("display", "none");;
						} else {
							var tableItem = "<table style='width:100%;height:100%' id='" + options.Name + "table'><tbody>";
							for (var j = 0; j < ListItems.length; j++) {
								var trItem = "<tr><td>" + ListItems[j].Text + "</td>";
								for (var i = 0; i < retValue.length; i++) {
									tdValueItem = "<td>" + retValue[i][ListItems[j].Value] + "</td>";
									trItem = trItem + tdValueItem;
								}
								trItem = trItem + "</tr>";
								tableItem = tableItem + trItem;
							}
							tableItem = tableItem + "</tbody></table>";
							me.empty();
							me.append(tableItem);
							me.resizable('destroy');
							me.resizable({
								alsoResize: "#" + options.Name + "table",
								handles: "all"
							});
							$("form .ui-resizable-handle").css("display", "none");
						}
					});
				}
				if (options.CustomStyle) {
					var load_css = (function() {
						var sStyle = document.createElement("style");
						sStyle.setAttribute("type", "text/css");
						if (sStyle.styleSheet) { //ie
							sStyle.styleSheet.cssText = options.CustomStyle;
						} else {
							var csstext = document.createTextNode(options.CustomStyle);
							sStyle.appendChild(csstext);
						}
						document.getElementsByTagName('head')[0].appendChild(sStyle);
					})();
				}
				formdesigner.setContorlValue(field);
			}

		};
		return dataTableField;

	})());
})(window, undefined)