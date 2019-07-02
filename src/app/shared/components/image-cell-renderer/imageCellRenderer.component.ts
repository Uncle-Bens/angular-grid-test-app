import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-image-cell',
    template: '<img class="image-cell" src={{params.value}} />'
})
export class ImageCellRendererComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }
}
