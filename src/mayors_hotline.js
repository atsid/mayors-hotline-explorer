var dayChart = dc.barChart("#day-chart");
var hourChart = dc.barChart("#hour-chart");
var sourceChart = dc.rowChart("#source-chart");
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

  dayChart
    .width($('#day-chart').innerWidth()-30)
    .height(250)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .x(d3.time.scale().domain([new Date(2011, 6, 1), new Date(2015, 2, 31)]))
    .colors(singleColor)
    .dimension(open_dates)
    .group(open_dates.group())
    .elasticY(true)

  hourChart
    .width($('#hour-chart').innerWidth()-30)
    .height(250)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .label(function(p){return p.key})
    .x(d3.scale.linear().domain([1,24]))
    .colors(singleColor)
    .dimension(open_hours)
    .group(open_hours.group())
    .elasticY(true);

  sourceChart
    .width($('#source-chart').innerWidth()-30)
    .height(185)
    .colors(singleColor)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .group(sources.group())
    .dimension(sources)
    .elasticX(true)
    .ordering(function(d){return -d.value;});

  dc.renderAll();

});