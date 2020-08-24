let mic, fft, w, w2;
let dropzone, label, val;
let speed, windSpeed, windAngle, temp, humidity; //add more slider values
let cHeight, cWidth;
let value = false, value2 = false, value3 = true;
let myColor;
let size, size2;
let pixelArray, pixelArray2;
let f32array, f32array_2;
let sample_size = 8;
let canvas1, canvas2;
//let button = document.getElementById('button');
let button, button2;
let label9 = [];
let labelSize = 10;

let counter;
const C_TIME = .2;

function labelLabels(labeler) {
  if (labeler == '1') {
    label9 = [1,0,0,0,0,0,0,0,0,0];
  }
  else if (labeler == '2') {
    label9 = [0,1,0,0,0,0,0,0,0,0];
  }
  else if (labeler == '3') {
    label9 = [0,0,1,0,0,0,0,0,0,0];
  }
  else if (labeler == '4') {
    label9 = [0,0,0,1,0,0,0,0,0,0];
  }
  else if (labeler == '5') {
    label9 = [0,0,0,0,1,0,0,0,0,0];
  }
  else if (labeler == '6') {
    label9 = [0,0,0,0,0,1,0,0,0,0];
  }
  else if (labeler == '7') {
    label9 = [0,0,0,0,0,0,1,0,0,0];
  }
  else if (labeler == '8') {
    label9 = [0,0,0,0,0,0,0,1,0,0];
  }
  else if (labeler == '9') {
    label9 = [0,0,0,0,0,0,0,0,1,0];
  }
  else if (labeler == '10') {
    label9 = [0,0,0,0,0,0,0,0,0,1];
  }
}

function setup() {
  button = createButton('toggle');
  button2 = createButton('capture');
  button.mousePressed(toggle);
  button2.mousePressed(capture);
}

let s1 = function(sketch){
  sketch.setup = function() {
    canvas1 = sketch.createCanvas(256, 256);
    cHeight = canvas1.height;
    cWidth = canvas1.width;
    size = cWidth * cHeight * 4;
    pixelArray = [size];
    sketch.colorMode(HSB);
    noLoop();

    w = cWidth / 64;

  }
  sketch.draw = function() {
    if (value3)
      sketch.background(0);
    //ellipse(0,0,100,100);
    let spectrum = fft.analyze();
    sketch.noStroke();
    for (i = 0; i < spectrum.length; i++) {
      let amp = spectrum[i];
      let y = map(amp, 0, 256, cHeight, 0);
      sketch.fill(i, 255, 255);
      sketch.rect(i * w, y, w - 2, cHeight - y);
    }
    if (value) {
      sketch.fill(255);
      sketch.textAlign(CENTER, CENTER);
      sketch.textSize(cWidth/5);
      if (counter > 10) {
        sketch.text(floor(counter/10), cWidth/2, cHeight/2);
        counter-=C_TIME;
      }
      if (counter < 10 && counter > 5) {
        sketch.text('Cough!', cWidth/2, cHeight/2);
        counter-=C_TIME;
      }
      if (counter < 5 && counter > 0) {
        if (counter < 4 && value3) {
          value3 = false;
        }
        if (counter < 1 && value) {
          value = false;
          capture();
          counter = '';
          mic.stop();
          noLoop();
        }
        counter-=C_TIME;
      }

    }
  }
};

let s2 = function(sketch) {
  sketch.setup = function() {
    canvas2 = sketch.createCanvas(32, 32);
    cHeight2 = canvas2.height;
    cWidth2 = canvas2.width;
    size2 = cWidth2 * cHeight2 * 4;
    pixelArray2 = [size2];
    sketch.colorMode(HSB);
    noLoop();

    w2 = cWidth2;
  }
  sketch.draw = function() {
    if (value3)
      sketch.background(0);
    let spectrum = fft.analyze();
    sketch.noStroke();
    for (i = 0; i < spectrum.length; i++) {
      let amp = spectrum[i];
      let y = map(amp, 0, 256, cHeight2, 0);
      sketch.fill(i*2, 255, 255);
      sketch.rect(i, y, 1, cHeight2 - y);
    }
    if (counter > 5) {
      counter-=C_TIME;
    }
    if (counter < 5 && counter > 0) {
      if (counter < 4 && value3) {
        value3 = false;
      }
      if (counter < 1 && value) {
        value = false;
        capture();
        counter = '';
        mic.stop();
        noLoop();
      }
      counter-=C_TIME;
    }
  }
};


function gotFile (file) {
  let c3 = document.createElement('canvas');
  ctx3 = c3.getContext('2d');

  let c4 = document.createElement('canvas');
  ctx4 = c4.getContext('2d');

  let img3 = new Image();
  img3.onload = () => {
    w3 = img3.width;
    h3 = img3.height;
    c3.width = w3;
    c3.height = h3;
    ctx3.drawImage(img3,0,0);

    c4.width = w3/sample_size;
    c4.height = h3/sample_size;
    let pixelArr = ctx3.getImageData(0,0,w3,h3).data;
    let i = 0;
    let j;
    for (let y = 0; y < h3; y+=sample_size){
      j = 0;
      for (let x = 0; x < w3; x+=sample_size){
        let p = (x + (y * w3)) * 4;
        let grey = (pixelArr[p] + pixelArr[p+1] + pixelArr[p+2] + pixelArr[p+3])/4;
        ///dhsjkafhjkdshfhkshdf
        ctx4.fillStyle = `rgba(${grey},${grey},${grey},${grey})`;
        ctx4.fillRect(j, i, 1, 1);
        j++;
      }
      i++;
    }
    img4 = new Image();
    img4.src = c4.toDataURL('image/jpeg');

    const testing = document.createElement('img');
    testing.src = img4.src;
    document.body.append(testing);

    let datasetBytesBuffer = new ArrayBuffer(c4.width * c4.height * 4);
    const datasetBytesView = new Float32Array(datasetBytesBuffer);
    ctx4.drawImage(img4, 0, 0);
    const imageData = ctx4.getImageData(0, 0, c4.width, c4.height);
    for (let j = 0; j < imageData.data.length / 4; j++) {
      datasetBytesView[j] = imageData.data[j * 4] / 255;
    }
    this.datasetImages = new Float32Array(datasetBytesBuffer);
    f32array_2 = this.datasetImages;
    console.log(f32array_2);
    dropzone.style('background-color', '#E30444');

  }
  img3.setAttribute('src', `${file.data}`);
}

let v = true;
function toggle() {
  if (!value) {
    mic = new p5.AudioIn();
    fft = new p5.FFT(0, 64);
    fft.setInput(mic);
    if (v) {
      newObject = new p5(s1, 'mainContent');
      new p5(s2, 'mainContent');
      v = false;
    }
    counter = 40;
    mic.start();
    getAudioContext().resume();
    loop();
    value = true;
    value3 = true;
  }
  else {
    counter = '';
    mic.stop();
    noLoop();
    value = false;
  }
}

function capture() {
  if (value2 == false){
    value2 = true;
    for (let y = 0; y < cHeight; y++) {
      for (let x = 0; x < cWidth; x++) {
        let p = (x + (y * cWidth)) * 4;
        let c = canvas1.get(x, y);
        pixelArray[p] = c[0];
        pixelArray[p+1] = c[1];
        pixelArray[p+2] = c[2];
        pixelArray[p+3] = c[3];
      }
    }
    //console.log(canvas1);
    for (let y = 0; y < cHeight2; y++) {
      for (let x = 0; x < cWidth2; x++) {
        let p = (x + (y * cWidth2)) * 4;
        let k = canvas2.get(x, y);
        //console.log(k);
        pixelArray2[p] = k[0];
        pixelArray2[p+1] = k[1];
        pixelArray2[p+2] = k[2];
        pixelArray2[p+3] = k[3];
      }
    }
    //console.log(pixelArray2);
    //console.log(canvas2);
    pic();
    function pic() {
      let c2 = document.createElement('canvas');
      ctx2 = c2.getContext('2d');
      c2.width = cWidth;
      c2.height = cHeight;
      let i = 0;
      let j;
      for (let y = 0; y < cHeight; y++){
        j = 0;
        for (let x = 0; x < cWidth; x++){
          let p = (x + (y * cWidth)) * 4;
          // let grey = (pixelArray[p] + pixelArray[p+1] + pixelArray[p+2] + pixelArray[p+3])/4
          ctx2.fillStyle = `rgba(${pixelArray[p]},${pixelArray[p+1]},${pixelArray[p+2]},${pixelArray[p+3]})`;
          ctx2.fillRect(j, i, 1, 1);
          j++;
        }
        i++;
      }
      img2 = new Image();
      img2.src = c2.toDataURL('image/jpeg'); //this is for display - size is fine
      //this should be smaller image

      // ***** FIX HERE *****
      let c5 = document.createElement('canvas');
      ctx5 = c5.getContext('2d');
      c5.width = cWidth2;
      c5.height = cHeight2;
      for (let y = 0; y < cHeight2; y++){
        for (let x = 0; x < cWidth2; x++){
          let p = (x + (y * cWidth2)) * 4;
          let grey = (pixelArray2[p] + pixelArray2[p+1] + pixelArray2[p+2] + pixelArray2[p+3])/4
          ctx5.fillStyle = `rgba(${grey},${grey},${grey},${grey})`;
          ctx5.fillRect(x, y, 1, 1);
        }
      }
      img5 = new Image();
      img5.src = c5.toDataURL('image/jpeg');

      let datasetBytesBuffer = new ArrayBuffer(c5.width * c5.height * 4);
      const datasetBytesView = new Float32Array(datasetBytesBuffer);
      ctx5.drawImage(img5, 0, 0);
      const imageData = ctx5.getImageData(0, 0, c5.width, c5.height);
      for (let j = 0; j < imageData.data.length / 4; j++) {
        datasetBytesView[j] = imageData.data[j * 4] / 255;
      }
      this.datasetImages = new Float32Array(datasetBytesBuffer);
      f32array = this.datasetImages;

      //console.log(image5.src);
      // const root = document.createElement('p');
      // root.setAttribute('id', 'root');
      const root = createP();
      root.id('root');

      const image = document.createElement('img');
      const para = createP('FFT Audio Image & Velocity');
      para.id('para');
      // const para = document.createElement('p');
      // para.setAttribute('id', 'para');
      // para.textContent = 'Confirm FFT Audio Image';
      image.src = img5.src;
      // const image64 = image.src;

      // const submit = createButton('submit');
      // submit.id('submit');
      const submit = document.createElement('BUTTON');
      submit.setAttribute('id', 'submit');
      submit.textContent = 'Submit';

      const cancel = document.createElement('BUTTON');
      cancel.setAttribute('id', 'cancel');
      cancel.textContent = 'Cancel';

      const checkbox = createCheckbox('Add Image', false);
      checkbox.changed(checkedEvent);
      // const addImage = document.createElement('INPUT');
      // addImage.setAttribute('type', 'checkbox');

      function checkedEvent() {
        if (this.checked()) {
          dropzone = createP('Drag file here');
          dropzone.id('dropzone');
          dropzone.dragOver(highlight);
          dropzone.dragLeave(unhighlight);
          dropzone.drop(gotFile, unhighlight);
          para.child(dropzone);

          //Slider 1 = velocity slider ft/s
          const slider1 = document.createElement('INPUT');
          slider1.setAttribute('id', 'slider1');
          slider1.setAttribute('type', 'range');
          slider1.min = 1;
          slider1.max = 10;
          slider1.step = 1;

          const output1 = document.createElement('p');
          output1.setAttribute('id', 'output1');
          output1.innerHTML = `Velocity: ${slider1.value}`;

          slider1.oninput = function() {
            output1.innerHTML = `Velocity: ${this.value}`;
            speed = this.value;
          }
          // speed into Uint8 arrayBuffer



          para.child(output1);
          para.child(slider1);

          //Slider 2 = wind mph
          const slider2 = document.createElement('INPUT');
          slider2.setAttribute('id', 'slider2');
          slider2.setAttribute('type', 'range');
          slider2.min = 0;
          slider2.max = 30;
          slider2.step = 5;

          const output2 = document.createElement('p');
          output2.setAttribute('id', 'output2');
          output2.innerHTML = `Wind Speed: ${slider2.value} mph`;

          slider2.oninput = function() {
            output2.innerHTML = `Wind Speed: ${this.value} mph`;
            windSpeed = this.value;
          }
          para.child(output2);
          para.child(slider2);

          //Slider 3 = wind angle (°)
          const slider3 = document.createElement('INPUT');
          slider3.setAttribute('id', 'slider3');
          slider3.setAttribute('type', 'range');
          slider3.min = 0;
          slider3.max = 360;
          slider3.step = 90;

          const output3 = document.createElement('p');
          output3.setAttribute('id', 'output3');
          output3.innerHTML = `Wind Angle: ${slider3.value}°`;

          slider3.oninput = function() {
            output3.innerHTML = `Wind Angle: ${this.value}°`;
            windAngle = this.value;
          }
          para.child(output3);
          para.child(slider3);

          //Slider 4 = temperature
          const slider4 = document.createElement('INPUT');
          slider4.setAttribute('id', 'slider4');
          slider4.setAttribute('type', 'range');
          slider4.min = 50;
          slider4.max = 90;
          slider4.step = 10;

          const output4 = document.createElement('p');
          output4.setAttribute('id', 'output4');
          output4.innerHTML = `Temperature: ${slider4.value} °F`;

          slider4.oninput = function() {
            output4.innerHTML = `Temperature: ${this.value} °F`;
            temp = this.value;
          }
          para.child(output4);
          para.child(slider4);

          //Slider 5 = humidity
          const slider5 = document.createElement('INPUT');
          slider5.setAttribute('id', 'slider5');
          slider5.setAttribute('type', 'range');
          slider5.min = 30;
          slider5.max = 60;
          slider5.step = 10;

          const output5 = document.createElement('p');
          output5.setAttribute('id', 'output5');
          output5.innerHTML = `Humidity: ${slider5.value}%`;

          slider5.oninput = function() {
            output5.innerHTML = `Humidity: ${this.value}%`;
            humidity = this.value;
          }
          para.child(output5);
          para.child(slider5);

        } else {
          let elementRemove = document.getElementById('dropzone');
          elementRemove.parentNode.removeChild(elementRemove);
          for (let i = 1; i <= 5; i++) {
            elementRemove = document.getElementById(`slider${i}`);
            elementRemove.parentNode.removeChild(elementRemove);
            elementRemove = document.getElementById(`output${i}`);
            elementRemove.parentNode.removeChild(elementRemove);
          }

        }
      }

      para.child(submit);
      para.child(cancel);
      para.child(checkbox);
      root.child(image);
      root.child(para);
      //document.body.append(root);
      // ADD SLIDER LABELS FOR WIND, ADD SLIDER FOR VELOCITY FOR TEST DATA

      cancel.addEventListener('click', async event => {
        let elementRemove = document.getElementById('root');
        elementRemove.parentNode.removeChild(elementRemove);
        value2 = false;
      });

      //change to button pressed
      submit.addEventListener('click', async event => {
        //console.log(speed);
        let elementRemove = document.getElementById('root');
        elementRemove.parentNode.removeChild(elementRemove);

        const image64 = img5.src;
        const image64_2 = img4.src;

        labelLabels(speed);
        let labelsBytesBuffer = new ArrayBuffer(labelSize);
        const labelBytesView = new Uint8Array(labelsBytesBuffer);
        for (let i = 0; i < labelSize; i++) {
          labelBytesView[i] = label9[i];
        }
        console.log(labelBytesView);
        //create huge Uint8 array for labels
        //get labels working so that CNN starts working

        const images = createImg(img4.src, 'img4');
        // lat lon converted to wind speed, temperature, humidity
        const data = {speed,labelBytesView, windSpeed, windAngle, temp, humidity, image64, f32array, image64_2, f32array_2};
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/collect', options);
        const json = await response.json();
        //send to server database1!!
        value2 = false;
      });
    }
  } else {
    console.log('Error: Submit data');
  }

}

function highlight() {
  dropzone.style('background-color', '#ccc');
}

function unhighlight() {
  dropzone.style('background-color', '#97C8EB');
}
