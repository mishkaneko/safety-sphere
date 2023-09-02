import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

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

        console.log(
          place.geometry.location?.lat(),
          place.geometry.location?.lng()
        );
      });
    });
  }
}
