import { Component } from '@angular/core';
import { IToolPanel } from 'ag-grid-community';

@Component({
    selector: 'app-tool-bar',
    template: `<div class="tool-bar-title" >Total records: {{totalRecordsCount}}</div>
    <div class="tool-bar-title">Selected records: {{selectedRecordsCount}}</div>
    <div class="tool-bar-title">
    <span>Selection Mode: </span>
    <button (click)="selectionModeToogle()">{{selectionModeText}}</button>
    </div>`
})
export class ToolBarComponent implements IToolPanel {
    private params: any;
    private totalRecordsCount: number;
    private selectedRecordsCount: number;
    private selectionMode: boolean;
    private selectionModeText: string;

    constructor() {
        this.getSelectionModeTitle();
    }

    refresh(): void {
        throw new Error('Method not implemented.');
    }

    agInit(params: any): void {
        this.params = params;
        this.params.api.addEventListener('modelUpdated', this.updateTotalRecordsCount.bind(this));
        this.params.api.addEventListener('selectionChanged', this.updateSelectedRecordsCount.bind(this));
    }

    updateTotalRecordsCount(): void {
        this.totalRecordsCount = this.params.api.getDisplayedRowCount();
    }

    updateSelectedRecordsCount(): void {
        this.selectedRecordsCount = this.params.api.getSelectedRows().length;
    }

    selectionModeToogle(): void {
        this.selectionMode = !this.selectionMode;
        this.getSelectionModeTitle();
        this.changeSelectorHeader(this.selectionMode);
    }

    getSelectionModeTitle(): void  {
        this.selectionModeText = this.selectionMode ? 'On' :  'Off';
    }

    changeSelectorHeader(show: boolean): void {
        this.params.api.columnController.columnApi.setColumnVisible('selector', show);
    }
}
