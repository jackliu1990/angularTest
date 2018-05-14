import {RouteBase} from './RouteBase';
import {Route, Routes} from '@angular/router';

export class SimpleRoute implements RouteBase {
    private routes: Routes = [];

    constructor() {}

    addRoute(route) {
        this.routes.push(route);
    }

    size(){
        return this.routes.length;
    }

    getRoutes(){
        return this.routes;
    }

    forChild() {
    }

    forRoot() {
    }
}
