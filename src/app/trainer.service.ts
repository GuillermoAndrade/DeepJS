import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {ConnectableObservable, Observable, Observer} from 'rxjs'
import {publish, publishReplay, shareReplay, map, share, switchMap} from 'rxjs/operators'
import { Training } from '@api/core/training';



export enum TrainEvent {
  TrainBegin,
  TrainEnd,
  EpochBegin,
  EpochEnd,
  BatchBegin,
  BatchEnd
}

export interface TrainData{

  getEpoch():number;
  getBatch():number;
  getEvent():TrainEvent;
  getLoss():number;
  
}

class TrainData0 {
  private epoch:number;
  private batch:number;
  private event:TrainEvent;
  private loss:number;

  constructor(ev:TrainEvent, ep:number, b:number, l:number){
    this.event = ev;
    this.epoch = ep;
    this.batch = b;
    this.loss = l;
  }

  getEpoch():number{ return this.epoch};
  getBatch():number{ return this.batch };
  getEvent():TrainEvent{ return this.event };
  getLoss():number{ return this.loss };

}


@Injectable({
  providedIn: 'root'
})
export abstract class TrainerService {
  abstract setTrainings$(t:Observable<Training>);
  abstract train(t:Training, observer:Observer<TrainData>);
  abstract getTrainer$():Observable<TrainData>;
  abstract getCurrentTrainings$():Observable<Training>;
}

@Injectable({
  providedIn: 'root'
})
export class TrainerServiceImpl implements TrainerService {

  private currentTrainings$: Observable<Training>;
  private currentTraining: Training;
  private trainer$: Observable<TrainData>;
  private callbacks: tf.CustomCallbackConfig;

  constructor() {
  }

  private setTraining(training:Training){ this.currentTraining = training};
  
  public getTrainer$():Observable<TrainData> { return this.trainer$; }
  public getCurrentTrainings$():Observable<Training> { return this.currentTrainings$; }


  public setTrainings$( trainings$:Observable<Training>){
    console.log("modeltrainerservice setevent")
    this.currentTrainings$ = trainings$;
    this.trainer$ = trainings$.pipe( switchMap((training) =>
      Observable.create(observer => {
        console.log("ok1");
        this.setTraining(training);
        this.train(training, observer);
      }).pipe(share())
    ));
  }


  train(training:Training, observer:Observer<TrainData>){
    let x = training.getInputs().x;
    let y = training.getInputs().y;
    let m = training.getModel() as tf.Sequential;
    let c = training.getConfig() as tf.ModelFitConfig;
    console.log("ok2");
    c.callbacks = {
      onTrainBegin: () => {
        // TODO
        // factory for making TrainData
        console.log("ok4");
        observer.next(new TrainData0(TrainEvent.TrainBegin, 0, 0, 0));
      },
      onTrainEnd: (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.TrainEnd, epoch, 0, 0));
      },
      onEpochBegin: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.EpochBegin, epoch, logs.batch, logs.loss));
      },
      onEpochEnd: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.EpochEnd, epoch, logs.batch, logs.loss));
      },
      onBatchBegin: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.BatchBegin, epoch, logs.batch, logs.loss));
      },
      onBatchEnd: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.BatchEnd, epoch, logs.batch, logs.loss));
      }

    } as tf.CustomCallbackConfig;
    console.log(m);
    m.fit(x, y, c);

  }

}
