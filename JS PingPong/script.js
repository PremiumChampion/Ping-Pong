const game = document.getElementById('game');
const ctx = game.getContext('2d');
const doc = document.getElementsByTagName('html');
var ballcolor = 'white';
var playercolor = 'white';
var cicleradius = 5;
var ballSpeedX = 1;
var ballSpeedY = 1;
var pingpong;
var clock;
var level;
var acceleration = 11;
var kex;

class tasten
{
	constructor(){
		this.playerLeftUp = false;
		this.playerLeftDown = false;
		this.playerRightUp = false;
		this.playerRightDown = false;
	}
}

class ball 
{
	constructor(xCords, yCords){
		this.xAxis = xCords;
		this.yAxis = yCords;
		this.height = 10;
		this.width = 10;
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.xAxis, this.yAxis, cicleradius, 0, 2 * Math.PI);
		ctx.fill();
	}

	move(){
		
		if (pingpong.yAxis >= game.height-20 || pingpong.yAxis <= 20) {
			ballSpeedY *= -1;
		}
		if (pingpong.xAxis >= game.width-20 || pingpong.xAxis <= 15 ) {
			
			if(pingpong.xAxis <= 10){
				alert("Verloren Linker Spieler!");
			}else{
				alert("Verloren Rechter Spieler!");
			}
			
			clearInterval(clock);
			clearInterval(level);
		}
		
		ctx.clearRect(this.xAxis - (cicleradius ), this.yAxis - (cicleradius ), cicleradius*2, cicleradius*2);
		playerLeft.draw();		


		if (
				pingpong.xAxis >= game.width-30 
				&& pingpong.yAxis >= playerRight.yAxisTop && pingpong.yAxis <= playerRight.yAxisBottom
				|| pingpong.xAxis <= game.width-1580 
				&& pingpong.yAxis >= playerLeft.yAxisTop && pingpong.yAxis <= playerLeft.yAxisBottom 
			) 
		 {
			ballSpeedX *= -1;
			var rand = Math.floor(Math.random() * 14);
			rand = Math.floor(rand / 7)  + 1;
			if (ballSpeedY < 0) {
				ballSpeedY = rand * -1;
			}
			else{
				ballSpeedY = rand;
			}

			if(pingpong.xAxis < 800) {
				playerRight.enable = true;
				//playerLeft.enable = false;
			}else{
				playerRight.enable = false;
				//playerLeft.enable = true;
			}
		}
		pingpong.xAxis += ballSpeedX;
		pingpong.yAxis += ballSpeedY;
		ctx.fillStyle = ballcolor;
		//ctx.fillRect(pingpong.xAxis,pingpong.yAxis,pingpong.height,pingpong.width);
		this.draw();
	}
}

class player
{
	constructor(xCords, yCords){
		this.xAxisTop = xCords;
		this.yAxisTop = yCords;
		this.height = 200;
		this.width = 10;
		this.yAxisBottom = yCords+200;
		this.movement = 0;
		this.direction = 1;
		this.tolerance = 50;
		this.enable = true;
	}

	draw(){
		
		ctx.fillStyle = playercolor;
		ctx.clearRect(this.xAxisTop, this.yAxisTop, this.width, this.height);
		ctx.fillRect(this.xAxisTop,this.yAxisTop, this.width, this.height);
	}

	move(){
		ctx.fillStyle = playercolor;
		if(this.movement === 1 && this.enable){
			if (this.direction === 1) {
				
				if(this.yAxisTop > 8){
					ctx.clearRect(this.xAxisTop, this.yAxisTop, this.width, this.height);
					this.yAxisTop = this.yAxisTop - 10;
					this.yAxisBottom = (this.yAxisTop+this.height);
					ctx.fillRect(this.xAxisTop,this.yAxisTop, this.width, this.height);
				}
			}
			if( this.direction === 2){
				if(this.yAxisTop+210 < 798){
					ctx.clearRect(this.xAxisTop, this.yAxisTop, this.width, this.height);
					this.yAxisTop = this.yAxisTop + 10;
					this.yAxisBottom = (this.yAxisTop+this.height);
					ctx.fillRect(this.xAxisTop,this.yAxisTop, this.width, this.height);
				}
			}
		}
	}
}



function playerAction(){
	
	if(kex.playerLeftDown && !kex.playerLeftUp)
	{
		playerLeft.movement = 1;
		playerLeft.direction = 2;
	}
	else if(kex.playerLeftUp && !kex.playerLeftDown)
	{
		playerLeft.movement = 1;
		playerLeft.direction = 1;
	}else if(kex.playerLeftUp && kex.playerLeftDown){
		playerLeft.movement = 0;
	}else if (!kex.playerLeftUp && !kex.playerLeftDown){
		playerLeft.movement = 0;
	}


	if(kex.playerRightDown && !kex.playerRightUp)
	{
		playerRight.movement = 1;
		playerRight.direction = 2;
	}
	else if(kex.playerRightUp && !kex.playerRightDown)
	{
		playerRight.movement = 1;
		playerRight.direction = 1;

	}/* else if(kex.playerRightUp && kex.playerRightDown){
		playerRight.movement = 0; */
	else if (!kex.playerRightUp && !kex.playerRightDown){
		playerRight.movement = 0;
	}
	
}

function tastendruck(e){
	//if(e.code === "KeyL"){kex.playerRightDown = true;}
	//if(e.code === "KeyO"){kex.playerRightUp = true;}
	if(e.code === "KeyS"){kex.playerLeftDown = true;}
	if(e.code === "KeyW"){kex.playerLeftUp = true;}
}

function tastenrelease(e){
	//if(e.code === "KeyL"){kex.playerRightDown = false;}
	//if(e.code === "KeyO"){kex.playerRightUp = false;}
	if(e.code === "KeyS"){kex.playerLeftDown = false;}
	if(e.code === "KeyW"){kex.playerLeftUp = false;}
}

function aiPlayerRight(){
	
	 if (pingpong.yAxis >= playerRight.yAxisTop+playerRight.tolerance && pingpong.yAxis <= playerRight.yAxisBottom-playerRight.tolerance) {
		kex.playerRightDown = false;
		kex.playerRightUp = false;
	}
	else if(pingpong.yAxis >= playerRight.yAxisTop+playerRight.tolerance && !(pingpong.yAxis <= playerRight.yAxisBottom-playerRight.tolerance)){
		kex.playerRightDown = true;
		kex.playerRightUp = false;
	}
	else if(!(pingpong.yAxis >= playerRight.yAxisTop+playerRight.tolerance) && (pingpong.yAxis <= playerRight.yAxisBottom-playerRight.tolerance)){
		kex.playerRightDown = false;
		kex.playerRightUp = true;
	} 

}



function createField(){
	ctx.fillStyle = 'red';
	ctx.fillRect(0, 0, 8, 800);
	ctx.fillRect(1592, 0, 8, 800);
	ctx.fillRect(0, 0, 1600, 8);
	ctx.fillRect(0, 792, 1600, 8);
	ctx.fillStyle = ballcolor;
	pingpong = new ball(759, 395);
	playerLeft = new player(8, 8);
	playerRight = new player(1582, 8);
	kex = new tasten();
	playerLeft.draw();
	playerRight.draw();

	document.onkeypress = function(e){tastendruck(e);};
	document.onkeyup = function(e){tastenrelease(e);};
	setInterval(function(){aiPlayerRight();},10);
	setInterval(function() { playerRight.tolerance = Math.floor(Math.random() * 200 ) - 120;}, 100);
	if(acceleration>1)
	{
		clock = setInterval(function(){pingpong.move();}, acceleration);
	}
	level = setInterval(function(){
		if(acceleration>1)
		{
			clearInterval(clock);
			acceleration--;
			clock = setInterval(function(){pingpong.move();}, acceleration);
		}
	}, 1000);

	setInterval(function(){playerAction(); playerLeft.move(); playerRight.move()}, 5)
}