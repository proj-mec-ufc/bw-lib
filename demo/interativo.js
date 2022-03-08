SVG.on(document, 'DOMContentLoaded', function() {
    //var draw = SVG().addTo('body')
    var draw = SVG('#contar')//.addTo('#myDiv') //.size(300, 300)
    fetch('http://localhost:8000/contar.svg').then(function(response) {
        if(response.ok) {
          response.text().then(function(mytext) {
            console.log(mytext);
            draw.svg(mytext,true);

            let groups = SVG('#contar').find('g')
            groups.each(element => {
                console.log(element.attr('id'));
                element.on("mouseover",(e)=>{
                    //console.log(element);
                    element.each((f,c)=>{
                        console.log(c.id())
                        c.css({fill: '#f25b47' })
                    });
                });
                element.on("mouseout",(e)=>{
                    //console.log(element);
                    element.each((f,c)=>{
                        console.log(c.id())
                        c.css({fill: '#8c8c8c' })
                    });
                });
            });
            /* let path = SVG('#caminho');
            let sat = SVG('#satelite');
            sat.animate(8000, '<>').during(function(pos){
                var p = path.pointAt(pos* length)
                sat.center(p.x, p.y)
            }).loop(true, true) */
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
})