Vue.component('myinput', {
    props: ['valor'],
    template: '<div><input type="text" v-bind:value="valor"><button >Reverse Message</button></div>'//v-on:click="faz"
    })

//var t = gsap.timeline();
//register the plugin (just once)
gsap.registerPlugin(MotionPathPlugin);

/* document.body.addEventListener('load',()=>{
    var draw = SVG().addTo('#myDiv').size(300, 300)
    var rect = draw.rect(100, 100).attr({ fill: '#f06' })
}) */

SVG.on(document, 'DOMContentLoaded', function() {
    //var draw = SVG().addTo('body')
    var draw = SVG('#entre')//.addTo('#myDiv') //.size(300, 300)
    fetch('http://localhost:8000/assets/sat_scene.svg').then(function(response) {
        if(response.ok) {
          response.text().then(function(mytext) {
            console.log(mytext);
            draw.svg(mytext,true);

            let path = SVG('#caminho');
            let sat = SVG('#satelite');
            sat.animate(8000, '<>').during(function(pos){
                var p = path.pointAt(pos* length)
                sat.center(p.x, p.y)
            }).loop(true, true)
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
    /* .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      }); */

    
    //var rect = draw.rect(100, 100).attr({ fill: '#f06' })
})



document.body.addEventListener('DOMContentLoaded',()=>{
    
    console.log("foi!");
})
//var D = document.createElement('div');
//gsap.set('svg',{overflow:"visible"})

/* var tl = gsap.timeline({paused:true})
    .to("#satelite", {
        motionPath: {
            path: "#caminho",
            align: "#caminho",
            start: 0,
            end: 1,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        duration: 1,
    }); */

/* gsap.to("#satelite", {
        motionPath: {
            path: "#caminho",
            align: "#caminho",
            end: 0,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        duration: 0,
    }); */


/* Draggable.create("#circ",{//trigger:"#satelite",
type:'x,y',
//bounds:"#caminho",//{minX:0,maxX:300},
onDrag: function (){
    //tl.progress(Math.abs(this.x/300));
    console.log(this.x);
},
onClick: function (){
    console.log("click");
},
onMove: function (){
    console.log("move");
},
});   */ 
var satPos = 0;

function moveSat(tanto){
    gsap.to("#satelite", {
        motionPath: {
            path: "#caminho",
            align: "#caminho",
            start: satPos,
            end: tanto,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        duration: 2,
        ease: "power1.inOut",
        yoyo: true
    });
    satPos = tanto;
}

var mv = new Vue({
el: '#myDiv',
data: {
    x: 0,
    y: 0,
    scale: 1,
    deslocamento: 0,
},
methods: {
    pisca: function () {
        gsap.to('#estrelas',{duration:1,repeat:-1,yoyo:true,opacity:0}) 
    },
    terra: function () {
        moveSat(0);
    },
    jupiter: function () {
        moveSat(0.3);
    },
    fora: function () {
        moveSat(1);
    },
    calTranf: function (){
        return "translate(" + this.x + "," + this.y  + ") scale("+ this.scale + ")"
    }
}
})



/* var D = document.createElement('div');
gsap.set('svg',{overflow:"visible"})
gsap.set('#satelite',{x:10,y:80})

var tl = gsap.timeline({paused:true})
.from("#path2",1,{stroke:'orange'})
.to("#satelite", {
            motionPath: {
                path: "#caminho",
                align: "#caminho",
                end: 1,
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 1,
        },'-=1');

Draggable.create(D,{trigger:"#satelite",
type:'x',
//bounds:{minX:0,maxX:300},
onDrag:Update});   
function Update(){tl.progress(Math.abs(this.x/400))}; */