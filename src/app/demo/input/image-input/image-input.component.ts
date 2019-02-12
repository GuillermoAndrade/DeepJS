import { Component, OnInit } from '@angular/core';
import {ImageInputComponent, ImageInputPresenter} from '@api/core/demo/input/image-input';
import { InputPresenter } from '@api/core';
import { Zip } from '@ionic-native/zip/ngx';
import { ImageInputPresenterImpl } from './image-input.presenter';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponentImpl implements OnInit, ImageInputComponent{

  private str:string;
  private presenter:ImageInputPresenter;

  constructor(private zip: Zip) { 
    this.presenter = new ImageInputPresenterImpl(zip);
  }

  ngOnInit() {
  }

  getPresenter():InputPresenter {
    return this.presenter;
  }
}
