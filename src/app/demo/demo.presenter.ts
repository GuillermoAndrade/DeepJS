import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import * as tf from '@tensorflow/tfjs';

import * as api from '@api/core';
import {TSModelPresenterImpl} from '../model/ts-model/ts-model.presenter';
import {TrainerServiceImpl} from '../trainer.service';
import {TrainingImpl} from '../training';

/* Presenter for the DemoComponent
 * performs the logic for it
 */
export class DemoPresenterImpl implements OnInit, api.DemoPresenter {

  private modelPresenter:api.ModelPresenter;
  private trainings$:Observable<api.Training>;

  constructor( modelPresenter:api.ModelPresenter, trainButton$:Observable<any>, trainerService:TrainerServiceImpl) {
    this.modelPresenter = modelPresenter;
    
    // Construct the Observable on Trainings from the button events
    this.trainings$ = trainButton$.pipe(map((event) => 
        return new TrainingImpl(
        {x: tf.tensor([[0,0], [0,1]]), y: tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]) },
        { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true },
        modelPresenter.import()
      );}
    ));

    // give it to trainer service
    trainerService.setTrainings$(this.trainings$);
    
  }

  ngOnInit() {
  }

}

