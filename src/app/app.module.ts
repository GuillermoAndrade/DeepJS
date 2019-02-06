import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TSModelPresenter} from '@api/core';


import { AppComponent } from './app.component';

// TODO : can't we link the interfaces there ? by putting the @Component in them ?
import { ModelContainerComponentImpl } from './demo/model/model-container.component';
import { TSModelComponentImpl } from './demo/model/ts-model/ts-model.component';
import { JSONModelComponentImpl } from './demo/model/json-model/json-model.component';
import { DemoComponentImpl } from './demo/demo.component';
import { TrainerService, TrainerServiceImpl } from './shared/services/trainer/trainer.service';
import {TestModelVisualizationComponent } from './demo/visualization/visualization-model/test-model-visualisation/test-model-visualisation.component'
import {EpochVisualizationComponent } from './demo/visualization/visualization-training/epoch-visualisation/epoch-visualisation.component';
import { InputContainerComponentImpl } from './demo/input/input-container.component';
import { ImageInputComponentImpl } from './demo/input/image-input/image-input.component';
import { JsonInputComponentImpl } from './demo/input/json-input/json-input.component';
import { VisualizationContainerComponentImpl } from './demo/visualization/visualization-container.component'

declare global {
  interface Window {
      fs: any;
      os: any;
    }
}

@NgModule({
  declarations: [
    ModelContainerComponentImpl,
    AppComponent,
    TSModelComponentImpl,
    JSONModelComponentImpl,
    DemoComponentImpl,
    TestModelVisualizationComponent,
    EpochVisualizationComponent,
    InputContainerComponentImpl,
    ImageInputComponentImpl,
    JsonInputComponentImpl,
    VisualizationContainerComponentImpl
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
