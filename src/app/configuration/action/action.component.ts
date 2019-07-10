import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.less']
})
export class ActionComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  boxTitle:string;
  constructor() { }

  ngOnInit() {
  }
  showModal(type): void {
    if(type == '新增'){
      this.boxTitle = '新增行动方案';
    }else{
      this.boxTitle = '修改行动方案';
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
