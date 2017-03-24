function calendarFunc(data) {
  let chart =
    AmCharts.makeChart('chartdiv', {
      'type': 'serial',
      'categoryField': 'date',
      'startDuration': 1,
      'categoryAxis': {
        'gridPosition': 'start'
      },
      'graphs': [
        {
          'balloonText': 'Homework',
          'valueAxis': 'homework',
          'lineColor': '#ff0000',
          'fillColors': '#ff0000',
          'fillAlphas': 1,
          'type': 'column',
          'openField': 'homework1',
          'closeField': 'homework2',
          'valueField': 'Not set',
          'clustered': false,
          'columnWidth': 1,
        },
        {
          'balloonText': '[[name1]]',
          'closeField': 'end1',
          'lineColorField': 'color1',
          'fillColorsField': 'color1',
          'fillAlphas': 1,
          'newStack': true,
          'id': 'AmGraph-1',
          'columnWidth': 0.7,
          'openField': 'start1',
          'titleField': 'name1',
          'type': 'column',
          'valueField': 'Not set'
        },
        {
          'balloonText': '[[name2]]',
          'closeField': 'end2',
          'lineColorField': 'color2',
          'fillColorsField': 'color2',
          'fillAlphas': 1,
          'newStack': true,
          'id': 'AmGraph-2',
          'columnWidth': 0.7,
          'openField': 'start2',
          'title': 'graph 2',
          'type': 'column',
          'valueField': 'Not set'
        },
        {
          'balloonText': '[[name3]]',
          'closeField': 'end3',
          'lineColorField': 'color3',
          'fillColorsField': 'color3',
          'fillAlphas': 1,
          'newStack': true,
          'id': 'AmGraph-3',
          'columnWidth': 0.7,
          'openField': 'start3',
          'title': 'graph 3',
          'type': 'column',
          'valueField': 'Not set'
        }
      ],
      //The date is a constant to, because you cant set hour without a date!
      'guides': [
        {'value': moment('14-03-2017 10:00', 'DD-MM-YYYY HH:mm'), 'label': '10:00', 'color': '#828282'},
        {'value': moment('14-03-2017 11:00', 'DD-MM-YYYY HH:mm'), 'label': '11:00', 'color': '#828282'},
        {'value': moment('14-03-2017 12:00', 'DD-MM-YYYY HH:mm'), 'label': '12:00', 'color': '#828282'},
        {'value': moment('14-03-2017 13:00', 'DD-MM-YYYY HH:mm'), 'label': 'LB', 'color': 'orangered'},
        {'value': moment('14-03-2017 14:00', 'DD-MM-YYYY HH:mm'), 'label': '14:00', 'color': '#828282'},
        {'value': moment('14-03-2017 15:00', 'DD-MM-YYYY HH:mm'), 'label': '15:00', 'color': '#828282'},
        {'value': moment('14-03-2017 16:00', 'DD-MM-YYYY HH:mm'), 'label': '16:00', 'color': '#828282'},
        {'value': moment('14-03-2017 17:00', 'DD-MM-YYYY HH:mm'), 'label': '17:00', 'color': '#828282'},
        {'value': moment('14-03-2017 18:00', 'DD-MM-YYYY HH:mm'), 'label': '18:00', 'color': '#828282'},
        {'value': moment('14-03-2017 19:00', 'DD-MM-YYYY HH:mm'), 'label': '19:00', 'color': '#828282'},
        {'value': moment('14-03-2017 20:00', 'DD-MM-YYYY HH:mm'), 'label': '20:00', 'color': '#828282'},
        {'value': moment('14-03-2017 21:00', 'DD-MM-YYYY HH:mm'), 'label': '', 'color': '#828282'},
        {'value': moment('14-03-2017 22:00', 'DD-MM-YYYY HH:mm'), 'label': 'HW', 'color': 'orangered'},
      ],
      'valueAxes': [
        {
          'id': 'lectures',
          'type': 'date',
          'stackType': 'regular',
          'axisAlpha': 1,
          'autoGridCount': false,
          'gridCount': 10,
          //The date is a constant to, because you cant set hour without a date!
          'maximumDate': moment('14-03-2017 22:00', 'DD-MM-YYYY HH:mm'),
          'minimumDate': moment('14-03-2017 10:00', 'DD-MM-YYYY HH:mm'),
        },
        {
          'id': 'homework',
          'type': 'date',
          'stackType': 'regular',
          'axisAlpha': 1,
          'autoGridCount': false,
          'gridCount': 10,
          'guides': [],
          'maximumDate': moment('14-03-2017 22:00', 'DD-MM-YYYY HH:mm'),
          'minimumDate': moment('14-03-2017 10:00', 'DD-MM-YYYY HH:mm'),
        }
      ],
      'balloon': {},
      'titles': [
        {
          'id': '',
          'size': 15,
          'text': ''
        }
      ],
      'dataProvider': data
    });
}


