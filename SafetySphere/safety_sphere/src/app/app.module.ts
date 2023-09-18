import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoginModule } from './pages/login/login.module'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FollowModule } from './pages/follow/follow.module';
import { AskForHelpModule } from './pages/ask-for-help/ask-for-help.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { NzModalModule } from 'ng-zorro-antd/modal';
// import { NzInputModule } from 'ng-zorro-antd/input';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {
  
} };

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    GoogleMapsModule,
    NzFormModule,
    NzSelectModule,
    LoginModule,
    NzDatePickerModule,
    NzTimePickerModule,
    FollowModule,
    AskForHelpModule,
    SocketIoModule.forRoot(config)
    // NzModalModule,
    // NzInputModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_TW }],
  bootstrap: [AppComponent],
})
export class AppModule {}
