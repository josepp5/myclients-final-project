import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormComponent } from "../commons/form/form.component";
import { ListComponent } from "../commons/list/list.component";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent, FormComponent, ListComponent]
})
export class Tab2Page {

  constructor() {}

}
