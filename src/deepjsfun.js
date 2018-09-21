/* TODO:
 * - make it faster
 * - more accurate 
 * - consistent start (avoid starting at loss = 0.8 and a color missing etc.)
 * - clean the code
 * - asynchronous updates (if even possible)
 * - display loss chart, value
 * - interactivity
 */
const updating = '<strong id="updating">updating</strong>';
const canvas = document.getElementById("orig");
const ctx = canvas.getContext("2d");
const w= 200;
const h= 200;

img = new Image;
img.src = "img/lena.jpg";
//img.src = "img/kitty.jpg";
//var ys = [];
img.onload = () => {
  ctx.drawImage(img, 0, 0);
  imageData = ctx.getImageData(0, 0, w,h);
  console.log(imageData);
  train(imageData);
  //while(imageData.data.length) ys.push(imageData.data.prototype.splice(0,3)); 
}
//tys;
function train(imageData) {
  console.log(w);
  var xs = [];
  for(i=0;i<w;i++){
    for(j=0;j<h;j++){
      xs.push([i,j]);
    }
  }
  //  shuffle(xs);

  console.log(img);
  // Define a model for linear regression.
  const model = tf.sequential();
  //model.add(tf.input({shape: [2]}));
  model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: 'varianceScaling'}));
  model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: 'varianceScaling'}));

  const LEARNING_RATE = 0.1;
  const MOMENTUM = 0.9;
  //const optimizer = tf.train.sgd(LEARNING_RATE);
  const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);

  // Prepare the model for training: Specify the loss and the optimizer.
  model.compile({loss: 'meanSquaredError', optimizer: optimizer});

  var txs = tf.tensor(xs);
  txs = txs.sub(tf.scalar(w/2));
  txs = tf.cast(txs,'float32');
  txs = txs.div(tf.scalar(w));
  var tys = tf.fromPixels(imageData, 3).reshape([w*h,3]);
  tys = tf.cast(tys,'float32');
  tys = tys.div(tf.scalar(255));
  // const tys = tf.tensor(ys);
  console.log("lalal");
  tys.print();
  // Train the model using the data.
  //txs = tf.tensor2d([0,0,0,1,1,0,1,1],[4,2]);
  //tys = tf.tensor2d([0,0,0,1,1,1,2,2,2,3,3,3],[4,3]);
  model.fit(txs, tys, { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true,callbacks: {
    onTrainBegin: async () => {
      console.log("onTrainBegin")
    },
    onTrainEnd: async (epoch, logs) => {
      console.log("onTrainEnd" + epoch + JSON.stringify(logs))
    },
    onEpochBegin: async (epoch, logs) => {
      console.log("onEpochBegin" + epoch + JSON.stringify(logs))
    },
    onEpochEnd: (epoch, logs) => {
      console.log("onEpochEnd" + epoch + JSON.stringify(logs))
      $('#epoch')[0].innerHTML=epoch;
      //$('head')[0].after(updating);
      console.log(txs);
      if(epoch%3 != 0 && epoch > 0)
        return;
      txs.print();
      img_out = model.predict(txs, {batchSize: 1000, verbose: true});//);
      img_out.print();
      img_out = img_out.mul(tf.scalar(255));
      img_out.print();
      img_out = tf.cast(img_out,'int32');
      img_out.print();
      img_out_data = Array.from(img_out.dataSync());

      console.log(img_out_data);
      for(i=3;i<img_out_data.length+1;i+=4){
        img_out_data.splice(i,0,255);
      }
      console.log(img_out_data);

      img_out_data = Uint8ClampedArray.from(img_out_data);

      console.log(img_out_data);

      imagedata = new ImageData(img_out_data,w,h);

      const canvas = document.getElementById("result");
      const ctx = canvas.getContext("2d");

      var tmpcanvas = document.createElement('canvas');
      var tmpctx = tmpcanvas.getContext('2d');
      tmpcanvas.width = canvas.width;
      tmpcanvas.height = canvas.height;
      tmpctx.putImageData(imagedata, 0, 0);

      var image = new Image();
      image.onload=function(){
        // drawImage the img on the canvas
        ctx.drawImage(image,0,0);
      }
      image.src = tmpcanvas.toDataURL();
    },
    onBatchBegin: async (epoch, logs) => {
      //    console.log("onBatchBegin" + epoch + JSON.stringify(logs))
    },
    onBatchEnd: async (epoch, logs) => {
      //   console.log("onBatchEnd" + epoch + JSON.stringify(logs))
      $('#loss')[0].innerHTML=JSON.stringify(logs);
    }
  }
  }).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    // Open the browser devtools to see the output
    console.log("done")
  });
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
