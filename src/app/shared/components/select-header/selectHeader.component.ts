import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-select-header',
    template: '<div><input type="checkbox" [(ngModel)]="selected" (change)="onToggle()"></div>'
})

export class SelectHeaderComponent {
    private params: any;
    private selected: boolean;
    private toggleSelected: boolean;

    agInit(params): void {
        this.params = params;
        this.params.api.addEventListener('rowSelected', this.rowSelected.bind(this));
    }

    onToggle() {
        this.toggleSelected = true;
        if (this.selected) {
            this.params.api.selectAll();
        } else {
            this.params.api.deselectAll();
        }
    }

    rowSelected(event: any) {
        const selectedRecords = this.params.api.getSelectedRows();
        const totalRecordsCount = this.params.api.getDisplayedRowCount();
        if (totalRecordsCount !== selectedRecords.length) {
            this.selected = false;
        }
    }
}
