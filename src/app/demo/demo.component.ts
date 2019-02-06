import { ViewChild, Component, OnInit, ElementRef} from '@angular/core';
import { fromEvent } from 'rxjs';
import {DemoComponent, DemoPresenter} from '@api/core/demo';
import {ModelComponent, ModelPresenter} from '@api/core/model';
import {DemoPresenterImpl} from './demo.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import { InputData } from '@api/core/inputData';

/* Graphic Component for the demo
 * Encapsulates input, model and parameter importation
 * components as well as visualisations
 */
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponentImpl implements OnInit, DemoComponent {

  @ViewChild('input') inputData:InputData;

  // TODO : dynamically choose modelcomponent
  @ViewChild('model') model:ModelComponent;

  // DOM element triggering the training
  @ViewChild('trainButton') trainButton: ElementRef;

  // Presenter for this component
  private demo:DemoPresenter;

  // Inject the trainer service to give to the presenter
  constructor(private trainerService:TrainerServiceImpl){
    
  }

  ngOnInit() {
    // Presenter takes all child component's presenters as arguments as well as the trainer service
    this.demo = new DemoPresenterImpl(this.model.getPresenter(),fromEvent(this.trainButton.nativeElement, 'click'), this.trainerService, this.inputData);
  }

}
