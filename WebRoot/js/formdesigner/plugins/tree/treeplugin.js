(function(window, undefined) {
	formdesigner.plugins.add('Tree', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['Tree']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/tree.png' />Tree</li>";
				var _pluginType = "quicktype";
				$("." + _pluginType).append(_plugin);
			}
		});

		function regulateTree(retValue) {
			for(var i = 0; i < retValue.length; i++) {
				if(retValue[i].children.length > 0) {
					regulateTree(retValue[i].children);
				} else {
					delete retValue[i].children;
					delete retValue[i].state;
				}
			}
			return true;
		}

		function initJSTreeContextMenu(ListItems, ID) {
			var bindObject = {
				text: "显示名称",
				ico: null,
				cls: "attrcontrol",
				callback: "function"
			};
			var contextMenuBind = []; // [{type:"root",bindObject:[bindObject]}];
			for(var i = 0; i < ListItems.length; i++) {
				if(i == 0) {
					contextMenuBind.push({
						type: ListItems[i].Value,
						bindObject: [ListItems[i].Text]
					});
				} else {
					var sametype = true;
					for(var j = 0; j < contextMenuBind.length; j++) {
						if(contextMenuBind[j].type == ListItems[i].Value) {
							contextMenuBind[j].bindObject.push(ListItems[i].Text);
							sametype = false;
							break;
						}
					}
					if(sametype) {
						contextMenuBind.push({
							type: ListItems[i].Value,
							bindObject: [ListItems[i].Text]
						});
					}
				}

			}
			for(var m = 0; m < contextMenuBind.length; m++) {
				var ulmenu = ' <ul id="ulmenu' + ID + '" class="contextMenu" style="font-size: 12px;">';
				for(var n = 0; n < contextMenuBind[m].bindObject.length; n++) {
					var bind = JSON2.parse(eval(contextMenuBind[m].bindObject[n]));
					bind = $.extend({}, bindObject, bind);
					var liClass = bind.cls;
					var liCallback = bind.callback;
					var liText = bind.text;
					var limenu = '<li class="' + liClass + '"><a href="#' + liCallback + '">' + liText + '</a></li>';
					ulmenu = ulmenu + limenu;
				}
				ulmenu = ulmenu + '</ul>';
				if($("#ulmenu" + ID).length < 1) {
					$(document).find("body").append(ulmenu);
				}
				var licontextMenu = $("li[type='" + contextMenuBind[m].type + "']").find("a");
				if($("li[type='" + contextMenuBind[m].type + "']").find("a").length < 1) {
					licontextMenu = $("li[type='root']").find("a")
				}
				licontextMenu.bind("mousedown", function() {
					BASE.stopPropagation();
				});
				if(licontextMenu.length > 0) {
					licontextMenu.contextMenu({
						menu: "ulmenu" + ID
					}, function(action, el, pos) {
						var menuaction = eval(action);
						if(typeof(menuaction) == "function") {
							menuaction.call(this, el, pos);
						}
					})
				}
			}
		};
		var treeField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Tree" + "\"  style=\"position:absolute;z-index:10;border:1px solid #AAA;width:240px;height:25px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\"><div id=\"" + field.Name + "tree\"></div></div>";
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
					alsoResize: "#" + field.Name + "tree",
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
				field.OldID = field.Name; /*getTreeDS规定函数。用于用户自定义函数定义Tree控件的数据源*/
				if(BASE.isDefined(window.getTreeDS)) {
					field.DataSource = getTreeDS.call(this, field);
				} else if(field.DataSource) {
					this.getTreeInfo(field);
				}
				formdesigner.setContorlValue(field);
			},
			getTreeInfo: function(options) {
				$.post("/FormDesigner/Home/GetTreeInfo", {
					DataSource: options.DataSource,
					NodeImg: options.DefaultValue
				}, function(retValue) {
					var ListItems = null;
					if(form.Fields && form.Fields.length > 0) {
						for(var i = 0; i < form.Fields.length; i++) {
							if(form.Fields[i].Name == options.OldID) {
								ListItems = form.Fields[i].ListItems;
							}
						}
					}
					if(regulateTree(retValue)) {
						var icons = false;
						var plugins = ["themes", "json_data", "checkbox", "sort", "ui"];
						if(!options.Required) {
							plugins = ["themes", "json_data", "sort", "ui"];
							var icons = true;
						}
						$.ajaxSetup({
							cache: false
						});
						$("#" + options.Name + "tree").jstree({
							"plugins": plugins,
							"themes": {
								"theme": "default",
								"url": "/Plugins/Resources/Content/Themes/Default/jstree/themes/default/style.css",
								"dots": true,
								"icons": icons
							},
							"lang": {
								"loading": "目录加载中……"
							},
							"json_data": {
								//"ajax": {
								//    "url": "/FormDesigner/Home/GetTreeInfo",
								//    "data": { "DataSource": options.DataSource, "NodeImg": options.DefaultValue }// treeContent.dataSource }
								//},
								"data": retValue,
								"progressive_render": true
							},
							"checkbox": {
								//"two_state": true
							}
						}).bind("select_node.jstree", function(e, data) {
							if(selectNode) {
								selectNode.call(this, e, data);
								//     alert(data.rslt.obj.data("id"));
							}
						}).bind("open_node.jstree loaded.jstree", function(e, data) {
							if(ListItems.length > 0) {
								initJSTreeContextMenu(ListItems, options.Name);
							}
						});
						$("#" + options.Name + "tree").css("overflow", "auto");
						//$("#" + options.Name).wrap("<div class='wrap'></div>");
						//$("#" + options.Name).resizable({
						//   // alsoResize: "#" + options.Name,
						//    handles: "all"
						//});
						$("form .ui-resizable-handle").css("display", "none");
					}
				});
			}

		};
		return treeField;

	})());
})(window, undefined)