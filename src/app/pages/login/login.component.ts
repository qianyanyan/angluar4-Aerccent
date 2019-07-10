import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LocalStorage } from '../../core/common/local.storage';
import { DataService } from "../../DataService";
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  listOfOption = [];
  listOfTagOptions = [];
  langs = [];
  lang:string;
  msg:string;

  constructor(
    private fb: FormBuilder,
    private translate:TranslateService,
    private router: Router,
    private loginService: LoginService,
    private store:LocalStorage,
    private dataService:DataService
    ) {
      
  }

  ngOnInit(): void {
    this.langs = [{
      label:'简体中文',
      value:'zh',
      id:'2'
    },{
      label:'English',
      value:'en',
      id:'1'
    }]
     
 
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      lang:[]
    });
    this.lang = this.translate.getBrowserLang();
    this.getLangId();
  }

  //切换语言
  changeLang() {
    
  //   this.translate.use(this.lang);
  //  this.getLangId();
  }
  getLangId() {
      this.langs.forEach(val=>{
          if(val.value==this.lang) {
            this.store.set('lang', val.id);
          }
      })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
       
    }
    //this.router.navigateByUrl('fun-select');
    if (this.validateForm.status=="VALID"){
      this.loginService.getLogin(this.validateForm.value.userName,this.validateForm.value.password).then((result: any) => {
        if(result.code==1) {
          this.router.navigateByUrl('fun-select');
          this.store.set("userInfo",result);
          this.store.set("token", result.token);
          this.store.set("pathUrl", "首页");
          this.store.set("DeatilUrl", "");
          this.dataService.changeUserInfo(result);
          var storage=window.localStorage;
              storage.setItem('username',result.user.account_name);
          console.log(result.user.account_name);

        } else {
            this.translate.get("MSG."+result.msg) .subscribe(res => {
            this.msg = res;
          });
        }
      })
    }
   
  }
 
}
