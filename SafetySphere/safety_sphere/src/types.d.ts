declare namespace google_ {
    namespace maps {
        interface LatLng {}
        interface Map {}
        interface Polyline {}
        interface Marker {}
        namespace places {
            interface PlacesServiceStatus {}
            type PlaceResult =any
            interface PlacesService {
                nearbySearch:any
            }
            interface PlaceSearchRequest {
                type: unknown
                location: unknown
                openNow: unknown
                rankBy: unknown
            }
        }
    }
}