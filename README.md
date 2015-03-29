# Mayor's Hotline Explorer

Boston's [Mayor's 24-hour Constituent Service](http://www.cityofboston.gov/mayor/24/) allows Boston's citizens a way to engage with the City government to report and track issues that concern them.

The City of Boston and its [Department of Innovation and Technology](http://www.cityofboston.gov/DoIT/) are sponsoring a [http://hubhacks2.challengepost.com/](public hackathon) to develop data visualizations from the City's [open data portal](https://data.cityofboston.gov/).

This site, the Mayor's Hotline Explorer provides an interactive visualization of the public records concerning reported incidents.

## Data assets used
* [Mayor's 24 Hour Hotline Service Requests](https://data.cityofboston.gov/resource/awu8-dc52) under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
* [Positron Map Tiles](http://cartodb.com/basemaps) by [CartoDB](http://cartodb.com/attributions#basemaps), under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Data by [OpenStreetMap](http://www.openstreetmap.org/), under [ODbL](http://opendatacommons.org/licenses/odbl/).

## Technologies used
* [Bootstrap](http://getbootstrap.com)
* [dc.js](http://dc-js.github.io/dc.js/)
* [crossfilter](http://square.github.io/crossfilter/)
* [Leaflet.js](http://leafletjs.com/)
* [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

### Development tools used
* [GitHub Pages](https://pages.github.com/)
* [npm](https://www.npmjs.com/)
* [bower](http://bower.io/)
* [gulp](http://gulpjs.com/)

### Development instructions

It should be sufficient to start from a clean checkout and issue:

    npm install
    gulp

Serve the content locally out of the 'dist' directory.

When it comes time to publish to GitHub Pages, set the environment variables `SOCRATA_APP_TOKEN` and `GA_TRACKING_ID` to inject the correct info for the production instance and issue:

    gulp --env production deploy
