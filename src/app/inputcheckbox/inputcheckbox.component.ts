import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ServicefileService } from '../service/servicefile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkbox-renderer',
  template: `<input type="checkbox" [value]="params.rowIndex" [checked]="params.value"  name="singleSelect" (change)="onCheckboxClicked($event)">`,
  styleUrls: ['./inputcheckbox.component.css']
})
export class InputcheckboxComponent implements ICellRendererAngularComp {
  subscription: any = Subscription;
  selectAll : boolean =false;
  constructor(private request :ServicefileService){
    this.subscription = this.request.selectBox$.subscribe((data: any) => {
      if (data.isChecked == true) {
        this.selectAll=true;
        
      } else {
        this.selectAll=false;
      }

    });
  }
  params: any;
  @Output() valueChanged = new EventEmitter<boolean>();
  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onCheckboxClicked(event: any): void {
    const isChecked = event.target.value;
    this.params.setValue(isChecked);
    this.request.setCheckboxValue(isChecked, event.target.checked); 
  }
}