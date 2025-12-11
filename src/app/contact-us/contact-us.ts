import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { PlatformService } from '@share/service/platform.service';
import { SharedModule } from '@share/module/shared.module';
import { Breadcrumb } from '@share/component/breadcrumb/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-contact-us',
  imports: [
    SharedModule,
    Breadcrumb
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss'
})
export class ContactUs implements AfterViewInit, OnInit {
  private platformService = inject(PlatformService);

  BreadcrumbItems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.BreadcrumbItems = [{ label: 'تماس با ما' }];
  }
  
  ngAfterViewInit(): void {
    if (this.platformService.isServer()) return;
    this.initializeMap();
  }

  private initializeMap(): void {
    const companyCoordinates = fromLonLat([51.346614, 35.704611]);

    const map = new Map({
      target: 'map',
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: companyCoordinates,
        zoom: 15
      })
    });

    const marker = new Feature({
      geometry: new Point(companyCoordinates)
    });

    marker.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })
    }));

    const vectorSource = new VectorSource({
      features: [marker]
    });

    const markerLayer = new VectorLayer({
      source: vectorSource
    });

    map.addLayer(markerLayer);
  }
}
