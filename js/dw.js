//window functions

function add_window(index){
	elem_selected = "window";
	windowNodeAdded = new windowNode();
	windowNodeAdded.src = "images/windows/" + index + ".jpg";
	windowVertices.push(windowNodeAdded);
	addingWindow = 1;
	windowNumber++;
	windowDistShow.push(1);
	

}

function del_window(){
	if(elem_panel.substring(0,6) == "window"){

		windowVertices[elem_panel.substring(6)] = -1

		for(var i = 0; i < vertices.length; i ++){
			
			for(var k = 0; k < vertices[i].windowIndex.length; k++){
				if(vertices[i].windowIndex[k].substring(1) == elem_panel.substring(6)){
					vertices[i].windowIndex.splice(k,1);
					break;
				}
			}
			for(var k = 0; k < vertices[i].nextNode1.windowIndex.length; k++){
				if(vertices[i].nextNode1.windowIndex[k].substring(1) == elem_panel.substring(6)){
					vertices[i].nextNode1.windowIndex.splice(k,1);
					break;
				}
			}
			for(var k = 0; k < vertices[i].nextNode2.windowIndex.length; k++){
				if(vertices[i].nextNode2.windowIndex[k].substring(1) == elem_panel.substring(6)){
					vertices[i].nextNode2.windowIndex.splice(k,1);
					break;
				}
			}
			break;

		}
	}

	close_panel();

}

function change_window(){

	var  vertexIndex;
	var nextVertex;
	var length;

	for(var i =0 ; i < vertices.length;i++){
		for (var j = 0; j < vertices[i].windowIndex.length; j++){
			if(vertices[i].windowIndex[j].substring(1) == elem_panel.substring(6)){
				vertexIndex = i;
			}
		}
	}

	if(windowVertices[parseInt(elem_panel.substring(6))].angle == 0){
		if(vertices[vertexIndex].nextNode1.y == vertices[vertexIndex].y && vertices[vertexIndex].nextNode1.x > windowVertices[parseInt(elem_panel.substring(6))].x){
			nextVertex = 1;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode1.x,vertices[vertexIndex].nextNode1.y));
		}
		else if(vertices[vertexIndex].nextNode2.y == vertices[vertexIndex].y && vertices[vertexIndex].nextNode2.x > windowVertices[parseInt(elem_panel.substring(6))].x){
			nextVertex = 2;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode2.x,vertices[vertexIndex].nextNode2.y));
		}
	}

	else if (windowVertices[parseInt(elem_panel.substring(6))].angle == 90){
		if(vertices[vertexIndex].nextNode1.x == vertices[vertexIndex].x && vertices[vertexIndex].nextNode1.y > windowVertices[parseInt(elem_panel.substring(6))].y){
			nextVertex = 1;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode1.x,vertices[vertexIndex].nextNode1.y));
		}
		else if(vertices[vertexIndex].nextNode2.x == vertices[vertexIndex].x && vertices[vertexIndex].nextNode2.y > windowVertices[parseInt(elem_panel.substring(6))].y){
			nextVertex = 2;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode2.x,vertices[vertexIndex].nextNode2.y));
		}
	}


	if(metric_system =="mm"){

		if(parseInt($("#window_widthInput").val()) <= 0 || parseInt($("#window_positionInput").val()) < 0 ||
			parseInt($("#window_heightInput").val()) <= 0 || parseInt($("#window_elevationInput").val()) < 0){
			alertify.error("no negative values accepted");
			showPanel();
			return;
		}

		if(length < parseInt($("#window_widthInput").val())/conversionFactor + parseInt($("#window_positionInput").val())/conversionFactor){
			alertify.error("window of this dimension and position not possible");
			showPanel();
			return;
		}

		if(windowVertices[parseInt(elem_panel.substring(6))].angle == 0){
			windowVertices[parseInt(elem_panel.substring(6))].width = parseInt($("#window_widthInput").val())/(conversionFactor*zoomFactor);	
		}
		else{
			windowVertices[parseInt(elem_panel.substring(6))].height = parseInt($("#window_widthInput").val())/(conversionFactor*zoomFactor);
		}
		windowVertices[parseInt(elem_panel.substring(6))].distFromRoomNode = parseInt($("#window_positionInput").val())/conversionFactor;
		windowVertices[parseInt(elem_panel.substring(6))].height3D = parseInt($("#window_heightInput").val())/conversionFactor;
		windowVertices[parseInt(elem_panel.substring(6))].elevation = parseInt($("#window_elevationInput").val())/conversionFactor;
	}

	else if(metric_system == "ft"){

		var width = parseInt($("#window_widthInput").val());
		var width_inch = parseInt($("#window_width_inchInput").val());
		width_inch = in_ft(width_inch);
		width = to_mm(width + width_inch);

		var position = parseInt($("#window_positionInput").val());
		var position_inch = parseInt($("#window_position_inchInput").val());
		position_inch = in_ft(position_inch);
		position = to_mm(position + position_inch);

		var height = parseInt($("#window_heightInput").val());
		var height_inch = parseInt($("#window_height_inchInput").val());
		height_inch = in_ft(height_inch);
		height = to_mm(height + height_inch);

		var elevation = parseInt($("#window_elevationInput").val());
		var elevation_inch = parseInt($("#window_elevation_inchInput").val());
		elevation_inch = in_ft(elevation_inch);
		elevation = to_mm(elevation + elevation_inch);

		if(parseInt($("#window_widthInput").val()) <= 0 || parseInt($("#window_positionInput").val()) < 0 ||
			parseInt($("#window_heightInput").val()) <= 0 || parseInt($("#window_elevationInput").val()) < 0 ||
			parseInt($("#window_width_inchInput").val()) <= 0 || parseInt($("#window_position_inchInput").val()) < 0 ||
			parseInt($("#window_heigh_inchtInput").val()) <= 0 || parseInt($("#window_elevation_inchInput").val()) < 0){
			alertify.error("no negative values accepted");
			showPanel();
			return;
		}

		if(length < width/conversionFactor + position/conversionFactor){
			alertify.error("window of this dimension and position not possible");
			showPanel();
			return;
		}

		if(windowVertices[parseInt(elem_panel.substring(6))].angle == 0){
			windowVertices[parseInt(elem_panel.substring(6))].width = width/(conversionFactor*zoomFactor);
		}
		else{
			windowVertices[parseInt(elem_panel.substring(6))].height = width/(conversionFactor*zoomFactor);
		}
		windowVertices[parseInt(elem_panel.substring(6))].distFromRoomNode = position/conversionFactor;
		windowVertices[parseInt(elem_panel.substring(6))].height3D = height/(conversionFactor*zoomFactor);
		windowVertices[parseInt(elem_panel.substring(6))].elevation = elevation/(conversionFactor*zoomFactor);
	}
}


function draw_window(x,y,angle,length){
	push();
	strokeWeight(1);
	length = length*zoomFactor;
	if(angle == 0){
		fill(255);
		rect(x,y - 8*zoomFactor,length,16*zoomFactor);
		fill("#888888");
		rect(x,y -3*zoomFactor,length,6*zoomFactor);
		line(x + length/2,y - 8*zoomFactor,x + length/2,y + 8*zoomFactor);
		fill(255);
	}
	else if(angle == 90){
		fill(255);
		rect(x - 8*zoomFactor,y,16*zoomFactor,length);
		fill("#888888");
		rect(x - 3*zoomFactor, y ,6*zoomFactor, length);
		line(x - 8*zoomFactor,y + length/2,x + 8*zoomFactor,y + length/2);
		fill(255);
	}

	pop();
}

//window functions

//door functions

function add_door(index){
	elem_selected = "door";
	doorNodeAdded = new doorNode();
	doorNodeAdded.src = "images/doors/" + index + ".jpg";
	doorVertices.push(doorNodeAdded);
	addingDoor = 1;
	doorNumber++;
	doorDistShow.push(1);
}

function del_door(){
	if(elem_panel.substring(0,4) == "door"){

		doorVertices[elem_panel.substring(4)] = -1

		for(var i = 0; i < vertices.length; i ++){
			
			for(var k = 0; k < vertices[i].doorIndex.length; k++){
				if(vertices[i].doorIndex[k].substring(1) == elem_panel.substring(4)){
					vertices[i].doorIndex.splice(k,1);
					break;
				}
			}
			for(var k = 0; k < vertices[i].nextNode1.doorIndex.length; k++){
				if(vertices[i].nextNode1.doorIndex[k].substring(1) == elem_panel.substring(4)){
					vertices[i].nextNode1.doorIndex.splice(k,1);
					break;
				}
			}
			for(var k = 0; k < vertices[i].nextNode2.doorIndex.length; k++){
				if(vertices[i].nextNode2.doorIndex[k].substring(1) == elem_panel.substring(4)){
					vertices[i].nextNode2.doorIndex.splice(k,1);
					break;
				}
			}
			break;

		}
	}
	close_panel();
}

function change_door(){

	var  vertexIndex;
	var nextVertex;
	var length;

	for(var i =0 ; i < vertices.length;i++){
		for (var j = 0; j < vertices[i].doorIndex.length; j++){
			if(vertices[i].doorIndex[j].substring(1) == elem_panel.substring(4)){
				vertexIndex = i;
			}
		}
	}

	if(doorVertices[parseInt(elem_panel.substring(4))].angle == 0){
		if(vertices[vertexIndex].nextNode1.y == vertices[vertexIndex].y && vertices[vertexIndex].nextNode1.x > doorVertices[parseInt(elem_panel.substring(4))].x){
			nextVertex = 1;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode1.x,vertices[vertexIndex].nextNode1.y));
		}
		else if(vertices[vertexIndex].nextNode2.y == vertices[vertexIndex].y && vertices[vertexIndex].nextNode2.x > doorVertices[parseInt(elem_panel.substring(4))].x){
			nextVertex = 2;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode2.x,vertices[vertexIndex].nextNode2.y));
		}
	}

	else if (doorVertices[parseInt(elem_panel.substring(4))].angle == 90){
		if(vertices[vertexIndex].nextNode1.x == vertices[vertexIndex].x && vertices[vertexIndex].nextNode1.y > doorVertices[parseInt(elem_panel.substring(4))].y){
			nextVertex = 1;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode1.x,vertices[vertexIndex].nextNode1.y));
		}
		else if(vertices[vertexIndex].nextNode2.x == vertices[vertexIndex].x && vertices[vertexIndex].nextNode2.y > doorVertices[parseInt(elem_panel.substring(4))].y){
			nextVertex = 2;
			length = float(dist(vertices[vertexIndex].x,vertices[vertexIndex].y,vertices[vertexIndex].nextNode2.x,vertices[vertexIndex].nextNode2.y));
		}
	}


	if(metric_system =="mm"){

		if(parseInt($("#door_widthInput").val()) <= 0 || parseInt($("#door_positionInput").val()) < 0 ||
			parseInt($("#door_heightInput").val()) <= 0 || parseInt($("#door_elevationInput").val()) < 0){
			alertify.error("no negative values accepted");
			showPanel();
			return;
		}

		if(length < parseInt($("#door_widthInput").val())/conversionFactor + parseInt($("#door_positionInput").val())/conversionFactor){
			alertify.error("door of this dimension and position not possible");
			showPanel();
			return;
		}

		if(doorVertices[parseInt(elem_panel.substring(4))].angle == 0){
			doorVertices[parseInt(elem_panel.substring(4))].width = parseInt($("#door_widthInput").val())/(conversionFactor*zoomFactor);
		}
		else{
			doorVertices[parseInt(elem_panel.substring(4))].height = parseInt($("#door_widthInput").val())/(conversionFactor*zoomFactor);
		}
		doorVertices[parseInt(elem_panel.substring(4))].distFromRoomNode = parseInt($("#door_positionInput").val())/conversionFactor;
		doorVertices[parseInt(elem_panel.substring(4))].height3D = parseInt($("#door_heightInput").val())/conversionFactor;
		doorVertices[parseInt(elem_panel.substring(4))].elevation = parseInt($("#door_elevationInput").val())/conversionFactor;
	}

	else if(metric_system == "ft"){

		var width = parseInt($("#door_widthInput").val());
		var width_inch = parseInt($("#door_width_inchInput").val());
		width_inch = in_ft(width_inch);
		width = to_mm(width + width_inch);

		var position = parseInt($("#door_positionInput").val());
		var position_inch = parseInt($("#door_position_inchInput").val());
		position_inch = in_ft(position_inch);
		position = to_mm(position + position_inch);

		var height = parseInt($("#door_heightInput").val());
		var height_inch = parseInt($("#door_height_inchInput").val());
		height_inch = in_ft(height_inch);
		height = to_mm(height + height_inch);

		var elevation = parseInt($("#door_elevationInput").val());
		var elevation_inch = parseInt($("#door_elevation_inchInput").val());
		elevation_inch = in_ft(elevation_inch);
		elevation = to_mm(elevation + elevation_inch);

		if(parseInt($("#door_widthInput").val()) <= 0 || parseInt($("#door_positionInput").val()) < 0 ||
			parseInt($("#door_heightInput").val()) <= 0 || parseInt($("#door_elevationInput").val()) < 0 ||
			parseInt($("#door_width_inchInput").val()) <= 0 || parseInt($("#door_position_inchInput").val()) < 0 ||
			parseInt($("#door_heigh_inchtInput").val()) <= 0 || parseInt($("#door_elevation_inchInput").val()) < 0){
			alertify.error("no negative values accepted");
			showPanel();
			return;
		}

		if(length < width/conversionFactor + position/conversionFactor){
			alertify.error("door of this dimension and position not possible");
			showPanel();
			return;
		}

		if(doorVertices[parseInt(elem_panel.substring(4))].angle == 0){
			doorVertices[parseInt(elem_panel.substring(4))].width = width/(conversionFactor*zoomFactor);
		}
		else{
			doorVertices[parseInt(elem_panel.substring(4))].height = width/(conversionFactor*zoomFactor);
		}
		doorVertices[parseInt(elem_panel.substring(4))].distFromRoomNode = position/conversionFactor;
		doorVertices[parseInt(elem_panel.substring(4))].height3D = height/(conversionFactor*zoomFactor);
		doorVertices[parseInt(elem_panel.substring(4))].elevation = elevation/(conversionFactor*zoomFactor);
	}


}

function draw_door(x,y,length,direction,angle){
	
	if(angle == 0){
		if(direction == "down"){
			push();
				strokeWeight(1);
				stroke("#000000");
				push();
					translate(x,y);
					arc(0,0,length*zoomFactor*2,length*zoomFactor*2,0, PI/4.0);
					translate(5*(0.707)*zoomFactor,-5*zoomFactor);
					rotate(PI/4.0);
					fill("white");
					rect(0,0,length*zoomFactor,5*zoomFactor);
				pop();

				fill("#342B2C");
				rect(x,y - 5*zoomFactor,length*zoomFactor,10*zoomFactor);
			pop();
		}

		else if(direction == "up"){
			push();
				strokeWeight(1);
				stroke("#000000");
				push();
					translate(x,y);
					arc(0,0,length*zoomFactor*2,length*zoomFactor*2, -PI/4.0, 0);
					rotate(-PI/4.0);
					fill("white");
					rect(0,0,length*zoomFactor,5*zoomFactor);
				pop();

				fill("#342B2C");
				rect(x,y - 5*zoomFactor,length*zoomFactor,10*zoomFactor);
			pop();
		}
	}

	else if(angle == 90){
		if(direction == "down"){
			push();
				strokeWeight(1);
				stroke("#000000");
				push();
					translate(x,y);
					arc(0,0,length*zoomFactor*2,length*zoomFactor*2,PI/2.0, 3*PI/4.0);
					rotate(PI/4.0);
					fill("white");
					rect(0,0,5*zoomFactor,length*zoomFactor);
				pop();

				
				fill("#342B2C");
				rect(x - 5*zoomFactor,y,10*zoomFactor,length*zoomFactor);
			pop();
		}

		else if(direction == "up"){
			push();
				strokeWeight(1);
				stroke("#000000");
				push();
					translate(x,y);
					arc(0,0,length*zoomFactor*2,length*zoomFactor*2, PI/4.0, PI/2);
					translate(-5*zoomFactor,5*(0.707)*zoomFactor);
					rotate(-PI/4.0);
					fill("white");
					rect(0,0,5*zoomFactor,length*zoomFactor);
				pop();

				
				fill("#342B2C");
				rect(x - 5*zoomFactor,y,10*zoomFactor,length*zoomFactor);
			pop();
		}
	}


}

//door functions

