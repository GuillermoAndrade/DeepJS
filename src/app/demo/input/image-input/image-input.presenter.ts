import {ImageInputPresenter,InputData} from '@api/core';
import { combineLatest, Observable, from, Subject, BehaviorSubject} from 'rxjs';
import { tap, take,  map } from 'rxjs/operators';
import * as tf from '@tensorflow/tfjs';
import { InputDataImpl } from '../../../shared/models/inputData';
import readImageData from 'read-image-data';

export class ImageInputPresenterImpl implements ImageInputPresenter{
  private imageFiles: FileList;
  private imageFiles$: Subject<FileList>;
  private model:tf.Model;
  private status$: Subject<string>;
  private nbImported:number;


  constructor() {

    // Make a Subject (kind of Observable) on the file name
    this.imageFiles$ = new BehaviorSubject<FileList>(this.imageFiles);

    this.status$ = new BehaviorSubject<string>("");

    // Subscribe to it so we get updates from the Component
    this.imageFiles$.subscribe(s => this.imageFiles=s);
    this.nbImported = 0
  }

  // Imports tf.Model object from files


  // Provide an Observable on the file name
  getImageFiles$():Subject<FileList> { return this.imageFiles$; }

  getStatus$():Subject<string> { return this.status$; }

  getTensors(file:File):Observable<tf.Tensor> {
    return from(readImageData(file)).pipe(
      map( (imageData) => tf.fromPixels(imageData as ImageData)),
      map( (t) => tf.tidy(() => { 
        const a = tf.split(t,3,2)[0];
        tf.dispose(t);
        return a;
      })),  // function inputed by user
      tap( (tensor) => this.updateStatus(file.webkitRelativePath)),
      take(1)
    );

  }

  private updateStatus(filePath:string){
    this.status$.next(++this.nbImported+"/"+this.imageFiles.length+" "+filePath);
  }

  private resetStatus(){
    this.status$.next("");
    this.nbImported = 0;
    console.log(tf.memory());
  }


            /*const url = URL.createObjectURL(file);           // create an Object URL
    const img = new Image();                         // create a temp. image object

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;  

    URL.revokeObjectURL(this.src);             // free memory held by Object URL
    c.getContext("2d").drawImage(this, 0, 0);  // draw image onto canvas (lazy method™)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, w,h);
    const data = context.getImageData(0, 0, w, h)
    return data;*/



  getInputData(): Observable<InputData> {
    console.log(this.imageFiles);
    const files = Array.from(this.imageFiles);
    console.log(tf.memory());
    const tensors$ = files.map( (file) => this.getTensors(file));
    
    return combineLatest(tensors$).pipe(
      tap( (tensors) => console.log(tf.memory())) 
      map( (tensors) => tf.tidy(() => {
        const a = tf.stack(tensors);
        tf.dispose(tensors);
        return a;
      })),
      //map( (t) => tf.split(t,3,3)[0]),  // function inputed by user
      map( (tensors) => (new InputDataImpl(tensors, tf.zeros([tensors.shape[0],10])))),
      tap( (inputdata) => this.resetStatus()) )
    );
  }
}
