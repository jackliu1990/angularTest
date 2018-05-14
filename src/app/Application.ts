import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CompositeModule} from '../caf/module/CompositeModule';
import {MainComponent} from './MainComponent';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {TileModule} from './tile/TileModule';
import {TestModule} from './test/TestModule';
import {WorkspaceModule} from './workspace/WorkSpaceModule';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([],
        {
            useHash:true
        }),
    ],
    exports: [
      RouterModule
    ],
    providers: [],
    bootstrap: [MainComponent]
})

export class Application extends CompositeModule{

    constructor(private router: Router,
                private route: ActivatedRoute){
      super();
      this.startUp();
    }

    startUp() {
        this.createModule();
        this.configure();
        this.createModRoute(this.router);
        this.startUrl();
    }

    createModule(){
      let tileModule = new TileModule();
      let workspaceModule = new WorkspaceModule();
      let testModule = new TestModule();
      this.add(tileModule);
      this.add(testModule);
      this.add(workspaceModule);
    }

    startUrl() {
      this.router.navigate(['/web/main/workspace']);
    }

}
