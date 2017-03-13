function calendarFunc(data) {

  let chart =

    AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "categoryField": "category",
      "startDuration": 1,
      "categoryAxis": {
        "gridPosition": "start"
      },
      "trendLines": [],
      "graphs": [
        {
          "balloonText": "open:[[open]] close:[[close]]",
          "closeField": "close1",
          "fillAlphas": 1,
          "newStack": true,
          "id": "AmGraph-1",
          "columnWidth": 0.5,
          "openField": "open1",
          "title": "graph 1",
          "type": "column",
          "valueField": "Not set"
        },
        {
          "balloonText": "open:[[open]] close:[[close]]",
          "closeField": "close2",
          "fillAlphas": 1,
          "newStack": true,
          "id": "AmGraph-2",
          "columnWidth": 0.5,
          "openField": "open2",
          "title": "graph 2",
          "type": "column",
          "valueField": "Not set"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "stackType": "regular",
          "type": "date",
          // "axisAlpha": 0,
          // "title": "",
          // "titleFontSize": 0,
          "maximumDate": "JAN 20 1997 22:00",
          "minimum": "JAN 20 1997 10:00",
        }
      ],
      "allLabels": [],
      "balloon": {},
      "titles": [
        {
          "id": "",
          "size": 15,
          "text": ""
        }
      ],
      "dataProvider": data
    });
}


