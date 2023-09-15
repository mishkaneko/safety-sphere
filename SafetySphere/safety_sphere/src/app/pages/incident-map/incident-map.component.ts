import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ApiService } from 'src/app/@services/api.service';
import { FilterIncidentComponent } from './filter-incident/filter-incident.component';

declare const google: any;

interface UserReport {
  incident: string;
  date: string;
  time: string;
  location: string;
  latitude: string;
  longitude: string;
  description: string;
  images: string[];
}

interface NewsReport {
  incident: string;
  location: string;
  latitude: string;
  longitude: string;
  title: string;
  source: string;
  summary: string;
  website: string;
}

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.scss'],
})
export class IncidentMapComponent implements AfterViewInit {
  userReportList: UserReport[] = [];
  newsReportList: NewsReport[] = [];

  @ViewChild(FilterIncidentComponent)
  filterIncidentComponent!: FilterIncidentComponent

  constructor(private apiService: ApiService) {}

  async ngAfterViewInit() {
    // Get current location
    const { coords } = await Geolocation.getCurrentPosition();

    // Request needed libraries
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    const { LatLng } = (await google.maps.importLibrary(
      'core'
    )) as google.maps.CoreLibrary;

    // Set up map
    const center = new LatLng(22.321514402106235, 114.20919452522213);
    // const center = new LatLng(coords.latitude, coords.longitude);
    const map = new Map(document.getElementById('map') as HTMLElement, {
      zoom: 16,
      center,
      disableDefaultUI: true,
      mapId: '4504f8b37365c3d0',
    });

    this.getUserReport().subscribe(
      (data: UserReport[]) => {
        this.userReportList = data;
        console.log('list: ', this.userReportList);
        this.createMarkersForUserReport(map, this.userReportList);
      },
      (error: any) => {
        console.error('Error fetching data: ', error);
      }
    );

    this.getNewsReport().subscribe(
      (data: NewsReport[]) => {
        this.newsReportList = data;
        this.createMarkersForNewsReport(map, this.newsReportList);
      },
      (error: any) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  private getUserReport(): any {
    return this.apiService.get('/incident-map/user-report');
  }

  private getNewsReport(): any {
    return this.apiService.get('/incident-map/news-report');
  }

  private createMarkersForUserReport(map: google.maps.Map, list: any[]) {
    for (const report of list) {
      const advancedMarkerElement =
        new google.maps.marker.AdvancedMarkerElement({
          map,
          content: this.buildContentForUserReport(report),
          position: {
            lat: parseFloat(report.latitude),
            lng: parseFloat(report.longitude),
          },
          title: 'title',
        });

      advancedMarkerElement.addListener('click', () => {
        this.toggleHighlight(advancedMarkerElement);
      });
    }
  }

  private createMarkersForNewsReport(map: google.maps.Map, list: any[]) {
    for (const report of list) {
      const advancedMarkerElement =
        new google.maps.marker.AdvancedMarkerElement({
          map,
          content: this.buildContentForNewsReport(report),
          position: {
            lat: parseFloat(report.latitude),
            lng: parseFloat(report.longitude),
          },
          title: 'title',
        });

      advancedMarkerElement.addListener('click', () => {
        this.toggleHighlight(advancedMarkerElement);
      });
    }
  }

  toggleHighlight(markerView: any) {
    if (markerView.content.classList.contains('highlight')) {
      markerView.content.classList.remove('highlight');
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add('highlight');
      markerView.zIndex = 1;
    }
  }

  buildContentForUserReport(userReport: UserReport) {
    const content = document.createElement('div');
    content.classList.add('user-report');
    content.innerHTML =
      /*html*/
      `
        <div class="icon">
          <i aria-hidden="true" class="${this.getIconClass(
            userReport.incident
          )}" title="${userReport.incident}"></i>
      </div>
      <div class="details">
          <div class="incident-type">${userReport.incident}</div>
          <div class="location">
          <span class="details-icon"><i class="fa-solid fa-location-dot"></i></span>
          <span>${userReport.location}</span>
         </div>
          <div class="date-and-time"><span class="details-icon"><i class="fa-solid fa-clock"></i></span><span>${
            userReport.date
          }&nbsp${userReport.time}</span></div>
          <div class="description"> <span class="details-icon"><i class="fa-solid fa-info"></i></span><span>${
            userReport.description
          }</span></div>
      </div>`;

    return content;
  }

  buildContentForNewsReport(newsReport: NewsReport) {
    const content = document.createElement('div');
    // change here for css
    content.classList.add('user-report');
    content.innerHTML =
      /*html*/
      `
        <div class="icon">
          <i aria-hidden="true" class="${this.getIconClass(
            newsReport.incident
          )}" title="${newsReport.incident}"></i>
      </div>
      <div class="details">
          <div class="incident-type">${newsReport.incident}</div>
          <div class="location">
          <span class="details-icon"><i class="fa-solid fa-location-dot"></i></span>
          <span>${newsReport.location}</span>
         </div>
         <div class="title"> <span class="details-icon"><i class="fa-solid fa-newspaper"></i></span><span>${
           newsReport.title
         }</span></div>
          <div class="source"><span class="details-icon"><i class="fa-solid fa-clock"></i></span><span>${
            newsReport.source
          }</span></div>
          <div class="summary"> <span class="details-icon"><i class="fa-solid fa-info"></i></span><span>${
            newsReport.summary
          }</span></div>
          <div class="website"> <span class="details-icon"><i class="fa-solid fa-link"></i></i></span><a>${
            newsReport.website
          }</a></div>
      </div>`;

    return content;
  }

  getIconClass(incident: string): string {
    switch (incident) {
      case '肢體襲擊':
        return 'fa-solid fa-hand-fist fa-xl';
      case '言語威脅':
        return 'fa-solid fa-person-harassing  fa-xl';
      case '非禮/性侵犯':
        return 'fa-solid fa-mars-and-venus-burst  fa-xl';
      case '可疑人物':
        return 'fa-solid fa-person-circle-question  fa-xl';
      case '盜竊':
        return 'fa-solid fa-people-robbery  fa-xl';
      case '高空墮物':
        return 'fa-solid fa-person-falling-burst  fa-xl';
      case '野生動物襲擊':
        return 'fa-solid fa-paw  fa-xl';
      default:
        return '';
    }
  }

  openFilterDrawer() {
    this.filterIncidentComponent.visible = true
  }
}
