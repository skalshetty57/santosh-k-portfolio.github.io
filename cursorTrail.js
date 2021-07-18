// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
// of the mouse, set with a mousemove event listener below
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
(w = canvas.width = window.innerWidth),
(h = canvas.height = window.innerHeight);
console.log(window.innerWidth + " " + window.innerHeight);
var eles=40;
var dots = [];
mouse = {
	x: false,
	y: false,
};
mouse1 = {
	x: w/2,
	y: h/2,
};
console.log(window);
// The Dot object used to scaffold the dots
var Dot = function () {
	this.x = 0;
	this.y = 0;
};
// The Dot.prototype.draw() method sets the position of
// the object's <div> node

// Creates the Dot objects, populates the dots array
for (var i = 0; i < eles; i++) {
	var d = new Dot();
	dots.push(d);
}

// This is the screen redraw function
function draw() {
	// Make sure the mouse position is set everytime
	// draw() is called.
	//  console.log(dots);
	var x = mouse.x,y = mouse.y;
	ctx.clearRect(0, 0, w, h);
	// This loop is where all the 90s magic happens
	for (let i = 0; i < eles; i++) {
		var nextDot = dots[i + 1] || dots[0];
		dots[i].x = x;
		dots[i].y = y;
		x += (nextDot.x - dots[i].x) * 0.8;
		y += (nextDot.y - dots[i].y) * 0.8;
	}
	for (let i = 0; i < eles-1; i++) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "rgb(41,199,172)"; // Green path
		ctx.moveTo(dots[i].x, dots[i].y);
		ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
		// ctx.strokeStyle = "cyan"; // Green path
		ctx.moveTo(dots[i].x+20, dots[i].y+20);
		ctx.lineTo(dots[i + 1].x+20, dots[i + 1].y+20);
		ctx.stroke(); // Draw it
	}
	// ctx.beginPath();
	// 	ctx.lineWidth = "1";
	// 	ctx.strokeStyle = "pink"; // Green path
	// 	ctx.moveTo(dots[0].x, dots[0].y);
	// 	ctx.lineTo(dots[1 ].x+15, dots[1 ].y+15);
	// 	ctx.stroke(); // Draw it
	for (let i = 0; i < eles-1; i++) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "rgb(194,32,133)"; // Green path
		ctx.moveTo(dots[i].x+10, dots[i].y+10);
		ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
		ctx.moveTo(dots[i].x+10, dots[i].y+10);
		ctx.lineTo(dots[i + 1].x+20, dots[i + 1].y+20);
		ctx.moveTo(dots[i].x+10, dots[i].y+10);
		ctx.lineTo(dots[i + 1].x+10, dots[i + 1].y+10);
		ctx.stroke(); // Draw it
	}
}
function draw1(){
	var x = mouse1.x,y = mouse1.y;
	ctx.clearRect(0, 0, w, h);
	// This loop is where all the 90s magic happens
	for (let i = 0; i < eles; i++) {
		var nextDot = dots[i + 1] || dots[0];
		dots[i].x = x;
		dots[i].y = y;
		x += (nextDot.x - dots[i].x) * 0.8;
		y += (nextDot.y - dots[i].y) * 0.8;
	}
	for (let i = 4; i < eles-1; i++) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "rgb(41,199,172)"; // Green path
		ctx.moveTo(dots[i].x, dots[i].y);
		ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
		// ctx.strokeStyle = "cyan"; // Green path
		ctx.moveTo(dots[i].x+20, dots[i].y+20);
		ctx.lineTo(dots[i + 1].x+20, dots[i + 1].y+20);
		ctx.stroke(); // Draw it
	}
	// ctx.beginPath();
	// 	ctx.lineWidth = "1";
	// 	ctx.strokeStyle = "pink"; // Green path
	// 	ctx.moveTo(dots[0].x, dots[0].y);
	// 	ctx.lineTo(dots[1 ].x+15, dots[1 ].y+15);
	// 	ctx.stroke(); // Draw it
	for (let i = 4; i < eles-1; i++) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "rgb(194,32,133)"; // Green path
		ctx.moveTo(dots[i].x+10, dots[i].y+10);
		ctx.lineTo(dots[i + 1].x, dots[i + 1].y);
		ctx.moveTo(dots[i].x+10, dots[i].y+10);
		ctx.lineTo(dots[i + 1].x+20, dots[i + 1].y+20);
		ctx.moveTo(dots[i].x+10, dots[i].y+10);
		ctx.lineTo(dots[i + 1].x+10, dots[i + 1].y+10);
		ctx.stroke(); // Draw it
	}
	

}

addEventListener("mousemove", function (event) {
	mouse.x = event.pageX;
	mouse.y = event.pageY;
},true);
c.addEventListener("mouseleave", function (event) {
	mouse.x = false;
	mouse.y = false;
},true);

// animate() calls draw() then recursively calls itself
// everytime the screen repaints via requestAnimationFrame().
function animate() {
	if(mouse.x===false){
		draw1();
	}
	else 
	draw();

	// requestAnimationFrame(animate);
}
// setInterval(function(){console.log(window);},10000);
animateid=setInterval(animate,1000/(60));
	anonid=setInterval(function(){
		// console.log(window.onmouseleave);
		// mouse1.x=Math.random()*w;
		// mouse1.y=Math.random()*h;

		let temp=Math.random()*2*Math.PI;
		mouse1.x=mouse1.x+100*Math.sin(temp);
		mouse1.y=mouse1.y+100*Math.cos(temp);
		if(mouse1.x<0 || mouse1.y<0 || mouse1.x>w || mouse1.y>h){
			mouse1.x=w/2;
			mouse1.y=h/2;
		// }
	}},300);


// 	draw1id=setInterval(draw1,1000/(60));
// }
// And get it started by calling animate().
// animate();
