function iterativeSVG(file, element, callback) {
    if (SVG) {
      SVG.on(document, 'DOMContentLoaded', function () {
        var draw = SVG(element)
        let id =draw.id();
        fetch(file).then(function (response) {
            if (response.ok) {
              response.text().then(function (mytext) {
                let add = draw.group();
                add.svg(mytext);
                let root = add.first();
                root.id(id);
                draw.after(root);
                draw.remove();
  
                if (callback)
                  callback(root);
  
              });
            } else {
              console.log('Network response was not ok.');
            }
          })
          .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          });
      })
    }
  }
if(SVG){
(function () {
    var wiStyle = `
:host{
    }
.target { 
    background: transparent;
    background: #0f82f2;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    line-height: 28px;
    margin: -3px 2px;
    padding: 0px;
    position: relative;
    text-align: center;
    transition: border-radius .2s,background .2s,color .2s,margin .2s,padding .2s,width .2s,min-width .2s,box-shadow .2s;
}
.target::before {
        background: none;
        bottom: 1px;
        content: " ";
        height: 3px;
        left: 5px;
        position: absolute;
        right: 5px; }
input {   
    background: none !important;
    color: #fff;
    margin: 0;
    min-width: 60px;
    text-align: center;
    width: 40px;            
    cursor: text;
    display: inline-block;
    border: none;
    padding: 0;
    font-family:inherit;
    font-size:inherit;
    font-weight:inherit; }
input::placeholder {
    color: #fff; }
*:focus {
    outline: none !important; 
}
.target.invalid:before {
    background:#cd0e66;
    border-radius:5px 0 0 5px;
    bottom:0;
    color:#fff;
    content:"×";
    display:block;
    font-weight:700;
    height:auto;
    left:0;
    line-height:1;
    padding:4px 0 3px;
    position:absolute;
    text-align:center;
    top:0;
    width:20px
}    
.target.on,
.target:hover {
    box-shadow:0 0 10px rgba(0,0,0,.2)
}
.target.done {
    background:transparent;
    background-image:none;
    box-shadow:none;
    color:#0f82f2;
    cursor:default;
    display:inline;
    margin:0;
    min-width:0;
    padding:1px 0 0
   }
.target.invalid {
    padding-left:20px
}
::-moz-selection { /* Code for Firefox */
    color: blue;
    background: white;
  }
  
  ::selection {
    color: blue;
    background: white;
  }
    `;
    var wsStyle = `
    :host {
        display:inline-block;
        position:relative
    }
    button {
        background:transparent;
        display:inline-block;
        font-family:inherit;
        font-size:inherit;
        font-weight:inherit
    }
    .done {
        display:inline;
        white-space:normal
    }
    .target {
        -webkit-touch-callout:none;
        background:transparent;
        background:#0f82f2;
        border-radius:6px;
        color:#fff;
        cursor:pointer;
        display:inline-block;
        line-height:28px;
        min-width:50px;
        padding:0px
        margin:-3px 2px;
        position:relative;
        text-align:center;
        transition:border-radius .2s,background .2s,color .2s,margin .2s,padding .2s,width .2s,min-width .2s,box-shadow .2s
    }
    .target:before {
        background:none;
        bottom:1px;
        content:" ";
        height:3px;
        left:5px;
        position:absolute;
        right:5px
    }
    .on .target,
    .target:hover {
        box-shadow:0 0 10px rgba(0,0,0,.2)
    }
    .invalid .target {
        padding-left:30px
    }
    .invalid .target:before {
        background:#cd0e66;
        border-radius:5px 0 0 5px;
        bottom:0;
        color:#fff;
        content:"×";
        display:block;
        font-weight:700;
        height:auto;
        left:0;
        line-height:1;
        padding:4px 0 3px;
        position:absolute;
        text-align:center;
        top:0;
        width:20px
    }
    .done .target {
        background:transparent;
        background-image:none;
        box-shadow:none;
        color:#0f82f2;
        cursor:default;
        display:inline;
        margin:0;
        min-width:0;
        padding:1px 0 0
    }
    .done .target:hover {
        color:#0f82f2
    }
    .popup {
        background:#0e75da;
        border-radius:0 6px 6px 6px;
        box-shadow:0 0 20px rgba(0,0,0,.3);
        font-style:normal;
        left:2px;
        min-width:90px;
        opacity:0;
        pointer-events:none;
        position:absolute;
        text-align:left;
        top:100%;
        transform:scale(.5);
        transform-origin:left top;
        transition:opacity .2s,transform .2s;
        white-space:normal;
        width:-webkit-max-content;
        width:-moz-max-content;
        width:max-content
    }
    .left .popup {
        border-radius:6px 0 6px 6px;
        left:auto;
        right:2px;
        transform-origin:right top
    }
    .top .popup {
        border-radius:6px 6px 6px 0;
        bottom:100%;
        top:auto;
        transform-origin:left bottom
    }
    .left.top .popup {
        border-radius:6px 6px 0 6px;
        transform-origin:right bottom
    }
    .on .popup,
    :focus-within .popup{
        z-index:100
    }
    .on .target,
    .target:focus-within {
        border-radius:5px 5px 0 0
    }
    .on.top .target,
    .top:focus-within .target {
        border-radius:0 0 5px 5px
    }
    .on.invalid .target:before,
    .invalid:focus-within .target:before { /*  */
        border-radius:5px 0 0 0
    }
    .on.top.invalid .target:before,
    .top.invalid .target:before {
        border-radius:0 0 0 5px
    }
    .on .popup,
    :focus-within .popup {
        opacity:1;
        pointer-events:all;
        transform:none
    }
    .choice {
        box-sizing:border-box;
        color:hsla(0,0%,100%,.8);
        cursor:pointer;
        display:block;
        font-size:16px;
        line-height:22px;
        padding:6px 16px 6px 12px;
        text-align:left;
        transition:color .2s,background .2s,box-shadow .2s;
        width:100%
    }
    .choice:focus,
    .choice:hover {
        background:hsla(0,0%,100%,.2);
        color:#fff
    }
    .choice:first-child {
        border-top-right-radius:6px
    }
    .choice:last-child {
        border-radius:0 0 6px 6px
    }
    .choice:before {
        background:hsla(0,0%,100%,.5);
        content:" ";
        display:block;
        height:1px;
        left:12px;
        margin-top:-6px;
        position:absolute;
        right:16px;
        transition:background .2s
    }
    .choice:first-child:before,
    .choice:focus+.choice:before,
    .choice:focus:before,
    .choice:hover+.choice:before,
    .choice:hover:before {
        background:transparent
    }
    `;

    class winput extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();

            this.solution = "";
            this.solutionNum = NaN;
            this.solutionDisplay = "";
            this.range = 0;
            this.input = "";
            this.hint = "";
            this.attempts = 0;
            this.placeholder = "???";
            this.done = false;

            //'<label class="target"><input maxlength="15" autocomplete="off" aria-label="Fill in this blank"></label>';

            // write element functionality in here
            // Create a shadow root
            let shadow = this.attachShadow({
                mode: 'open'
            }); // sets and returns 'this.shadowRoot'

            this.innerLabel = document.createElement('label');
            //this.innerLabel.id = "base"
            this.innerLabel.classList.add('target');
            shadow.appendChild(this.innerLabel);

            /*            this.displayLabel = document.createElement('label');
                       this.displayLabel.id = "display"
                       this.displayLabel.innerHTML = "disp";
                       //this.innerLabel.classList.add('target');
                       shadow.appendChild(this.displayLabel); */

            this.innerInput = document.createElement('input');
            this.innerInput.setAttribute("maxlength", "15");
            this.innerInput.setAttribute("autocomplete", "off");
            this.innerInput.setAttribute("aria-label", "Fill in this blank");
            this.innerLabel.appendChild(this.innerInput);


            this.setAttribute("solved", "false");
            //this.syle = 'display: inline-block; position: relative;';

            // Create some CSS to apply to the shadow dom
            const style = document.createElement('style');
            style.textContent = wiStyle;

            shadow.appendChild(style);

        }

        connectedCallback() {
            this.solution = this.getAttribute("solution");
            /* if (this.solution.indexOf("\xB1") >= 0) {
              const split = this.solution.split("\xB1");
              this.solution = split[0].trim();
              this.range = +split[1];
            } */
            if (this.hasAttribute("range"))
                this.range = +this.getAttribute("range");
            this.solutionNum = +this.solution;
            this.solutionDisplay = this.solution;
            this.hint = this.getAttribute("hint");
            /*         this.removeAttribute("solution");
                    this.removeAttribute("hint"); */
            //this.innerInput.setInputPattern(this.solution);
            if (!isNaN(+this.solution)) {
                const digitsOnly = this.solution.match(/^[0-9]+$/);
                this.setAttribute("inputmode", digitsOnly ? "numeric" : "decimal");
                if (digitsOnly)
                    this.setAttribute("pattern", "[0-9]*");
            }


            if (this.hasAttribute("placeholder"))
                this.placeholder = this.getAttribute("placeholder");
            this.innerInput.setAttribute("placeholder", this.placeholder);
            this.removeAttribute("placeholder");
            this.innerInput.onchange = (value) => {
                this.input = value;
                if (this.isCorrect()) {
                    this.solve();
                    //this.trigger("valid", value);
                    this.dispatchEvent(new Event('valid', value));
                    //this.moveCursor();
                }
            };
            this.innerInput.onkeydown = (e) => {
                if (e.key == 'Enter') this.innerInput.blur()
            };
            this.innerInput.onfocus = () => {
                this.innerLabel.classList.add("on");
                this.innerLabel.classList.remove("invalid");
                this.innerInput.setAttribute("placeholder", " ");
            };
            this.innerInput.onblur = () => {
                this.innerLabel.classList.remove("on");
                if (!!this.input && !this.done)
                    this.innerLabel.classList.add("invalid");
                //this.innerLabel.className = "invalid";
                this.innerInput.setAttribute("placeholder", this.placeholder);
                if (this.input && !this.done) {
                    this.attempts += 1;
                    const hint = this.attempts >= (this.hint ? 4 : 3) ? `Hmmm\u2026 maybe try ${this.solution}?` : this.attempts >= 2 ? this.hint : void 0;
                    //this.trigger("invalid", {hint});
                    this.dispatchEvent(new Event('invalid', {
                        hint
                    }));
                }
            };

            this.dispatchEvent(new Event('ready'));
        }
        isCorrect() {
            if (this.done)
                return true;
            /*         if (this.linkedBlanks) {
                      const solved = this.linkedBlanks.map((b2) => b2.solvedBlank);
                      this.solvedBlank = this.linkedBlanks.find((b2) => {
                        if (b2.done && !b2.solvedBlank)
                          return false;
                        if (solved.includes(b2))
                          return false;
                        if (b2.checkAnswer(this.input))
                          return true;
                      });
                      if (this.solvedBlank)
                        this.solutionDisplay = this.solvedBlank.solution;
                      return !!this.solvedBlank;
                    } */
            return this.checkAnswer(this.innerInput.value);
        }
        checkAnswer(input) {
            const inputNum = +input;
            if (input.toLowerCase() === this.solution.toLowerCase())
                return true;
            if (!isNaN(this.range) && Math.abs(inputNum - this.solutionNum) <= this.range) {
                this.solutionDisplay = input;
                return true;
            }
            return false;
        }
        /*       moveCursor() {
                if (!this.$step)
                  return;
                const $next = this.$step.$blanks[this.$step.$blanks.indexOf(this) + 1];
                if (!$next || $next.done || $next.tagName === "X-BLANK-MC")
                  return;
                if ($next.css("visibility") === "hidden" || !$next.bounds.width)
                  return;
                $next.focus();
              } */
        solve() {
            this.done = true;
            this.innerInput.remove();
            this.innerLabel.innerHTML = this.solutionDisplay;
            this.innerLabel.classList.add("done");
            //this.trigger("solve", {solution: this.solutionDisplay, restore});
            this.setAttribute("solved", "true");
            this.dispatchEvent(new Event('solve', {
                bubbles: true
            }));
        }
        focus() {
            this.innerInput.focus();
        }
        blur() {
            this.innerInput.blur();
        }

        /*       setup($step, goal, userData) {
                var _a4;
                this.goal = goal;
                this.$step = $step;
                if ((_a4 = userData == null ? void 0 : userData.scores) == null ? void 0 : _a4.includes(goal))
                  this.solve(true);
                this.one("valid", () => {
                  $step.addHint("correct");
                  $step.score(this.solvedBlank ? this.solvedBlank.goal : goal);
                });
                this.on("invalid", (e) => $step.addHint(e.hint || "incorrect", {class: "incorrect"}));
              } */
    }

    customElements.define('w-i', winput);

    // W-S -----------------------------------------------------
    class wstep extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();

            this.visible = false;
            this.complete = false;
            //this.components = []


            let ihtml = this.innerHTML;
            this.innerHTML = '';
            this.base = document.createElement('div');
            this.base.style.opacity = "0";
            //this.base.style.display = "none";
            this.base.style.transition = "opacity 2s";

            this.appendChild(this.base);
            this.base.innerHTML = ihtml;

            /*  this.addEventListener("ready", (e) => {
                 e.stopPropagation();
                 //console.log(e.target.id);
                 this.components.push(e.target);
             }); */

            this.base.addEventListener("solve", (e) => {
                e.stopPropagation();
                let remaining = this.base.querySelectorAll("[solved='false']");
                if (remaining.length == 0) {
                    this.complete = true;
                    nextStep();
                }
            });

            // Create some CSS to apply to the shadow dom
            /* const style = document.createElement('style');
            style.textContent = `
            @keyframes example {
                from {opacity: 0;}
                to {opacity: 1;}
              }
            .show {
                animation-name: example;
                animation-duration: 400ms;
            }
            `;

            // Create a shadow root
            let shadow = this.attachShadow({
                mode: 'open'
            }); // sets and returns 'this.shadowRoot'

            shadow.appendChild(style); */
        }
        connectedCallback() {
            this.dispatchEvent(new Event('ready'));
        }
        reveal() {
            //this.style.visibility = "visible";
            //this.classList.add("show");
            //this.base.classList.add("show");
            this.base.style.display = "block";
            this.base.style.opacity = "1";
            //SVG(this.base).animate(2000).css('opacity','1');
            this.visible = true;
        }
    }
    customElements.define('w-s', wstep);

// W-M -----------------------------------------------------
    class wselect extends HTMLElement {
        constructor() {
            super(...arguments);

            //this.solution = "";

            this.hint = "";
            this.attempts = 0;
            this.done = false;

            // write element functionality in here
            // Create a shadow root
            let shadow = this.attachShadow({
                mode: 'open'
            }); // sets and returns 'this.shadowRoot'

            this.base = document.createElement('span');
            shadow.appendChild(this.base);

            this.targetSpan = document.createElement('span');
            this.targetSpan.classList.add("target");
            this.targetSpan.setAttribute("tabindex", '0');
            this.targetSpan.setAttribute("aria-label", 'Fill in this blank');
            this.targetSpan.textContent = '???';
            this.base.appendChild(this.targetSpan);


            this.popupDiv = document.createElement('div');
            this.popupDiv.classList.add("popup");
            this.base.appendChild(this.popupDiv);

            this.setAttribute("solved", "false");
            //this.syle = 'display: inline-block; position: relative;';

            // Create some CSS to apply to the shadow dom
            const style = document.createElement('style');
            style.textContent = wsStyle;

            shadow.appendChild(style);
        }
        connectedCallback() {

            var choices = this.getAttribute("choices");
            choices = choices.split(';');
            this.choices = choices.filter(v => v.trim().length > 0);
            this.solution = choices[0];

            choices = this.shuffle(choices);
            choices.forEach((v, i) => {
                let option = document.createElement('button');
                option.classList.add("choice");
                this.popupDiv.append(option);
                option.textContent = v;
                option.addEventListener("click", (e) => {
                    this.base.classList.remove("on");
                    option.blur();
                    if (option.textContent === this.solution) {
                        this.solve();
                    } else {
                        this.targetSpan.textContent = option.textContent;
                        this.base.classList.remove("invalid");
                        this.dispatchEvent(new Event('invalid'));
                    }
                })
            });

            const goLeft = this.targetSpan.getBoundingClientRect().left + this.popupDiv.width > window.innerWidth - 15;
            if (goLeft)
                this.base.classList.add("left");
            else
                this.base.classList.remove("left");

            this.base.addEventListener("click", () => {
                this.open();
            });
            this.base.addEventListener("mouseover", () => {
                this.open();
            });
            this.base.addEventListener("focus", () => {
                this.open();
            });
            this.base.addEventListener("blur", () => {
                this.exit();
            });
            this.base.addEventListener("mouseout", () => {
                this.exit();
            });
            
            this.dispatchEvent(new Event('ready'));
        }
        solve() {
            this.done = true;
            this.targetSpan.textContent = this.solution;
            this.base.classList.remove("on");
            this.base.classList.remove("invalid");
            this.base.classList.add("done");
            this.base.removeChild(this.popupDiv);
            this.base.removeAttribute('tabindex');
            //this.trigger("solve", {solution: this.solutionDisplay, restore});
            this.setAttribute("solved", "true");
            this.dispatchEvent(new Event('solve', {
                bubbles: true
            }));
        }
        open() {
            //this.targetSpan.getBoundingClientRect().left + this.popupDiv.width > window.innerWidth - 15;
            if (this.done)
                return;
            this.base.classList.add("on");
            const targetBounds = this.base.getBoundingClientRect();
            const popupWidth = this.popupDiv.width;
            const popupHeight = this.popupDiv.height;
            const maxWidth = window.innerWidth - 10 - targetBounds.left;
            const spaceOnRight = popupWidth < maxWidth;
            const spaceOnLeft = targetBounds.right - popupWidth > 10;
            const spaceBelow = targetBounds.top + targetBounds.height + popupHeight > window.innerHeight - 10;
            if(spaceOnLeft && !spaceOnRight)
                this.base.classList.add("left");
            if(spaceBelow)
                this.base.classList.add("top");
            this.popupDiv.style.setProperty("max-width", !spaceOnLeft && !spaceOnRight ? `${maxWidth}px` : "none");
        }
        exit() {
            this.base.classList.remove("on");
        }
        shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        }
    };
    customElements.define('w-m', wselect);    

    var steps;
    var currentStep;

    function nextStep() {
        currentStep++;
        if (currentStep < steps.length) {
            steps[currentStep].reveal();
        }
    }

    function showAllSteps(){
        steps.forEach((step)=>{
            step.reveal();
        });
    }

    window.addEventListener("load", () => {
        console.log('load event');

    })
    window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
        steps = document.querySelectorAll("w-s");
        currentStep = -1;
        nextStep();
    });

    let openLink = document.createElement('a');
    openLink.textContent = "mostrar tudo";
    openLink.style.color = "blue";
    openLink.onclick = showAllSteps;
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(openLink);
})();
}

/* OLD --------------------------------------------------
// $$ -> querySelectorAll
// $ -> querySelector
// $N -> cria/habilita tag no ambiente (SVG)
// setAttr -> setAttribute // attr -> getAttribute
// e.bounds  getBoundingClientRect
Browser.width = window.innerWidth;
Browser.height = window.innerHeight;
d = `M${p.map((x) => `${x.x},${x.y}`).join("L")}`
*/


  // ../../frontend/components/target/target.ts
  function connect(from, to, fromShift, toShift) {
    const fromPoint = new Point2(from.left - 15, from.top + fromShift - 15);
    const fromRect = new Rectangle2(fromPoint, from.width + 30, from.height + 30);
    const toPoint = new Point2(to.left - 15, to.top + toShift - 15);
    const toRect = new Rectangle2(toPoint, to.width + 30, to.height + 30);
    const path = new Segment2(fromRect.center, toRect.center);
    return [intersections2(path, fromRect)[0], intersections2(path, toRect)[0]];
  }
  function distance(a2, b2) {
    return Math.abs(a2[0] - b2[0]) + Math.abs(a2[1] - b2[1]);
  }

  {/* <svg>
        <defs>
            <mask id="masking">
                <rect width="100%" height="100%" fill="white"></rect>
            </mask>
        </defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z"></path>
        </marker>
        <rect x="0" y="0" width="100%" height="100%" mask="url(#masking)" opacity="0.8"></rect>
        <path class="target-arrow" stroke-width="5" marker-end="url(#arrow)" opacity="0.4" stroke-linecap="round"></path>
    </svg> */}

    /* .target-body {
        display:none;
        height:100%;
        left:0;
        opacity:0;
        pointer-events:none;
        position:fixed;
        top:0;
        transform:translateZ(0);
        transition:opacity .3s;
        width:100%;
        will-change:opacity;
        z-index:900
       }
       .target-body>rect {
        fill:#fff
       }
       .target-body #arrow path {
        fill:#000
       }
       .target-body .target-arrow {
        stroke:#000
       }

    <svg class="target-body" style="display: block; opacity: 0.5;">
        <defs><mask id="masking">
            <rect width="100%" height="100%" fill="white"></rect>
            <rect x="276.265625" y="202.796875" width="85.734375" height="35" rx="18" ry="18"></rect>
            <rect x="158.239990234375" y="497.72747802734375" width="68.260009765625" height="68.260009765625" rx="4" ry="4"></rect>
        </mask></defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z"></path>
        </marker>
        <rect x="0" y="0" width="100%" height="100%" mask="url(#masking)" opacity="0.8"></rect>
        <path class="target-arrow" stroke-width="5" marker-end="url(#arrow)" opacity="0.4" stroke-linecap="round" d="M307.53718646870163,248.796875L208.2905882127655,492.72747802734375"></path>
    </svg> */


function assingEvents(element,events,callback){
    events = events.split(' ');
    events.forEach(e=>{
        element.addEventListener(e,callback);
    })
}

function buildTarget(ele){
    //var $fixed = $$("header, x-tutor, .sidebar");
    //var $targets = $N("svg", {class: "target-body", html: target_default}, $body);

    let draw = SVG().addTo('body');
    draw.css({display:'none',
        height:'100%',
        left:0,
        opacity:0,
        'pointer-events':'none',
        position:'fixed',
        top:0,
        transform:'translateZ(0)',
        transition:'opacity .3s',
        width:'100%',
        'will-change':'opacity',
        'z-index':900})
    let mask = draw.defs().mask().id('masking');
    mask.rect('100%', '100%').fill('white');
    draw.rect('100%', '100%').attr({x:0,y:0,mask:'url(#masking)',opacity:'0.8'}).css('fill','#fff');
    var lines = draw.group();

    var active = false;
    
    //draw.css({opacity:1,display:'block'})

    const query = ele.getAttribute('target');
      

    const enter = () => {
        if(!active){
            active = true;
            const targets = document.querySelectorAll(query);
            if (!targets.length)
                return;  

            const sourceBounds = ele.getBoundingClientRect();
            const bounds = Array.from(targets).map((x) => x.getBoundingClientRect()).filter((x) => x.width || x.height);

            let margin = 10;

            mask.each(function(i, children) {
                this.remove()
            });
            lines.each(function(i, children) {
                this.remove()
            });

            rectBounds = [sourceBounds, ...bounds].map((bo, i) => {
                
                return mask.rect(bo.width+margin,bo.height+margin).move(bo.left-margin/2,bo.top-margin/2).radius(4);
            });

            rectBounds.forEach((r,i)=>{
                if(i){
                    lines.line(sourceBounds.left+sourceBounds.width/2,sourceBounds.top+sourceBounds.height/2,r.x()+r.width()/2,r.y()+r.height()/2)
                    .stroke({ width: 10 }).css({fill:'#000',stroke:'#000'}).attr('mask','url(#masking)');
                }
                r.clone().attr({fill:'none',stroke:'black'}).addTo(lines);
            })

            draw.css({opacity:1,display:'block'})
        }
    }

    assingEvents(ele,'mouseenter touchstart focus',enter);


    /* 
    targets = document.createElement('svg');
    targets.innerHTML = '<defs><mask id="masking"><rect width="100%" height="100%" fill="white"></rect></mask></defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker><rect x="0" y="0" width="100%" height="100%" mask="url(#masking)" opacity="0.8"></rect><path class="target-arrow" stroke-width="5" marker-end="url(#arrow)" opacity="0.4" stroke-linecap="round"></path>';
    var mask = targets.querySelector("mask");
    var arrow = targets.querySelector(".target-arrow");
    var active = false;
    //var sourceFixed = null;
    var $bounds = [];

    ele.setAttribute("tabindex", 0);
    const query = ele.getAttribute('target');

    const enter2 = () => {
        active = true;
        const $targets2 = document.querySelectorAll(query);
        if (!$targets2.length)
          return;
        const targetFixed = $targets2[0].hasParent(...$fixed);
        //if (sourceFixed === null)
       //   sourceFixed = this.hasParent(...$fixed);
        const sourceBounds = ele.getBoundingClientRect();//this.bounds;
        const bounds = $targets2.map((x) => x.getBoundingClientRect()).filter((x) => x.width || x.height);
        scroll = 0;
       // if (!targetFixed) {
          const top = Math.min(...bounds.map((x) => x.top));
          const bottom = Math.max(...bounds.map((x) => x.top + x.height));
          const scrollUp = Browser.height - 12 - bottom;
          const scrollDown = (false ? 12 : 56) - top;
          scroll = scrollUp < 0 ? scrollUp : scrollDown > 0 ? scrollDown : 0;
        //}
        for (const $b of $bounds)
          $b.remove();
        $bounds = [sourceBounds, ...bounds].map((b2, i) => {
          const margin = !i || noMargins ? 4 : 10;
          return $N("rect", {
            x: b2.left - margin,
            y: b2.top - margin + (i || !sourceFixed ? scroll : 0),
            width: b2.width + 2 * margin,
            height: b2.height + 2 * margin,
            rx: i ? 4 : 18,
            ry: i ? 4 : 18
          }, $mask);
        });
        $arrow.points = connect(sourceBounds, bounds[0], sourceFixed ? 0 : scroll, targetFixed ? 0 : scroll);
      };
      const show = () => {
        if (scroll)
          $body.scrollBy(-scroll, 300);
        $targets.css("display", "block");
        Browser.redraw();
        delay(function() {
          $targets.css("opacity", 1);
        }, scroll ? 300 : 0);
      };
      const exit2 = (event) => {
        if (!active)
          return;
        if (event) {
          const moveEvent = isOneOf(event.type, "mousemove", "pointermove");
          if (moveEvent && distance(start, [event.clientX, event.clientY]) < 40) {
            return;
          }
        }
        clearTimeout(showTimeout);
        active = false;
        $targets.css("opacity", 0);
        setTimeout(() => {
          if (!active)
            $targets.css("display", "none");
        }, 300);
        $body.off("mousewheel mousemove touchend touchmove", exit2);
        this.off("mouseleave blur", exit2);
      };
      const bindExit = () => {
        if (scroll && !sourceFixed) {
          $body.on("mousemove", exit2);
        } else {
          this.on("mouseleave", exit2);
        }
        $body.on("mousewheel touchend touchmove", exit2);
        this.on("blur", exit2);
      };

    const func1 = ()=>{
        start = [e.clientX, e.clientY];
        enter2();
        showTimeout = window.setTimeout(show, scroll ? 50 : 30);
        bindExit();
    }
    ele.addEventListener("mouseenter", () => {
        func1();
    });
    ele.addEventListener("touchstart", () => {
        func1();
    });
    ele.addEventListener("focus", () => {
        func1();
    });
    ele.addEventListener("click", (e) => {
        if (active) {
          e.handled = true;
          exit2();
          setTimeout(() => document.querySelector(query).trigger("click mousedown"));
        } else {
          active = true;
          scroll = 0;
          show();
          bindExit();
        }
      });
}
var $fixed = $$("header, x-tutor, .sidebar");
  var $targets = $N("svg", {class: "target-body", html: target_default}, $body);
  var $mask = $targets.$("mask");
  var $arrow = $targets.$(".target-arrow");
  var active = false;
  var $bounds = [];
  var Target = class extends CustomElementView {
    ready() {
      this.setAttr("tabindex", 0);
      const query = this.attr("to").replace(/_/g, " ");
      const noMargins = this.hasClass("no-margins");
      let sourceFixed = void 0;
      let start;
      let scroll;
      let showTimeout;
      const enter2 = () => {
        active = true;
        const $targets2 = $$(query);
        if (!$targets2.length)
          return;
        const targetFixed = $targets2[0].hasParent(...$fixed);
        if (sourceFixed === void 0)
          sourceFixed = this.hasParent(...$fixed);
        const sourceBounds = this.bounds;
        const bounds = $targets2.map((x) => x.bounds).filter((x) => x.width || x.height);
        scroll = 0;
        if (!targetFixed) {
          const top = Math.min(...bounds.map((x) => x.top));
          const bottom = Math.max(...bounds.map((x) => x.top + x.height));
          const scrollUp = Browser.height - 12 - bottom;
          const scrollDown = (false ? 12 : 56) - top;
          scroll = scrollUp < 0 ? scrollUp : scrollDown > 0 ? scrollDown : 0;
        }
        for (const $b of $bounds)
          $b.remove();
        $bounds = [sourceBounds, ...bounds].map((b2, i) => {
          const margin = !i || noMargins ? 4 : 10;
          return $N("rect", {
            x: b2.left - margin,
            y: b2.top - margin + (i || !sourceFixed ? scroll : 0),
            width: b2.width + 2 * margin,
            height: b2.height + 2 * margin,
            rx: i ? 4 : 18,
            ry: i ? 4 : 18
          }, $mask);
        });
        $arrow.points = connect(sourceBounds, bounds[0], sourceFixed ? 0 : scroll, targetFixed ? 0 : scroll);
      };
      const show = () => {
        if (scroll)
          $body.scrollBy(-scroll, 300);
        $targets.css("display", "block");
        Browser.redraw();
        delay(function() {
          $targets.css("opacity", 1);
        }, scroll ? 300 : 0);
      };
      const exit2 = (event) => {
        if (!active)
          return;
        if (event) {
          const moveEvent = isOneOf(event.type, "mousemove", "pointermove");
          if (moveEvent && distance(start, [event.clientX, event.clientY]) < 40) {
            return;
          }
        }
        clearTimeout(showTimeout);
        active = false;
        $targets.css("opacity", 0);
        setTimeout(() => {
          if (!active)
            $targets.css("display", "none");
        }, 300);
        $body.off("mousewheel mousemove touchend touchmove", exit2);
        this.off("mouseleave blur", exit2);
      };
      const bindExit = () => {
        if (scroll && !sourceFixed) {
          $body.on("mousemove", exit2);
        } else {
          this.on("mouseleave", exit2);
        }
        $body.on("mousewheel touchend touchmove", exit2);
        this.on("blur", exit2);
      };
      this.on("mouseenter touchstart focus", (e) => {
        start = [e.clientX, e.clientY];
        enter2();
        showTimeout = window.setTimeout(show, scroll ? 50 : 30);
        bindExit();
      });
      this.on("click", (e) => {
        if (active) {
          e.handled = true;
          exit2();
          setTimeout(() => $(query).trigger("click mousedown"));
        } else {
          active = true;
          scroll = 0;
          show();
          bindExit();
        }
      });
    } */
  };

  let busc = document.querySelector('[wb="target"]')
  buildTarget(busc);