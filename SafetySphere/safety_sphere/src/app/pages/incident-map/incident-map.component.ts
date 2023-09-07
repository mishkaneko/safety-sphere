import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PositionService } from '../../@services/position.service';

declare const google: any;

interface LatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.scss'],
})
export class IncidentMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapDiv') mapDiv!: ElementRef;
  @ViewChild('locateButtonContainer') locateButtonContainer!: ElementRef;
  @ViewChild('locateButton') locateButton!: ElementRef;

  private map: any;
  private placesService: any;
  protected isViewInited: boolean = false;
  private oldUserLatLng: LatLng = { lat: 0, lng: 0 };
  private userMarker: any;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

  constructor(private positionService: PositionService) {}

  async ngAfterViewInit() {
    const { coords } = await Geolocation.getCurrentPosition();
    console.log('coords');
    console.log(coords);
    this.initMap({ lat: coords.latitude, lng: coords.longitude });

    this.positionService.startCalculateCurrentPosition();

    // 更新user定位
    this.positionService.getCurrentPosition().subscribe((coords) => {
      this.updateUserMarker({ lat: coords.latitude, lng: coords.longitude });
    });

    // 創建定位按鈕
    this.createLocateButton();
  }

  ngOnDestroy() {
    this.positionService.stopCalculateCurrentPosition();
  }

  // 創建定位按鈕
  private createLocateButton() {
    const locateButtonDiv: any = this.locateButtonContainer.nativeElement;
    const locateButton: any = this.locateButton.nativeElement;
    locateButton.addEventListener('click', () => {
      // 移動地圖中心到定位位置
      const latLng = new google.maps.LatLng(
        this.oldUserLatLng.lat,
        this.oldUserLatLng.lng
      );
      this.map.panTo(latLng);
    });
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
      locateButtonDiv
    );
    this.isViewInited = true;
  }

  private updateUserMarker(newUserLatLng: { lat: number; lng: number }) {
    if (
      newUserLatLng.lat === this.oldUserLatLng.lat &&
      newUserLatLng.lng === this.oldUserLatLng.lng
    )
      return;
    Object.assign(this.oldUserLatLng, newUserLatLng);
    this.userMarker.setPosition(newUserLatLng);
  }

  private initMap(newUserLatLng: { lat: number; lng: number }) {
    const mapOptions = {
      center: newUserLatLng,
      zoom: 16,
      styles: [
        // 自定義地圖樣式
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
    const latLng = new google.maps.LatLng(newUserLatLng.lat, newUserLatLng.lng);
    this.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);
    this.placesService = new google.maps.places.PlacesService(this.map);
    Object.assign(this.oldUserLatLng, newUserLatLng);
    // 移動地圖中心到定位位置
    this.map.panTo(latLng);
    // 創建標記並將其移動到定位位置
    this.userMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Current Location',
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/1365/1365700.png',
        scaledSize: new google.maps.Size(80, 80),
      },
    });
  }
}
