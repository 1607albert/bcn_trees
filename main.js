const distritosel = document.getElementById("contdistr");
const barrsel = document.getElementById("contbarr");
const results = document.getElementById("results");
const side = document.getElementById("close")
const containerSelector = document.getElementById("container-distritos");
const loadState = document.getElementById("status");
const itemSelector = document.getElementById("itemSelector");
const close = document.getElementById("close")
const sidebar = document.getElementById("sidebar")
let graphOptionSelecton = 0
let selectedOptionTxt = "Tots els Barris"
const resizer = document.getElementById('resizer')
let rightClass = "fa-angle-double-right"
let leftClass = "fa-angle-double-left"
const graphicZoom = document.getElementById('generalGraph')

let barrio = document.getElementById("");
let treeSpecies = 0;
let whereClause = "";
let arbres = [];
let entropiaBarrio = 0;
let entropiaDistrito = 0;
let entropiaResult = 0;
// console.log(results)
const graphTrees = document.getElementById("graphResult");
const numberOfTreesGraph = document.getElementById("graphNumberOfTrees");


const colorArray = [
  [232, 149, 151],
  [66, 135, 245],
  [135, 54, 103],
  [99, 24, 35],
  [96, 168, 148],
  [130, 145, 31],
  [145, 90, 31],
];

const fireflyColor = [
  "FireflyC1.png",
  "FireflyC3.png",
  "FireflyC5.png",
  "FireflyC9.png",
  "FireflyC12.png",
  "FireflyC16.png",
  "FireflyC18.png",
];

function sideDeploy(id) {

  let closeClass = close.classList[1];

  if (close.classList[1] == "fa-angle-double-left") {
    close.classList.remove(closeClass)
    close.classList.add(rightClass)
    graphTrees.classList.add("hide")
  } else {
    close.classList.remove(closeClass)
    close.classList.add(leftClass)
    graphTrees.classList.remove("hide")
  }

}

function minifyWindow(id) {
  const regex = "Min";
  let minClass = `fa-minus`;
  let icon = document.getElementById(id);
  let iconClassSelected = icon.classList[1];
  let minifyWindow = id.replace(regex, "");
  let windowToMinimize = document.getElementById(minifyWindow);

  if (iconClassSelected == minClass) {
    windowToMinimize.style.height = "2rem";
    windowToMinimize.style.overflow = "hidden"
    icon.classList.remove(minClass);
    icon.classList.add("fa-plus");
  } else {
    windowToMinimize.style.height = "fit-content";
    icon.classList.remove("fa-plus");
    windowToMinimize.style.overflow = "hidden auto"
    icon.classList.add(minClass);
  }
}

function graphSelector(id) {
  const regX = "sel";
  let selectorList = document.getElementById(id)
  let selection = selectorList.options[selectorList.selectedIndex].id
  let selectedOptionTxt = selectorList.options[selectorList.selectedIndex].value
  let selectedID = selection.replace(regX, "")
  graphLoad(selectedID, selectedOptionTxt)

}

function deploy(id) {
  let selected = document.getElementById(id);



  if (selected.nextSibling.nextSibling.classList == "hide") {
    selected.nextSibling.nextSibling.classList.remove("hide");
  } else {
    selected.nextSibling.nextSibling.classList.add("hide");
  }
}

function amplifyGraph(id) {
  let graphSelected = document.getElementById(id);

  if (graphSelected.classList == "zoomedOut") {  
    graphSelected.classList.remove("zoomedOut");
    graphSelected.classList.add("zoomedIn")
  } else {  
    graphSelected.classList.add("zoomedOut");
    graphSelected.classList.remove("zoomedIn");

  }

}

function deployArticles(id) {
  let selected = document.getElementById(id);

  if (selected.parentNode.nextSibling.classList == "hide") {
    selected.parentNode.nextSibling.classList.remove("hide");
    selected.style.transform = "rotateZ(0deg)"
  } else {
    selected.parentNode.nextSibling.classList.add("hide");
    selected.style.transform = "rotateZ(-90deg)"
  }

}

// function resizeMap(e) {
//   const container = document.getElementById("mainSection")
// let leftContainer = container.style.left;
// let rightContainer = container.style.width;
// container.onmouseup = function (e) {
//   console.log("hola")
//   resizer.removeEventListener(resizer.onmousedown, resizeMap)


// }
//   console.log("hola")
//   resizer.removeEventListener(resizer.onmousedown, resizeMap)

// }

// resizer.addEventListener("click", resizeMap)


// resizer.onmousemove = function (e) {

// }


// console.log("hola")
// function newWidht(xClick, width) {
//   container.style.right
// }

// resizer.addEventListener('mousedown', (a) => {
//   // const xposition = resizer.getBoundingClientRect()
//   // console.log(xposition.left)
//   const container = document.getElementById("mainSection")
//   const mapas = document.getElementById("viewDiv")

//   container.addEventListener('mousemove', (e) => {


//   })
//   container.addEventListener('mouseup', (e) => {
//     container.removeEventListener('mousemove', (e))


//   })

// container.addEventListener('mouseup', (e) => {
//   let xposition = mapas.getBoundingClientRect()
//   // console.log(xposition.right)

//   mapas.style.width = `${xposition.right-e.clientX}px`
//   // mapas.style.width = `${e.clientX}px`
//   console.log(window.screenLeft)
// })

graphLoad(graphOptionSelecton, selectedOptionTxt)

function graphLoad(selected, nameSelected) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let trees = JSON.parse(this.responseText);


      let treesNumberArray = [];
      let barriosArray = []
      if (selected != 0) {
        console.log("distinto de cero")
        console.log(trees.data[0])
        for (let i = 0; i < trees.data.length; i++) {
          if (trees.data[i][4] == selected) {
            barriosArray.push((trees.data[i][0]))
            treesNumberArray.push((trees.data[i][2]))
          }
        }

      } else {
        console.log("cero")
        for (let i = 0; i < trees.data.length; i++) {
          barriosArray.push((trees.data[i][0]))
          treesNumberArray.push((trees.data[i][2]))
        }
      }
      // const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      // entropiaDistrito = average(entropyArray).toFixed(4);
      // entropyArray = entropyArray.map(a => a.toFixed(3))
      let layout = {
        autosize: true,
        height: 700,


        title: '<b>Nº Arbres a:</b><br> ' + nameSelected,
        xaxis: {
          automargin: true,
          tickangle: 90
        },
        yaxis: {
          automargin: false,
          nticks: 10,

        }
      }
      let data = [{
        x: barriosArray,
        y: treesNumberArray,
        type: 'bar',
        textangle: -90
      }, ]
      Plotly.newPlot(
        numberOfTreesGraph, data, layout
      );

    }
  }


  xhttp.open("GET", `./skps/treeCountTotal.json`, true);
  xhttp.send();

};

let barrioList = [];
let entropyArray = [];

function deployBarr(id) {
  console.log(distritosel, barrsel)
  let selected = document.getElementById(id);

  if (selected.classList != "selected") {

    selected.classList.add("selected")
    itemSelector.classList.add("scrollOff");

    let nodeLength = selected.children[0].children.length;
    let nodeList = [];
    let barrioList = [];
    for (let x = 0; x < nodeLength; x++) {
      // console.log(selected.children[0].children[x].id);
      nodeList.push(selected.children[0].children[x].id);
      barrioList.push(selected.children[0].children[x].innerText);
    }
    let districtName = selected.innerText


    let xhttp = new XMLHttpRequest();
    sidebar.classList.remove("hide")



    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let entropy = JSON.parse(this.responseText);
        let entropyArray = [];


        for (let x = 1; x < nodeList.length + 1; x++) {
          entropyArray.push(entropy.entropia[x]);
        }
        const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        entropiaDistrito = average(entropyArray).toFixed(4);
        entropyArray = entropyArray.map(a => a.toFixed(3))
        let layout = {
          title: '<b>Biodiversitat(0-1)</b><br>Districte: ' + districtName,
          xaxis: {
            automargin: true,
            tickangle: 90
          },
          yaxis: {
            automargin: false,
            nticks: 10,

          }
        }
        let data = [{
          x: barrioList,
          y: entropyArray,
          type: 'bar',
          text: entropyArray.map(String),
          textangle: -90
        }, ]
        Plotly.newPlot(
          graphTrees, data, layout
        );

      }

    };
    xhttp.open("GET", `./skps/entropy.json`, true);
    xhttp.send();
    sidebar.classList.add("show")

    console.log(selected.parentElement)
    if (selected.children[0].classList == "hide") {
      selected.children[0].classList.remove("hide");
    } else {
      selected.children[0].classList.add("hide");
    }

    if (selected.offsetHeight > 15) {
      itemSelector.classList.add("scroll");
    } else {
      itemSelector.classList.remove("scroll");
    }
    selected.classList.remove("selected")
  }

}

function deployDistritos(id) {
  selected = document.getElementById(id);
  distritosel.innerHTML = parseInt(id.slice(5));
  sidebar.style.display = "flex"
  // sidebar.classList.add("show")
}

function deployBarrios(id) {


  sidebar.classList.remove("show")
  sidebar.classList.add("hide")
  // sidebar.style.display = "none"
  barrio = document.getElementById(id);
  selected = document.getElementById(id);
  barrsel.innerHTML = parseInt(id);


  // console.log(distritosel.innerHTML);
  let xhttp = new XMLHttpRequest();


  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let entropy = JSON.parse(this.responseText);
      let dimEntropy = Object.values(entropy.entropia);

      // for (let x = 0; x < 74; x++) {

      //   console.log(entropy.entropia[x]);
      // }

      entropiaBarrio = entropy.entropia[barrio.id].toFixed(4);
      barrio = null;
    }
  };
  xhttp.open("GET", `./skps/entropy.json`, true);
  xhttp.send();

}


require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/rest/support/Query",
  "esri/views/layers/LayerView",
  "esri/layers/GeoJSONLayer",
  "esri/rest/support/StatisticDefinition",
  "esri/renderers/UniqueValueRenderer",
  "esri/views/SceneView",
  "esri/widgets/Legend",
], function (
  esriConfig,
  Map,
  MapView,
  FeatureLayer,
  Query,
  LayerView,
  GeoJSONLayer,
  StatisticDefinition,
  UniqueValueRenderer,
  SceneView,
  Legend
) {
  const map = new Map({
    basemap: "streets-night-vector", // Basemap layer service
    ground: "world-elevation",
  });

  // const colorSela = {
  //   type: "simple-marker",
  //   style: "circle",
  //   color: "red",
  //   size: "8px",
  // };
  const defaultrender = {
    type: "picture-marker",
    url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyA12.png",
    // color: [29, 139, 29],
    size: "8px",
  };
  //   featureLayer.renderer = {
  //     type: "simple",
  //     symbol: {
  //         type: "picture-marker",
  //         url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyB3.png",
  //         width: 24,
  //         height: 24
  //     }
  // }

  const districtSelection = 0;
  const renderer = {
    type: "unique-value",
    field: "nom_cientific",
    defaultSymbol: defaultrender,
  };

  const view = new MapView({
    map: map,
    center: [2.16, 41.4], // Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv", // Div element
  });

  // const view = new SceneView({
  //   map: map,
  //   center: [2.16, 41.4], // Longitude, latitude
  //   zoom: 13, // Zoom level
  //   container: "viewDiv", // Div element
  //   // camera: {
  //   //   position: [2.18, 41.26, 12500],
  //   //   tilt: 47,
  //   // },
  // });
  const popupArboles = {
    title: "Arbres",
    content: `<b>Especie de l'arbre: </b>{nom_cientific}`,

  };
  const arbolesPuntosFeature = new GeoJSONLayer({
    url: "/urbantreesbcn.geojson",
    outFields: ["nom_cientific"],
    renderer: renderer,
    popupTemplate: popupArboles,
  });

  // map.add(arbolesPuntosFeature); // adds the layer to the map

  function zoomExtent() {
    arbolesPuntosFeature
      .when(() => {
        return arbolesPuntosFeature.queryExtent();
      })
      .then((response) => {
        view.goTo(response.extent);
        // console(response);
      });
  }

  function arrTree(arr) {

    // deployBarrios()
    let orderArray = [];
    let legendArray = [];
    let features = arr.features;
    let contador = 0;
    let otherSpecies = 0;
    let colorSel;

    // console.log(graph.childElementCount)

    // graph.innerHTML = '<i id = "graphSelectorMin" class = "fas fa-minus" onclick = "minifyWindow(this.id)">Gráfic biodiversitat </i> </br>'


    results.innerHTML =
      `<div id= "resultats"><i  id="resultsMin" class="fas fa-minus" onclick="minifyWindow(this.id)"> Resultats</i></div> </br>` +
      `<b>Arbres Totals a la selecció:</b> ${treeSpecies}</br>`;

    // console.log(arr);
    for (let item = 0; item < features.length; item++) {
      let items = features[item].attributes.items;
      let specie = features[item].attributes.nom_cientific;

      orderArray.push([items, specie]);
    }
    orderArray.sort(function (a, b) {
      if (a[0] > b[0]) {
        return -1;
      }
      if (a[0] < b[0]) {
        return 1;
      }
      return 0;
    });
    for (let item = 0; item < 7; item++) {
      // let colorCase = `rgb(${colorArray[item][0]},${colorArray[item][1]},${colorArray[item][2]});`;
      let colorCasebckg = `rgb(${colorArray[item][0]},${colorArray[item][1]},${colorArray[item][2]},0.9);`;
      // console.log(colorCase);
      results.innerHTML =
        results.innerHTML +
        "</br>" +
        `<span class="dot" style=";background-color:rgb(255, 255, 255);box-shadow: 0px 0px 15px 7px ${colorCasebckg};"></span>
        ${orderArray[item][1]}  : ` +
        orderArray[item][0] +
        "</br>";
      contador = contador + orderArray[item][0];
      // Sección para classificar resultados por colores en la vista
      let val = orderArray[item][1];

      colorSel = {
        type: "picture-marker",
        url: "https://static.arcgis.com/images/Symbols/Firefly/" +
          fireflyColor[item],
        size: "8px",
      };
      legendArray.push({
        value: val,
        symbol: colorSel
      });
    }
    renderer.uniqueValueInfos = legendArray;
    arbolesPuntosFeature.renderer = renderer;
    otherSpecies = Math.abs(treeSpecies - contador);
    results.innerHTML =
      results.innerHTML +
      "</br>" +
      `<span class="dot" style="background-color:rgb(29, 139, 29);box-shadow: 0px 0px 15px 5px rgb(29, 139, 29);"></span>Altres espècies: ` +
      otherSpecies +
      "</br> </br>" +
      "Índex de Biodiversitat (0-1): " +
      entropiaBarrio;
  }

  let queryTree2 = arbolesPuntosFeature.createQuery();
  queryTree2.outStatistics = [{
    statisticType: "count",
    statisticsParameters: {
      orderBy: "DESC",
    },
    onStatisticField: "nom_cientific",
    outStatisticFieldName: "items",
  }, ];
  queryTree2.orderByFields = ["nom_cientific"];
  queryTree2.groupByFieldsForStatistics = ["nom_cientific"];

  let queryTree = arbolesPuntosFeature.createQuery();
  queryTree.outFields = "nom_cientific";

  containerSelector.addEventListener("click", function () {

    close.classList.remove(rightClass)
    close.classList.add(leftClass)
    results.classList.remove("hide");
    // console.log(distritosel)

    let distritoselected = distritosel.innerHTML;

    if ((distritosel.innerHTML == "") & (distritosel.innerHTML == "0")) {
      graphTrees.classList.remove("hide")
      side.classList.remove("hide")
      results.innerHTML = "";
      results.innerHTML = "</br>" + `Seleccioneu un barri o districte </br>`;
    }
    if ((distritosel.innerHTML != "") & (distritosel.innerHTML != "0")) {
      graphTrees.classList.remove("hide")
      side.classList.remove("hide")
      results.innerHTML = "";
      x = 0;
      queryTree2.where = `vehicles_Codi_districte ='${distritosel.innerHTML}'`;
      entropiaBarrio = 0;
      arbolesPuntosFeature.definitionExpression = `vehicles_Codi_districte ='${distritosel.innerHTML}'`;
      arbolesPuntosFeature.queryFeatures().then((respuesta) => {
        treeSpecies = respuesta.features.length;
        arbolesPuntosFeature.queryFeatures(queryTree2).then((res) => {
          results.innerHTML =
            "</br>" +
            `Arbres Totals a la selecció: ${treeSpecies}</br>` +
            results.innerHTML;

          arrTree(res);

          zoomExtent();
        });
      });


      if ((barrio != null) & (distritoselected == distritosel.innerHTML)) {
        graphTrees.classList.add("hide")
        side.classList.add("hide")

        arbolesPuntosFeature.definitionExpression = `codi_barri IN (${barrio.id})`;
        queryTree2.where = "codi_barri=" + barrio.id;

        zoomExtent();

        // console.log(barrio);
      }

      // treeFunc(barrio.id);
    }

    map.add(arbolesPuntosFeature);
  });

  view.watch("updating", function (evt) {
    if (evt === true) {
      loadState.classList.remove("hide");
      loadState.classList.add("show");
    } else {
      loadState.classList.add("hide");

    }
  });
});