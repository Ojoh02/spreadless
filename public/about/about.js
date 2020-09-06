let ctx10 = document.getElementById('myChart10').getContext('2d');
let myChart10 = new Chart(ctx10, {
    type: 'line',
    data: {
        labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [{
            fontColor: '#b7d3e8',
            label: 'Relative Density',
            data: [8.82, 24.08, 37.65, 49.98, 60.58, 69.87, 78.21, 86.55, 93.38, 100.00],
            borderColor: 'rgba(153, 102, 255, 1)',
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

let ctx11 = document.getElementById('myChart11').getContext('2d');
let myChart11 = new Chart(ctx11, {
    type: 'line',
    data: {
        labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [{
            fontColor: '#b7d3e8',
            label: '% Chance Getting Virus',
            data: [.69, 3.60, 6.15, 8.03, 9.51, 10.59, 11.40, 12.12, 12.81, 13.43],
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
        }]
    },
    options: {
        title: {
          display: true,
          fontColor: '#b7d3e8',
          fontSize: 14,
          text: 'Chance Getting Virus 3ft vs Cough Strength'
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
              labelString: 'Chance Getting Virus 3ft (%)'
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

let ctx12 = document.getElementById('myChart12').getContext('2d');
let myChart12 = new Chart(ctx12, {
    type: 'line',
    data: {
        labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [{
            fontColor: '#b7d3e8',
            label: '% Chance Getting Virus',
            data: [.00, .13, .83, 1.87, 2.95, 3.91, 4.92, 5.84, 6.64, 7.35],
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
        }]
    },
    options: {
        title: {
          display: true,
          fontColor: '#b7d3e8',
          fontSize: 14,
          text: 'Chance Getting Virus 6ft vs Cough Strength'
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

let ctx13 = document.getElementById('myChart13').getContext('2d');
let myChart13 = new Chart(ctx13, {
    type: 'line',
    data: {
        labels: [0,1,2,3,4,5,6,7,8,9],
        datasets: [{
            fontColor: '#b7d3e8',
            label: '% Chance Getting Virus',
            data: [.00, .00, .00, .04, .16, .39, .72, 1.29, 1.77, 2.49],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    },
    options: {
        title: {
          display: true,
          fontColor: '#b7d3e8',
          fontSize: 14,
          text: 'Chance Getting Virus 9ft vs Cough Strength'
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
