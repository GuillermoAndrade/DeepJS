import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/* Presenter for ModelComponent
 * Performs the actual import from Typescript code to Object tf.Model
 */
export class ModelPresenterImpl implements api.ModelPresenter{

  private model:tf.Model;


  constructor() {

    // Default value for the model definition


    // Make a Subject (kind of Observable) on the TypeScript string
    this.modelFile$ = new BehaviorSubject<FileList>(this.modelFile);

    // Subscribe to it so we get updates from the Component
    // (the Component does a next on it at each key press)
    // Skip ourself sending the first string
    this.modelFile$.pipe( skip(1) ).subscribe(s => this.modelFile=s)
  }

  // Imporjson tf.Model object from TypeScript string
  import():Observable<tf.Model>{
    return   }

  // puts json first
  sortTypes(l:FileList):File[]{
    const a:File[] = [ l[0], l[1] ];
    return a.sort((a,b) => (a.name.endsWith("bin") ? 1 : -1));
  }

  // Provide the Observable on the Typescript string
  getModelFile$():Subject<FileList> { return this.modelFile$; }

  // TODO : obsolete ?

}
