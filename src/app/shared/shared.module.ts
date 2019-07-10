import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { NgxEchartsModule } from 'ngx-echarts';

export function createTranslateHttpLoader(http:HttpClient){
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }


@NgModule({
    imports: [ 
      CommonModule, 
      TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateHttpLoader),
            deps: [HttpClient]
        }
      }),
      NgbModule.forRoot(),
      NgxEchartsModule
    ],
    exports: [ 
      CommonModule, 
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      TranslateModule,
      HttpClientModule,
      NgZorroAntdModule,
      NgbModule,
      HttpModule,
      NgxEchartsModule
    ],
    declarations:[
      
    ],
    entryComponents:[
      
    ],
    providers:[
      HttpModule
    ]
  })
  export class SharedModule { }