var canvas;
	var contextCanvas;
	var canvasBack;
	var contextCanvasBack;

	//var pointX;
	//var pointY;
	//var pointXk;
	//var pointYk;
//
//	//var isMouseDown = false;
	var numberID = 1;
	var edit = false;

	var listObj = [];
	var item = {};
	var prevChooseCanvas = false;
		
	window.onload = function(){
		canvas = document.getElementById("canvas1");
		contextCanvas = canvas.getContext("2d");

		canvasBack = document.getElementById("canvasBack1");
		contextCanvasBack = canvasBack.getContext("2d");

		//con.fillRect(10,10,100,100);
		//conb.fillRect(110,110,158-110,155-110);
		//contextCanvasBack.clearRect(0,0,contextCanvasBack.width,contextCanvasBack.height);
		//contextCanvasBack.fillRect(10,10,50,50);
	};

	document.onmousedown = function(event){
		//начало координат canvas
		var xn = canvas.offsetLeft;
		var yn = canvas.offsetTop;
		//конец координат canvas
		var xk = canvas.width+xn;
		var yk = canvas.height+yn;

		var flag = false;
		
		//if cursor in boundares canvas
		if (event.clientX>xn && event.clientX<xk &&
		 	event.clientY>yn && event.clientY<yk) {

			//put start point
			pointX = event.clientX-xn;
			pointY = event.clientY-yn;

				if(pointX > item.xn && 
					pointX < item.xk &&
					pointY > item.yn && 
					pointY < item.yk) {	
							//drag_and_drop(newCanvas);
							//console.log('second tap');
							drag_and_drop(document.getElementById('newCanvas'));
							flag = true;
						}
			

			for (var i = 0; i < listObj.length; i++) {
				if(pointX > (listObj[i].xk <= listObj[i].xn ? listObj[i].xk : listObj[i].xn) && 
					pointX < (listObj[i].xk < listObj[i].xn ? listObj[i].xn : listObj[i].xk) &&
					pointY > (listObj[i].yk <= listObj[i].yn ? listObj[i].yk : listObj[i].yn) && 
					pointY < (listObj[i].yk < listObj[i].yn ? listObj[i].yn : listObj[i].yk)){
					//alert(listObj[i].id + " - " + listObj[i].state);
					if (prevChooseCanvas) {
						/*if (listObj[i].id == item.id) {	
							//drag_and_drop(newCanvas);
							console.log('second tap');
						}
						else{*/
							listObj.push(item);
				//console.log(listObj);
						drawAllElem();
						removeCanvas();
						
					}
					//если попал на нарисованный rect
					moveElem(listObj[i].id);
					flag = true;
					prevChooseCanvas = true;
				}
			}	
			if (!flag) {
				edit = false;
				prevChooseCanvas = false;
				showChangedPanel();

				listObj.push(item);
				//console.log(listObj);
				drawAllElem();
				removeCanvas();
			}
		}
		else{
			var e = document.getElementById('changeElem');
			var yn = showRect(e, 'top');
			var yk = showRect(e, 'bottom');
			var xn = showRect(e, 'left');
			var xk = showRect(e, 'right');
			//var top = showRect(e, 'top');
			//var bottom = showRect(e, 'bottom');
			//var left = showRect(e, 'left');
			//var right = showRect(e, 'right');
			//console.log("top: "+top+" bottom: "+bottom+' left: '+left+' right: '+right);



			if (event.clientX > xn && event.clientX < xk &&
				event.clientY > yn && event.clientY < yk) {

			}
		else{
			edit = false;
				prevChooseCanvas = false;
				showChangedPanel();

				listObj.push(item);
				//console.log(listObj);
				drawAllElem();
				removeCanvas();
		}
		}
	};

	function showRect(elem, param) {
  var r = elem.getBoundingClientRect()
  //console.log("{top:"+r.top+", left:"+r.left+", right:"+r.right+", bottom:"+ r.bottom + "}");
  switch (param){
  	case 'top':
  		return r.top;
  		break;
  	case 'bottom':
  		return r.bottom;
  		break;
  	case 'left':
  		return r.left;
  		break;
  	case 'right':
  		return r.right;
  		break;
  }
}

	function drag_and_drop(id) {
		//console.log(id);
		var left = 0;
		var top = 0;
		var ball = document.getElementById(id);//console.log(ball);
		
		ball.onmousedown = function(e) { // 1. отследить нажатие

		  // 2. разместить на том же месте, но в абсолютных координатах
		  ball.style.position = 'absolute';
		  moveAt(e);
		  // переместим в body, чтобы мяч был точно не внутри position:relative
		  // подготовить к перемещению
		  document.body.appendChild(ball);

		  //ball.style.zIndex = 1000; // показывать мяч над другими элементами

		  // передвинуть мяч под координаты курсора
		  // и сдвинуть на половину ширины/высоты для центрирования
		  function moveAt(e) {
		    ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px'; left = e.pageX - 204 - ball.offsetWidth / 2;
		    ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px'; top = e.pageY - 1 - ball.offsetHeight / 2;
		  }

		  // 3, перемещать по экрану
		  document.onmousemove = function(e) {
		    moveAt(e);
		  }

		  // 4. отследить окончание переноса
		  ball.onmouseup = function() {
		    document.onmousemove = null;
		    ball.onmouseup = null;

		    //alert('left '+left+' top '+top);
		    ball.style.top = '10px';
			ball.style.left = '10px';

			drawNewElem(left, top);
		  }
		}

		ball.ondragstart = function() {
			
		  return false;
		};
	}

	function drawNewElem(x, y) {
		//alert('x '+x+' y '+y);
		var sizeX = 50;
		var sizeY = 50;
		contextCanvasBack.fillRect(x,y,50,50);

		//listObj.push({id:'rect_'+numberID,state:'free',xn:x,yn:y,sizeX:50,sizeY:50,color:'black'});
		listObj.push({id:'rect_'+numberID,state:'free',xn:x,yn:y,xk:x+sizeX,yk:y+sizeY,color:'black'});
		numberID++;
		//console.log(listObj[listObj.length-1]);
	}

	function drawAllElem() {
		//console.log(listObj);
		contextCanvasBack.clearRect(0,0,canvasBack.width,canvasBack.height);
		for (var i = 0; i < listObj.length; i++) {
			contextCanvasBack.fillRect(listObj[i].xn,listObj[i].yn,listObj[i].xk-listObj[i].xn,listObj[i].yk-listObj[i].yn);
		}
	}

	function moveElem(id) {
		//console.log(id);
		//contextCanvasBack.clearRect(0,0,contextCanvasBack.width,contextCanvasBack.height);
		for (var i = 0; i < listObj.length; i++) {
			if (listObj[i].id == id) {
				item = listObj[i];
				listObj.splice(i,1);
				break;
			}
		}

		drawAllElem();
		createNewCanvas();
	};

	var newCanvas;
	

	function createNewCanvas(){
		//con.clearRect(0,0,c.width,c.height);
		//if (isFirstCanvas) {
			newCanvas = document.createElement('canvas');
		//	isFirstCanvas = false;
		//}
		newCanvas.id = 'newCanvas';
		newCanvas.style.background = 'gray';
		newCanvas.style.position = 'absolute';
		newCanvas.style.width = (item.xk - item.xn)+'px';
		newCanvas.style.height = (item.yk - item.yn) + 'px';
		newCanvas.style.top = (item.yn + 1)+'px';
		newCanvas.style.left = (item.xn + 204)+'px';
		newCanvas.onmousedown = function(event){
			//console.log('newCanvas down');
			//drag_and_drop(this.id);
			var topElem;
			var leftElem;

			newCanvas.style.position = 'absolute';
			moveAt(event);

			function moveAt(event){
				newCanvas.style.left = event.pageX - newCanvas.offsetWidth / 2 + 'px'; leftElem = event.pageX - 204 - newCanvas.offsetWidth / 2;
		   		newCanvas.style.top = event.pageY - newCanvas.offsetHeight / 2 + 'px'; topElem = event.pageY - 1 - newCanvas.offsetHeight / 2;
			}

			document.onmousemove = function(event) {
		    moveAt(event);
		  }

		  newCanvas.onmouseup = function() {
		    document.onmousemove = null;
		    newCanvas.onmouseup = null;

		    //alert('left '+left+' top '+top);
		    newCanvas.style.top = topElem;
			newCanvas.style.left = leftElem;
/*
			for (var i = 0; i < listObj.length; i++) {
				if(listObj[i].id == item.id){
					listObj.splice(i,1);
					break;
				}
			}
			console.log(item);
			drawNewElem(leftElem, topElem);*/
			item.xn = leftElem;
			item.yn = topElem;
			item.xk = item.xn + 50;
			item.yk = item.yn + 50;

		  }
		}
		document.body.appendChild(newCanvas);

		//drag_and_drop(item.id);
		edit = true;
		showChangedPanel();
	};

	function removeCanvas(){

		document.body.removeChild(newCanvas);
	};

	function showChangedPanel(){
		if (edit) {
			document.getElementById('changeElem').style.display = 'block';
			document.getElementById('identificatorElem').innerHTML = item.id;
			document.getElementById('widthElem').placeholder = (item.xk - item.xn).toString();
			document.getElementById('heightElem').placeholder = (item.yk - item.yn).toString();
		}
		else{
			document.getElementById('changeElem').style.display = 'none';
		}
	}

	function changeWidthElem(width){
		item.xk = Number(item.xn) + Number(width);
		console.log('width = '+width+ ' item.xn = '+item.xn+ ' item.xk = '+item.xk);
		removeCanvas();
		createNewCanvas();
	};

	function changeHeightElem(height) {
		item.yk = Number(item.yn) + Number(height);
		removeCanvas();
		createNewCanvas();
	};

	function addWidthElem() {
		item.xk +=5;
		removeCanvas();
		createNewCanvas();
	};

	function minusWidthElem() {
		item.xk -=5;
		removeCanvas();
		createNewCanvas();
	};

	function addHeightElem() {
		item.yk +=5;
		removeCanvas();
		createNewCanvas();
	};

	function minusHeightElem(){
		item.yk -=5;
		removeCanvas();
		createNewCanvas();
	};

	function deleteById(){
		//alert('item.id = '+item.id);
		for (var i = 0; i < listObj.length; i++) {
			//alert('listObj[i].id = '+listObj[i].id)
			if (listObj[i].id == item.id) {
				//alert(i);
				
				listObj.splice(i,1);
				break;
			}
		}
		//console.log(listObj);
		removeCanvas();
		//drawAllElem();
		item = {};
		edit = false;
		showChangedPanel();
		prevChooseCanvas = false;
	};