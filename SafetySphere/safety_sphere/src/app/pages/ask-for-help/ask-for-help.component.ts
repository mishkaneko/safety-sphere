import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NearbyPlacesService } from 'src/app/@services/nearby-places.service'
import { PositionService } from 'src/app/@services/position.service';
import { Geolocation } from '@capacitor/geolocation';
import { Subscription } from 'rxjs';
import { GoogleMapService } from 'src/app/google-map.service';
import { SocketIoService } from 'src/app/@services/socket-io.service';


@Component({
  selector: 'app-ask-for-help',
  templateUrl: './ask-for-help.component.html',
  styleUrls: ['./ask-for-help.component.scss']
})

export class AskForHelpComponent implements OnInit , OnDestroy {
  @ViewChild('mapDiv') mapDiv!: ElementRef;
  @ViewChild('locateButtonContainer') locateButtonContainer!: ElementRef;
  @ViewChild('locateButton') locateButton!: ElementRef;

  private positionService: PositionService
  protected isViewInited: boolean = false
  private currentPositionSubscription?: Subscription
  private restartSubscription?: Subscription

  // constructor (private positionService: PositionService, private nearbyPlacesService: NearbyPlacesService) {}
  constructor (
    private nearbyPlacesService: NearbyPlacesService,
    private googleMapService: GoogleMapService,
    private socketIoService: SocketIoService
  ) {
    this.positionService = new PositionService()
  }

  async ngOnInit() {
    await this.onStart()

    this.restartSubscription = NearbyPlacesService.restart$.subscribe(async () => {
      await this.onStart()
    })

    this.socketIoService.sendMessage('hello', 'Hello Socket.io!')
  }

  private async onStart() {
    await this.initMap()

    this.onPositionService()

    // 創建定位按鈕
    await this.createLocateButton()

    // 執行地點搜索
    // if(this.nearbyPlacesService.isEscaping) this.nearbyPlacesService.searchNearbyPlaces()
  }

  private async initMap() {
    let google = await this.googleMapService.googleDefer.promise
    const { coords } = await Geolocation.getCurrentPosition(), { latitude, longitude } = coords
    NearbyPlacesService.setUserLatLng({ lat: latitude, lng: longitude })
    const mapOptions = {
      // center: this.userLatLng,
      center: { lat: latitude, lng: longitude },
      zoom: 17,
      // zoom: 17,
      styles: [
        // 自定義地圖樣式
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
      ]
    };
    const latLng = new google.maps.LatLng(latitude, longitude);
    NearbyPlacesService.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);
    NearbyPlacesService.placesService.resolve(new google.maps.places.PlacesService(NearbyPlacesService.map))
    // 移動地圖中心到定位位置
    NearbyPlacesService.map!.panTo(latLng);
    // 創建標記並將其移動到定位位置
    NearbyPlacesService.userMarker = new google.maps.Marker({
      position: latLng,
      map: NearbyPlacesService.map,
      title: 'Current Location',
      icon: {
        // url: 'https://cdn-icons-png.flaticon.com/512/1365/1365700.png',
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        // scaledSize: new google.maps.Size(80, 80),
        scale: 5
      }
    });
  }

  private async updateUserMarker (newUserLatLng: { lat:number, lng:number }) {
   let userLatLng=await NearbyPlacesService.userLatLng.promise
    if (newUserLatLng.lat === userLatLng.lat && newUserLatLng.lng === userLatLng.lng) return
    NearbyPlacesService.setUserLatLng(newUserLatLng)
    if(NearbyPlacesService.userMarker) NearbyPlacesService.userMarker!.setPosition(newUserLatLng)
  }

  private onPositionService () {
    this.positionService.startCalculateCurrentPosition()
    // 更新user定位
    this.currentPositionSubscription = PositionService.currentPosition$.subscribe(coords => {
      this.updateUserMarker({ lat: coords.latitude, lng: coords.longitude })
    })
  }

  // 創建定位按鈕
  private async createLocateButton() {
   let userLatLng=await NearbyPlacesService.userLatLng.promise
    const locateButtonDiv:any = this.locateButtonContainer.nativeElement;
    const locateButton:any = this.locateButton.nativeElement;
    locateButton.addEventListener('click', () => {
      // 移動地圖中心到定位位置
      const latLng = new google.maps.LatLng(userLatLng.lat, userLatLng.lng);
      NearbyPlacesService.map!.panTo(latLng);
    });
    NearbyPlacesService.map!.controls[google.maps.ControlPosition.TOP_RIGHT].push(locateButtonDiv);
    this.isViewInited = true
  }

  ngOnDestroy() {
    this.currentPositionSubscription?.unsubscribe()
    this.restartSubscription?.unsubscribe()
  }
}