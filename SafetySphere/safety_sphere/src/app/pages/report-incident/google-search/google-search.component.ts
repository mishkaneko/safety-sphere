import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
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

  // Output coordinates to report-incident
  @Output() valueEmitter = new EventEmitter<{
    lat: number | undefined;
    lng: number | undefined;
  }>();

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

        // Verifies result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        const coordinates: Coordinates = {
          lat: place.geometry.location?.lat(),
          lng: place.geometry.location?.lng(),
        };
        // Emits coordinates to report-incident
        this.valueEmitter.emit(coordinates);
      });
    });
  }

  // Creates a fn to clear input
  clearSearchInput() {
    const inputElement = this.searchElementRef.nativeElement;
    inputElement.value = '';
  }
}
