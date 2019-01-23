import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TSModelPresenter} from '@api/core';


import { AppComponent } from './app.component';

import { TSModelComponentImpl } from './model/ts-model/ts-model.component';
import { TSModelPresenterImpl } from './model/ts-model/ts-model.presenter';
import { DemoComponentImpl } from './demo/demo.component';
import { TrainerService, TrainerServiceImpl } from './trainer.service';
import {TestModelVisualisationComponent } from './test-model-visualisation/test-model-visualisation.component'
import {EpochVisualisationComponent } from './epoch-visualisation/epoch-visualisation.component'

declare global {
  interface Window {
      fs: any;
      os: any;
    }
}

@NgModule({
  declarations: [
    AppComponent,
    TSModelComponentImpl,
    DemoComponentImpl,
    TestModelVisualisationComponent,
    EpochVisualisationComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TrainerServiceImpl],
  //  providers: [ {provide:[ModelTrainer], useClass:[ModelTrainerImpl]} ],
  bootstrap: [AppComponent]
})
export class AppModule { }