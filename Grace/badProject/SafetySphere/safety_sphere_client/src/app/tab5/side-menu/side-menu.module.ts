import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { SideMenuRountingModule } from './side-menu-rounting.module';
import { SideMenuComponent } from './side-menu.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

registerLocaleData(zh);

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    SideMenuRountingModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    IonicModule
  ],
  exports: [SideMenuComponent],
  providers: [
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: IonicRouteStrategy
    // },
    {
      provide: NZ_I18N, useValue: zh_TW
    }
  ],
  bootstrap: [SideMenuComponent]
})
export class SideMenuModule { }
