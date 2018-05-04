import {Compiler, CompilerFactory, Component, enableProdMode, NgModule, NgModuleFactory} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import {AppComponent} from './app/app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppModule} from './app/app.module';
import {a} from './app/testmodule';
import {Router} from '@angular/router';

if (environment.production) {
  enableProdMode();
}

/*platformBrowserDynamic().bootstrapModule(AppModule).then(a =>{
  console.log(a);
})
  .catch(err => console.log(err));*/
const c = platformBrowserDynamic();
const compilerFactory: CompilerFactory = c.injector.get(CompilerFactory);
const compiler = compilerFactory.createCompiler();
/*const compiler = compilerFactory.createCompiler(
  Array.isArray(compilerOptions) ? compilerOptions : [compilerOptions]);*/


const module = NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})(class {});


compiler.compileModuleAsync(module)
  .then((moduleFactory) => { c.bootstrapModuleFactory(moduleFactory); });


/*c.bootstrapModule().then(a =>{
  console.log(a);
})*/

