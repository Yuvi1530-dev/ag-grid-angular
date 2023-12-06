import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-headercheckbox',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="header-select-all">
    <input
      type="checkbox"
      (change)="onSelectAllChange($event)"
      [checked]="selectAllChecked"
    />
    <label>Select All</label>
  </div>
`,
  styleUrls: ['./headercheckbox.component.css']
})
export class HeadercheckboxComponent implements IHeaderAngularComp {
  private params: any;
  selectAllChecked: boolean = false;

  agInit(params: any): void {
    this.params = params;
  }
  refresh(params: any): boolean {
    return false;
  }
  onSelectAllChange(event: any): void {
    const isChecked = event.target.checked;
    this.selectAllChecked = isChecked;
    this.params.api.forEachNode((node:any) => {
      node.setSelected(isChecked);
    });
  }
}