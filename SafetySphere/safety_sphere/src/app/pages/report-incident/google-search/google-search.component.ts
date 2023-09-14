import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

interface Coordinates {
  lat: number | undefined;
  lng: number | undefined;
}

@Component({
  selector: 'google-search',
  templateUrl: './google-search.component.html',
  styleUrls: ['./google-search.component.scss'],
})
export class GoogleSearchComponent {
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  coordinates: Coordinates = { lat: undefined, lng: undefined };
  location: string = '';

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Binds autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    // Restricts locations to HK
    autocomplete.setComponentRestrictions({
      country: ['hk'],
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // Gets place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // Verifies result for coordinates
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        this.coordinates = {
          lat: place.geometry.location?.lat(),
          lng: place.geometry.location?.lng(),
        };

        // Verifies result for location
        if (
          place.formatted_address === undefined ||
          place.formatted_address === null
        ) {
          return;
        }

        // Extract the location name (the user-entered input)
        this.location = `${place.name}, ${place.vicinity}`;
      });
    });
  }

  // Creates a fn to clear input
  clearSearchInput() {
    const inputElement = this.searchElementRef.nativeElement;
    inputElement.value = '';
  }
}
