let mic, fft, w, w2;
let label, val;
let speed, windSpeed, windAngle, temp, humidity; //add more slider values
let cHeight, cWidth;
let value = false, value2 = false, value3 = true, value5 = false;
let myColor;
let size, size2;
let pixelArray, pixelArray2;
let f32array;
let sample_size = 500;
let canvas1, canvas2;
//let button = document.getElementById('button');
let button, button2;
let label9 = [];
let labelSize = 10;

let counter;
const C_TIME = .2;

let toggleValue = true;

let onOff = document.getElementById('onOff');
let here0 = document.getElementById('here0');
let here1 = document.getElementById('here1');
let here2 = document.getElementById('here2');
let here3 = document.getElementById('here3');
let here4 = document.getElementById('here4');
let here5 = document.getElementById('here5');
let here6 = document.getElementById('here6');

let option2 = document.getElementById('percent2');
let option3 = document.getElementById('percent3');
let option4 = document.getElementById('percent4');
let option5 = document.getElementById('percent5');
let option6 = document.getElementById('input6');

let percent2 = '', percent3 = '', percent4 = '', percent5 = '', p6 = '';

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

async function setup() {
  button = document.getElementById('toggle');
  // button2 = createButton('capture');
  button.addEventListener('click', toggle);
  // button2.mousePressed(capture);
  // if ('geolocation' in navigator){
  //   console.log('geolocation available');
  //   navigator.geolocation.getCurrentPosition(async position => {
  //     lat = position.coords.latitude;
  //     lon = position.coords.longitude;
  //     document.getElementById('latitude').textContent = lat;
  //     document.getElementById('longitude').textContent = lon;
  //   });
  // } else {
  //   console.log('geolocation not available');
  // }

}


let s1 = function(sketch){
  sketch.setup = function() {
    // let clientHeight = document.getElementById('mainContent').clientHeight;
    // console.log(clientHeight);
    canvas1 = sketch.createCanvas((windowWidth/2)-73, windowHeight/2);
    canvas1.id('canvas1');
    cHeight = windowHeight/2;
    cWidth = windowWidth/2-73;
    console.log(cWidth);
    // cHeight = canvas1.height;
    // cWidth = canvas1.width;
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
          const moreContent = document.getElementById('moreContent');

          const submit = document.createElement('BUTTON');
          submit.setAttribute('id', 'submit');
          submit.setAttribute('class', 'starter2 btn btn-outline-secondary');
          submit.style.marginLeft = '43%';
          here0.style.display='block';
          here1.style.display='block';
          here2.style.display='block';
          here3.style.display='block';
          here4.style.display='block';
          here5.style.display='block';
          here6.style.display='block';

          onOff2.style.display='block';
          onOff3.style.display='block';
          onOff4.style.display='block';
          onOff5.style.display='block';
          input6.style.display='block';

          option2.oninput = function () {
            percent2 = this.value;
          }
          option3.oninput = function () {
            percent3 = this.value;
          }
          option4.oninput = function () {
            percent4 = this.value;
          }
          option5.oninput = function () {
            percent5 = this.value;
          }
          option6.oninput = function () {
            p6 = this.value;
          }

          let downloadTimer;
          submit.onclick = function () {
            if (percent2 == '' || percent3 == '' || percent4 == '' || percent5 == '' || p6 == '') {
            } else {
              if (toggleValue) {
                let timeLeft = 2;
                downloadTimer = setInterval(function() {
                  if (timeLeft < 1) {
                    clearInterval(downloadTimer);
                    submit.innerHTML = '';
                    toggleValue = true;
                  } else {
                    submit.innerHTML = 'Loading... '+ timeLeft + ' seconds';
                    toggleValue = false;
                  }
                  timeLeft--;
                }, 1000);
                setTimeout(function() {
                  location.href = '/resources';
                }, 2000);
              }
            }
          }
          submit.textContent = 'Submit';
          here2.appendChild(onOff2);
          here3.appendChild(onOff3);
          here4.appendChild(onOff4);
          here5.appendChild(onOff5);
          here6.appendChild(input6);
          moreContent.appendChild(submit);
          value = false;
          capture();
          counter = '';
          mic.stop();
          noLoop();
          value5 = true;
        }
        counter-=C_TIME;
      }

    }
  }
};

let s2 = function(sketch) {
  sketch.setup = function() {
    canvas2 = sketch.createCanvas(32, 32);
    canvas2.id('canvas2');
    // canvas2.hide();
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

let v = true;
function toggle() {
  if (!value && toggleValue) {
    button.textContent = 'Restart';
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
    if (value5) {
      elementRemove = document.getElementById('submit');
      elementRemove.parentNode.removeChild(elementRemove);
      value2 = false;
      value5 = false;
    }

  }
  else {
    button.textContent = 'Start';
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
      console.log(c2.width);
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

      submit.addEventListener('click', async event => {
        if (percent2 == '' || percent3 == '' || percent4 == '' || percent5 == '' || p6 == '') {
          alert('Please fill in the prediction survey!');
        } else {
          if (toggleValue) {
            const image64 = img5.src;
            labelLabels(speed);
            let labelsBytesBuffer = new ArrayBuffer(labelSize);
            const labelBytesView = new Uint8Array(labelsBytesBuffer);
            for (let i = 0; i < labelSize; i++) {
              labelBytesView[i] = label9[i];
            }
            //const images = createImg(img4.src, 'img4');
            // lat lon converted to wind speed, temperature, humidity
            const data = {f32array, percent2, percent3, percent4, percent5, p6};
            //console.log(data);
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();

            value2 = false;
          }
        }
      });
    }
  } else {
    console.log('Error: Submit data');
  }

}
let ctx10 = document.getElementById('myChart10').getContext('2d');
let myChart10 = new Chart(ctx10, {
    type: 'line',
    data: {
        labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [{
            fontColor: '#b7d3e8',
            label: 'Relative Density',
            data: [8.82, 24.08, 37.65, 49.98, 60.58, 69.87, 78.21, 86.55, 93.38, 100.00],
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
        }]
    },
    options: {
        title: {
          display: true,
          fontColor: '#b7d3e8',
          fontSize: 14,
          text: 'Relative Density vs Cough Strength'
        },
        legend: {
          labels: {
            fontColor: '#b7d3e8'
          }
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              fontColor: '#b7d3e8',
              labelString: 'Cough Strength'
            },
              ticks: {
                fontColor: '#b7d3e8'
              },
              gridLines: {
                color: '#1b2433',
              }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              fontColor: '#b7d3e8',
              labelString: 'Relative Density (%)'
            },
              ticks: {
                  fontColor: '#b7d3e8',
                  beginAtZero: true
              },
              gridLines: {
                color: '#1b2433',
              }
          }]
        }
    }
});
