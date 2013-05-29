(function(window, undefined) {
	formdesigner.plugins.add('Chart', (function() {
		$(document).ready(function() {
			var controlType = formdesigner.getConfig({}, "ControlType");
			if(controlType['Chart']) {
				var _plugin = "<li class='left_li'>" + "<img class='img_text' src='images/chart.png' />Chart</li>";
				var _pluginType = "quicktype";
				$("." + _pluginType).append(_plugin);
			}
		});
		var chartField = {
			addField: function(field) {
				var item = "<div class=\"control\" parentControl=\"" + field.Container + "\" controlType=\"" + "Chart" + "\"  style=\"position:absolute;z-index:10;border:1px solid #AAA;width:240px;height:25px;left:" + field.X + "px;top:" + field.Y + "px;" + field.CustomStyle + "\"id=\"" + field.Name + "\">图表控件</div>";
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
				if(field.DataSource) {
					$.post("/FormDesigner/Home/InitChart", {
						DataSource: field.DataSource,
						ExtendData: field.ExtendData,
						TableSource: form.DataSource
					}, function(retValue) {
						this.getHightChart(field, retValue);
						me.on("resizestop", function(event, ui) {
							this.getHightChart(field, retValue);
						});
						$("form .ui-resizable-handle").css("display", "none");
					});
				}
				formdesigner.setContorlValue(field);
			},
			getHightChart: function() {
				if(options.DataType === "pie") {
					var data = retValue.data;
					retValue.data = [];
					for(var i = 0; i < retValue.categories.length; i++) {
						retValue.data.push({
							name: retValue.categories[i],
							y: data[i]
						});
					}
				}
				chart = new Highcharts.Chart({
					chart: {
						renderTo: options.Name,
						type: options.DataType,
						margin: [50, 50, 100, 80]
					},
					title: {
						text: options.Text
					},
					xAxis: {
						categories: retValue.categories,
						labels: {
							rotation: -45,
							align: 'right',
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif'
							}
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: 'y值'
						}
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								color: '#000000',
								connectorColor: '#000000',
								formatter: function() {
									var formatterData = Math.round(this.percentage * Math.pow(10, 2)) / Math.pow(10, 2);
									return '<b>' + this.point.name + '</b>: ' + formatterData + ' %';
								}
							}
						}
					},
					tooltip: {
						pointFormat: '<b>{point.percentage}%</b>',
						percentageDecimals: 1,
						formatter: function() {
							if(this.x) {
								return '<b>' + this.x + '</b><br/>' + this.y;
							} else {
								return '<b>' + this.point.name + '</b><br/>' + this.y;
							}
						}

					},
					series: [{
						name: 'Population',
						data: retValue.data,
						dataLabels: {
							enabled: true,
							formatter: function() {
								if(this.x) {
									return this.y;
								} else {
									var formatterData = Math.round(this.percentage * Math.pow(10, 2)) / Math.pow(10, 2);
									return '<b>' + this.point.name + '</b>: ' + formatterData + ' %';
								}
							},
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif'
							}
						}
					}]
				});
				$("#" + options.Name).resizable('destroy');
				$("#" + options.Name).resizable({
					handles: "all"
				});
			}
		};
		return chartField;

	})());
})(window, undefined)