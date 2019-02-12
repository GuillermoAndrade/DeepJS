import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';
import { ModelFitConfig } from '@tensorflow/tfjs';

export class ModifParamModelPresenterImpl implements api.ModifParamModelPresenter{


    private modelDef: string;

    //TODO CHANGER DE VERSION DE TENSORFLOW ET MODIFIER MODELFITCONFIG EN MODELFITARGS

    constructor() {
      this.modelDef="{\"batchSize\":250 , \"epochs\":4000 , \"verbose\":null , " + 
      "\"callbacks\":null, \"validationSplit\":null, \"validationData\":null, \"shuffle\":null , \"classWeight\":null, " + 
      "\"sampleWeight\":null , \"initialEpoch\":null, \"stepsPerEpoch\":null , \"validationSteps\":null, \"yieldEvery\":null }";
     
    }

    getModelDef():string{
      return this.modelDef;
    }

    // Return the ModelFitConfig 
    getModelFitConfig():ModelFitConfig{
      var json = JSON.parse(this.modelDef);
      return json;
    }

    // Set the ModelFitConfig with the parameters in the text box
    setModelDef(str : string) {
      this.modelDef = str;
    }

    getParams():string[]{
      return this.buttons;
    }

}
