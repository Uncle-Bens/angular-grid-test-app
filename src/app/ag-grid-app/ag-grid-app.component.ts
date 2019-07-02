import { Component, OnInit } from '@angular/core';
import { Item } from '../models/items.model';
import { ImageCellRendererComponent } from '../shared/components/image-cell-renderer/imageCellRenderer.component';
import { ToolBarComponent } from '../shared/components/toolbar/toolbar.component';
import { SelectHeaderComponent } from '../shared/components/select-header/selectHeader.component';
import { DataService } from '../shared/services/data-service/data.service';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-app',
  templateUrl: './ag-grid-app.component.html',
  styleUrls: ['./ag-grid-app.component.less'],
})
export class AgGridAppComponent implements OnInit {
  gridOptions: GridOptions;
  rowSelection;
  columnDefs;
  sideBar;
  rowData: Item[];
  showGrid: boolean;

  constructor(private dataService: DataService) {
    this.gridOptions = {
      rowHeight : 90,
      getContextMenuItems,
      frameworkComponents : { toolBarComponent: ToolBarComponent, selectorColumnHeader : SelectHeaderComponent  }
    };

    this.rowSelection = 'multiple';

    this.columnDefs = [
      {
        headerName: '',
        field: 'selector',
        checkboxSelection: true,
        hide: true,
        headerComponent: 'selectorColumnHeader'
      },
      {
        headerName: '',
        field: 'imageUrl',
        cellRendererFramework: ImageCellRendererComponent
      },
      {
        headerName: 'Publish Date',
        field: 'publishDate',
        cellRenderer: (param) => {
          return param.value ? (new Date(param.value)).toLocaleDateString() : '';
        },
        sortable: true,
        filter: true
      },
      {
        headerName: 'Video Title',
        field: 'title',
        cellRenderer: (param) => {
          return `<a href="${param.data.title.url}" target="_blank">${param.data.title.text}</a>`;
        },
        sortable: true,
        filter: true,
        width: 300
      },
      {
        headerName: 'Description',
        field: 'description',
        sortable: true,
        filter: true,
        width: 800
      }
    ];

    this.sideBar = {
      toolPanels: [
        {
          id: 'toolBar',
          labelDefault: 'Tool bar',
          labelKey: 'toolBar',
          iconKey: 'tool-bar',
          toolPanel: 'toolBarComponent',
        }
      ],
      defaultToolPanel: 'toolBar'
    };
  }

  ngOnInit() {
    this.dataService.getRowData().subscribe((data) => {
      this.rowData = data;
      this.showGrid = true;
    });
  }
}

function getContextMenuItems(params) {
  return [{
      name: 'Open in new tab',
      disabled: !params.value || !params.value.url ,
      action: () => {
        window.open(params.value.url, '_blank');
      },
  }];
}
