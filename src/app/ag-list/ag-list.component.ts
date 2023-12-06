import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular'; // Angular Grid Logic

import { ServicefileService } from '../service/servicefile.service';
import { InputcheckboxComponent } from '../inputcheckbox/inputcheckbox.component';
import {
  ColDef, GridReadyEvent, IRowNode,
  IsRowSelectable, GridApi
} from 'ag-grid-community'; // Column Definitions Interface

import { Subscription, filter } from 'rxjs';
import { HeadercheckboxComponent } from '../headercheckbox/headercheckbox.component';
import { environment } from 'src/environments/environment';

interface IRow {
  thumnails: any;
  publishedAt: any;
  title: any;
  description: any;
  videoId: any;
}
@Component({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
  selector: 'app-ag-list',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
  <div class="head">
  <div><button (click)="hideContent()">Toggle Column Visibility</button></div>
  <div>Total Count In Grid:{{rowData.length}}</div>
  <div>Total Selected Count:{{checkedCount}}</div>
</div>

<div style="position:realtive"> 

<ag-grid-angular [defaultColDef]="defaultColDef" [rowData]="rowData"
    [columnDefs]="colDefs" class="ag-theme-quartz" style="height: 500px;" (gridReady)="onGridReady($event)"
    [frameworkComponents]="frameworkComponents" (cellContextMenu)="onCellContextMenu($event)"
    [gridOptions]="gridOptions">
  </ag-grid-angular>
  <div class="custom-c0ntext" *ngIf="showContextMenu==true" [style.left]="contextMenuLeft"
    [style.top]="contextMenuTop">
    <div>
      <div (click)="onEdit(NavigationValue)">Open In new tab</div>
    </div>
  </div>
</div>
`,
  styleUrls: ['./ag-list.component.css']
})
export class AgListComponent implements OnInit {
  gridColumnApi: any;
  gridOptions: any;
  checkboxValue: boolean = false;
  checkedBox: boolean = false;
  showContextMenu: boolean = false;
  subscription: any = Subscription;
  checkedCount: number = 1;
  contextMenuLeft = '0px';
  contextMenuTop = '0px';
  NavigationValue: any = '';
  constructor(private request: ServicefileService, private grid: GridApi) { }

  // Row Data: The data to be displayed.
  rowData: IRow[] = [];
  frameworkComponents: any;
  headerTemplate: String = '';
  rowTemplate: String = '';

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {

      headerName: 'isSelected',
      field: 'isSelected',
      hide: false,
      cellRenderer: InputcheckboxComponent,
      headerComponent: 'HeadercheckboxComponent',
      headerComponentParams: {

        //headerComponentFramework: HeadercheckboxComponent, // Use the custom header component
        // onHeaderCheckboxChange: this.onHeaderCheckboxChange.bind(this),
      },
    },
    {
      field: "thumnails", cellRenderer: (params: any) => {
        return `<img src=${params.value} style="max-width: 100%; max-height: 100%;">`
      }
    },
    { field: "publishedAt" },
    { field: "title" },
    { field: "description" }
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  // <div> 
  // <input type="checkbox" (click)="SelectAll($event)" name="selectAll" value="1" />
  // </div>
  onGridReady(params: GridReadyEvent) {

    this.request
      .getData('', 'GET')
      .subscribe((data: any) => {
        let newData = data.items;
        let dynamicdata: any = [];
        newData.forEach((element: any) => {
          dynamicdata.push({
            thumnails: element.snippet.thumbnails.default.url,
            publishedAt: element.snippet.publishedAt,
            title: element.snippet.title,
            description: element.snippet.description,
            videoId: element.id.videoId,
          })
        });
        this.rowData = dynamicdata
        this.gridColumnApi = params.api
      });
  }

  ngOnInit(): void {
    this.gridOptions = {
      suppressContextMenu:true
    };
    this.frameworkComponents = {
      checkboxRenderer: InputcheckboxComponent,
      appSelectAllHeader: HeadercheckboxComponent, 
    };
    this.subscription = this.request.checkboxValue$.subscribe((value: any) => {
      if (value.isChecked == true) {
        this.checkedCount = this.checkedCount + 1;
      } else {
        this.checkedCount = this.checkedCount - 1;
      }

    });
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
  contextMenuPosition = { left: '0px', top: '0px' };

  onCellContextMenu(event: any) {
    const columnName = event.column.getColDef().field;
    const rowIndex = event.rowIndex;
    const node = event.node;
    event.event.preventDefault();
    if (event.column.colId === 'title') {
      this.showContextMenu = true;
      this.contextMenuLeft = `${event.event.clientX}px`;
      this.contextMenuTop = `${event.event.clientY}px`;
      if (node) {
        const value = node.data[columnName];
        this.NavigationValue = value;
      }
    } else {
      this.showContextMenu = false;
    }
  }

  getFunonCheckboxClickedction(data: any): void {
   
  }
 

  onEdit(value: any) {
    this.rowData.filter((data: any) => {
      if (data.title == value) {
        window.open(`${environment.youtubeUrl}?y=${data.videoId}`, '_blank')
      }
    })
  }
  hideContent() {
    let getValue = this.gridColumnApi.getColumn("isSelected");
    let setValue;
    getValue.isVisible() == false ? setValue = true : setValue = false
    this.gridColumnApi.setColumnVisible('isSelected', setValue)
  }
  // SelectAll(event: any): void {
  //   const isChecked = event.target.value;
  //   event.target.checked==true ? ()=>{
  //     this.checkedCount=this.rowData.length,
  //     this.checkedBox=true
  //   }
  //   : ()=>{this.checkedCount=0,this.checkedBox=false}
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //   checkboxes.forEach((checkbox: HTMLInputElement)=> {
  //     checkbox.checked = this.allChecked;
  //   });
  //   this.request.setSelectall(this.checkedCount, event.target.checked);  // Emitting the checkbox value change
  // }
 
}
