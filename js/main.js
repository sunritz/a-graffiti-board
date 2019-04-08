let draw = document.getElementById("board");
let context = draw.getContext("2d");

let lineWidth = 13;
let eraserWidth = 18;
autoSetCanvasSize(draw);
listenToUser(draw);
let eraserEnabled = false;
let palette = document.getElementsByClassName("colorpick")[0];
let paletteClass = BrushDot.classList;
let eraserSizes = document.getElementsByClassName("eraserSizes")[0];
pen.onclick = function() {
    eraserEnabled = false;
    pen.parentNode.classList.add("active");
    eraser.parentNode.classList.remove("active");
    paletteClass.remove("active");
    palette.style = "display:none";
    eraserSizes.style = "display:none";
};
eraser.onclick = function() {
    eraserEnabled = true;
    eraser.parentNode.classList.add("active");
    pen.parentNode.classList.remove("active");
    paletteClass.remove("active");
    palette.style = "display:none";
    eraserSizes.style = "display:block";
};
BrushDot.onclick = function() {
    if (BrushDot.className === "active") {
        paletteClass.remove("active");
        palette.style = "display:none";
    } else {
        paletteClass.add("active");
        palette.style = "display:block";
        eraserSizes.style = "display:none";
        eraser.parentNode.classList.remove("active");
        pen.parentNode.classList.add("active");
        eraserEnabled = false;
    }
};
clear.onclick = function() {
    clear.parentNode.classList.add("active");
    context.clearRect(0, 0, draw.width, draw.height)
};
download.onclick = function() {
    let url = draw.toDataURL("image/png");
    let ua = navigator.userAgent.toLowerCase();
    let isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
        let img = document.createElement("img");
        document.body.appendChild(img);
        img.src = url;
        img.id = "wximg";
        img.style = "position:fixed;z-index:1;";
        document.getElementsByClassName("wxtext")[0].style = "display:block;"
    } else {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "My drawings";
        a.target = "_blank";
        a.id = "del";
        a.click();
        removeNode()
    }
};
let sca = document.getElementById("scale"),use0=sca.getElementsByTagName("use")[0],use1=sca.getElementsByTagName("use")[1],docElm = document.documentElement;
sca.addEventListener("click",scale());
function scale () {

  let screen = function (){ 
    var r=confirm("慎用！改变画布会使得当前涂鸦丢失")
       if (r==true)
      {
        if(sca.dataset.screen == "0"){
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            sca.setAttribute("data-screen","1");
            use0.style.display="none";
            use1.style.display="block";
        }else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            sca.setAttribute("data-screen","0");
            use0.style.display="block";
            use1.style.display="none";
        }
    }

    else
       {
      return
     }
  }
    
    
    return screen;
}
star.addEventListener("click",hidetools());
function hidetools() {
    let size=document.getElementsByClassName("sizes")[0],
        tools =function(){
        if (star.dataset.state == "1") {
            actions.classList.add("toolsHidden");
            palette.style="display:none";
            eraserSizes.style="display:none";
            document.getElementById("actions").getElementsByTagName("li")[3].classList.remove("active");
            actions.classList.remove("toolsShow");
            size.classList.add("sizeHidden");
            size.classList.remove("sizeShow");
            starfull.classList.add("hide");
            starempty.classList.remove("hide");
            star.setAttribute("data-state","0");
        }else{
            actions.classList.remove("toolsHidden");
            actions.classList.add("toolsShow");
            size.classList.remove("sizeHidden");
            size.classList.add("sizeShow");
            starfull.classList.remove("hide");
            starempty.classList.add("hide");
            star.setAttribute("data-state","1");
        }
    }
    return tools;
}


function removeNode() {
    let delnode = document.getElementById("del");
    delnode.parentNode.removeChild(delnode)
}



function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function() { 	
        setCanvasSize()     
    };
    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth,
            pageHeight = document.documentElement.clientHeight;
	        canvas.width = pageWidth;
	        canvas.height = pageHeight;
	        context.fillStyle = "#fff";
	        context.fillRect(0, 0, canvas.width, canvas.height)
    }  
}
function drawCircle(x, y, x2, y2) {	
    context.beginPath();
    let radius = lineWidth;
    context.arc(x, y, radius, 0, 2 * Math.PI);    
	let hex=document.getElementById("true").getAttribute("title");
    context.fillStyle = hex;
    context.lineWidth = lineWidth * 2;
    context.fill();
    return stroke(x, y, x2, y2);   
}
function stroke(a, b, c, d) {
    context.beginPath();
    context.moveTo(a, b);
    context.lineTo(c, d);
    context.stroke();
    var hex=document.getElementById("true").getAttribute("title");
    context.strokeStyle = hex;
}



//笔刷大小
function dot(val){ 
	let dotStyle = document.getElementById('BrushDot').style;
	dotStyle.width = val*2+'px'; 
	dotStyle.height= val*2+'px';
	dotStyle.marginLeft = (20-val)+'px';
	dotStyle.marginTop = (8-val)+'px';
}
let dotSize = document.getElementById("brushSize");
//橡皮擦大小
function eraserDot(val){ 
	let eraserStyle = document.getElementById('eraserDot').style;
	eraserStyle.width = val*2+'px'; 
	eraserStyle.height= val*2+'px';
	eraserStyle.marginLeft = (25-val)+'px';
	eraserStyle.marginTop = (18-val)+'px';
}
let eraserDotSize = document.getElementById("eraserSize");
//橡皮擦
function clearArcFun(x,y,r,cxt){    //(x,y)为要清除的圆的圆心，r为半径，cxt为context
   let stepClear=1;//别忘记这一步  
   clearArc(x,y,r);
   function clearArc(x,y,radius){
      let calcWidth=radius-stepClear;  
      let calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);  

      let posX=x-calcWidth;  
      let posY=y-calcHeight;  
                      
      let widthX=2*calcWidth;  
      let heightY=2*calcHeight;  
                      
      if(stepClear<=radius){  
         cxt.clearRect(posX,posY,widthX,heightY);  
         stepClear+=1;  
         clearArc(x,y,radius);  
      }  
    }  
}


function listenToUser(canvas) {
    let using = false;
    let lastPoint = {
        x: undefined,
        y: undefined
    };
 
    if (document.body.ontouchstart !== undefined) {	
		brushSize.ontouchstart = function(){			
			dot(dotSize.value);
			lineWidth = dotSize.value;
		}
		brushSize.ontouchmove = function(){			
			dot(dotSize.value);
			lineWidth = dotSize.value;
		}
	    eraserSize.ontouchstart = function(){			
			eraserDot(eraserDotSize.value);
			eraserWidth = eraserDotSize.value;
		}
		eraserSize.ontouchmove = function(){			
			eraserDot(eraserDotSize.value);
			eraserWidth = eraserDotSize.value;
		}

        canvas.ontouchstart = function(th) {
            clear.parentNode.classList.remove("active");
            palette.style = "display:none;";
            eraserSizes.style = "display:none";
            paletteClass.remove("active");
            let x = th.touches[0].clientX;
            let y = th.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                clearArcFun(x, y, eraserWidth, context);
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        };
        canvas.ontouchmove = function(th) {
            let x = th.touches[0].clientX,
                y = th.touches[0].clientY;
            if (!using) {
                return
            }
            if (eraserEnabled) {
				clearArcFun(x , y, eraserWidth, context);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                };
                drawCircle(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint
            }
        };
        canvas.ontouchend = function() {
            using = false
        }
    } else {
    	brushSize.addEventListener("mousedown",function(){			
			dot(dotSize.value);
			lineWidth = dotSize.value;	
		});
		brushSize.addEventListener("mousemove",function(){
			dot(dotSize.value);
			lineWidth = dotSize.value;
		});
		eraserSize.addEventListener("mousedown",function(){	
			eraserDot(eraserDotSize.value);
			eraserWidth = eraserDotSize.value;
		});
		eraserSize.addEventListener("mousemove",function(){	
			eraserDot(eraserDotSize.value);
			eraserWidth = eraserDotSize.value;
		});
		
        canvas.onmousedown = function(th) {
            clear.parentNode.classList.remove("active");
            document.getElementsByClassName("colorpick")[0].style = "display:none;";
            paletteClass.remove("active");
            eraserSizes.style = "display:none";
            let x = th.clientX,
                y = th.clientY;
            using = true;
            if (eraserEnabled) {
				clearArcFun(x, y, eraserWidth, context);
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        };
 
        canvas.onmousemove = function(th) {
            let x = th.clientX,
                y = th.clientY;
                
            if (!using) {
                return
            }
            if (eraserEnabled) {
				clearArcFun(x, y, eraserWidth, context);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                };
                drawCircle(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint
            }
        };
        canvas.onmouseup = function(th) {
            using = false
        }
    }
}!
    
    
    function(t) {
        function e() {
            let t, e;
            t = document.createElement("div"), t.innerHTML = n, n = null, (e = t.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", i(e, document.body))
        }
        let n = '<svg><symbol id="icon-scalein" viewBox="0 0 32 32"><path d="M24.586 27.414l4.586 4.586 2.828-2.828-4.586-4.586 4.586-4.586h-12v12zM0 12h12v-12l-4.586 4.586-4.539-4.543-2.828 2.828 4.539 4.543zM0 29.172l2.828 2.828 4.586-4.586 4.586 4.586v-12h-12l4.586 4.586zM20 12h12l-4.586-4.586 4.547-4.543-2.828-2.828-4.547 4.543-4.586-4.586z" /></symbol><symbol id="icon-scale" viewBox="0 0 32 32"><path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z" /><path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z" /><path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z" /><path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z" /></symbol><symbol id="icon-starempty" viewBox="0 0 32 32"><path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z" /></symbol><symbol id="icon-starfull" viewBox="0 0 32 32"><path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z" /></symbol><symbol id="icon-clear" viewBox="0 0 32 32"><path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path></symbol><symbol id="icon-pen" viewBox="0 0 30 30"><path d="M27.555 8.42c-1.355 1.647-5.070 6.195-8.021 9.81l-3.747-3.804c3.389-3.016 7.584-6.744 9.1-8.079 2.697-2.377 5.062-3.791 5.576-3.213 0.322 0.32-0.533 2.396-2.908 5.286zM18.879 19.030c-1.143 1.399-2.127 2.604-2.729 3.343l-4.436-4.323c0.719-0.64 1.916-1.705 3.304-2.939l3.861 3.919zM15.489 23.183v-0.012c-2.575 9.88-14.018 4.2-14.018 4.2s4.801 0.605 4.801-3.873c0-4.341 4.412-4.733 4.683-4.753l4.543 4.427c0 0.001-0.009 0.011-0.009 0.011z" /></symbol><symbol id="icon-save" viewBox="0 0 32 32"><path d="M16 18l8-8h-6v-8h-4v8h-6zM23.273 14.727l-2.242 2.242 8.128 3.031-13.158 4.907-13.158-4.907 8.127-3.031-2.242-2.242-8.727 3.273v8l16 6 16-6v-8z" /></symbol><symbol id="icon-erase" viewBox="0 0 32 32"><path d="M32 18v-12h-6v-2c0-1.1-0.9-2-2-2h-22c-1.1 0-2 0.9-2 2v6c0 1.1 0.9 2 2 2h22c1.1 0 2-0.9 2-2v-2h4v8h-18v4h-1c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-10c0-0.552-0.448-1-1-1h-1v-2h18zM24 6h-22v-2h22v2z"></symbol></svg>',
            c = function() {
                var t = document.getElementsByTagName("script");
                return t[t.length - 1]
            }(),
            l = c.getAttribute("data-injectcss"),
            o = function(t, e) {
                e.parentNode.insertBefore(t, e)
            },
            i = function(t, e) {
                e.firstChild ? o(t, e.firstChild) : e.appendChild(t)
            };
        if (l && !t.__iconfont__svg__cssinject__) {
            t.__iconfont__svg__cssinject__ = !0;
            try {
                document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
            } catch (t) {
                console && console.log(t)
            }
        }!
            function(e) {
                if (document.addEventListener) {
                    if (~ ["complete", "loaded", "interactive"].indexOf(document.readyState)) {
                        setTimeout(e, 0)
                    } else {
                        var n = function t() {
                            document.removeEventListener("DOMContentLoaded", t, !1), e()
                        };
                        document.addEventListener("DOMContentLoaded", n, !1)
                    }
                } else {
                    document.attachEvent &&
                    function(t, e) {
                        var n = t.document,
                            c = !1,
                            l = function() {
                                c || (c = !0, e())
                            };
                        !
                            function t() {
                                try {
                                    n.documentElement.doScroll("left")
                                } catch (e) {
                                    return void setTimeout(t, 50)
                                }
                                l()
                            }(), n.onreadystatechange = function() {
                            "complete" == n.readyState && (n.onreadystatechange = null, l())
                        }
                    }(t, e)
                }
            }(e)
    }(window);
document.body.ontouchmove = function(e) {
    e.preventDefault()
};