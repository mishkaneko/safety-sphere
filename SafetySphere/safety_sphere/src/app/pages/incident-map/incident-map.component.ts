import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.scss'],
})
export class IncidentMapComponent {
  constructor() {}

  zoom = 16;
  center!: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDefaultUI: true,
    mapTypeId: 'hybrid',
    maxZoom: 20,
    minZoom: 8,
  };

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        // Get current location
        // lat: position.coords.latitude,
        // lng: position.coords.longitude,
        lat: 22.323336439556318,
        lng: 114.2091309571302,
      };
    });
  }

  zoomIn() {
    if (this.options.maxZoom) {
      if (this.zoom < this.options.maxZoom) this.zoom++;
    }
  }

  zoomOut() {
    if (this.options.minZoom) {
      if (this.zoom > this.options.minZoom) this.zoom--;
    }
  }
}
