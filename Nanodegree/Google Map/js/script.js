window.onload = function() {
    function ViewModel () {
        var self = this;
        var map,
            infowindow,
            bounds;

        function initMap() {
            city = {lat: 50.445262, lng: 30.52002};
            map = new google.maps.Map(document.getElementById('map'), {
                center: city,
                zoom: 15
            });

            getAllPlaces();
        }

        self.allPlaces = ko.observableArray([]);

        function getAllPlaces() {
            self.allPlaces([]);
            var request = {
                location: city,
                radius: 6000,
                types: ['restaurant', 'bar', 'cafe']
            };
            infowindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, getAllPlacesCallback);
        }

        function getAllPlacesCallback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Create new bounds for the map.  Will be updated with each new
            // location.  This will be used to make sure all markers are
            // visible on the map after the search.
            bounds = new google.maps.LatLngBounds();
            results.forEach(function (place) {
                place.marker = createMarker(place);                
                place.isInFilteredList = ko.observable(true);
                self.allPlaces.push(place);
                bounds.extend(new google.maps.LatLng(
                    place.geometry.location.lat(),
                    place.geometry.location.lng()));
            });
            // Done looping through results so fit map to include all markers.
            map.fitBounds(bounds);
        }
    }

        initMap();
    }

ko.applyBindings(new ViewModel());
};