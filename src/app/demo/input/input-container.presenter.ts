import{InputPresenter, InputContainerPresenter} from '@api/core/demo/input';
import{InputData} from '@api/core';
import * as tf from '@tensorflow/tfjs';
export class InputContainerPresenterImpl implements InputContainerPresenter{

  inputPresenter:InputPresenter;

  constructor(){
  }

  setInputPresenter(inputPresenter:InputPresenter){
    this.inputPresenter = inputPresenter;
  }

  getInputData():InputData {
    return this.inputPresenter.getInputData();
  }

  exportJson(){
    var fileSaver = require('file-saver');
    var data = JSON.stringify(this.getInputData());
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(blob, "export.json");
  }
}
