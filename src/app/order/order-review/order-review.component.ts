import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AllOrderService } from '../allOrder.service';
@Component({
  selector: "order-review",
  templateUrl: "./order-review.component.html",
  styleUrls: ["./order-review.component.less"],
  providers: [AllOrderService]
})

export class OrderReviewComponent implements OnInit, OnDestroy {
  @Input() search: any;
  dataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  constructor(
    private allOrderService: AllOrderService,
  ) {
  }


  ngOnInit(): void { 
  }
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;

    this.allOrderService.selectOrderList(this.search, this.pageIndex, this.pageSize).then(result => {
      if (result.code == 200) {
        if (result.data && result.data.list) {
          this.dataSet = result.data.list;
          this.total = result.data.total;
        } else {
          this.dataSet = [];
          this.total = 0;
        }
    
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }
  clearData() { 
    this.pageIndex = 1;
    this.dataSet = [];
    this.total =  0;
  }
  ngOnDestroy(): void { }
}
