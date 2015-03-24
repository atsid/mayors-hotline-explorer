var dateChart = dc.barChart("#date-chart");
var hourChart = dc.barChart("#hour-chart");
var dayChart = dc.rowChart("#day-chart");
var sourceChart = dc.rowChart("#source-chart");
var statusChart = dc.pieChart("#status-chart");
var neighborhoodChart = dc.rowChart("#neighborhood-chart");

var singleColor = ["#969CEB"];

d3.json("https://data.cityofboston.gov/resource/awu8-dc52?$limit=1000", function(err, data) {
  var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  data.forEach(function(d) {
    d.date_opened = dateFormat.parse(d.open_dt);
    d.date_target = d.target_dt ? dateFormat.parse(d.target_dt) : null;
    d.date_closed = d.closed_dt ? dateFormat.parse(d.closed_dt) : null;
  });

  var index = crossfilter(data);
  var all = index.groupAll();

  var sources = index.dimension( function(d) { return d.source; });
  var open_dates = index.dimension( function(d) { return d3.time.day(d.date_opened) } );
  var open_hours = index.dimension( function(d) { return d.date_opened.getHours()+1 } );
  var open_days = index.dimension( function(d) { 
    var day = d.date_opened.getDay();
    var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return day + '.' + name[day];
  });
  var status = index.dimension( function(d) { return d.case_status } );
  var neighborhoods = index.dimension( function(d) { return d.neighborhood } );

  dateChart
    .width($('#date-chart').innerWidth()-30)
    .height(150)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .x(d3.time.scale().domain([new Date(2011, 6, 1), new Date(2015, 2, 31)]))
    .colors(singleColor)
    .dimension(open_dates)
    .group(open_dates.group())
    .elasticY(true)
    .yAxis().ticks(6);

  hourChart
    .width($('#hour-chart').innerWidth()-30)
    .height(250)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .x(d3.scale.linear().domain([1,24]))
    .colors(singleColor)
    .dimension(open_hours)
    .group(open_hours.group())
    .elasticY(true);

  dayChart
    .width($('#day-chart').innerWidth()-30)
    .height(250)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .label( function(i) { return i.key.split('.')[1]; })
    .colors(singleColor)
    .dimension(open_days)
    .group(open_days.group())
    .elasticX(true)
    .xAxis().ticks(3);

  statusChart
    .width($('#status-chart').innerWidth()-30)
    .height(250)
    // .margins({top: 10, left:20, right: 10, bottom:20})
    // .colors(singleColor)
    .innerRadius(80)
    .minAngleForLabel(0)
    .group(status.group())
    .dimension(status);

  sourceChart
    .width($('#source-chart').innerWidth()-30)
    .height(165)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .colors(singleColor)
    .group(sources.group())
    .dimension(sources)
    .elasticX(true)
    .gap(1)
    .ordering(function(i){return -i.value;});

  neighborhoodChart
    .width($('#neighborhood-chart').innerWidth()-30)
    .height(435)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .colors(singleColor)
    .group(neighborhoods.group())
    .dimension(neighborhoods)
    .elasticX(true)
    .gap(1)
    .ordering(function(i){return -i.value;});

  dc.renderAll();

});