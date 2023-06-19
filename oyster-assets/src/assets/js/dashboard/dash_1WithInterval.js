window.addEventListener("load", function() {
  try {

    var getcorkThemeObject = localStorage.getItem("theme");
    var getParseObject = JSON.parse(getcorkThemeObject)
    var ParsedObject = getParseObject;

    var Theme = 'dark';

    Apex.tooltip = {
      theme: Theme
    }
    
    function fetchData() {
      let tdsFeeds = [];
      let waterTempFeeds = [];
      let humidityFeeds = [];
      let airTempFeeds = [];
      let distanceFeeds = [];

      let feedDateTime = [];

      fetch('https://api.thingspeak.com/channels/2178227/feeds.json?results=10')
      .then(response => response.json())
      .then(data => {

        console.log("Hello, this is the length of the feed: " + data.feeds.length);

        var i;
        for (i = 0; i < data.feeds.length; ++i) {
          tdsFeeds.push(data.feeds[i].field1);
          waterTempFeeds.push(data.feeds[i].field2);
          humidityFeeds.push(data.feeds[i].field3);
          airTempFeeds.push(data.feeds[i].field4);
          distanceFeeds.push(data.feeds[i].field5);

          var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          var dateString = data.feeds[i].created_at;
          var dateObj = new Date(dateString);

          // Extracting date components
          var year = dateObj.getFullYear();
          var month = dateObj.getMonth(); // Months are zero-based
          var day = dateObj.getDate();

          // Extracting time components
          var hours = dateObj.getHours();
          var minutes = dateObj.getMinutes();
          var seconds = dateObj.getSeconds();

          // Formatting the date and time
          var formattedDate = monthNames[month] + " " + day + ", " + year;
          var formattedTime = hours + ":" + minutes;

          feedDateTime.push(formattedDate + " " + formattedTime);
        }

        var tdsEL = document.getElementById("tds-value");
        tdsEL.textContent = "🧊" + Math.round(data.feeds[9].field1);

        var waterTempEL = document.getElementById("watertemp-value");
        waterTempEL.textContent = "🌡️" + Math.round(data.feeds[9].field2) + "°C";

        var humidityEL = document.getElementById("humidity-value");
        humidityEL.textContent = "💧" + Math.round(data.feeds[9].field3) + "%";

        var airTempEL = document.getElementById("airtemp-value");
        airTempEL.textContent = "🌡️" + Math.round(data.feeds[9].field4) + "°C";

        let oysterText = "🦪 Not Available";

        if (Math.round(data.feeds[9].field5) <= 30) {
          oysterText = "🦪 Oyster is ready to harvest";
        }
        var distanceEL = document.getElementById("distance-value");
        distanceEL.textContent = oysterText;

        /*
        ==============================
        Statistics | Options
        ==============================
        */

        // TDS

        var d_1options3 = {
          chart: {
            id: 'sparkline1',
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          series: [{
            name: 'TDS',
            data: tdsFeeds
          }],
          labels: feedDateTime,
          yaxis: {
            min: 0
          },
          colors: ['#e7515a'],
          tooltip: {
            x: {
              show: true,
            }
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: false
              }
            },
            padding: {
              top: 5,
              right: 0,
              left: 0
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .40,
              opacityTo: .05,
              stops: [100, 100]
            }
          }
        }

        // WaterTemp

        var d_1options4 = {
          chart: {
            id: 'sparkline1',
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          series: [{
            name: 'Water Temp in Celcius',
            data: waterTempFeeds
          }],
          labels: feedDateTime,
          yaxis: {
            min: 0
          },
          colors: ['#4361ee'],
          tooltip: {
            x: {
              show: true,
            }
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: false
              }
            },
            padding: {
              top: 5,
              right: 0,
              left: 0
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .40,
              opacityTo: .05,
              stops: [100, 100]
            }
          }
        }

        // Humidity

        var d_1options5 = {
          chart: {
            id: 'sparkline1',
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          fill: {
            opacity: 1,
          },
          series: [{
            name: 'Humidity',
            data: humidityFeeds
          }],
          labels: feedDateTime,
          yaxis: {
            min: 0
          },
          colors: ['#00ab55'],
          tooltip: {
            x: {
              show: true,
            }
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: false
              }
            },
            padding: {
              top: 5,
              right: 0,
              left: 0
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .40,
              opacityTo: .05,
              stops: [100, 100]
            }
          }
        }

        // AirTemp

        var d_1options6 = {
          chart: {
            id: 'sparkline1',
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          fill: {
            opacity: 1,
          },
          series: [{
            name: 'Air Temp in Celcius',
            data: airTempFeeds
          }],
          labels: feedDateTime,
          yaxis: {
            min: 0
          },
          colors: ['#0098db'],
          tooltip: {
            x: {
              show: true,
            }
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: false
              }
            },
            padding: {
              top: 5,
              right: 0,
              left: 0
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .40,
              opacityTo: .05,
              stops: [100, 100]
            }
          }
        }

        // Distance

        var d_1options7 = {
          chart: {
            id: 'sparkline1',
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          fill: {
            opacity: 1,
          },
          series: [{
            name: 'Distance',
            data: distanceFeeds
          }],
          labels: feedDateTime,
          yaxis: {
            min: 0
          },
          colors: ['#ff7900'],
          tooltip: {
            x: {
              show: true,
            }
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: false
              }
            },
            padding: {
              top: 5,
              right: 0,
              left: 0
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .40,
              opacityTo: .05,
              stops: [100, 100]
            }
          }
        }

        /*
        ==============================
        Statistics | Script
        ==============================
        */

        // TDS

        var d_1C_5 = new ApexCharts(document.querySelector("#tds"), d_1options3);
        d_1C_5.render()

        // WaterTemp

        var d_1C_6 = new ApexCharts(document.querySelector("#waterTemp"), d_1options4);
        d_1C_6.render()

        // Humidity

        var d_1C_7 = new ApexCharts(document.querySelector("#humidity"), d_1options5);
        d_1C_7.render()

        // AirTemp

        var d_1C_8 = new ApexCharts(document.querySelector("#airTemp"), d_1options6);
        d_1C_8.render()

        // Distance

        var d_1C_9 = new ApexCharts(document.querySelector("#distance"), d_1options7);
        d_1C_9.render()
        //data.feeds
      })
      .catch(error => console.log(error));

    /*
    =============================================
    Perfect Scrollbar | Notifications
    =============================================
    */
    const ps = new PerfectScrollbar(document.querySelector('.mt-container'));

    /**
    * =================================================================================================
    * |     @Re_Render | Re render all the necessary JS when clicked on the button |
    * =================================================================================================
    **/

  } 
  
  function Re_Render() {
    fetchData();
  }

  setInterval(Re_Render, 5000);
}catch (e) {
  console.log(e);
}
});
