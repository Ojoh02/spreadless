const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const Datastore = require('nedb');
const tf = require('@tensorflow/tfjs-node');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening...'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));
console.log(process.env);

const database = new Datastore('database.db');
database.loadDatabase();

const db = new Datastore('db.db');
db.loadDatabase();

app.post('/collect', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  db.insert(data);
  response.json(data);
});


const IMAGE_SIZE = 1024; //width * height of image
const NUM_CLASSES = 10;
let databaseSize;
let databaseSizeTest;
let batchImagesArray;
let batchImagesArrayTest;
let batchLabelsArray;
let batchLabelsArrayTest;
let ys, ysTest;
let pixelArray = [];

let batchDataArray = [];
let batchDataArrayTest = [];
let DATA_POINTS; //speed, wind speed, wind angle, temperature, humidity

let PIXEL_TOTAL = 10800;
let xs2;

let importantData;
//large array tests
let largeArray = [];
let largeTensorArray = [];
let largeModelArray = [];
let largeDataArray = [];

let perc2, perc3, perc4, perc5, perc6;

let predictedValue;
let correctOne;
for (let i = 0; i < PIXEL_TOTAL; i++) {
  largeArray[i] = [];
}

function getData(data) {
  let count = 0;
  let count2 = 0;
  let count3 = 0;
  for (item of data) {
    for (let i = 0; i < IMAGE_SIZE; i++) {
      batchImagesArray[count] = item.f32array[i];
      count++;
    }
    for (let i = 0; i < NUM_CLASSES; i++) {
      batchLabelsArray[count2] = item.labelBytesView[i];
      count2++;
    }
    let tempArray = [];
      //normalize into range of 0-1, values are based on slider max values

      //got rid of for loop
    tempArray.push(item.speed/200);
    tempArray.push(item.windSpeed/30);
    batchDataArray.push(tempArray);
    for (let i = 0; i < PIXEL_TOTAL; i++) {
      largeArray[i].push(item.f32array_2[i]);
    }
  }

}

function getDataTest(data) {
  let count = 0;
  let count2 = 0;
  for (item of data) {
    for (let i = 0; i < IMAGE_SIZE; i++) {
      batchImagesArrayTest[count] = item.f32array[i];
      count++;
    }
    for (let i = 0; i < NUM_CLASSES; i++) {
      batchLabelsArrayTest[count2] = item.labelBytesView[i];
      count2++;
    }
    let tempArray = [];
      //normalize into range of 0-1, values are based on slider max values
    // console.log(item.speed);
    tempArray.push(item.speed/10); //changed
    tempArray.push(item.windSpeed/30);
    batchDataArrayTest.push(tempArray);
  }
}

function getPictures(predictions, dataReceive4) {
  pixelArray = [];
  for (item of dataReceive4) {
    if (predictions == item.corrects[0]) {
      for (let i = 0; i < PIXEL_TOTAL; i++) {
        pixelArray[i] = item.newArray[i];
      }
    }
  }
}

app.post('/api', (request, response) => {
    const data = request.body;
    importantData = data.f32array;
    perc2 = data.percent2;
    perc3 = data.percent3;
    perc4 = data.percent4;
    perc5 = data.percent5;
    perc6 = data.p6;
    response.json(data);
    let y = new Promise((resolve, reject) => {
      db.count({}, function(err, count) {
        if (err) throw err;
        resolve(count);
      });
    }).then((dataReceive) => {
      databaseSize = dataReceive;
      batchImagesArray = new Float32Array(databaseSize * IMAGE_SIZE);
      batchLabelsArray = new Uint8Array(databaseSize * NUM_CLASSES);
    }).then(() => {
      let x = new Promise((resolve, reject) => {
        db.find({}, function (err, data) {
          if (err) throw err;
          resolve(data);
        });
      }).then((dataReceive) => {
        getData(dataReceive);
        console.log(1);
        const xs = tf.tensor2d(batchImagesArray, [databaseSize, IMAGE_SIZE]);
        //console.log(xs);
        //console.log(batchImagesArray);
        //console.log(labelsArray);
        const labels = tf.tensor2d(batchLabelsArray, [databaseSize, NUM_CLASSES]);
        //console.log(labels);
        //console.log(ys);
        //tensor info goes in here
        // console.log(batchDataArray);
        //console.log(batchDataArray.length);
        xs2 = tf.tensor2d(batchDataArray, [batchDataArray.length, 2]);
        // let aryTry = [];
        // for (let i = 0; i < ary0.length; i++) {
        //   aryTry.push(ary0[i]);
        // }
        // let aryTry1 = [];
        // for (let i = 0; i < ary1.length; i++) {
        //   aryTry1.push(ary1[i]);
        // }
        // console.log(aryTry);
        // console.log(aryTry1);
        for (let i = 0; i < PIXEL_TOTAL; i++) {
          largeTensorArray[i] = tf.tensor2d(largeArray[i], [largeArray[i].length, 1]);
        }
        databaseSizeTest = 1;
        batchImagesArrayTest = new Float32Array(databaseSizeTest * IMAGE_SIZE);
        batchLabelsArrayTest = new Uint8Array(databaseSizeTest * NUM_CLASSES);
          let b = new Promise((resolve, reject) => {
            database.find({}, function (err, data) {
              if (err) throw err;
              resolve(data);
            });
          }).then((dataReceive3) => {
            // getDataTest(dataReceive3);
            const xsTest = tf.tensor2d(batchImagesArrayTest, [databaseSizeTest, IMAGE_SIZE]);
            //console.log(xsTest);
            console.log(2);
            let predictImagesArray = [];
            for (let i = 0; i < IMAGE_SIZE; i++) {
              predictImagesArray[i] = importantData[i];
            }
            // let predictLabelsArray = [];
            // let predictIndex = 0;
            // let predictDatabaseIndex = 1;
            // for (let i = IMAGE_SIZE*(predictDatabaseIndex-1); i < IMAGE_SIZE*predictDatabaseIndex; i++) {
            //   predictImagesArray[predictIndex] = batchImagesArrayTest[i];
            //   predictIndex++;
            // }
            const xPredict = tf.tensor2d(predictImagesArray, [1, IMAGE_SIZE]);

            const labelsTest = tf.tensor2d(batchLabelsArrayTest, [databaseSizeTest, NUM_CLASSES]);
            //console.log(labelsTest);
            // predictIndex = 0;
            // for (let i = NUM_CLASSES*(predictDatabaseIndex-1); i < NUM_CLASSES*predictDatabaseIndex; i++) {
            //   predictLabelsArray[predictIndex] = batchLabelsArrayTest[i];
            //   predictIndex++;
            // }
            // const labelsPredict = tf.tensor2d(predictLabelsArray, [1, NUM_CLASSES]);

            run().then(() => {
              run2();
            });
            async function run() {
              // const model = getModel();
              // await train(model, xs, xsTest, labels, labelsTest);
              // await model.save('file:///Users/magnusjohansson/Desktop/Node_Projects/xproto1/saved_models/model');
              // console.log('Done first training model');

              const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Ojoh02/spreadless/master/saved_models/model/model.json');
              predictedValue = doPrediction(model, xPredict);
            }
            console.log('Done first prediction');
            async function run2() {
              let c = new Promise((resolve, reject) => {
                database.find({}, function (err, data) {
                  if (err) throw err;
                  resolve(data);
                });
              }).then((dataReceive4) => {
                getPictures(predictedValue, dataReceive4);
                console.log('Done second prediction');
              });
              // for (let i = 0; i < PIXEL_TOTAL; i++) {
              //   // largeModelArray[i] = createModel();
              //   largeModelArray[i] = await tf.loadLayersModel(`file:///Users/magnusjohansson/Desktop/Node_Projects/xproto1/saved_models/model${i}/model.json`);
              // }
              //
              // let dataArray = [predictedValue/10, 0];
              // const dataTest = tf.tensor2d(dataArray, [1, 2]); //batchArrayDataTest.length instead of 1
              //
              // for (let i = 0; i < PIXEL_TOTAL; i++) {
              //   // await trainModel(largeModelArray[i], xs2, largeTensorArray[i]);
              // }
              //
              // // console.log('Done second training model')
              // // for (let i = 0; i < PIXEL_TOTAL; i++) {
              // //   await largeModelArray[i].save(`file:///Users/magnusjohansson/Desktop/Node_Projects/xproto1/saved_models/model${i}`);
              // // }
              // pixelArray = [];
              // for (let i = 0; i < PIXEL_TOTAL; i++) {
              //   largeDataArray[i] = testModel(largeModelArray[i], dataTest);
              //   pixelArray.push(largeDataArray[i]);
              // }

              // console.log(pixelArray);
            }
          })
        })

        //console.log(batchImagesArray);
        });
});

app.get('/collect', (request, response) => {
    for (let i = 0; i < pixelArray.length; i++) {
      pixelArray[i] = Math.abs(pixelArray[i]);
    }
    console.log(pixelArray.length);
    console.log(predictedValue);
    const data = {
      pixelArray: pixelArray,
      predictedValue: predictedValue,
      correctOne: predictedValue,
      perc2: perc2,
      perc3: perc3,
      perc4: perc4,
      perc5: perc5,
      perc6: perc6,
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      measurementId: measurementId
    }
    console.log(data);
    response.json(data);
});

app.get('/api', (request, response) => {
  db.find({}, (err, data) => {
    if (err){
      response.end();
      return;
    }
    response.json(data);
  });
});


app.post('/pics', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.post('/feedback', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  feedback.insert(data);
  response.json(data);
});

//***********************************************************************

function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({
    inputShape: [xs2.shape[1]],
    units: xs2.shape[1],
    useBias: true,
    activation: 'sigmoid'
  }));

  model.add(tf.layers.dense({
    units: 1,
  }));
  return model;
}

//***********************************************************************
async function trainModel(model, inputs, labels) {
  let BATCH_SIZE = databaseSize;

  model.compile({
    optimizer: tf.train.adam(.1),
    loss: 'meanSquaredError',
    metrics: [tf.metrics.meanAbsoluteError]
  });

  return await model.fit(inputs, labels, {
    batchSize: BATCH_SIZE,
    epochs: 100, //change later to around 50
    shuffle: true,
    //callbacks: add callbacks later
  })
}

//***********************************************************************

function testModel(model, dataTest) {
  const preds = model.predict(dataTest);
  // console.log(preds.mul(255).dataSync());
  return preds.mul(255).dataSync();
}
//***********************************************************************

function getModel() {
  const model = tf.sequential();

  //iPhone image size is 60 x 80 using sample_size = 50
  //fft image size is 32 x 32
  const IMAGE_WIDTH = 32;
  const IMAGE_HEIGHT = 32;
  const IMAGE_CHANNELS = 1;

  // In the first layer of our convolutional neural network we have
  // to specify the input shape. Then we specify some parameters for
  // the convolution operation that takes place in this layer.
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  // Repeat another conv2d + maxPooling stack.
  // Note that we have more filters in the convolution.
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten());

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  const NUM_OUTPUT_CLASSES = 10;
  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));


  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}
//
// //***********************************************************************
//
async function train(model, xs, xsTest, labels, labelsTest) {
  // const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  // const container = {
  //   name: 'Model Training', styles: { height: '1000px' }
  // };
  // const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
  let BATCH_SIZE = databaseSize; //*** keep in mind that this is databaseSize and not test data size
  const TRAIN_DATA_SIZE = databaseSize;
  const TEST_DATA_SIZE = databaseSizeTest;

  const [trainXs, trainYs] = tf.tidy(() => {
    //const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [xs.reshape([TRAIN_DATA_SIZE, 32, 32, 1]), labels];
    //return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
  });

  const [testXs, testYs] = tf.tidy(() => {
    //const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [xsTest.reshape([TEST_DATA_SIZE, 32, 32, 1]), labelsTest];
  });

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 50,
    shuffle: true,
  });
}

//***********************************************************************

function doPrediction(model, xPredict) {
  const xReady = xPredict.reshape([1, 32, 32, 1]);
  const preds = model.predict(xReady).argMax(-1).add(1);
  console.log("Prediction: " + preds.dataSync());
  return preds.dataSync();
}
