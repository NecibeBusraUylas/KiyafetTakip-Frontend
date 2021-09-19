import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";
import{ToastrModule} from "ngx-toastr";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { StaffComponent } from './components/staff/staff.component';
import { NaviComponent } from './components/navi/navi.component';
import { ClotheFilterPipePipe } from './pipes/clothe-filter-pipe.pipe';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClotheAddComponent } from './components/clothe-add/clothe-add.component';
import { StaffUpdateComponent } from './components/staff/staff-update/staff-update.component';
import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { StaffCardFilterPipe } from './pipes/staff-card-filter.pipe';
import { ReceiverCardFilterPipe } from './pipes/receiver-card-filter.pipe';
import { ReceiverNameFilterPipe } from './pipes/receiver-name-filter.pipe';
import { StaffNameFilterPipe } from './pipes/staff-name-filter.pipe';
import { ReceiverClotheFilterPipe } from './pipes/receiver-clothe-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReceiverComponent,
    StaffComponent,
    NaviComponent,
    ClotheFilterPipePipe,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ProfileComponent,
    ClotheAddComponent,
    StaffUpdateComponent,
    StaffListComponent,
    StaffCardFilterPipe,
    ReceiverCardFilterPipe,
    ReceiverNameFilterPipe,
    StaffNameFilterPipe,
    ReceiverClotheFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,  
    ToastrModule.forRoot({
     positionClass:"toast-bottom-right"
    })
  ],
  providers:  [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
