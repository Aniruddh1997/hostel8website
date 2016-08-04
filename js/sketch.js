var vertices = [];
var mousePressedVertices = [];
var windowVertices = [];
var mousePressedWindowVertices = [];
var doorVertices = [];
var mousePressedDoorVertices = [];
var coordinatesToTransfer = [];
var windowDistShow = [];
var doorDistShow = [];
var windowCoordinatesToTransfer = [];
var doorCoordinatesToTransfer = [];

vertices.push(new Node());
vertices.push(new Node());
vertices.push(new Node());
vertices.push(new Node());

vertices[0].x = 500; 
vertices[0].y = 100; 
vertices[0].nextNode1 = vertices[1];
vertices[0].nextNode2 = vertices[3];

vertices[1].x = 900; 
vertices[1].y = 100; 
vertices[1].nextNode1 = vertices[0];
vertices[1].nextNode2 = vertices[2];

vertices[2].x = 900; 
vertices[2].y = 500; 
vertices[2].nextNode1 = vertices[1];
vertices[2].nextNode2 = vertices[3];

vertices[3].x = 500; 
vertices[3].y = 500; 
vertices[3].nextNode1 = vertices[0];
vertices[3].nextNode2 = vertices[2];

var stickiness = 20;
var windowStickiness = 20;
var conversionFactor = 7.5;
var zoomFactor = 1;
var lineLength;
//null on releasing
var elem_selected = "";

//is set on mouse press and detects if element selected is some object or the window
var elem_clicked = "";

var elem_hovered = "";

//changes only on clicking door or window
var elem_panel = "";

var splitWall = 0;
var windowNodeAdded;
var windowNumber = -1;
var windowOnVertex = 0;
var addingWindow = 0;

var doorNodeAdded;
var doorNumber = -1;
var doorOnVertex = 0;
var addingDoor = 0;
var lineColor = "#5E6975";
var metric_system = "mm" ;
var cnv;
var time = 0;
var click;
// var newWindowWidth = 100;
// var newWindowHeight = 16;
// var newDoorWidth = 100;
// var newDoorHeight = 10;

// var f;


var roomExtreme = {
	minX : 100,
	maxX : 200,
	minY : 200,
	maxY : 300
}; 

var mouse = {
	pressedX : 0,
	pressedY : 0,
	draggedX : 0,
	draggedY : 0,
	movedX : 0,
	movedY : 0
}



function lieInMiddle(x,y,z){
	if (y > z){
		if (x < y && x > z) {return true;}
		else {return false;}
	}
	else{
		if (x > y && x < z) {return true;}
		else {return false;}
	}

}

function split_wall(){
	splitWall = 1;
} 

function setup() {	
	cnv = createCanvas(windowWidth,windowHeight - 85).parent('canvas');
};



function windowResized() {
	if($("#dummy_header").is(":visible")){
  		resizeCanvas(windowWidth, windowHeight - 85);
	}
	else{
  		resizeCanvas(windowWidth, windowHeight - 5);
	}
}

function draw() {
	
	background("#EEEEEE");

	stroke(lineColor);
	if(vertices.length > 0){
		roomExtreme.minX = vertices[0].x;
		roomExtreme.maxX = vertices[0].x;
		roomExtreme.minY = vertices[0].y;
		roomExtreme.maxY = vertices[0].y;
	}

	for(var i = 0; i < vertices.length; i++){
		strokeWeight(10*zoomFactor*(0.8));
		
		//initialising the room extreme variables
		if(roomExtreme.minX > vertices[i].x){roomExtreme.minX = vertices[i].x;}
		if(roomExtreme.minY > vertices[i].y){roomExtreme.minY = vertices[i].y;}
		if(roomExtreme.maxX < vertices[i].x){roomExtreme.maxX = vertices[i].x;}
		if(roomExtreme.maxY < vertices[i].y){roomExtreme.maxY = vertices[i].y;}

		//drawinfg the line and writing the dimension for nextNode1
		if (vertices[i].nextNode1 != null && i < vertices.indexOf(vertices[i].nextNode1)){

			//highlighting the drawn line
			lineColor = "#5E6975";
			if(typeof(elem_clicked) == "string"){
				if(elem_clicked.charAt(2) == "h" || elem_clicked.charAt(2) == "v"){
					if(elem_clicked.charAt(1) == "1" && elem_clicked.charAt(0) == i){
						lineColor = "#00B368";
					}
				}

				else if(elem_clicked.charAt(3) == "h" || elem_clicked.charAt(3) == "v"){
					if(elem_clicked.charAt(2) == "1" && elem_clicked.substring(0,2) == i){
						lineColor = "#00B368";
					}
				}
				else if(elem_clicked == "room"){
					lineColor = "#00B368";
				}
			}


			stroke(lineColor);
			line(vertices[i].x, vertices[i].y, vertices[i].nextNode1.x, vertices[i].nextNode1.y);

			//writing thedimension of the line drawn
			lineLength = float(dist(vertices[i].x, vertices[i].y, vertices[i].nextNode1.x, vertices[i].nextNode1.y));

			var lineLength_ft = to_ft(round(lineLength*conversionFactor));
			var lineLength_in = nfc(ft_in(lineLength_ft - Math.floor(lineLength_ft)),0);
			var dimension = Math.floor(lineLength_ft) + "'" + lineLength_in + '"';

			if(metric_system == "mm"){
				dimension = round(lineLength*conversionFactor);
			}

			push();
			// stroke("#ffffff");
			strokeWeight(1);
			fill("#ffffff");
			translate( (vertices[i].x + vertices[i].nextNode1.x)/2, (vertices[i].y + vertices[i].nextNode1.y)/2 );
			if(vertices[i].y != vertices[i].nextNode1.y){
				rotate( atan2(vertices[i].nextNode1.y - vertices[i].y,vertices[i].nextNode1.x - vertices[i].x) );
			}
			textSize(11*zoomFactor);
			textStyle(NORMAL);
			if(metric_system == "mm"){
				text(parseInt(dimension), 0, 4*zoomFactor);
			}
			else if(metric_system == "ft"){
				text(dimension, 0, 4*zoomFactor);
			}

			pop();

			
		} 

		//drawinfg the line and writing the dimension for nextNode2
		if (vertices[i].nextNode2 != null && i < vertices.indexOf(vertices[i].nextNode2)){
			
			//highlighting the drawn line
			lineColor = "#5E6975";
			if(typeof(elem_clicked) == "string"){
				if(elem_clicked.charAt(2) == "h" || elem_clicked.charAt(2) == "v"){
					if(elem_clicked.charAt(1) == "2" && elem_clicked.charAt(0) == i){
						lineColor = "#00B368";
					}
				}

				else if(elem_clicked.charAt(3) == "h" || elem_clicked.charAt(3) == "v"){
					if(elem_clicked.charAt(2) == "2" && elem_clicked.substring(0,2) == i){
						lineColor = "#00B368";
					}
				}
				else if(elem_clicked == "room"){
					lineColor = "#00B368";
				}
			}

			stroke(lineColor);
			line(vertices[i].x, vertices[i].y, vertices[i].nextNode2.x, vertices[i].nextNode2.y);

			//writing thedimension of the line drawn			
			lineLength = float(dist(vertices[i].x, vertices[i].y, vertices[i].nextNode2.x, vertices[i].nextNode2.y));

			var lineLength_ft = to_ft(round(lineLength*conversionFactor));
			var lineLength_in = nfc(ft_in(lineLength_ft - Math.floor(lineLength_ft)),0);
			var dimension = Math.floor(lineLength_ft) + "'" + lineLength_in + '"';

			if(metric_system == "mm"){
				dimension = round(lineLength*conversionFactor);
			}

			push();
			// stroke("#ffffff");
			fill("#ffffff");
			strokeWeight(1);
			translate( (vertices[i].x + vertices[i].nextNode2.x)/2, (vertices[i].y + vertices[i].nextNode2.y)/2 );
			if(vertices[i].y != vertices[i].nextNode2.y){
				rotate( atan2(vertices[i].nextNode2.y - vertices[i].y,vertices[i].nextNode2.x - vertices[i].x) );
			}
			textSize(11*zoomFactor);
			textStyle(NORMAL);
			if(metric_system == "mm"){
				text(parseInt(dimension), 0, 4*zoomFactor);
			}
			else if(metric_system == "ft"){
				text(dimension, 0, 4*zoomFactor);
			}

			pop();

			
		}

		//drawing the node 
		line(vertices[i].x,vertices[i].y,vertices[i].x,vertices[i].y);

		//drawing the window
		for(var j = 0; j < vertices[i].windowIndex.length; j++){

			//updating the window position according to the new coordinates
			if(vertices[i].windowIndex[j].charAt(0) == "h"){
				windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y = vertices[i].y ;
				windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x = vertices[i].x + windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].distFromRoomNode;

			}
			else if(vertices[i].windowIndex[j].charAt(0) == "v"){
				windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x = vertices[i].x;
				windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y = vertices[i].y + windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].distFromRoomNode;				
			}

			//window dimension
			var windowDist = windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].distFromRoomNode;
			var windowDist_ft = to_ft(round(windowDist*conversionFactor));
			var windowDist_in = nfc(ft_in(windowDist_ft - Math.floor(windowDist_ft)),0);
			var windowDimension = Math.floor(windowDist_ft) + "'" + windowDist_in + '"';

			if(metric_system == "mm"){
				windowDimension = round(windowDist*conversionFactor);
			}

			if(windowDistShow[parseInt(vertices[i].windowIndex[j].substring(1))] == 1){
				push();
				strokeWeight(1);
				textSize(11*zoomFactor);
				stroke("#000000");
				if(vertices[i].windowIndex[j].charAt(0) == "h"){
					line(vertices[i].x, vertices[i].y + 10,windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x,windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y + 10);
					line(vertices[i].x, vertices[i].y + 5, vertices[i].x, vertices[i].y + 15);
					line(windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x, vertices[i].y + 5, windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x, vertices[i].y + 15);
					stroke("white");
					translate( (vertices[i].x + windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x)/2, (vertices[i].y + windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y)/2 );
					// rotate( windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].angle*PI/180);
					if(metric_system == "mm"){
						text(windowDimension, 0, 20*zoomFactor);
					}
					else if(metric_system == "ft"){
						text(windowDimension, 0, 20*zoomFactor);
					}
				}
				else if(vertices[i].windowIndex[j].charAt(0) == "v"){
					line(vertices[i].x - 10, vertices[i].y,windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x - 10,windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y);
					line(vertices[i].x - 5, vertices[i].y, vertices[i].x - 15, vertices[i].y);
					line(vertices[i].x - 5, windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y, vertices[i].x - 15, windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y);
					stroke("white");
					translate( (vertices[i].x + windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].x)/2, (vertices[i].y + windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].y)/2 );
					// rotate( windowVertices[parseInt(vertices[i].windowIndex[j].substring(1))].angle*PI/180);
					if(metric_system == "mm"){
						text(windowDimension, -40*zoomFactor, 0);
					}
					else if(metric_system == "ft"){
						text(windowDimension, -40*zoomFactor, 0);
					}					
				}
				
				
				pop();
			}

		}

		for(var j = 0; j < vertices[i].doorIndex.length; j++){

			//updating the door position according to the new coordinates
			if(vertices[i].doorIndex[j].charAt(0) == "h"){
				doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y = vertices[i].y;
				doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x = vertices[i].x + doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].distFromRoomNode;

			}
			else if(vertices[i].doorIndex[j].charAt(0) == "v"){
				doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x = vertices[i].x;
				doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y = vertices[i].y + doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].distFromRoomNode;				
			}

			var doorDist = doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].distFromRoomNode;
			var doorDist_ft = to_ft(round(doorDist*conversionFactor));
			var doorDist_in = nfc(ft_in(doorDist_ft - Math.floor(doorDist_ft)),0);
			var doorDimension = Math.floor(doorDist_ft) + "'" + doorDist_in + '"';

			if(metric_system == "mm"){
				doorDimension = round(doorDist*conversionFactor);
			}

			if(doorDistShow[parseInt(vertices[i].doorIndex[j].substring(1))] == 1){
				push();
				strokeWeight(1);
				textSize(11*zoomFactor);
				stroke("#000000");
				if(vertices[i].doorIndex[j].charAt(0) == "h"){
					line(vertices[i].x, vertices[i].y + 10,doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x,doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y + 10);
					line(vertices[i].x, vertices[i].y + 5, vertices[i].x, vertices[i].y + 15);
					line(doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x, vertices[i].y + 5, doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x, vertices[i].y + 15);
					stroke("white");
					translate( (vertices[i].x + doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x)/2, (vertices[i].y + doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y)/2 );
					// rotate( doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].angle*PI/180);
					if(metric_system == "mm"){
						text(doorDimension, 0, 20*zoomFactor);
					}
					else if(metric_system == "ft"){
						text(doorDimension, 0, 20*zoomFactor);
					}
				}
				else if(vertices[i].doorIndex[j].charAt(0) == "v"){
					line(vertices[i].x - 10, vertices[i].y,doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x - 10,doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y);
					line(vertices[i].x - 5, vertices[i].y, vertices[i].x - 15, vertices[i].y);
					line(vertices[i].x - 5, doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y, vertices[i].x - 15, doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y);
					stroke("white");
					translate( (vertices[i].x + doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].x)/2, (vertices[i].y + doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].y)/2 );
					// rotate( doorVertices[parseInt(vertices[i].doorIndex[j].substring(1))].angle*PI/180);
					if(metric_system == "mm"){
						text(doorDimension, -40*zoomFactor, 0);
					}
					else if(metric_system == "ft"){
						text(doorDimension, 0, -40*zoomFactor);
					}					
				}
				
				
				pop();
			}

		}

		//highlighting the node while hovering
		if(elem_hovered == vertices[i]){
			stroke('rgba(0,179,104,0.5)');
			strokeWeight(15*zoomFactor);
			line(vertices[i].x, vertices[i].y, vertices[i].x, vertices[i].y);
			stroke("#5E6975");
			strokeWeight(8*zoomFactor);
		}
		else{
			stroke('rgba(0,179,104,0.01)');
			line(vertices[i].x, vertices[i].y, vertices[i].x, vertices[i].y);
			stroke("#5E6975");
		}

		//highlighting the node if both its neighbouring nodes and itself lie on the same straight line			
		if(vertices[i].nextNode1.x == vertices[i].nextNode2.x){
			if(vertices[i].x == vertices[i].nextNode1.x){
				stroke("#000000");
				strokeWeight(15*zoomFactor);
				line(vertices[i].x,vertices[i].y,vertices[i].x,vertices[i].y);
				strokeWeight(8*zoomFactor);
				stroke("#5E6975");
			}
		}
		else{
			var lineY = (vertices[i].nextNode2.y - vertices[i].nextNode1.y)/(vertices[i].nextNode2.x - vertices[i].nextNode1.x)*(vertices[i].x - vertices[i].nextNode1.x) + vertices[i].nextNode1.y;
			if(lineY == vertices[i].y){
				stroke("#000000");
				strokeWeight(15*zoomFactor);
				line(vertices[i].x,vertices[i].y,vertices[i].x,vertices[i].y);
				strokeWeight(8*zoomFactor);
				stroke("#5E6975");
			}	
		}
		
		//highlighting the selected node
		if(typeof(elem_clicked) == "string"){
			if(elem_clicked.charAt(2) == "h" || elem_clicked.charAt(2) == "v"){
				stroke("#000000");
				line(vertices[elem_clicked.charAt(0)].x,vertices[elem_clicked.charAt(0)].y,vertices[elem_clicked.charAt(0)].x,vertices[elem_clicked.charAt(0)].y );
				if(elem_clicked.charAt(1) == "1"){
					line(vertices[elem_clicked.charAt(0)].nextNode1.x,vertices[elem_clicked.charAt(0)].nextNode1.y,vertices[elem_clicked.charAt(0)].nextNode1.x,vertices[elem_clicked.charAt(0)].nextNode1.y );
				}
				else{
					line(vertices[elem_clicked.charAt(0)].nextNode2.x,vertices[elem_clicked.charAt(0)].nextNode2.y,vertices[elem_clicked.charAt(0)].nextNode2.x,vertices[elem_clicked.charAt(0)].nextNode2.y );
				}
				stroke("#5E6975");
			}
			else if(elem_clicked.charAt(3) == "h" || elem_clicked.charAt(3) == "v"){
				stroke("#000000");
				line(vertices[elem_clicked.substring(0,2)].x,vertices[elem_clicked.substring(0,2)].y,vertices[elem_clicked.substring(0,2)].x,vertices[elem_clicked.substring(0,2)].y );
				if(elem_clicked.charAt(2) == "1"){
					line(vertices[elem_clicked.substring(0,2)].nextNode1.x,vertices[elem_clicked.substring(0,2)].nextNode1.y,vertices[elem_clicked.substring(0,2)].nextNode1.x,vertices[elem_clicked.substring(0,2)].nextNode1.y );
				}
				else{
					line(vertices[elem_clicked.substring(0,2)].nextNode2.x,vertices[elem_clicked.substring(0,2)].nextNode2.y,vertices[elem_clicked.substring(0,2)].nextNode2.x,vertices[elem_clicked.substring(0,2)].nextNode2.y );
				}
				stroke("#5E6975");
			}
		}

	}

	//drawing the window
	for(var k = 0; k < windowVertices.length; k++){
		if(windowVertices[k].angle == 0){
			draw_window(windowVertices[k].x,windowVertices[k].y,windowVertices[k].angle,windowVertices[k].width);
		}
		else if(windowVertices[k].angle == 90){
			draw_window(windowVertices[k].x,windowVertices[k].y,windowVertices[k].angle,windowVertices[k].height);	
		}
		
	}

	//drawing the door
	for(var k = 0; k < doorVertices.length; k++){
		if(doorVertices[k].angle == 0){
			draw_door(doorVertices[k].x,doorVertices[k].y,doorVertices[k].width,doorVertices[k].direction, doorVertices[k].angle);
		}
		else if(doorVertices[k].angle == 90){
			draw_door(doorVertices[k].x,doorVertices[k].y,doorVertices[k].height,doorVertices[k].direction, doorVertices[k].angle);	
		}
		
	}
	
}

function mouseMoved(){
	mouse.movedX = mouseX;
	mouse.movedY = mouseY;

	//mouse hovered on a vertex of the room
	for(var i = 0; i < vertices.length ; i++){
		if(lieInMiddle(mouse.movedX, vertices[i].x - stickiness, vertices[i].x + stickiness) && lieInMiddle(mouse.movedY, vertices[i].y + stickiness, vertices[i].y - stickiness)){
			elem_hovered = vertices[i];
			break;
		}
		else{
			elem_hovered = "";
		}
	}

	//moving the window when the window is created
	if (elem_selected == "window"){

		//applying stickiness
		for(var i = 0; i < vertices.length; i++){
			
			//nextNode1 exists
			if(vertices[i].nextNode1 != null){
				//vertical line
				if(vertices[i].x == vertices[i].nextNode1.x){

					//window to be attatched on the smmaller y node
					if(vertices[i].y < vertices[i].nextNode1.y){
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y, vertices[i].nextNode1.y - 100*zoomFactor)){
							windowVertices[windowNumber].x = vertices[i].x;
							windowVertices[windowNumber].y = mouse.movedY;
							windowVertices[windowNumber].angle = 90;
							windowVertices[windowNumber].width = 16;
							windowVertices[windowNumber].height =100;
							windowVertices[windowNumber].distFromRoomNode = mouse.movedY - vertices[i].y;
							windowOnVertex = "v" + i;
							break;

						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y -100*zoomFactor, vertices[i].nextNode1.y)){
							windowVertices[windowNumber].x = vertices[i].x;
							windowVertices[windowNumber].y = mouse.movedY;
							windowVertices[windowNumber].angle = 90;
							windowVertices[windowNumber].width = 16;
							windowVertices[windowNumber].height =100;
							windowOnVertex = "v" + vertices.indexOf(vertices[i].nextNode1);
							windowVertices[windowNumber].distFromRoomNode = mouse.movedY - vertices[i].nextNode1.y;
							break;
						}

					}

				}

				//horizontal line
				else if(vertices[i].y == vertices[i].nextNode1.y){

					////winow to be attatched on smaller x node
					if(vertices[i].x < vertices[i].nextNode1.x){
						if(lieInMiddle(mouse.movedX, vertices[i].x,vertices[i].nextNode1.x -100*zoomFactor) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							windowVertices[windowNumber].x = mouse.movedX;
							windowVertices[windowNumber].y = vertices[i].y;
							windowVertices[windowNumber].angle = 0;
							windowVertices[windowNumber].width = 100;
							windowVertices[windowNumber].height =16;
							windowVertices[windowNumber].distFromRoomNode = mouse.movedX - vertices[i].x;
							windowOnVertex = "h" + i;
							break;
						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - 100*zoomFactor,vertices[i].nextNode1.x) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							windowVertices[windowNumber].x = mouse.movedX;
							windowVertices[windowNumber].y = vertices[i].y;
							windowVertices[windowNumber].angle = 0;
							windowVertices[windowNumber].width = 100;
							windowVertices[windowNumber].height =16;
							windowVertices[windowNumber].distFromRoomNode = mouse.movedX - vertices[i].nextNode1.x;
							windowOnVertex = "h" + vertices.indexOf(vertices[i].nextNode1);
							break;
						}

					}
				}
			}

			//nextNode2 exists
			if(vertices[i].nextNode2 != null){
				//vertical line
				if(vertices[i].x == vertices[i].nextNode2.x){
					if(vertices[i].y < vertices[i].nextNode2.y){
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y, vertices[i].nextNode2.y - 100*zoomFactor)){
							windowVertices[windowNumber].x = vertices[i].x;
							windowVertices[windowNumber].y = mouse.movedY;
							windowVertices[windowNumber].angle = 90;
							windowVertices[windowNumber].width = 16;
							windowVertices[windowNumber].height =100;
							windowVertices[windowNumber].distFromRoomNode = mouse.movedY - vertices[i].y;
							windowOnVertex = "v" + i;
							break;

						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y - 100*zoomFactor, vertices[i].nextNode2.y)){
							windowVertices[windowNumber].x = vertices[i].x;
							windowVertices[windowNumber].y = mouse.movedY;
							windowVertices[windowNumber].angle = 90;
							windowVertices[windowNumber].width = 16;
							windowVertices[windowNumber].height =100;
							windowOnVertex = "v" + vertices.indexOf(vertices[i].nextNode2);
							windowVertices[windowNumber].distFromRoomNode = mouse.movedY - vertices[i].nextNode2.y;
							break;
						}

					}

				}

				//horizontal line
				else if(vertices[i].y == vertices[i].nextNode2.y){
					if(vertices[i].x < vertices[i].nextNode2.x){
						if(lieInMiddle(mouse.movedX, vertices[i].x,vertices[i].nextNode2.x - 100*zoomFactor) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							windowVertices[windowNumber].x = mouse.movedX;
							windowVertices[windowNumber].y = vertices[i].y;
							windowVertices[windowNumber].angle = 0;
							windowVertices[windowNumber].width = 100;
							windowVertices[windowNumber].height =16;
							windowVertices[windowNumber].distFromRoomNode = mouse.movedX - vertices[i].x;
							windowOnVertex = "h" + i;
							break;
						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - 100*zoomFactor,vertices[i].nextNode2.x) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							windowVertices[windowNumber].x = mouse.movedX;
							windowVertices[windowNumber].y = vertices[i].y;
							windowVertices[windowNumber].angle = 0;
							windowVertices[windowNumber].width = 100;
							windowVertices[windowNumber].height =16;
							windowVertices[windowNumber].distFromRoomNode = mouse.movedX - vertices[i].nextNode2.x;
							windowOnVertex = "h" + vertices.indexOf(vertices[i].nextNode2);
							break;
						}

					}
				}
			}
		}

	}

	if (elem_selected == "door"){

		//applying stickiness
		for(var i = 0; i < vertices.length; i++){
			
			//nextNode1 exists
			if(vertices[i].nextNode1 != null){
				//vertical line
				if(vertices[i].x == vertices[i].nextNode1.x){
					if(vertices[i].y < vertices[i].nextNode1.y){
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y, vertices[i].nextNode1.y - 100*zoomFactor)){
							doorVertices[doorNumber].x = vertices[i].x;
							doorVertices[doorNumber].y = mouse.movedY;
							doorVertices[doorNumber].angle = 90;
							doorVertices[doorNumber].width = 10;
							doorVertices[doorNumber].height =100;
							doorVertices[doorNumber].distFromRoomNode = mouse.movedY - vertices[i].y;
							doorOnVertex = "v" + i;
							break;

						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y -100*zoomFactor, vertices[i].nextNode1.y)){
							doorVertices[doorNumber].x = vertices[i].x;
							doorVertices[doorNumber].y = mouse.movedY;
							doorVertices[doorNumber].angle = 90;
							doorVertices[doorNumber].width = 10;
							doorVertices[doorNumber].height =100;
							doorOnVertex = "v" + vertices.indexOf(vertices[i].nextNode1);
							doorVertices[doorNumber].distFromRoomNode = mouse.movedY - vertices[i].nextNode1.y;
							break;
						}

					}

				}

				//horizontal line
				else if(vertices[i].y == vertices[i].nextNode1.y){
					if(vertices[i].x < vertices[i].nextNode1.x){
						if(lieInMiddle(mouse.movedX, vertices[i].x,vertices[i].nextNode1.x -100*zoomFactor) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							doorVertices[doorNumber].x = mouse.movedX;
							doorVertices[doorNumber].y = vertices[i].y;
							doorVertices[doorNumber].angle = 0;
							doorVertices[doorNumber].width = 100;
							doorVertices[doorNumber].height =10;
							doorVertices[doorNumber].distFromRoomNode = mouse.movedX - vertices[i].x;
							doorOnVertex = "h" + i;
							break;
						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - 100*zoomFactor,vertices[i].nextNode1.x) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							doorVertices[doorNumber].x = mouse.movedX;
							doorVertices[doorNumber].y = vertices[i].y;
							doorVertices[doorNumber].angle = 0;
							doorVertices[doorNumber].width = 100;
							doorVertices[doorNumber].height =10;
							doorVertices[doorNumber].distFromRoomNode = mouse.movedX - vertices[i].nextNode1.x;
							doorOnVertex = "h" + vertices.indexOf(vertices[i].nextNode1);
							break;
						}

					}
				}
			}

			//nextNode2 exists
			if(vertices[i].nextNode2 != null){
				//vertical line
				if(vertices[i].x == vertices[i].nextNode2.x){
					if(vertices[i].y < vertices[i].nextNode2.y){
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y, vertices[i].nextNode2.y - 100*zoomFactor)){
							doorVertices[doorNumber].x = vertices[i].x;
							doorVertices[doorNumber].y = mouse.movedY;
							doorVertices[doorNumber].angle = 90;
							doorVertices[doorNumber].width = 10;
							doorVertices[doorNumber].height =100;
							doorVertices[doorNumber].distFromRoomNode = mouse.movedY - vertices[i].y;
							doorOnVertex = "v" + i;
							break;

						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.movedY, vertices[i].y - 100*zoomFactor, vertices[i].nextNode2.y)){
							doorVertices[doorNumber].x = vertices[i].x;
							doorVertices[doorNumber].y = mouse.movedY;
							doorVertices[doorNumber].angle = 90;
							doorVertices[doorNumber].width = 10;
							doorVertices[doorNumber].height =100;
							doorOnVertex = "v" + vertices.indexOf(vertices[i].nextNode2);
							doorVertices[doorNumber].distFromRoomNode = mouse.movedY - vertices[i].nextNode2.y;
							break;
						}

					}

				}

				//horizontal line
				else if(vertices[i].y == vertices[i].nextNode2.y){
					if(vertices[i].x < vertices[i].nextNode2.x){
						if(lieInMiddle(mouse.movedX, vertices[i].x,vertices[i].nextNode2.x - 100*zoomFactor) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							doorVertices[doorNumber].x = mouse.movedX;
							doorVertices[doorNumber].y = vertices[i].y;
							doorVertices[doorNumber].angle = 0;
							doorVertices[doorNumber].width = 100;
							doorVertices[doorNumber].height =10;
							doorVertices[doorNumber].distFromRoomNode = mouse.movedX - vertices[i].x;
							doorOnVertex = "h" + i;
							break;
						}
					}
					else{
						if(lieInMiddle(mouse.movedX, vertices[i].x - 100*zoomFactor,vertices[i].nextNode2.x) && lieInMiddle(mouse.movedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){
							doorVertices[doorNumber].x = mouse.movedX;
							doorVertices[doorNumber].y = vertices[i].y;
							doorVertices[doorNumber].angle = 0;
							doorVertices[doorNumber].width = 100;
							doorVertices[doorNumber].height =10;
							doorVertices[doorNumber].distFromRoomNode = mouse.movedX - vertices[i].nextNode2.x;
							doorOnVertex = "h" + vertices.indexOf(vertices[i].nextNode2);
							break;
						}

					}
				}
			}
		}

	}


}

function mouseDragged(){

	mouse.draggedX = mouseX;
	mouse.draggedY = mouseY;

	//deletion of doors and windows on encountering the next vertex of a line
	for(var i = 0; i < vertices.length; i ++){
		for(var j = 0; j < windowVertices.length; j++){
			if(windowVertices[j].angle == 0){
				if(lieInMiddle(vertices[i].x, windowVertices[j].x, windowVertices[j].x + windowVertices[j].width*zoomFactor) && 
					lieInMiddle(vertices[i].y, windowVertices[j].y - windowVertices[j].height*zoomFactor, windowVertices[j].y + windowVertices[j].height*zoomFactor)){
					windowVertices[j] = -1;
					
					for(var k = 0; k < vertices[i].windowIndex.length; k++){
						if(vertices[i].windowIndex[k].substring(1) == j){
							vertices[i].windowIndex.splice(k,1);
							break;
						}
					}
					for(var k = 0; k < vertices[i].nextNode1.windowIndex.length; k++){
						if(vertices[i].nextNode1.windowIndex[k].substring(1) == j){
							vertices[i].nextNode1.windowIndex.splice(k,1);
							break;
						}
					}
					for(var k = 0; k < vertices[i].nextNode2.windowIndex.length; k++){
						if(vertices[i].nextNode2.windowIndex[k].substring(1) == j){
							vertices[i].nextNode2.windowIndex.splice(k,1);
							break;
						}
					}
					break;
				}
			}
			else if(windowVertices[j].angle == 90){
				if(lieInMiddle(vertices[i].x, windowVertices[j].x - windowVertices[j].width*zoomFactor, windowVertices[j].x + windowVertices[j].width*zoomFactor) 
					&& lieInMiddle(vertices[i].y, windowVertices[j].y, windowVertices[j].y + windowVertices[j].height*zoomFactor)){
					windowVertices[j] = -1;
					
					for(var k = 0; k < vertices[i].windowIndex.length; k++){
						if(vertices[i].windowIndex[k].substring(1) == j){
							vertices[i].windowIndex.splice(k,1);
							break;
						}
					}
					for(var k = 0; k < vertices[i].nextNode1.windowIndex.length; k++){
						if(vertices[i].nextNode1.windowIndex[k].substring(1) == j){
							vertices[i].nextNode1.windowIndex.splice(k,1);
							break;
						}
					}
					for(var k = 0; k < vertices[i].nextNode2.windowIndex.length; k++){
						if(vertices[i].nextNode2.windowIndex[k].substring(1) == j){
							vertices[i].nextNode2.windowIndex.splice(k,1);
							break;
						}
					}
					break;
				}
			}	

		}

		for(var j = 0; j < doorVertices.length; j++){
			if(lieInMiddle(vertices[i].x, doorVertices[j].x, doorVertices[j].x + doorVertices[j].width) && lieInMiddle(vertices[i].y, doorVertices[j].y, doorVertices[j].y + doorVertices[j].height)){
				doorVertices[j] = -1;
				
				for(var k = 0; k < vertices[i].doorIndex.length; k++){
					if(vertices[i].doorIndex[k].substring(1) == j){
						vertices[i].doorIndex.splice(k,1);
						break;
					}
				}
				for(var k = 0; k < vertices[i].nextNode1.doorIndex.length; k++){
					if(vertices[i].nextNode1.doorIndex[k].substring(1) == j){
						vertices[i].nextNode1.doorIndex.splice(k,1);
						break;
					}
				}
				for(var k = 0; k < vertices[i].nextNode2.doorIndex.length; k++){
					if(vertices[i].nextNode2.doorIndex[k].substring(1) == j){
						vertices[i].nextNode2.doorIndex.splice(k,1);
						break;
					}
				}
				break;
			}

		}
	}


	//node dragging
	if(typeof(elem_selected) == "object"){

		elem_selected.x = mouse.draggedX;
		elem_selected.y = mouse.draggedY;
		
		if(lieInMiddle(elem_selected.x,elem_selected.nextNode1.x - stickiness, elem_selected.nextNode1.x + stickiness)){
			elem_selected.x = elem_selected.nextNode1.x;
		}
		if(lieInMiddle(elem_selected.y,elem_selected.nextNode1.y - stickiness, elem_selected.nextNode1.y + stickiness)){
			elem_selected.y = elem_selected.nextNode1.y;
		}
		if(lieInMiddle(elem_selected.x,elem_selected.nextNode2.x - stickiness, elem_selected.nextNode2.x + stickiness)){
			elem_selected.x = elem_selected.nextNode2.x;
		}
		if(lieInMiddle(elem_selected.y,elem_selected.nextNode2.y - stickiness, elem_selected.nextNode2.y + stickiness)){
			elem_selected.y = elem_selected.nextNode2.y;
		}

	}

	//line dragging
	if(typeof(elem_selected) == "string"){
		var index;

		if(elem_selected.charAt(2) == "h" || elem_selected.charAt(2) == "v"){
			index = elem_selected.charAt(0);
			var change_node = vertices[parseInt(index)];
			if(elem_selected.substring(2) == "horizontal"){
				change_node.y = mouse.draggedY;

				if(elem_selected.charAt(1) == "1"){
					change_node.nextNode1.y = mouse.draggedY;

				}
				else if(elem_selected.charAt(1) == "2"){
					change_node.nextNode2.y = mouse.draggedY;
				}
			}

			else if(elem_selected.substring(2) == "vertical"){
				change_node.x = mouse.draggedX;
				
				if(elem_selected.charAt(1) == "1"){
					change_node.nextNode1.x = mouse.draggedX;
				}
				else if(elem_selected.charAt(1) == "2"){
					change_node.nextNode2.x = mouse.draggedX;
				}

			}
		}

		else if(elem_selected.charAt(3) == "h" || elem_selected.charAt(3) == "v"){
			index = elem_selected.substring(0,2);
			var change_node = vertices[parseInt(index)];
			if(elem_selected.substring(3) == "horizontal"){
				change_node.y = mouse.draggedY;

				if(elem_selected.charAt(2) == "1"){
					change_node.nextNode1.y = mouse.draggedY;
				}
				else if(elem_selected.charAt(2) == "2"){
					change_node.nextNode2.y = mouse.draggedY;
				}
			}

			else if(elem_selected.substring(3) == "vertical"){
				change_node.x = mouse.draggedX;

				if(elem_selected.charAt(2) == "1"){
					change_node.nextNode1.x = mouse.draggedX;
				}
				else if(elem_selected.charAt(2) == "2"){
					change_node.nextNode2.x = mouse.draggedX;
				}

			}
		}

		//window dragging
		else if(elem_selected.substring(0,6) == "window"){

			close_panel();

			//removing the window from previously sticked node
			for(var i = 0; i < vertices.length; i++){
				for(var j = 0; j < vertices[i].windowIndex.length; j++){
					if(elem_selected.substring(6) == vertices[i].windowIndex[j].substring(1)){
						vertices[i].windowIndex.splice(j,1);
						break;
					}
				}
			}
			//applying stickiness
			for(var i = 0; i < vertices.length; i++){

				var length = Math.max(windowVertices[parseInt(elem_selected.substring(6))].width, windowVertices[parseInt(elem_selected.substring(6))].height);
				//nextNode1 exists
				if(vertices[i].nextNode1 != null){
					//vertical line
					if(vertices[i].x == vertices[i].nextNode1.x){
						if(vertices[i].y < vertices[i].nextNode1.y){
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y, vertices[i].nextNode1.y - length*zoomFactor)){

								windowVertices[parseInt(elem_selected.substring(6))].x = vertices[i].x;
								windowVertices[parseInt(elem_selected.substring(6))].y = mouse.draggedY;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 0){
									windowVertices[parseInt(elem_selected.substring(6))].height = windowVertices[parseInt(elem_selected.substring(6))].width;
									windowVertices[parseInt(elem_selected.substring(6))].width = 16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 90;
								
								windowOnVertex = "v" + i;
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedY - vertices[i].y;
								break;
							}
							
						}

						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y - length*zoomFactor, vertices[i].nextNode1.y)){

								windowVertices[parseInt(elem_selected.substring(6))].x = vertices[i].x;
								windowVertices[parseInt(elem_selected.substring(6))].y = mouse.draggedY;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 0){
									windowVertices[parseInt(elem_selected.substring(6))].height =windowVertices[parseInt(elem_selected.substring(6))].width;
									windowVertices[parseInt(elem_selected.substring(6))].width = 16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 90;
								
								windowOnVertex = "v" + vertices.indexOf(vertices[i].nextNode1);
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedY - vertices[i].nextNode1.y;
								break;
							}
							
						}
						

					}

					//horizontal line
					else if(vertices[i].y == vertices[i].nextNode1.y){
						if(vertices[i].x < vertices[i].nextNode1.x){
							if(lieInMiddle(mouse.draggedX, vertices[i].x,vertices[i].nextNode1.x - length*zoomFactor) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								windowVertices[parseInt(elem_selected.substring(6))].x = mouse.draggedX;
								windowVertices[parseInt(elem_selected.substring(6))].y = vertices[i].y;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 90){
									windowVertices[parseInt(elem_selected.substring(6))].width = windowVertices[parseInt(elem_selected.substring(6))].height;
									windowVertices[parseInt(elem_selected.substring(6))].height =16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 0;
								
								windowOnVertex = "h" + i;
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedX - vertices[i].x;
								break;
							}
						}
						
						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - length*zoomFactor,vertices[i].nextNode1.x) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								windowVertices[parseInt(elem_selected.substring(6))].x = mouse.draggedX;
								windowVertices[parseInt(elem_selected.substring(6))].y = vertices[i].y;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 90){
									windowVertices[parseInt(elem_selected.substring(6))].width = windowVertices[parseInt(elem_selected.substring(6))].height;
									windowVertices[parseInt(elem_selected.substring(6))].height =16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 0;
								
								windowOnVertex = "h" + vertices.indexOf(vertices[i].nextNode1);
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedX - vertices[i].nextNode1.x;
								break;
							}
						}
						
					}
				}

				//nextNode2 exists
				if(vertices[i].nextNode2 != null){
					//vertical line
					if(vertices[i].x == vertices[i].nextNode2.x){
						if(vertices[i].y < vertices[i].nextNode2.y){
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y, vertices[i].nextNode2.y - length*zoomFactor)){

								windowVertices[parseInt(elem_selected.substring(6))].x = vertices[i].x;
								windowVertices[parseInt(elem_selected.substring(6))].y = mouse.draggedY;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 0){
									windowVertices[parseInt(elem_selected.substring(6))].height =windowVertices[parseInt(elem_selected.substring(6))].width;
									windowVertices[parseInt(elem_selected.substring(6))].width = 16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 90;
								
								windowOnVertex = "v" + i;
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedY - vertices[i].y;
								break;
							}
							
						}

						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y - length*zoomFactor, vertices[i].nextNode2.y)){

								windowVertices[parseInt(elem_selected.substring(6))].x = vertices[i].x;
								windowVertices[parseInt(elem_selected.substring(6))].y = mouse.draggedY;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 0){
									windowVertices[parseInt(elem_selected.substring(6))].height =windowVertices[parseInt(elem_selected.substring(6))].width;
									windowVertices[parseInt(elem_selected.substring(6))].width = 16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 90;

								windowOnVertex = "v" + vertices.indexOf(vertices[i].nextNode2);
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedY - vertices[i].nextNode2.y;
								break;
							}
							
						}
						

					}

					//horizontal line
					else if(vertices[i].y == vertices[i].nextNode2.y){
						if(vertices[i].x < vertices[i].nextNode2.x){
							if(lieInMiddle(mouse.draggedX, vertices[i].x,vertices[i].nextNode2.x - length*zoomFactor) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								windowVertices[parseInt(elem_selected.substring(6))].x = mouse.draggedX;
								windowVertices[parseInt(elem_selected.substring(6))].y = vertices[i].y;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 90){
									windowVertices[parseInt(elem_selected.substring(6))].width = windowVertices[parseInt(elem_selected.substring(6))].height;
									windowVertices[parseInt(elem_selected.substring(6))].height =16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 0;

								windowOnVertex = "h" + i;
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedX - vertices[i].x;
								break;
							}
						}
						
						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - length*zoomFactor,vertices[i].nextNode2.x) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								windowVertices[parseInt(elem_selected.substring(6))].x = mouse.draggedX;
								windowVertices[parseInt(elem_selected.substring(6))].y = vertices[i].y;
								
								if(windowVertices[parseInt(elem_selected.substring(6))].angle == 90){
									windowVertices[parseInt(elem_selected.substring(6))].width = windowVertices[parseInt(elem_selected.substring(6))].height;
									windowVertices[parseInt(elem_selected.substring(6))].height =16;
								}
								windowVertices[parseInt(elem_selected.substring(6))].angle = 0;

								windowOnVertex = "h" + vertices.indexOf(vertices[i].nextNode2);
								windowVertices[parseInt(elem_selected.substring(6))].distFromRoomNode = mouse.draggedX - vertices[i].nextNode2.x;
								break;
							}
						}
						
					}
				}
				
			}
			var elem = windowOnVertex.charAt(0) + elem_selected.substring(6);
			vertices[parseInt(windowOnVertex.substring(1))].windowIndex.push(elem);
		}


		//door dragging
		else if(elem_selected.substring(0,4) == "door"){

			close_panel();

			//removing the window from previously sticked node
			for(var i = 0; i < vertices.length; i++){
				for(var j = 0; j < vertices[i].doorIndex.length; j++){
					if(elem_selected.substring(4) == vertices[i].doorIndex[j].substring(1)){
						vertices[i].doorIndex.splice(j,1);
						break;
					}
				}
			}
			//applying stickiness
			for(var i = 0; i < vertices.length; i++){

				var length = Math.max(doorVertices[parseInt(elem_selected.substring(4))].width, doorVertices[parseInt(elem_selected.substring(4))].height);
				//nextNode1 exists
				if(vertices[i].nextNode1 != null){
					//vertical line
					if(vertices[i].x == vertices[i].nextNode1.x){
						if(vertices[i].y < vertices[i].nextNode1.y){
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y, vertices[i].nextNode1.y - length*zoomFactor)){

								doorVertices[parseInt(elem_selected.substring(4))].x = vertices[i].x;
								doorVertices[parseInt(elem_selected.substring(4))].y = mouse.draggedY;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 0){
									doorVertices[parseInt(elem_selected.substring(4))].height = doorVertices[parseInt(elem_selected.substring(4))].width;
									doorVertices[parseInt(elem_selected.substring(4))].width = 10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 90;
								
								doorOnVertex = "v" + i;
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedY - vertices[i].y;
								break;
							}
							
						}

						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y - length*zoomFactor, vertices[i].nextNode1.y)){

								doorVertices[parseInt(elem_selected.substring(4))].x = vertices[i].x;
								doorVertices[parseInt(elem_selected.substring(4))].y = mouse.draggedY;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 0){
									doorVertices[parseInt(elem_selected.substring(4))].height =doorVertices[parseInt(elem_selected.substring(4))].width;
									doorVertices[parseInt(elem_selected.substring(4))].width = 10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 90;
								
								doorOnVertex = "v" + vertices.indexOf(vertices[i].nextNode1);
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedY - vertices[i].nextNode1.y;
								break;
							}
							
						}
						

					}

					//horizontal line
					else if(vertices[i].y == vertices[i].nextNode1.y){
						if(vertices[i].x < vertices[i].nextNode1.x){
							if(lieInMiddle(mouse.draggedX, vertices[i].x,vertices[i].nextNode1.x - length*zoomFactor) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								doorVertices[parseInt(elem_selected.substring(4))].x = mouse.draggedX;
								doorVertices[parseInt(elem_selected.substring(4))].y = vertices[i].y;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 90){
									doorVertices[parseInt(elem_selected.substring(4))].width = doorVertices[parseInt(elem_selected.substring(4))].height;
									doorVertices[parseInt(elem_selected.substring(4))].height =10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 0;
								
								doorOnVertex = "h" + i;
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedX - vertices[i].x;
								break;
							}
						}
						
						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - length*zoomFactor,vertices[i].nextNode1.x) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								doorVertices[parseInt(elem_selected.substring(4))].x = mouse.draggedX;
								doorVertices[parseInt(elem_selected.substring(4))].y = vertices[i].y;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 90){
									doorVertices[parseInt(elem_selected.substring(4))].width = doorVertices[parseInt(elem_selected.substring(4))].height;
									doorVertices[parseInt(elem_selected.substring(4))].height =10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 0;
								
								doorOnVertex = "h" + vertices.indexOf(vertices[i].nextNode1);
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedX - vertices[i].nextNode1.x;
								break;
							}
						}
						
					}
				}

				//nextNode2 exists
				if(vertices[i].nextNode2 != null){
					//vertical line
					if(vertices[i].x == vertices[i].nextNode2.x){
						if(vertices[i].y < vertices[i].nextNode2.y){
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y, vertices[i].nextNode2.y - length*zoomFactor)){

								doorVertices[parseInt(elem_selected.substring(4))].x = vertices[i].x;
								doorVertices[parseInt(elem_selected.substring(4))].y = mouse.draggedY;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 0){
									doorVertices[parseInt(elem_selected.substring(4))].height =doorVertices[parseInt(elem_selected.substring(4))].width;
									doorVertices[parseInt(elem_selected.substring(4))].width = 10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 90;
								
								doorOnVertex = "v" + i;
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedY - vertices[i].y;
								break;
							}
							
						}

						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - windowStickiness,vertices[i].x + windowStickiness) && lieInMiddle(mouse.draggedY, vertices[i].y - length*zoomFactor, vertices[i].nextNode2.y)){

								doorVertices[parseInt(elem_selected.substring(4))].x = vertices[i].x;
								doorVertices[parseInt(elem_selected.substring(4))].y = mouse.draggedY;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 0){
									doorVertices[parseInt(elem_selected.substring(4))].height =doorVertices[parseInt(elem_selected.substring(4))].width;
									doorVertices[parseInt(elem_selected.substring(4))].width = 10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 90;

								doorOnVertex = "v" + vertices.indexOf(vertices[i].nextNode2);
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedY - vertices[i].nextNode2.y;
								break;
							}
							
						}
						

					}

					//horizontal line
					else if(vertices[i].y == vertices[i].nextNode2.y){
						if(vertices[i].x < vertices[i].nextNode2.x){
							if(lieInMiddle(mouse.draggedX, vertices[i].x,vertices[i].nextNode2.x - length*zoomFactor) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								doorVertices[parseInt(elem_selected.substring(4))].x = mouse.draggedX;
								doorVertices[parseInt(elem_selected.substring(4))].y = vertices[i].y;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 90){
									doorVertices[parseInt(elem_selected.substring(4))].width = doorVertices[parseInt(elem_selected.substring(4))].height;
									doorVertices[parseInt(elem_selected.substring(4))].height =10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 0;

								doorOnVertex = "h" + i;
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedX - vertices[i].x;
								break;
							}
						}
						
						else{
							if(lieInMiddle(mouse.draggedX, vertices[i].x - length*zoomFactor,vertices[i].nextNode2.x) && lieInMiddle(mouse.draggedY, vertices[i].y - windowStickiness, vertices[i].y + windowStickiness)){

								doorVertices[parseInt(elem_selected.substring(4))].x = mouse.draggedX;
								doorVertices[parseInt(elem_selected.substring(4))].y = vertices[i].y;
								
								if(doorVertices[parseInt(elem_selected.substring(4))].angle == 90){
									doorVertices[parseInt(elem_selected.substring(4))].width = doorVertices[parseInt(elem_selected.substring(4))].height;
									doorVertices[parseInt(elem_selected.substring(4))].height =10;
								}
								doorVertices[parseInt(elem_selected.substring(4))].angle = 0;

								doorOnVertex = "h" + vertices.indexOf(vertices[i].nextNode2);
								doorVertices[parseInt(elem_selected.substring(4))].distFromRoomNode = mouse.draggedX - vertices[i].nextNode2.x;
								break;
							}
						}
						
					}
				}
				
			}
			var elem = doorOnVertex.charAt(0) + elem_selected.substring(4);
			vertices[parseInt(doorOnVertex.substring(1))].doorIndex.push(elem);
		}

		//room dragging
		else if(elem_selected == "room"){
			var shiftX = mouse.draggedX - mouse.pressedX;
			var shiftY = mouse.draggedY - mouse.pressedY;
			for(var i = 0; i < vertices.length; i++){
				vertices[i].x = mousePressedVertices[i].x + shiftX;
				vertices[i].y = mousePressedVertices[i].y + shiftY;
			}

			for(var i = 0; i < windowVertices.length; i++){
				windowVertices[i].x = mousePressedWindowVertices[i].x + shiftX;
				windowVertices[i].y = mousePressedWindowVertices[i].y + shiftY;
			}

			for(var i = 0; i < doorVertices.length; i++){
				doorVertices[i].x = mousePressedDoorVertices[i].x + shiftX;
				doorVertices[i].y = mousePressedDoorVertices[i].y + shiftY;
			}
		}

	}


	return false;

}
function mousePressed(){
	mouse.pressedX = mouseX;
	mouse.pressedY = mouseY;

	elem_clicked = "";

	for(var  i = 0; i < windowVertices.length; i++){
		windowDistShow[i] = 0;
	}

	for(var  i = 0; i < doorVertices.length; i++){
		doorDistShow[i] = 0;
	} 

	if(splitWall == 0){

		if(lieInMiddle(mouse.pressedX, roomExtreme.minX, roomExtreme.maxX) && lieInMiddle(mouse.pressedY, roomExtreme.minY, roomExtreme.maxY)){
			elem_selected = "room";
			elem_clicked = "room";
			elem_panel = "room";
			mousePressedVertices = [];
			mousePressedWindowVertices = [];
			mousePressedDoorVertices = [];
			for(var i = 0; i < vertices.length; i++){
				var mousePressedCoordinate = new Coordinate();
				mousePressedCoordinate.x = vertices[i].x;
				mousePressedCoordinate.y = vertices[i].y;
				mousePressedVertices.push(mousePressedCoordinate);
			}

			for(var i = 0; i < windowVertices.length; i++){
				var mousePressedWindowCoordinate = new Coordinate();
				mousePressedWindowCoordinate.x = windowVertices[i].x;
				mousePressedWindowCoordinate.y = windowVertices[i].y;
				mousePressedWindowVertices.push(mousePressedWindowCoordinate);
			}

			for(var i = 0; i < doorVertices.length; i++){
				var mousePressedDoorCoordinate = new Coordinate();
				mousePressedDoorCoordinate.x = doorVertices[i].x;
				mousePressedDoorCoordinate.y = doorVertices[i].y;
				mousePressedDoorVertices.push(mousePressedDoorCoordinate);
			}
			// close_panel();
		}

		for(var i = 0; i < vertices.length; i++){

			//nextNode1 exists
			if(vertices[i].nextNode1 != null){
				if(vertices[i].x == vertices[i].nextNode1.x){
					if(lieInMiddle(mouse.pressedX,vertices[i].x - stickiness, vertices[i].x + stickiness) && lieInMiddle(mouse.pressedY, vertices[i].y, vertices[i].nextNode1.y) ){
						elem_selected = i + "1" + "vertical";
						elem_clicked = i + "1" + "vertical";
						elem_panel = i + "1" + "vertical";
						// close_panel();
						break;	
						
					}

				}
				else{
					var lineY = (vertices[i].y - vertices[i].nextNode1.y)/(vertices[i].x - vertices[i].nextNode1.x)*(mouse.pressedX - vertices[i].x) + vertices[i].y; 
					if(lieInMiddle(mouse.pressedY, lineY + stickiness, lineY - stickiness) && lieInMiddle(mouse.pressedX, vertices[i].x, vertices[i].nextNode1.x)){
						elem_selected = i + "1" + "horizontal";
						elem_clicked = i + "1" + "horizontal";
						elem_panel = i + "1" + "vertical";
						// close_panel();
						break;	
						
					}

				}
				
			}

			//nextNode2 exists
			if(vertices[i].nextNode2 != null){
				if(vertices[i].x == vertices[i].nextNode2.x){
					if(lieInMiddle(mouse.pressedX,vertices[i].x - stickiness, vertices[i].x + stickiness) && lieInMiddle(mouse.pressedY, vertices[i].y, vertices[i].nextNode2.y) ){
						elem_selected = i + "2" + "vertical";
						elem_clicked = i + "2" + "vertical";
						elem_panel = i + "1" + "vertical";
						// close_panel();
						break;	
						
					}

				}
				else{
					var lineY = (vertices[i].y - vertices[i].nextNode2.y)/(vertices[i].x - vertices[i].nextNode2.x)*(mouse.pressedX - vertices[i].x) + vertices[i].y; 
					if(lieInMiddle(mouse.pressedY, lineY + stickiness, lineY - stickiness) && lieInMiddle(mouse.pressedX, vertices[i].x, vertices[i].nextNode2.x)){
						elem_selected = i + "2" + "horizontal";
						elem_clicked = i + "2" + "horizontal";
						elem_panel = i + "1" + "vertical";
						// close_panel();
						break;	
						
					}
				}
				
			}
		
		}

		for(var i = 0; i < vertices.length; i++){
			//node selection
			if(lieInMiddle(mouse.pressedX,vertices[i].x + stickiness, vertices[i].x - stickiness) && lieInMiddle(mouse.pressedY,vertices[i].y + stickiness, vertices[i].y - stickiness)){
				elem_selected = vertices[i];
				elem_clicked = vertices[i];
				elem_panel = vertices[i];
				nodePressX = vertices[i].x;
				nodePressY = vertices[i].y;
				// close_panel();
				break;
			}
		}

		//window selection
		for(var i =0; i < windowVertices.length; i++){
			if(windowVertices[i].angle == 0){
				if(lieInMiddle(mouse.pressedX, windowVertices[i].x, windowVertices[i].x + windowVertices[i].width*zoomFactor) && lieInMiddle(mouse.pressedY, windowVertices[i].y - windowVertices[i].height*zoomFactor, windowVertices[i].y + windowVertices[i].height*zoomFactor)){
					elem_selected = "window" + i;
					elem_clicked = "window" + i;
					elem_panel = "window" + i;
					windowDistShow[i] = 1;
					
					break;
				}
			}

			else if(windowVertices[i].angle == 90){
				if(lieInMiddle(mouse.pressedX, windowVertices[i].x - windowVertices[i].width*zoomFactor, windowVertices[i].x + windowVertices[i].width*zoomFactor) && lieInMiddle(mouse.pressedY, windowVertices[i].y, windowVertices[i].y + windowVertices[i].height*zoomFactor)){
					elem_selected = "window" + i;
					elem_clicked = "window" + i;
					elem_panel = "window" + i;
					windowDistShow[i] = 1;
					
					break;
				}
			}
		}

		for(var i = 0; i < doorVertices.length; i++){
			if(doorVertices[i].angle == 0){
				if(lieInMiddle(mouse.pressedX, doorVertices[i].x, doorVertices[i].x + doorVertices[i].width*zoomFactor) && lieInMiddle(mouse.pressedY, doorVertices[i].y - doorVertices[i].height*zoomFactor, doorVertices[i].y + doorVertices[i].height*zoomFactor)){
					elem_selected = "door" + i;
					elem_clicked = "door" + i;
					elem_panel = "door" + i;
					doorDistShow[i] = 1;
					
					break;
				}
			}

			else if(doorVertices[i].angle == 90){
				if(lieInMiddle(mouse.pressedX, doorVertices[i].x - doorVertices[i].width*zoomFactor, doorVertices[i].x + doorVertices[i].width*zoomFactor) && lieInMiddle(mouse.pressedY, doorVertices[i].y, doorVertices[i].y + doorVertices[i].height*zoomFactor)){
					elem_selected = "door" + i;
					elem_clicked = "door" + i;
					elem_panel = "door" + i;
					doorDistShow[i] = 1;
					
					break;
				}
			}
		}

		if($("#info").is(":visible") && mouse.pressedX > 0 && mouse.pressedX < 250){
			elem_clicked = "panel";
			if(elem_panel.substring(0,6)  == "window"){
				windowDistShow[parseInt(elem_panel.substring(6))] = 1;
			}
			else if(elem_panel.substring(0,4) == "door"){
				doorDistShow[parseInt(elem_panel.substring(4))] = 1 ;
			}
		}

		if(mouse.pressedX < 0 ){
			elem_clicked = "side_panel";
		}	

		if(typeof(elem_clicked) == "object"){
			close_panel();
		}

		else if(typeof(elem_clicked) == "string"){
			if(elem_clicked != "panel" && elem_clicked != "side_panel" && elem_clicked.substring(0,6)!="window" && elem_clicked.substring(0,4)!= "door"){
				close_panel();
			}
		}
	}

	else if (splitWall == 1){
		// splitWall = 0;
		var insertNode;

		for(var i = 0; i < vertices.length; i++){

			//node selection
			if(lieInMiddle(mouse.pressedX,vertices[i].x + stickiness, vertices[i].x - stickiness) && lieInMiddle(mouse.pressedY,vertices[i].y + stickiness, vertices[i].y - stickiness)){
				elem_selected = vertices[i];
				elem_clicked = vertices[i];
				elem_panel = vertices[i];
				break;
			}

			//nextNode1 exists
			if(vertices[i].nextNode1 != null){
				if(vertices[i].x == vertices[i].nextNode1.x){
					if(lieInMiddle(mouse.pressedX,vertices[i].x - stickiness, vertices[i].x + stickiness) && lieInMiddle(mouse.pressedY, vertices[i].y, vertices[i].nextNode1.y) ){
						var insertNode = new Node();

						insertNode.y = mouse.pressedY;
						insertNode.x = vertices[i].x;
						insertNode.nextNode1 = vertices[i];
						insertNode.nextNode2 = vertices[i].nextNode1;
						insertNode.inside1 = vertices[i].inside1;
						insertNode.inside2 = vertices[i].inside1;

						vertices.push(insertNode);

						if(vertices[i] == vertices[i].nextNode1.nextNode1){
							vertices[i].nextNode1.nextNode1 = insertNode;
						}
						else if(vertices[i] == vertices[i].nextNode1.nextNode2){
							vertices[i].nextNode1.nextNode2 = insertNode;
						}
						
						vertices[i].nextNode1 = insertNode;
						splitWall = 0;
						break;	
						
					}

				}
				else{
					var lineY = (vertices[i].y - vertices[i].nextNode1.y)/(vertices[i].x - vertices[i].nextNode1.x)*(mouse.pressedX - vertices[i].x) + vertices[i].y; 
					if(lieInMiddle(mouse.pressedY, lineY + stickiness, lineY - stickiness) && lieInMiddle(mouse.pressedX, vertices[i].x, vertices[i].nextNode1.x)){
						var insertNode = new Node();

						insertNode.y = lineY;
						insertNode.x = mouse.pressedX;
						insertNode.nextNode1 = vertices[i];
						insertNode.nextNode2 = vertices[i].nextNode1;
						insertNode.inside1 = vertices[i].inside1;
						insertNode.inside2 = vertices[i].inside1;

						vertices.push(insertNode);

						if(vertices[i] == vertices[i].nextNode1.nextNode1){
							vertices[i].nextNode1.nextNode1 = insertNode;
						}
						else if(vertices[i] == vertices[i].nextNode1.nextNode2){
							vertices[i].nextNode1.nextNode2 = insertNode;
						}
						
						vertices[i].nextNode1 = insertNode;
						splitWall = 0;
						break;	
						
					}
				}
				
			}

			//nextNode2 exists
			if(vertices[i].nextNode2 != null){
				if(vertices[i].x == vertices[i].nextNode2.x){
					if(lieInMiddle(mouse.pressedX,vertices[i].x - stickiness, vertices[i].x + stickiness) && lieInMiddle(mouse.pressedY, vertices[i].y, vertices[i].nextNode2.y) ){
						var insertNode = new Node();

						insertNode.y = mouse.pressedY;
						insertNode.x = vertices[i].x;
						insertNode.nextNode1 = vertices[i];
						insertNode.nextNode2 = vertices[i].nextNode2;
						insertNode.inside1 = vertices[i].inside2;
						insertNode.inside2 = vertices[i].inside2;

						vertices.push(insertNode);

						if(vertices[i] == vertices[i].nextNode2.nextNode1){
							vertices[i].nextNode2.nextNode1 = insertNode;
						}
						else if(vertices[i] == vertices[i].nextNode2.nextNode2){
							vertices[i].nextNode2.nextNode2 = insertNode;
						}
						
						vertices[i].nextNode2 = insertNode;
						splitWall = 0;
						break;	
						
					}

				}
				else{
					var lineY = (vertices[i].y - vertices[i].nextNode2.y)/(vertices[i].x - vertices[i].nextNode2.x)*(mouse.pressedX - vertices[i].x) + vertices[i].y; 
					if(lieInMiddle(mouse.pressedY, lineY + stickiness, lineY - stickiness) && lieInMiddle(mouse.pressedX, vertices[i].x, vertices[i].nextNode2.x)){
						var insertNode = new Node();

						insertNode.y = lineY;
						insertNode.x = mouse.pressedX;
						insertNode.nextNode1 = vertices[i];
						insertNode.nextNode2 = vertices[i].nextNode2;
						insertNode.inside1 = vertices[i].inside2;
						insertNode.inside2 = vertices[i].inside2;

						vertices.push(insertNode);

						if(vertices[i] == vertices[i].nextNode2.nextNode1){
							vertices[i].nextNode2.nextNode1 = insertNode;
						}
						else if(vertices[i] == vertices[i].nextNode2.nextNode2){
							vertices[i].nextNode2.nextNode2 = insertNode;
						}
						
						vertices[i].nextNode2 = insertNode;
						splitWall = 0;
						break;	
						
					}
				}
				
			}

		}
	}

	

	
}

function mouseReleased(){
	
	if(addingWindow == 1){
		var elem = windowOnVertex.charAt(0) + windowNumber;
		vertices[parseInt(windowOnVertex.substring(1))].windowIndex.push(elem);
		if(windowOnVertex.charAt(0) == "h"){
			windowVertices[windowNumber].distFromRoomNode = windowVertices[windowNumber].x - vertices[parseInt(windowOnVertex.substring(1))].x;
		}
		else if(windowOnVertex.charAt(0) == "v"){
			windowVertices[windowNumber].distFromRoomNode = windowVertices[windowNumber].y - vertices[parseInt(windowOnVertex.substring(1))].y;
		}
		addingWindow = 0;
		elem_selected = "";
	}

	if(addingDoor == 1){
		var elem = doorOnVertex.charAt(0) + doorNumber;
		vertices[parseInt(doorOnVertex.substring(1))].doorIndex.push(elem);
		if(doorOnVertex.charAt(0) == "h"){
			doorVertices[doorNumber].distFromRoomNode = doorVertices[doorNumber].x - vertices[parseInt(doorOnVertex.substring(1))].x;
		}
		else if(doorOnVertex.charAt(0) == "v"){
			doorVertices[doorNumber].distFromRoomNode = doorVertices[doorNumber].y - vertices[parseInt(doorOnVertex.substring(1))].y;
		}
		addingDoor = 0;
		elem_selected = "";
	}

	elem_selected = "";
	nodePressX = null;
	nodePressY = null;
}

function mouseClicked(){
	if(millis() - time > 500){
		click = "single";
	}
	else{
		click = "double"
	}

	time = millis();

	if(click == "double"){
		if(typeof(elem_clicked) == "string"){
			if(elem_clicked.substring(0,6) == "window" || elem_clicked.substring(0,4) == "door"){
				showPanel();

				$("#panel_fixed_header li").each(function(){
		            $(this).removeClass("active_panel_header_li");
		        })

				if(!$("#line_length").is(":focus") && !$("#line_length_ft").is(":focus") && !$("#line_length_in").is(":focus")){
					empty_dimension_option();
				}
			}

			else if(elem_clicked.charAt(2) == "h" || elem_clicked.charAt(2) == "v" || elem_clicked.charAt(3) == "h" || elem_clicked.charAt(3) == "v"){
				if(!$("#line_length").is(":visible") && !$("#line_length_ft").is(":visible") && !$("#line_length_in").is(":visible")){
					open_dimension_option(elem_clicked);
				}
			}
			else {
				if(!$("#line_length").is(":focus") && !$("#line_length_ft").is(":focus") && !$("#line_length_in").is(":focus")){
					empty_dimension_option();
				}
			}
		}
		else{
			if(!$("#line_length").is(":focus") && !$("#line_length_ft").is(":focus") && !$("#line_length_in").is(":focus")){
				empty_dimension_option();
			}
		}
	}

	else if(click == "single"){
		if(elem_clicked == ""){
			if(!$("#line_length").is(":focus") && !$("#line_length_ft").is(":focus") && !$("#line_length_in").is(":focus")){
				empty_dimension_option();
			}
		}
		else{
			if(!$("#line_length").is(":focus") && !$("#line_length_ft").is(":focus") && !$("#line_length_in").is(":focus")){
				empty_dimension_option();
			}
		}
		
	}


}

function Node(){
	this.x = 0;
	this.y = 0;
	this.nextNode1 = null;
	this.nextNode2 = null;
	this.nextNode3 = null;
	this.nextNode4 = null;
	this.windowIndex = [];
	this.doorIndex = [];
	this.inside1 = null;
	this.inside2 = null;
}

function Coordinate(){
	this.x = 0;
	this.y = 0;
}

function windowCoordinate(){
	this.width = 100;
	this.height = 100;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.angle = 0;
}

function doorCoordinate(){
	this.width = 100;
	this.height = 100;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.angle = 0;
}

function windowNode(){
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.width = 100;
	this.height = 16;
	this.distFromRoomNode = null;
	this.height3D = 100;
	this.elevation = 100;
}

function doorNode(){
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.width = 100;
	this.height = 10;;
	this.distFromRoomNode = null;
	this.height3D = 100;
	this.elevation = 0;
	this.direction = "up";
}

function coordinateTransfer(){

	coordinatesToTransfer = [];
	windowCoordinatesToTransfer =[];
	doorCoordinatesToTransfer = [];


	for(var i = 0;i < vertices.length; i++){
		var insertCoordinate = new Coordinate();
		insertCoordinate.x = (vertices[i].x - (roomExtreme.minX + roomExtreme.maxX)/2)*conversionFactor;
		insertCoordinate.y = (vertices[i].y - (roomExtreme.minY + roomExtreme.maxY)/2)*conversionFactor;

		coordinatesToTransfer.push(insertCoordinate);

	}

	for(var i = 0;i < windowVertices.length; i++){
		var insertCoordinate = new windowCoordinate();
		if(windowVertices[i].angle == 0){
			insertCoordinate.width = windowVertices[i].width*conversionFactor*zoomFactor;
			insertCoordinate.x = (windowVertices[i].x + windowVertices[i].width*zoomFactor/2 - (roomExtreme.minX + roomExtreme.maxX)/2)*conversionFactor;
			insertCoordinate.z = (windowVertices[i].y - (roomExtreme.minY + roomExtreme.maxY)/2)*conversionFactor;

		}
		else{
			insertCoordinate.width = windowVertices[i].height*conversionFactor*zoomFactor;
			insertCoordinate.x = (windowVertices[i].x - (roomExtreme.minX + roomExtreme.maxX)/2)*conversionFactor;
			insertCoordinate.z = (windowVertices[i].y + windowVertices[i].height*zoomFactor/2 - (roomExtreme.minY + roomExtreme.maxY)/2)*conversionFactor;

		}

		insertCoordinate.height = windowVertices[i].height3D*conversionFactor*zoomFactor;
		insertCoordinate.y = (windowVertices[i].elevation + windowVertices[i].height3D/2)*conversionFactor*zoomFactor;
		insertCoordinate.angle = windowVertices[i].angle;

		windowCoordinatesToTransfer.push(insertCoordinate);

	}

	for(var i = 0;i < doorVertices.length; i++){
		var insertCoordinate = new doorCoordinate();
		if(doorVertices[i].angle == 0){
			insertCoordinate.width = doorVertices[i].width*conversionFactor*zoomFactor;
			insertCoordinate.x = (doorVertices[i].x + doorVertices[i].width*zoomFactor/2 - (roomExtreme.minX + roomExtreme.maxX)/2)*conversionFactor;
			insertCoordinate.z = (doorVertices[i].y - (roomExtreme.minY + roomExtreme.maxY)/2)*conversionFactor;

		}
		else{
			insertCoordinate.width = doorVertices[i].height*conversionFactor*zoomFactor;
			insertCoordinate.x = (doorVertices[i].x - (roomExtreme.minX + roomExtreme.maxX)/2)*conversionFactor;
			insertCoordinate.z = (doorVertices[i].y + doorVertices[i].height*zoomFactor/2 - (roomExtreme.minY + roomExtreme.maxY)/2)*conversionFactor;

		}

		insertCoordinate.height = doorVertices[i].height3D*conversionFactor*zoomFactor;
		insertCoordinate.y = (doorVertices[i].elevation + doorVertices[i].height3D/2)*conversionFactor*zoomFactor;
		insertCoordinate.angle = doorVertices[i].angle;

		doorCoordinatesToTransfer.push(insertCoordinate);

	}


}

function to_ft (dimension_mm) {
	var dimension_ft = dimension_mm/300;
	return dimension_ft;
}

function ft_in (dimension_ft) {
	var dimension_in = dimension_ft * 12;
	return dimension_in;
}

function in_ft (dimension_in) {
	var dimension_ft = dimension_in/12;
	return dimension_ft;	
}

function to_mm (dimension_ft) {
	var dimension_mm = dimension_ft * 300
	return dimension_mm;
}

function mouseWheel(event){
	empty_dimension_option();

	
		if(event.delta > 0 && zoomFactor > 0.65){
			zoomFactor = zoomFactor*(0.99);
			conversionFactor = conversionFactor/(0.99);
			for(var i = 0; i < vertices.length; i++){
				vertices[i].x = (vertices[i].x - mouseX)*(0.99) + mouseX;
				vertices[i].y = (vertices[i].y - mouseY)*(0.99) + mouseY;

				for(var j = 0; j < vertices[i].windowIndex.length; j ++){
					var index = vertices[i].windowIndex[j].substring(1);
					windowVertices[index].x = (windowVertices[index].x - mouseX)*(0.99) + mouseX;
					windowVertices[index].y = (windowVertices[index].y - mouseY)*(0.99) + mouseY;
					// windowVertices[index].width = windowVertices[index].width*(0.99);
					// windowVertices[index].height = windowVertices[index].height*(0.99);
					if(vertices[i].windowIndex[j].charAt(0) == "h"){
						windowVertices[index].distFromRoomNode = windowVertices[index].x - vertices[i].x;
					}
					else if(vertices[i].windowIndex[j].charAt(0) == "v"){
						windowVertices[index].distFromRoomNode = windowVertices[index].y - vertices[i].y;
					}
				}

				for(var j = 0; j < vertices[i].doorIndex.length; j ++){
					var index = vertices[i].doorIndex[j].substring(1);
					doorVertices[index].x = (doorVertices[index].x - mouseX)*(0.99) + mouseX;
					doorVertices[index].y = (doorVertices[index].y - mouseY)*(0.99) + mouseY;
					// doorVertices[index].width = doorVertices[index].width*(0.99);
					// doorVertices[index].height = doorVertices[index].height*(0.99);
					if(vertices[i].doorIndex[j].charAt(0) == "h"){
						doorVertices[index].distFromRoomNode = doorVertices[index].x - vertices[i].x;
					}
					else if(vertices[i].doorIndex[j].charAt(0) == "v"){
						doorVertices[index].distFromRoomNode = doorVertices[index].y - vertices[i].y;
					}
				}
			} 

		}
		else if(event.delta < 0 && zoomFactor < 1.88){
			zoomFactor = zoomFactor*(1.01);
			conversionFactor = conversionFactor/(1.01);
			for(var i = 0; i < vertices.length; i++){
				vertices[i].x = (vertices[i].x - mouseX)*(1.01) + mouseX;
				vertices[i].y = (vertices[i].y - mouseY)*(1.01) + mouseY;

				for(var j = 0; j < vertices[i].windowIndex.length; j ++){
					var index = vertices[i].windowIndex[j].substring(1);
					windowVertices[index].x = (windowVertices[index].x - mouseX)*(1.01) + mouseX;
					windowVertices[index].y = (windowVertices[index].y - mouseY)*(1.01) + mouseY;
					// windowVertices[index].width = windowVertices[index].width*(1.01);
					// windowVertices[index].height = windowVertices[index].height*(1.01);
					if(vertices[i].windowIndex[j].charAt(0) == "h"){
						windowVertices[index].distFromRoomNode = windowVertices[index].x - vertices[i].x;
					}
					else if(vertices[i].windowIndex[j].charAt(0) == "v"){
						windowVertices[index].distFromRoomNode = windowVertices[index].y - vertices[i].y;
					}
				}

				for(var j = 0; j < vertices[i].doorIndex.length; j ++){
					var index = vertices[i].doorIndex[j].substring(1);
					doorVertices[index].x = (doorVertices[index].x - mouseX)*(1.01) + mouseX;
					doorVertices[index].y = (doorVertices[index].y - mouseY)*(1.01) + mouseY;
					// doorVertices[index].width = doorVertices[index].width*(1.01);
					// doorVertices[index].height = doorVertices[index].height*(1.01);
					if(vertices[i].doorIndex[j].charAt(0) == "h"){
						doorVertices[index].distFromRoomNode = doorVertices[index].x - vertices[i].x;
					}
					else if(vertices[i].doorIndex[j].charAt(0) == "v"){
						doorVertices[index].distFromRoomNode = doorVertices[index].y - vertices[i].y;
					}
				}
			} 
		}
		if($('#canvas_holder').css('display') != "none") {
			return false;
		}
}




