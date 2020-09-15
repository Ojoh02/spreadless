let value = false;
let expand = 4; //expand = rez // change to based on window size
let datas;
let collect;
let oArray;
let newArray;
let corrects;
let cols, rows;
let change = [];
let graph1 = [], graph1_2 = [], graph1_3 = [];
let graph2 = [];
let graph3 = [];
let graph4 = [];
let graph5 = [];
let graph6 = [];

let feet3, feet6, feet9;
let total = 0;

let b1, b2, b3, b4, b5

let t1 = '', t2 = '', t3 = '', t4 = '', t5 = '';
const submitting = document.getElementById('submitting');
const span = document.getElementById('span');

const th1 = document.getElementById('th1');
const th2 = document.getElementById('th2');
const th3 = document.getElementById('th3');
const th4 = document.getElementById('th4');
const th5 = document.getElementById('th5');

const t_1 = document.getElementById('t1');
const t_2 = document.getElementById('t2');
const t_3 = document.getElementById('t3');
const t_4 = document.getElementById('t4');

th1.oninput = function () {
  t1 = this.value;
}
th2.oninput = function () {
  t2 = this.value;
}
th3.oninput = function () {
  t3 = this.value;
}
th4.oninput = function () {
  t4 = this.value;
}
th5.oninput = function () {
  t5 = this.value;
}

async function getData() {
  const response = await fetch('/collect');
  const data = await response.json();
  return data;
  // const response = await fetch('/api');
  // const data = await response.json();
  // return data;
}

let s1 = async function(sketch) {
  sketch.setup = async function() {
    sketch.createCanvas(480, 400);
    sketch.colorMode(sketch.HSB);
    datas = await getData();
    let firebaseConfig = {
      apiKey: datas.apiKey,
      authDomain: datas.authDomain,
      databaseURL: datas.databaseURL,
      projectId: datas.projectId,
      storageBucket: datas.storageBucket,
      messagingSenderId: datas.messagingSenderId,
      appId: datas.appId,
      measurementId: datas.measurementId
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let database = firebase.database();

    submitting.addEventListener('click', async event => {
      if (t1 == '' || t2 == '' || t3 == '' || t4 == '' || t5 == '') {
        alert('Please fill out all areas!');
      } else {
        let ref2 = database.ref('feedback');
        let dataFeedback = {
          accuracy: t1,
          belief: t2,
          helpful: t3,
          age: t4,
          location: t5
        }
        ref2.push(dataFeedback);

        there1.style.display = 'none';
        t_1.style.display = 'none';
        th1.style.display = 'none';

        there2.style.display = 'none';
        t_2.style.display = 'none';
        th2.style.display = 'none';

        there3.style.display = 'none';
        t_3.style.display = 'none';
        th3.style.display = 'none';

        there4.style.display = 'none';
        t_4.style.display = 'none';
        th4.style.display = 'none';

        there5.style.display = 'none';
        th5.style.display = 'none';

        submitting.style.display = 'none';

        const para = document.createElement('p');
        para.innerHTML = 'Thanks for your feedback!';
        span.appendChild(para);
        }
      }
    );

    newArray = datas.pixelArray;
    b1 = datas.perc2;
    b2 = datas.perc3;
    b3 = datas.perc4;
    b4 = datas.perc5;
    b5 = datas.perc6;
    // corrects = datas.correctOne;
    // const data = {corrects, newArray};
    // //console.log(data);
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // };
    // const response = await fetch('/pics', options);
    // const json = await response.json();

    for (let i = 0; i < newArray.length; i++) {
      change.push(newArray[i]);
    }
    cols = sketch.width / expand;
    rows = sketch.height / expand;
    let index = 0;
    for (let i = 0; i < 120; i++) {
      for (let j = 0; j < 90; j++) {
        if (newArray[index+1] != null) {
          change[index] = sketch.lerp(change[index], change[index+1], .1);
        }
        if (change[index-1] != null) {
          change[index] = sketch.lerp(change[index], change[index-1], .1);
        }
        if (change[index+12] != null) {
          change[index] = sketch.lerp(change[index], change[index+12], .3);
        }
        if (newArray[index-12] != null) {
          change[index] = sketch.lerp(change[index], change[index-12], .3);
        }
        if (change[index] < 50) {
          change[index] = 1;
        } else {
          change[index] = 0;
        }
        index++;
      }
    }
    // collect = await getData();
    // pixelArray = collect[11].f32array_2;
    // console.log(pixelArray);
    value = true;
    index = 0;
    let smallArray = [];
    let mediumArray = [];
    let largeArray = [];
    let c = 1;
    for (let i = 0; i < 120*expand; i+=expand) {
      mediumArray = [];
      for (let j = 0; j < 90*expand; j+=expand) {
        smallArray = [];
        if (newArray[index+1] != null) {
          newArray[index] = sketch.lerp(newArray[index], newArray[index+1], .1);
        }
        if (newArray[index-1] != null) {
          newArray[index] = sketch.lerp(newArray[index], newArray[index-1], .1);
        }
        if (newArray[index+12] != null) {
          newArray[index] = sketch.lerp(newArray[index], newArray[index+12], .3);
        }
        if (newArray[index-12] != null) {
          newArray[index] = sketch.lerp(newArray[index], newArray[index-12], .3);
        }

        sketch.noStroke();
        if (newArray[index] < 100 || i <= expand*3 || i >= 112*expand) {
          sketch.fill(newArray[index], 255, 255, 0);
          total++;
        } else {
          sketch.fill(newArray[index], 255, 255, .5);
          smallArray.push(i);
          smallArray.push(j);
          smallArray.push(newArray[index]);
          mediumArray.push(smallArray);
          total++;
        }
        sketch.rect(i, j, expand, expand);
        if (i == 0 && j%6 == 0 && j!= 100) {
          sketch.fill(0,0,100);
          if (j == 0) {
            sketch.text(4, i, j*expand+10);
          } else if (j == 96) {
            sketch.text(4, i, j*expand);
          } else if (j == 12 || j == 84) {
            sketch.text(3, i, j*expand);
          } else if (j == 24 || j == 72) {
            sketch.text(2, i, j*expand);
          } else if (j == 36 || j == 60) {
            sketch.text(1, i, j*expand);
          } else if (j == 48) {
            sketch.text(0, i, j*expand);
          }
          // console.log(j*expand);
          // console.log(j);
        }
        if (j == 80 && i%6 == 0) {
          sketch.fill(0,0,100);
          sketch.text(c, i*expand+(12*expand), (j+18)*expand);
          c++;
        }
        // sketch.fill(pixelArray[index]*500, 255, 255, .5);

        index++;
      }
      largeArray.push(mediumArray);
    }
    let trying = 0;
    let densityMax = 0;
    let findMax = 0;
    let findMin = 200;
    let medAry = [];
    let smAry = [];
    let part1 = [];
    let index1, index2, index3;
    let avgNumber = 0;
    let difMax0 = 0, difMax1 = 0, difMax2 = 0, difMax3 = 0, difMax4 = 0, difMax5 = 0, difMax6 = 0, difMax7 = 0, difMax8 = 0, difMax9 = 0;
    let difMin0 = 200, difMin1 = 200, difMin2 = 200, difMin3 = 200, difMin4 = 200, difMin5 = 200, difMin6 = 200, difMin7 = 200, difMin8 = 200, difMin9 = 200;
    let tot1 = 0, tot2 = 0, tot3 = 0, tot4 = 0, tot5 = 0, tot6 = 0, tot7 = 0, tot8 = 0, tot9 = 0;
    let cot1 = 0, cot2 = 0, cot3 = 0, cot4 = 0, cot5 = 0, cot6 = 0, cot7 = 0, cot8 = 0, cot9 = 0;
    let offset0 = 0, offset1 = 0, offset2 = 0, offset3 = 0, offset4 = 0;
    let diff0 = 0, diff1 = 0, diff2 = 0, diff3 = 0, diff4 = 0, diff5 = 0, diff6 = 0, diff7 = 0, diff8 = 0, diff9 = 0;
    let i0 = 0, i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0;
    console.log(largeArray);
    for (let i = 0; i < largeArray.length; i++) {
      densityMax = 0;
      avgNumber = 0;
      part1 = [];
      medAry = largeArray[i];
      for (let j = 0; j < medAry.length; j++) {
        smAry = medAry[j];
        densityMax+=smAry[2];
        avgNumber++;
      }
      if (densityMax/avgNumber > findMax) {
        findMax = densityMax/avgNumber;
      }
      if (densityMax/avgNumber < findMin) {
        findMin = densityMax/avgNumber;
      }
    }
    // console.log(largeArray);
    for (let i = 0; i < largeArray.length; i++) {
      densityMax = 0;
      avgNumber = 0;
      part1 = [];
      medAry = largeArray[i];
      for (let j = 0; j < medAry.length; j++) {
        smAry = medAry[j];
        index1 = smAry[0];
        index3 = smAry[1]/expand;
        index2 = index1/48;
        if (index1!=undefined && !isNaN(smAry[2])) {
          densityMax+=smAry[2];
          if (index > 3) {
            difMin0 = 0, difMin1 = 0, difMin2 = 0, difMin3 = 0, difMin4 = 0, difMin5 = 0, difMin6 = 0, difMin7 = 0, difMin8 = 0, difMin9 = 0;
          }
          avgNumber++;
        }
        if (index3 != 0) {
          if (index3 < 12) {
            offset4 += smAry[2];
          } else if (index3 < 24) {
            offset3 += smAry[2];
          } else if (index3 < 36) {
            offset2 += smAry[2];
          } else if (index3 < 48) {
            offset1 += smAry[2];
          } else if (index3 < 60) {
            offset0 += smAry[2];
          } else if (index3 < 72) {
            offset1 += smAry[2];
          } else if (index3 < 84) {
            offset2 += smAry[2];
          } else if (index3 < 96) {
            offset3 += smAry[2];
          } else if (index3 < 108) {
            offset4 += smAry[2];
          }
        }
        if (j < medAry.length) {
          if (index2 < 1) {
            if (medAry[j][1] > difMax0) {
              difMax0 = medAry[j][1];
            }
            if (medAry[j][1] < difMin0) {
              difMin0 = medAry[j][1];
            }
          } else if (index2 < 2) {
            if (medAry[j][1] > difMax1) {
              difMax1 = medAry[j][1];
            }
            if (medAry[j][1] < difMin1) {
              difMin1 = medAry[j][1];
            }
          } else if (index2 < 3) {
            if (medAry[j][1] > difMax2) {
              difMax2 = medAry[j][1];
            }
            if (medAry[j][1] < difMin2) {
              difMin2 = medAry[j][1];
            }
          } else if (index2 < 4) {
            if (medAry[j][1] > difMax3) {
              difMax3 = medAry[j][1];
            }
            if (medAry[j][1] < difMin3) {
              difMin3 = medAry[j][1];
            }
          } else if (index2 < 5) {
            if (medAry[j][1] > difMax4) {
              difMax4 = medAry[j][1];
            }
            if (medAry[j][1] < difMin4) {
              difMin4 = medAry[j][1];
            }
          } else if (index2 < 6) {
            if (medAry[j][1] > difMax5) {
              difMax5 = medAry[j][1];
            }
            if (medAry[j][1] < difMin5) {
              difMin5 = medAry[j][1];
            }
          } else if (index2 < 7) {
            if (medAry[j][1] > difMax6) {
              difMax6 = medAry[j][1];
            }
            if (medAry[j][1] < difMin6) {
              difMin6 = medAry[j][1];
            }
          } else if (index2 < 8) {
            if (medAry[j][1] > difMax7) {
              difMax7 = medAry[j][1];
            }
            if (medAry[j][1] < difMin7) {
              difMin7 = medAry[j][1];
            }
          } else if (index2 < 9) {
            if (medAry[j][1] > difMax8) {
              difMax8 = medAry[j][1];
            }
            if (medAry[j][1] < difMin8) {
              difMin8 = medAry[j][1];
            }
          } else if (index2 < 10) {
            if (medAry[j][1] > difMax9) {
              difMax9 = medAry[j][1];
            }
            if (medAry[j][1] < difMin9) {
              difMin9 = medAry[j][1];
            }
          }
        }
        let index4 = index1/48;
        if (index4 != 0) {
          if (index4 < 1) {
            tot1 += smAry[2];
            cot1++;
          } else if (index4 < 2) {
            tot2 += smAry[2];
            cot2++
          } else if (index4 < 3) {
            tot3 += smAry[2];
            console.log(tot3);
            console.log(trying++);
          } else if (index4 < 4) {
            tot4 += smAry[2];
          } else if (index4 < 5) {
            tot5 += smAry[2];
          } else if (index4 < 6) {
            tot6 += smAry[2];
          } else if (index4 < 7) {
            tot7 += smAry[2];
          } else if (index4 < 8) {
            tot8 += smAry[2];
          } else if (index4 < 9) {
            tot9 += smAry[2];
          }
        }
      }
    }
    let max0 = 0, max1 = 0, max2 = 0, max3 = 0, max4 = 0, max5 = 0, max6 = 0, max7 = 0, max8 = 0, max9 = 0;
    for (let i = 0; i < largeArray.length; i++) {
      medAry = largeArray[i];
      for (let j = 0; j < medAry.length; j++) {
         smAry = medAry[j];
        if (smAry[0]!=undefined && !isNaN(smAry[2])) {
          if (smAry[0]/48 < 1) {
            if (smAry[2] > max0) {
              max0 = smAry[2];
            }
          } else if (smAry[0]/48 < 2) {
            if (smAry[2] > max1) {
              max1 = smAry[2];
            }
          } else if (smAry[0]/48 < 3) {
            if (smAry[2] > max2) {
              max2 = smAry[2];
            }
          } else if (smAry[0]/48 < 4) {
            if (smAry[2] > max3) {
              max3 = smAry[2];
            }
          } else if (smAry[0]/48 < 5) {
            if (smAry[2] > max4) {
              max4 = smAry[2];
            }
          } else if (smAry[0]/48 < 6) {
            if (smAry[2] > max5) {
              max5 = smAry[2];
            }
          } else if (smAry[0]/48 < 7) {
            if (smAry[2] > max6) {
              max6 = smAry[2];
            }
          } else if (smAry[0]/48 < 8) {
            if (smAry[2] > max7) {
              max7 = smAry[2];
            }
          } else if (smAry[0]/48 < 9) {
            if (smAry[2] > max8) {
              max8 = smAry[2];
            }
          } else if (smAry[0]/48 < 10) {
            if (smAry[2] > max9) {
              max9 = smAry[2];
            }
          }
        }
      }
    }
    graph2.push(max1);
    graph2.push(max1);
    graph2.push(max2);
    graph2.push(max3);
    graph2.push(max4);
    graph2.push(max5);
    graph2.push(max6);
    graph2.push(max7);
    graph2.push(max8);
    graph2.push(max9);
    graph3.push(Math.round((difMax0-difMin0)/48*100)/100);
    graph3.push(Math.round((difMax1-difMin1)/48*100)/100);
    graph3.push(Math.round((difMax2-difMin2)/48*100)/100);
    graph3.push(Math.round((difMax3-difMin3)/48*100)/100);
    graph3.push(Math.round((difMax4-difMin4)/48*100)/100);
    graph3.push(Math.round((difMax5-difMin5)/48*100)/100);
    graph3.push(Math.round((difMax6-difMin6)/48*100)/100);
    graph3.push(Math.round((difMax7-difMin7)/48*100)/100);
    graph3.push(Math.round((difMax8-difMin8)/48*100)/100);
    graph3.push(Math.round((difMax9-difMin9)/48*100)/100);
    graph4.push(Math.round(offset0*2/120*100)/100);
    graph4.push(Math.round(offset1/120*100)/100);
    graph4.push(Math.round(offset2/120*100)/100);
    graph4.push(Math.round(offset3/120*100)/100);
    graph4.push(Math.round(offset4/120*100)/100);
    let findMax4 = 0;
    for (let i = 0; i < graph4.length; i++) {
      if (graph4[i] > findMax4) {
        findMax4 = graph4[i];
      }
    }
    for (let i = 0; i < graph4.length; i++) {
      graph4[i] = Math.round(graph4[i]/findMax4*100 * 100)/100;
    }
    graph6.push(tot1/90*2*1.05/60);
    graph6.push(tot1/90*2/60);
    graph6.push(tot2/90*1.2/60);
    graph6.push(tot3/90/60);
    graph6.push(tot4/90/60);
    graph6.push(tot5/90/60);
    graph6.push(tot6/90/60);
    graph6.push(tot7/90/60);
    graph6.push(tot8/90/60);
    graph6.push(tot9/90/60);
    console.log(tot3/120/48);
    console.log(tot3/90/60);
    feet3 = Math.round(tot3/90/60*100)/100;
    feet6 = Math.round(tot6/90/60*100)/100;
    feet9 = Math.round(tot9/90/60*100)/100;
    let findMax2 = 0;
    for (let i = 0; i < graph2.length; i++) {
      if (graph2[i] > findMax2) {
        findMax2 = graph2[i];
      }
    }
    for (let i = 0; i < graph2.length; i++) {
      graph2[i] = Math.round(graph2[i]/findMax2*100 * 100)/100;
    }
    for (let i = 0; i < graph6.length; i++) {
      graph6[i] = Math.round(graph6[i]*100)/100;
    }
    graph1.push(feet6);
    let record6_5 = Math.round(feet6*1.63*100)/100;
    graph1.push(Math.round(feet6*1.63*100)/100);
    graph1.push(Math.round(feet6*3.16*100)/100);
    let record6_15 = Math.round(feet6*4.67*100)/100;
    graph1.push(Math.round(feet6*4.67*100)/100);
    graph1.push(Math.round(feet6*6.08*100)/100);
    graph1.push(Math.round(feet6*7.57*100)/100);
    let record6_30 = Math.round(feet6*9.02*100)/100;
    graph1.push(Math.round(feet6*9.02*100)/100);
    graph1.push(Math.round(feet6*10.71*100)/100);
    graph1.push(Math.round(feet6*12.01*100)/100);
    let record6_45 = Math.round(feet6*13.5*100)/100;
    graph1.push(Math.round(feet6*13.5*100)/100);

    let record3_5, record3_15, record3_30, record3_45;
    if (feet3 <= 100) {
      graph1_2.push(feet3);
    } else {
      graph1_2.push(100);
    }
    if (feet3*1.63 <= 100) {
      graph1_2.push(Math.round(feet3*1.63*100)/100);
      record3_5 = Math.round(feet3*1.63*100)/100;
    } else {
      graph1_2.push(100);
      record3_5 = 100;
    }
    if (feet3*3.16 <= 100) {
      graph1_2.push(Math.round(feet3*3.16*100)/100);
    } else {
      graph1_2.push(100);
    }
    if (feet3*4.67 <= 100) {
      graph1_2.push(Math.round(feet3*4.67*100)/100);
      record3_15 = Math.round(feet3*4.67*100)/100;
    } else {
      graph1_2.push(100);
      record3_15 = 100;
    }
    if (feet3*6.08 <= 100) {
      graph1_2.push(Math.round(feet3*6.08*100)/100);
    } else {
      graph1_2.push(100);
    }
    if (feet3*7.57 <= 100) {
      graph1_2.push(Math.round(feet3*7.57*100)/100);
    } else {
      graph1_2.push(100);
    }
    if (feet3*9.02 <= 100) {
      graph1_2.push(Math.round(feet3*9.02*100)/100);
      record3_30 = Math.round(feet3*9.02*100)/100;
    } else {
      graph1_2.push(100);
      record3_30 = 100;
    }
    if (feet3*10.71 <= 100) {
      graph1_2.push(Math.round(feet3*10.71*100)/100);
    } else {
      graph1_2.push(100);
    }
    if (feet3*12.01 <= 100) {
      graph1_2.push(Math.round(feet3*12.01*100)/100);
    } else {
      graph1_2.push(100);
    }
    if (feet3*13.5 <= 100) {
      graph1_2.push(Math.round(feet3*13.5*100)/100);
      record3_45 = Math.round(feet3*13.5*100)/100;
    } else {
      graph1_2.push(100);
      record3_45 = 100;
    }

    graph1_3.push(feet9);
    let record9_5 = Math.round(feet9*1.63*100)/100;
    graph1_3.push(Math.round(feet9*1.63*100)/100);
    graph1_3.push(Math.round(feet9*3.16*100)/100);
    let record9_15 = Math.round(feet9*4.67*100)/100;
    graph1_3.push(Math.round(feet9*4.67*100)/100);
    graph1_3.push(Math.round(feet9*6.08*100)/100);
    graph1_3.push(Math.round(feet9*7.57*100)/100);
    let record9_30 = Math.round(feet9*9.02*100)/100;
    graph1_3.push(Math.round(feet9*9.02*100)/100);
    graph1_3.push(Math.round(feet9*10.71*100)/100);
    graph1_3.push(Math.round(feet9*12.01*100)/100);
    let record9_45 = Math.round(feet9*13.5*100)/100;
    graph1_3.push(Math.round(feet9*13.5*100)/100);

    let grandTotal = (tot1*1.5+tot1*1.5+tot2+tot3+tot4+tot5+tot6+tot7+tot8+tot9)/90;
    let coughNum;
    if (feet6 == 0) {
      coughNum = 1;
    } else if (feet6 == .13) {
      coughNum = 2;
    } else if (feet6 == .83) {
      coughNum = 3;
    } else if (feet6 == 1.87) {
      coughNum = 4;
    } else if (feet6 == 2.95) {
      coughNum = 5;
    } else if (feet6 == 3.91) {
      coughNum = 6;
    } else if (feet6 == 4.92) {
      coughNum = 7;
    } else if (feet6 == 5.84) {
      coughNum = 8;
    } else if (feet6 == 6.64) {
      coughNum = 9;
    } else if (feet6 == 7.35) {
      coughNum = 10;
    }
    let coughStrength = document.getElementById('coughStrength');
    coughStrength.innerHTML = `Your Cough Strength (1 to 10): ${coughNum}`;
    let ref = database.ref('index');
    let data = {
      feet3: b1,
      feet6: b2,
      feet9: b3,
      age: b4,
      location: b5,
      coughStrength: coughNum,
      rfeet3: feet3,
      rfeet6: feet6,
      rfeet9: feet9
    }
    ref.push(data);
    let coughData1 = document.getElementById('coughData1');
    coughData1.innerHTML = `5 minutes: ${record3_5}% || 15 minutes: ${record3_15}% || 30 minutes: ${record3_30}% || 45 minutes: ${record3_45}%`;
    let coughData2 = document.getElementById('coughData2');
    coughData2.innerHTML = `5 minutes: ${record6_5}% || 15 minutes: ${record6_15}% || 30 minutes: ${record6_30}% || 45 minutes: ${record6_45}%`;
    let coughData3 = document.getElementById('coughData3');
    coughData3.innerHTML = `5 minutes: ${record9_5}% || 15 minutes: ${record9_15}% || 30 minutes: ${record9_30}% || 45 minutes: ${record9_45}%`;
    chartIt();
  }
  function getLine(v1, v2) {
    sketch.line(v1.x, v1.y, v2.x, v2.y);
  }

  function getState(a, b, c, d) {
    return a * 8 + b * 4 + c * 2 + d * 1;
  }
  async function chartIt() {
    await getData();
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 5 , 10, 15, 20, 25, 30, 35, 40, 45],
            datasets: [{
                fontColor: '#b7d3e8',
                label: '3 feet',
                data: graph1_2,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            }, {
                fontColor: '#b7d3e8',
                label: '6 feet',
                data: graph1,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }, {
                fontColor: '#b7d3e8',
                label: '9 feet',
                data: graph1_3,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              fontColor: '#b7d3e8',
              fontSize: 18,
              text: 'Chance Getting Virus vs Time'
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
                    labelString: 'Time (minutes)'
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
                    labelString: 'Chance Getting Virus (%)'
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

    let ctx2 = document.getElementById('myChart2').getContext('2d');
    let myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets: [{
                fontColor: '#b7d3e8',
                label: 'Relative Size',
                data: graph2,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              fontColor: '#b7d3e8',
              fontSize: 18,
              text: 'Relative Size vs Distance'
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
                    labelString: 'Distance (feet)'
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
                    labelString: 'Relative Size (%)'
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

    let ctx3 = document.getElementById('myChart3').getContext('2d');
    let myChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets: [{
                fontColor: '#b7d3e8',
                label: 'Breadth',
                data: graph3,
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              fontColor: '#b7d3e8',
              fontSize: 18,
              text: 'Breadth vs Length'
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
                  labelString: 'Length (feet)'
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
                  labelString: 'Breadth (feet)'
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

    let ctx4 = document.getElementById('myChart4').getContext('2d');
    let myChart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: [0,1,2,3,4],
            datasets: [{
                fontColor: '#b7d3e8',
                fontSize: 18,
                label: 'Relative Density',
                data: graph4,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              fontColor: '#b7d3e8',
              fontSize: 18,
              text: 'Relative Density vs Offset'
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
                  labelString: 'Offset (feet)'
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

    let ctx5 = document.getElementById('myChart5').getContext('2d');
    let myChart5 = new Chart(ctx5, {
        type: 'line',
        data: {
            labels: [0,2,4,6,8,10,12,14,16,18],
            datasets: [{
                fontColor: '#b7d3e8',
                label: 'Relative Density',
                data: [100, 98, 94, 90, 86, 73, 64, 46, 40, 37],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              fontColor: '#b7d3e8',
              fontSize: 18,
              text: 'Relative Density vs Time'
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
                  labelString: 'Time (seconds)'
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

    let ctx6 = document.getElementById('myChart6').getContext('2d');
    let myChart6 = new Chart(ctx6, {
        type: 'line',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets: [{
                fontColor: '#b7d3e8',
                label: '% Chance Getting Virus',
                data: graph6,
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: false
            }]
        },
        options: {
            title: {
              display: true,
              fontColor: '#b7d3e8',
              fontSize: 18,
              text: 'Chance Getting Virus within 5 minutes vs Distance'
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
                  labelString: 'Distance (feet)'
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
                  labelString: 'Chance Getting Virus (%)'
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
  }
}

new p5(s1, 'mainContents');

let toggleValue = true;
let downloadTimer;
let secondsElapsed = document.getElementById('secondsElapsed');
let coughButton = document.getElementById('coughButton');
coughButton.addEventListener('click', async event => {
  if (toggleValue) {
    let timeLeft = 1;
    downloadTimer = setInterval(function() {
      if (timeLeft > 10) {
        clearInterval(downloadTimer);
        secondsElapsed.innerHTML = 'Seconds Elapsed: ';
        toggleValue = true;
      } else {
        secondsElapsed.innerHTML = 'Seconds Elapsed: '+ timeLeft;
        toggleValue = false;
      }
      timeLeft++;
    }, 1000);
  }
});
