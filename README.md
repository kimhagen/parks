[abqparks.info](http://abqparks.info/)
=======

Usage Info
=====
This application is intended for Albuquerque residents and visitors to easily find city parks that have their favorite features available, such as playgrounds and tennis courts.

Technical Information
=====
This is a Rack based application that serves static HTML/Javascript. It uses the Leaflet library for map rendering.

It parses the ABQ Parks data feed available [here](http://data.cabq.gov/community/parksandrec/parks/CityParks.kmz). To generate the JSON used by the web application, run the Ruby script in the scripts directory with the command 'ruby parsekml.rb'.

The application is deployed on Heroku.

License
=======
Copyright (c) 2012 Kimberly Hagen

This code is released under the [MIT License](http://opensource.org/licenses/MIT).



