import {NgModule, getModuleFactory} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpService} from '../../cws/HttpService';
import {TestService} from '../../cws/TestService';
import {Container} from './Container';
import {MainComponent} from '../../app/MainComponent';
import {forEach} from '@angular/router/src/utils/collection';
import {CommonModule} from '@angular/common';

export class ModuleBase implements Container {
  private ngComponents = [];
  private imports = [];
  private providers = [];
  private compRoutes = [];
  private container = new Map();

  constructor() {
  }

  createService() {

  }

  createComponent() {
  }

  register(provideType, obj) {
    this.container.set(provideType, obj);
    let serviceProvider = {
      provide: provideType,
      useFactory: () => {
        return obj;
      },
      deps: []
    };
    this.providers.push(serviceProvider);
  }

  resolve(provideType) {
    return this.container.get(provideType);
  }

  createCompRoute() {

  }

  createModRoute(router) {

  }

  addComponent(component) {
    this.ngComponents.push(component);
  }

  addRoute(route) {
    this.compRoutes.push(route);
  }

  configureRoute(router, pathName, parentPath?) {
    this.imports.push(RouterModule.forChild(this.compRoutes));
    this.imports.push(CommonModule);
    let mod = NgModule({
      declarations: this.ngComponents,
      providers: this.providers,
      imports: this.imports
    })(class {
    });
    let routes: Routes = router.config;
    this.compRoutes.forEach(route => {
      routes.push(route);
    });
    if (!!parentPath) {
      routes.forEach(route => {
        if (route.path === parentPath) {
          if (route.children === undefined) {
            route.children = [];
          }
          route.children.push({
            path: pathName,
            loadChildren: () => {
              return mod;
            }
          });
        }
      });
    }
    else {
      routes.push({
        path: pathName,
        loadChildren: () => {
          return mod;
        }
      });
    }
  }

  configure() {
    this.createService();
    this.createComponent();
    this.createCompRoute();
  }
}
