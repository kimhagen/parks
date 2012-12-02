
require 'nokogiri'
require 'json'
require 'titleize'


# wget must be installed on host system
`wget http://data.cabq.gov/community/parksandrec/parks/CityParks.kmz`

`unzip CityParks.kmz`

park_file = 'doc.kml'
doc = Nokogiri::XML(open(park_file))
doc.remove_namespaces!

parks = Array.new
placemarks = doc.xpath("//Placemark")

placemarks.each do |placemark|
  new_park = Hash.new

  # Simplify coordinates from polygon into an avg lat/long for use as a point marker - will be slightly off for odd shapes

  park_coordinates = placemark.xpath("MultiGeometry//Polygon//outerBoundaryIs").text()
  coordinate_list = park_coordinates.split(" ")
  total_coords = coordinate_list.size
  lat_tot = 0
  long_tot = 0
  coordinate_list.each do |c|
    c_list = c.split(',')
    lat_tot += c_list[1].to_f
    long_tot += c_list[0].to_f
  end
  avg_lat = lat_tot / total_coords
  avg_long = long_tot / total_coords
  new_park[:lat] = avg_lat
  new_park[:long] = avg_long

  # Parse HTML description into name/value pairs

  description = placemark.xpath("description")
  html = Nokogiri::HTML(description.to_s) 

  html.search('table > tr').each do |row|
    item = row.css('td').map{|td| td.text}.join(', ')
    item_list = item.split(',')
    key = item_list.first
    value = item_list.last
    if !key.nil? and !value.nil?
      value = value.strip
      key.gsub!(' ','_')
      if value.to_i.to_s == value
        value = value.to_i
      else
        value = value.titleize
      end
      new_park[key] = value
      
    end        
  end
  parks.push(new_park)

end

File.open('CityParks.json', 'w') {|f| f.write(parks.to_json) }

# Clean up xml files from directory

`rm CityParks.kmz`
`rm doc.kml`
