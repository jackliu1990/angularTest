import {Compiler, CompilerFactory, Component, enableProdMode, NgModule, NgModuleFactory} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Application} from './app/Application';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Application).then(a => {
  console.log(a);
})
  .catch(err => console.log(err));
/*const c = platformBrowserDynamic();
 const compilerFactory: CompilerFactory = c.injector.get(CompilerFactory);
 const compiler = compilerFactory.createCompiler();

 const module = NgModule({
 declarations: [
 AppComponent
 ],
 imports: [
 BrowserModule
 ],
 providers: [],
 entryComponents: [AppComponent],
 bootstrap: [AppComponent]
 })(class {});

 compiler.compileModuleAsync(module)
 .then((moduleFactory) => { c.bootstrapModule(moduleFactory.moduleType).then( d => {
 console.log(d);
 })
 .catch(err => console.log(err)); });*/

/*c.bootstrapModule(NgModule({
 declarations: [
 AppComponent
 ],
 imports: [
 BrowserModule
 ],
 providers: [],
 bootstrap: [AppComponent]
 })(class {})).then(a =>{
 console.log(a);
 }).catch(err => console.log(err));*/

