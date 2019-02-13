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

  getDataset():string{
    return this.inputPresenter.getDataset()
  }

  exportJson(){
    var fileSaver = require('file-saver');
    //var data = JSON.stringify(this.getDataset());
    var blob = new Blob([this.getDataset()], {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(blob, "export.json");
  }
}
