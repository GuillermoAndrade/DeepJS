import { ImageInputPresenter, InputData } from '@api/core';
import * as tf from '@tensorflow/tfjs';
import { NgModule } from '@angular/core';
import { Zip } from '@ionic-native/zip/ngx';
import { createInput } from '@angular/compiler/src/core';

export class ImageInputPresenterImpl implements ImageInputPresenter {

    private pathZip:string;

    constructor(private zip: Zip) {

    }

    setPathZip(pathZip:string) {
        this.pathZip = pathZip;
    }

    private createInputData(path: string): boolean {
        console.log("Unzip ...");
        this.zip.unzip(path, '/home/user', 
        (progress) => console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
            .then((result) => {
                if (result === 0) console.log('SUCCESS');
                if (result === -1) console.log('FAILED');
            });
        return true;
    }

    getInputData(): InputData {
        this.createInputData(this.pathZip);
        return null;
    }
}
