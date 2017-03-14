function calendarFunc(data) {
  let chart =
    AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "categoryField": "date",
      "startDuration": 1,
      "categoryAxis": {
        "gridPosition": "start"
      },
      "trendLines": [],
      "graphs": [
        // {
        //   "balloonText": "Homework",
        //   "valueAxis": "homework",
        //   "lineColor": "#ff0000",
        //   "fillColors": "#ff0000",
        //   "fillAlphas": 1,
        //   "type": "column",
        //   "openField":"homework1",
        //   "closeField":"homework2",
        //   "valueField": "Not set",
        //   "clustered": false,
        //   "columnWidth": 1,
        // },
        {
          "balloonText": "open:[[open]] close:[[close]]",
          "closeField": "end1",
          "fillAlphas": 1,
          "newStack": true,
          "id": "AmGraph-1",
          "columnWidth": 0.7,
          "openField": "start1",
          "title": "graph 1",
          "type": "column",
          "valueField": "Not set"
        },
        {
          "balloonText": "open:[[open]] close:[[close]]",
          "closeField": "end2",
          "fillAlphas": 1,
          "newStack": true,
          "id": "AmGraph-2",
          "columnWidth": 0.7,
          "openField": "start2",
          "title": "graph 2",
          "type": "column",
          "valueField": "Not set"
        },
        {
          "balloonText": "open:[[open]] close:[[close]]",
          "closeField": "end3",
          "fillAlphas": 1,
          "newStack": true,
          "id": "AmGraph-3",
          "columnWidth": 0.7,
          "openField": "start3",
          "title": "graph 3",
          "type": "column",
          "valueField": "Not set"
        }
      ],
      "guides": [
        {"value": moment('14-03-2017 15:00', 'DD-MM-YYYY HH:mm'), "label": '15:00', "color": "#cc0000"},
        {"value": moment('14-03-2017 16:00', 'DD-MM-YYYY HH:mm'), "label": '16:00', "color": "#0cc000"},
      ],
      "valueAxes": [
        {
          "id": "lectures",
          "type": "date",
          "stackType": "regular",
          "axisAlpha": 1,
          "minPeriod": "mm",
          "autoGridCount": false,
          "gridCount": 10,
          "maximumDate": moment('14-03-2017 22:00', 'DD-MM-YYYY HH:mm'),
          "minimumDate": moment('14-03-2017 10:00', 'DD-MM-YYYY HH:mm'),
        },
        // {
        //   "id": "homework",
        //   "type":"date",
        //   "stackType": "regular",
        //   "gridAlpha": 0,
        //   "autoGridCount": false,
        //   "maximumDate": "2017-03-15 22:00",
        //   "minimumDate": "2017-03-15 10:00",
        // }
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


