var game={
	RN:4,CN:4,
	data:null,
	score:0,
	state:1,
	GAMEOVER:0,
	RUNNING:1,
	start:function(){
		this.state=this.RUNNING;
		this.score=0;
		this.data=[];
		for (var r = 0; r < this.RN; r++) {
			this.data[r]=new Array(this.CN);
			for (var c = 0; c < this.CN; c++) {
				this.data[r][c]=0;
			}
		}

		this.randomNum();
		this.randomNum();
		this.updata();
		document.onkeydown=function(e){
			switch(e.keyCode){

				case 37:this.moveleft();break;
				case 38:this.movetop();break;
				case 39:this.moveright();break;
				case 40:this.moveDown();break;
			}
		}.bind(this);
		// console.log(this.data.join("\n")); 
	},



	randomNum:function()
	{
		while(true){
			var r=Math.floor(Math.random()*this.RN);
			var c=Math.floor(Math.random()*this.CN);
			if (this.data[r][c]===0) {
				this.data[r][c]=Math.random()<0.5?2:4;
				break;
			}
		}
	},

	updata:function()
	{
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var div=document.getElementById("c"+r+c);
				if (this.data[r][c]!=0) {
					div.innerHTML=this.data[r][c];
					div.className="cell n"+this.data[r][c];
				}
				else{
					div.innerHTML="";
					div.className="cell";
				}
			}
		}
		document.getElementById("score").innerHTML=this.score;
		document.getElementById("gameOver").style.display=(this.state==this.GAMEOVER)?"block":"none";
		console.log(this.state+","+this.GAMEOVER);
		if (this.state==this.GAMEOVER) {
			document.getElementById("final").innerHTML=this.score;
		}
	},

	moveleft:function(){
		var before=String(this.data);
		for(var r=0;r<this.RN;r++){
			this.moveLeftInRow(r);
		}
		var after=String(this.data);
		if (before!=after) {
			this.randomNum();
			this.isGameOver()&&(this.state=this.GAMEOVER);
			this.updata();
		}
	},

	moveLeftInRow:function(r){
		for(var c=0;c<this.CN-1;c++){
			var nextc=this.getNextInRow(r,c);//找出r行c列右边一个不为零的数
			if (nextc==-1) {break;}
			else{
				if (this.data[r][c]==0) {
					this.data[r][c]=this.data[r][nextc];
					this.data[r][nextc]=0;
					c--;
				}
				else if (this.data[r][c]==this.data[r][nextc]) {
					this.data[r][c]*=2;
					this.data[r][nextc]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},

	getNextInRow:function(r,c){
		for(var i=c+1;i<this.CN;i++){
			if (this.data[r][i]!=0) {
				return i;
			}		
		}
		return -1;
	},
	moveright:function(){
		var before=String(this.data);
		for(var r=this.RN-1;r>=0;r--){
			this.moveRightInRow(r);
		}
		var after=String(this.data);
		if (before!=after) {
			this.randomNum();
			this.isGameOver()&&(this.state=this.GAMEOVER);
			this.updata();
		}
	},
	moveRightInRow:function(r){
		for(var c=this.CN-1;c>0;c--){
			var nextc=this.getNextInRowr(r,c);
			if (nextc==-1) {break;}
			else{
				if (this.data[r][c]==0) {
					this.data[r][c]=this.data[r][nextc];
					this.data[r][nextc]=0;
					c++;
				}
				else if (this.data[r][c]==this.data[r][nextc]) {
					this.data[r][c]*=2;
					this.data[r][nextc]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},
	getNextInRowr:function(r,c){
		for(var i=c-1;i>=0;i--){
			if (this.data[r][i]!=0) {
				return i;
			}
		}
		return -1;
	},
	movetop:function(){

		var before=String(this.data);
		for(var c=0;c<this.CN;c++){
			this.moveTopInCow(c);
		}
		var after=String(this.data);
		if (before!=after) {
			this.randomNum();
			this.isGameOver()&&(this.state=this.GAMEOVER);
			this.updata();
		}
		// console.log("111");
	},
	moveTopInCow:function(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getNextInCow(r,c);
			if (nextr==-1) {break;}
			else{
			if (this.data[r][c]==0) {
				this.data[r][c]=this.data[nextr][c];
				this.data[nextr][c]=0;
				r--;
			}
			else if (this.data[r][c]==this.data[nextr][c]) {
				this.data[r][c]*=2;
				this.score+=this.data[r][c];
				this.data[nextr][c]=0;
			}
		}
		}
	},

	getNextInCow:function(r,c){
		for(var i=r+1;i<this.RN;i++){
			if (this.data[i][c]!=0) {
				return i;
			}
		}
		return -1;
	},
	moveDown:function(){
		var before=String(this.data);
		for(var c=0;c<=this.CN-1;c++){
			this.moveDownInCow(c);
		}
		var after=String(this.data);
		if (before!=after) {
			this.randomNum();
			this.isGameOver()&&(this.state=this.GAMEOVER);
			this.updata();
		}
	},
	moveDownInCow:function(c){
		for(var r=this.RN-1;r>0;r--){
			var nextr=this.getNextInCowr(r,c);//找到r排c列的上面一个不为零的点
			if (nextr==-1) {break;}
			else{
				if (this.data[r][c]==0) {
					this.data[r][c]=this.data[nextr][c];
					this.data[nextr][c]=0;
					r++;
				}
				else if (this.data[r][c]==this.data[nextr][c]) {
					this.data[r][c]*=2;
					this.data[nextr][c]=0;
					this.score+=this.data[r][c];
				}
			}
		}
	},
	getNextInCowr:function(r,c){
		// console.log("1111");
		for(var i=r-1;i>=0;i--){
			if (this.data[i][c]!=0) {
				return i;
			}
		}
		return -1;
	},
	isGameOver:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if (this.data[r][c]==0||
					c<this.CN-1&&this.data[r][c]==this.data[r][c+1]||
					r<this.RN-1&&this.data[r][c]==this.data[r+1][c] ) {
					return false;
				}
			}
		}
		return true;
	}
}

game.start();