import * as tf from '@tensorflow/tfjs';
import {InputData} from '@api/core';
export interface InputPresenter{
  getInputData():InputData;
  getDataset():string;
}
