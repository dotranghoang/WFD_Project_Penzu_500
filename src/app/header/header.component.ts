import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/auth-login-info';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SignUpInfo} from '../auth/sign-up-info';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../services/tag.service';
import {Tag} from '../services/tag';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  info: any;
  private loginInfo: AuthLoginInfo;
  private returnUrl: string;
  private tagList: Tag[];
  constructor(private authService: AuthService, private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService) { }

  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';

    this.getListTag();
  }

  logout() {
    this.token.signOut();
    this.router.navigateByUrl(this.returnUrl);
  }
  getListTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }, error => {
        console.log(error);
      }
    );
  }
}
