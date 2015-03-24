var sourceChart = dc.rowChart("#source-chart");
var singleColor = '#969CEB';

d3.json("https://data.cityofboston.gov/resource/awu8-dc52?$limit=100", function(err, data) {
  var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  data.forEach(function(d) {
    d.date_opened = dateFormat.parse(d.open_dt);
    d.date_target = d.target_dt ? dateFormat.parse(d.target_dt) : null;
    d.date_closed = d.closed_dt ? dateFormat.parse(d.closed_dt) : null;
  });

  var index = crossfilter(data);
  var all = index.groupAll();

  var sources = index.dimension( function(d) { return d.source; });

  sourceChart.width($('#source-chart').innerWidth()-30)
    .height(200)
    // .colors(singleColor)
    .margins({top: 10, left:20, right: 10, bottom:20})
    .group(sources.group())
    .dimension(sources)
    .elasticX(true);

  dc.renderAll();

});