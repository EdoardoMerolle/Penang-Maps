// document.addEventListener("DOMContentLoaded", () => {

  document.querySelector(".openCloseBtn").addEventListener("click", function() {
    document.getElementById("openCloseIcon").classList.toggle("open");
    document.getElementById("wrapper2").classList.toggle("open");
  })


  function OpenOrClose2(x) {
    // document.getElementById("openCloseIcon-2").classList.toggle("open");
    x.classList.toggle("open");
    document.getElementById("rcp-filter").classList.toggle("open");
    document.getElementById("rcp-btns").classList.toggle("open");
    document.getElementById("filter-box").classList.toggle("open");
  }

  function OpenOrClose3(x) {
    // document.getElementById("openCloseIcon-3").classList.toggle("open");
    x.classList.toggle("open");
    document.querySelector(".weather-container").classList.toggle("open");
    var weatherBoxes = document.querySelectorAll(".weather-box");

    weatherBoxes.forEach(weatherBox => {
      weatherBox.classList.toggle("open");
    })
  }

// });

