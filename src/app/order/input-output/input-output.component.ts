import { Component, OnInit, OnDestroy ,Input, ViewChild} from "@angular/core";
import { LocalStorage } from "../../core/common/local.storage";
import { OutputDetailComponent } from '../output-detail/output-detail.component';
import { InputDetailComponent } from '../input-detail/input-detail.component';
import { AllOrderService } from '../allOrder.service';
@Component({
  selector: "input-output",
  templateUrl: "./input-output.component.html",
  styleUrls: ["./input-output.component.less"],
  providers: []
})
export class InputOutputComponent implements OnInit, OnDestroy {
    @Input() search: any;
    trendSize:string;
    height:string;
    optionNum = 1;
    isQuantity = true;
    isGowhere = false;
    loading = false;
    giList = [];
    grList = [];
    activeGi = false;
    activeGr = false;
    pages = 1;
    @ViewChild(OutputDetailComponent)
    private outputDetail: OutputDetailComponent;
    @ViewChild(InputDetailComponent)
    private inputDetail: InputDetailComponent;
    constructor(   private store:LocalStorage,
        private allOrderService: AllOrderService ){
       
    }

    ngOnDestroy(): void {
        
    }

    ngOnInit(): void {
        
    }

    
    pagePrevious() {
        this.optionNum --;
        this.searchData(true);
    }
    pageNext() {
        this.optionNum ++;
        this.searchData(true);
    }

    onCheckedChange(isChecked: boolean) {
        this.isGowhere = isChecked;
    }
 

    searchData(reset: boolean = false): void {
        if(!reset) {
            this.optionNum  = 1;
            this.pages = 1;
        }
        
        this.loading = true;
        this.giList =[];
        this.grList = [];
        this.search.isGowhere = this.isGowhere;
        this.search.isQuantity = this.isQuantity;
        this.allOrderService.selectGiGrList(this.search, this.optionNum).then(result => {
            if (result.code == 200 && result.data) {
                if (result.data.gi) {
                    
                    if (result.data.gi.gigrList instanceof Array) {
                        this.giList = result.data.gi.gigrList;
                    }
                    this.activeGi = result.data.gi.active;
                }
                
                if (result.data.gr) {
                    if (result.data.gr.gigrList instanceof Array) {
                        this.grList = result.data.gr.gigrList;
                    } 
                    this.activeGr = result.data.gr.active;
                }
                if(result.data.pages) {
                    this.pages = result.data.pages; 
                } else {
                    this.pages = 1;
                }
                
            }
            this.loading = false;
        }, err => {
            this.loading = false;
        })
    }

    clearData() {
        this.optionNum = 1;
        this.giList = [];
        this.grList = [];
    }
}
