import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { TagHeaderComponent } from './tag-header/tag-header.component';
import { FeaturedComponent } from './featured/featured.component';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import {CanActivateTeam} from './deactivate/can-activate-team';
import {Permissions} from './deactivate/permissions';
import {NotActivateTeam} from './deactivate/not-activate-team';
import { CreateDiaryComponent } from './create-diary/create-diary.component';
import {CKEditorModule} from 'ngx-ckeditor';
import { DiaryComponent } from './diary/diary.component';
import { UserDiaryListComponent } from './user-diary-list/user-diary-list.component';
import { DetailDiaryComponent } from './detail-diary/detail-diary.component';
import { UpdateDiaryComponent } from './update-diary/update-diary.component';
import { ViewAllTagComponent } from './view-all-tag/view-all-tag.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TagHeaderComponent,
    FeaturedComponent,
    BlogMainComponent,
    SideBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileUserComponent,
    CreateDiaryComponent,
    DiaryComponent,
    UserDiaryListComponent,
    DetailDiaryComponent,
    UpdateDiaryComponent,
    ViewAllTagComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam],
  bootstrap: [AppComponent]
})
export class AppModule { }
