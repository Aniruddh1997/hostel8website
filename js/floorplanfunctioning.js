function room_design(type){

    conversionFactor = 7.5;
    zoomFactor = 1;

    vertices = [];
    mousePressedVertices = [];
    windowVertices = [];
    mousePressedWindowVertices = [];
    coordinatesToTransfer = [];
    windowDistShow = [];
    windowNumber = -1;

    doorVertices = [];
    mousePressedDoorVertices = [];
    doorDistShow = [];
    doorNumber = -1;

    if(type == "squareRoom"){

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

    }
    
    else if(type == "lTopRight"){

        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());

        vertices[0].x = 500; 
        vertices[0].y = 100; 
        vertices[0].nextNode1 = vertices[1];
        vertices[0].nextNode2 = vertices[5];

        vertices[1].x = 700; 
        vertices[1].y = 100; 
        vertices[1].nextNode1 = vertices[0];
        vertices[1].nextNode2 = vertices[2];

        vertices[2].x = 700; 
        vertices[2].y = 300; 
        vertices[2].nextNode1 = vertices[1];
        vertices[2].nextNode2 = vertices[3];

        vertices[3].x = 900; 
        vertices[3].y = 300; 
        vertices[3].nextNode1 = vertices[2];
        vertices[3].nextNode2 = vertices[4];

        vertices[4].x = 900; 
        vertices[4].y = 500; 
        vertices[4].nextNode1 = vertices[3];
        vertices[4].nextNode2 = vertices[5];

        vertices[5].x = 500; 
        vertices[5].y = 500; 
        vertices[5].nextNode1 = vertices[0];
        vertices[5].nextNode2 = vertices[4];
    }

    else if(type == "lTopLeft"){
        
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());

        vertices[0].x = 500; 
        vertices[0].y = 300; 
        vertices[0].nextNode1 = vertices[1];
        vertices[0].nextNode2 = vertices[5];

        vertices[1].x = 700; 
        vertices[1].y = 300; 
        vertices[1].nextNode1 = vertices[0];
        vertices[1].nextNode2 = vertices[2];

        vertices[2].x = 700; 
        vertices[2].y = 100; 
        vertices[2].nextNode1 = vertices[1];
        vertices[2].nextNode2 = vertices[3];

        vertices[3].x = 900; 
        vertices[3].y = 100; 
        vertices[3].nextNode1 = vertices[2];
        vertices[3].nextNode2 = vertices[4];

        vertices[4].x = 900; 
        vertices[4].y = 500; 
        vertices[4].nextNode1 = vertices[3];
        vertices[4].nextNode2 = vertices[5];

        vertices[5].x = 500; 
        vertices[5].y = 500; 
        vertices[5].nextNode1 = vertices[0];
        vertices[5].nextNode2 = vertices[4];
    }

    else if(type == "lBottomLeft"){
        
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());

        vertices[0].x = 500; 
        vertices[0].y = 100; 
        vertices[0].nextNode1 = vertices[1];
        vertices[0].nextNode2 = vertices[5];

        vertices[1].x = 900; 
        vertices[1].y = 100; 
        vertices[1].nextNode1 = vertices[0];
        vertices[1].nextNode2 = vertices[2];

        vertices[2].x = 900; 
        vertices[2].y = 500; 
        vertices[2].nextNode1 = vertices[1];
        vertices[2].nextNode2 = vertices[3];

        vertices[3].x = 700; 
        vertices[3].y = 500; 
        vertices[3].nextNode1 = vertices[2];
        vertices[3].nextNode2 = vertices[4];

        vertices[4].x = 700; 
        vertices[4].y = 300; 
        vertices[4].nextNode1 = vertices[3];
        vertices[4].nextNode2 = vertices[5];

        vertices[5].x = 500; 
        vertices[5].y = 300; 
        vertices[5].nextNode1 = vertices[0];
        vertices[5].nextNode2 = vertices[4];
    }

    else if(type == "lBottomRight"){
        
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());

        vertices[0].x = 500; 
        vertices[0].y = 100; 
        vertices[0].nextNode1 = vertices[1];
        vertices[0].nextNode2 = vertices[5];

        vertices[1].x = 900; 
        vertices[1].y = 100; 
        vertices[1].nextNode1 = vertices[0];
        vertices[1].nextNode2 = vertices[2];

        vertices[2].x = 900; 
        vertices[2].y = 300; 
        vertices[2].nextNode1 = vertices[1];
        vertices[2].nextNode2 = vertices[3];

        vertices[3].x = 700; 
        vertices[3].y = 300; 
        vertices[3].nextNode1 = vertices[2];
        vertices[3].nextNode2 = vertices[4];

        vertices[4].x = 700; 
        vertices[4].y = 500; 
        vertices[4].nextNode1 = vertices[3];
        vertices[4].nextNode2 = vertices[5];

        vertices[5].x = 500; 
        vertices[5].y = 500; 
        vertices[5].nextNode1 = vertices[0];
        vertices[5].nextNode2 = vertices[4];
    }

    else if(type == "uRoom"){
       
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());
        vertices.push(new Node());

        vertices[0].x = 500; 
        vertices[0].y = 100; 
        vertices[0].nextNode1 = vertices[1];
        vertices[0].nextNode2 = vertices[7];

        vertices[1].x = 650; 
        vertices[1].y = 100; 
        vertices[1].nextNode1 = vertices[0];
        vertices[1].nextNode2 = vertices[2];

        vertices[2].x = 650; 
        vertices[2].y = 300; 
        vertices[2].nextNode1 = vertices[1];
        vertices[2].nextNode2 = vertices[3];

        vertices[3].x = 800; 
        vertices[3].y = 300; 
        vertices[3].nextNode1 = vertices[2];
        vertices[3].nextNode2 = vertices[4];

        vertices[4].x = 800; 
        vertices[4].y = 100; 
        vertices[4].nextNode1 = vertices[3];
        vertices[4].nextNode2 = vertices[5];

        vertices[5].x = 950; 
        vertices[5].y = 100; 
        vertices[5].nextNode1 = vertices[4];
        vertices[5].nextNode2 = vertices[6];

        vertices[6].x = 950; 
        vertices[6].y = 500; 
        vertices[6].nextNode1 = vertices[5];
        vertices[6].nextNode2 = vertices[7];

        vertices[7].x = 500; 
        vertices[7].y = 500; 
        vertices[7].nextNode1 = vertices[6];
        vertices[7].nextNode2 = vertices[0];
    }

}


function showPanel(){
    empty_panel_content();

    hide_panel_content();

    if(elem_panel.substring(0,6) == "window"){

        var new_heading = ' <div class="panel_title"> \n\
                                <a class="site_title" style="position:absolute; top:0;z-index:-100;"><span>Window</span></a>\n\
                                <span style="float:right;"id="close_panel" onclick="close_panel()"><i class="fa fa-md fa-forward fa-rotate-180"></i></span>\n\
                            </div>';
        $("#info").append(new_heading);

        if(metric_system == "mm"){

            var tmpName = "window_width";
            var tmpStr  = ' <div class="input-group"> \n\
                                <span class="input-group-addon"> Length &nbsp &nbsp</span>\n\
                                <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                            </div>';
            $("#modifyCompartment").append(tmpStr);

            tmpName = "window_position";      
            tmpStr  = ' <div class="input-group"> \n\
                            <span class="input-group-addon"> Position &nbsp</span>\n\
                            <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"> \n \
                            <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                        </div>';
            
            $("#modifyCompartment").append(tmpStr);

            tmpName = "window_elevation";
            tmpStr  = ' <div class="input-group"> \n\
                            <span class="input-group-addon"> Elevation </span>\n\
                            <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input" > \n \
                            <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                        </div>';
            $("#modifyCompartment").append(tmpStr);

            tmpName = "window_height";
            tmpStr  = ' <div class="input-group"> \n\
                            <span class="input-group-addon"> Height &nbsp &nbsp &nbsp</span>\n\
                            <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input" > \n \
                            <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                        </div>';
            $("#modifyCompartment").append(tmpStr);
           

            tmpStr  = ' <div id="dimensionModalApplyChanges">\n \
                            <center><button id="dimensionModalApplyChangesButton" class="btn btn-raised btn-primary btn-xs" onclick="change_window()" >Apply Changes</button></center>\n \
                        </div>';
            $("#modifyCompartment").append(tmpStr);

            var width; 
            if(windowVertices[elem_panel.substring(6)].width > windowVertices[elem_panel.substring(6)].height){
                width = windowVertices[elem_panel.substring(6)].width*conversionFactor*zoomFactor;
            }
            else{
                width = windowVertices[elem_panel.substring(6)].height*conversionFactor*zoomFactor;
            }
            var position = windowVertices[elem_panel.substring(6)].distFromRoomNode*conversionFactor;
            var elevation = windowVertices[elem_panel.substring(6)].elevation*conversionFactor*zoomFactor;
            var height = windowVertices[elem_panel.substring(6)].height3D*conversionFactor*zoomFactor;

            $('#window_widthInput').val(round(width));
            $('#window_positionInput').val(round(position));  
            $('#window_elevationInput').val(round(elevation));
            $('#window_heightInput').val(round(height));

            
            
        }

        else if(metric_system == "ft"){
            var tmpName = "window_width";
            var tmpName1 = "window_width_inch"
            var tmpStr  = ' <div class = "row">\n\
                                <div class = "col-xs-8">\n\
                                    <div class="input-group"> \n\
                                        <span class="input-group-addon"> Length &nbsp &nbsp</span>\n\
                                        <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                        <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                    </div>\n\
                                </div>\n\
                                <div class = "col-xs-4">\n\
                                    <div class="input-group"> \n\
                                        <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                        <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                    </div>\n\
                                </div>\n\
                            </div>';
            $("#modifyCompartment").append(tmpStr);

            tmpName = "window_position"; 
            tmpName1 = "window_position_inch";     
            tmpStr  = ' <div class = "row">\n\
                            <div class = "col-xs-8">\n\
                                <div class="input-group"> \n\
                                    <span class="input-group-addon"> Position &nbsp &nbsp</span>\n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                </div>\n\
                            </div>\n\
                            <div class = "col-xs-4">\n\
                                <div class="input-group"> \n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                </div>\n\
                            </div>\n\
                        </div>';
        
            $("#modifyCompartment").append(tmpStr);

            tmpName = "window_elevation";
            tmpName1 = "window_elevation_inch";
            tmpStr  = ' <div class = "row">\n\
                            <div class = "col-xs-8">\n\
                                <div class="input-group"> \n\
                                    <span class="input-group-addon"> Elevation &nbsp &nbsp</span>\n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                </div>\n\
                            </div>\n\
                            <div class = "col-xs-4">\n\
                                <div class="input-group"> \n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                </div>\n\
                            </div>\n\
                        </div>';

            $("#modifyCompartment").append(tmpStr);

            tmpName = "window_height";
            tmpName1 = "window_height_inch";
            tmpStr  = ' <div class = "row">\n\
                            <div class = "col-xs-8">\n\
                                <div class="input-group"> \n\
                                    <span class="input-group-addon"> Height &nbsp &nbsp</span>\n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                </div>\n\
                            </div>\n\
                            <div class = "col-xs-4">\n\
                                <div class="input-group"> \n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                </div>\n\
                            </div>\n\
                        </div>';

            $("#modifyCompartment").append(tmpStr);
           

            tmpStr  = ' <div id="dimensionModalApplyChanges">\n \
                            <center><button id="dimensionModalApplyChangesButton" class="btn btn-raised btn-primary btn-xs" onclick="change_window()" >Apply Changes</button></center>\n \
                        </div>';
            $("#modifyCompartment").append(tmpStr);

            var width; 
            if(windowVertices[elem_panel.substring(6)].width > windowVertices[elem_panel.substring(6)].height){
                width = windowVertices[elem_panel.substring(6)].width*conversionFactor*zoomFactor;
            }
            else{
                width = windowVertices[elem_panel.substring(6)].height*conversionFactor*zoomFactor;
            }
            var position = windowVertices[elem_panel.substring(6)].distFromRoomNode*conversionFactor;
            var elevation = windowVertices[elem_panel.substring(6)].elevation*conversionFactor*zoomFactor;
            var height = windowVertices[elem_panel.substring(6)].height3D*conversionFactor*zoomFactor;

            width = to_ft(width);
            var width_inch = nfc(ft_in(width - Math.floor(width)),0);

            position = to_ft(position);
            var position_inch = nfc(ft_in(position - Math.floor(position)),0);

            elevation = to_ft(elevation);
            var elevation_inch = nfc(ft_in(elevation - Math.floor(elevation)),0);

            height = to_ft(height);
            var height_inch = nfc(ft_in(height - Math.floor(height)),0);


            $('#window_widthInput').val(Math.floor(width));
            $('#window_width_inchInput').val(width_inch);

            $('#window_positionInput').val(Math.floor(position)); 
            $('#window_position_inchInput').val(position_inch); 

            $('#window_elevationInput').val(Math.floor(elevation));
            $('#window_elevation_inchInput').val(elevation_inch);

            $('#window_heightInput').val(Math.floor(height));
            $('#window_height_inchInput').val(height_inch);
        }

        $(document).ready(function(){
            $(document).unbind("keypress");
            $(document).keypress(function(event){
                if(event.which == 13){
                    change_window();
                }
            });
        })

        newLine = '<li class="panel_list" onclick = "del_window();">Remove Window</li>';
        $("#rightClickMenu").append(newLine);

        $("#modifyCompartment").slideDown();
        $("#rightClickMenu").slideDown();
        
        $("#info").animate({width : 'show'}, {
            complete: function(){
                $(".panel_content").fadeIn();    
                $('.panel_content').show();
            }
        });
    }

    else if(elem_panel.substring(0,4) == "door"){

        var new_heading = ' <div class="panel_title"> \n\
                                <a class="site_title" style="position:absolute; top:0;z-index:-100;"><span>Door</span></a>\n\
                                <span style="float:right;"id="close_panel" onclick="close_panel()"><i class="fa fa-md fa-forward fa-rotate-180"></i></span>\n\
                            </div>';
        $("#info").append(new_heading);

        if(metric_system == "mm"){

            var tmpName = "door_width";
            var tmpStr  = ' <div class="input-group"> \n\
                                <span class="input-group-addon"> Length &nbsp &nbsp</span>\n\
                                <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                            </div>';
            $("#modifyCompartment").append(tmpStr);

            tmpName = "door_position";      
            tmpStr  = ' <div class="input-group"> \n\
                            <span class="input-group-addon"> Position &nbsp</span>\n\
                            <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"> \n \
                            <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                        </div>';
            

            
            $("#modifyCompartment").append(tmpStr);

            tmpName = "door_elevation";
            tmpStr  = ' <div class="input-group"> \n\
                            <span class="input-group-addon"> Elevation </span>\n\
                            <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input" > \n \
                            <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                        </div>';
            $("#modifyCompartment").append(tmpStr);

            tmpName = "door_height";
            tmpStr  = ' <div class="input-group"> \n\
                            <span class="input-group-addon"> Height &nbsp &nbsp &nbsp</span>\n\
                            <input type="number" min="0" max="3600" step="20" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input" > \n \
                            <span class="input-group-addon" id="' + tmpName + '">mm</span> \n \
                        </div>';
            $("#modifyCompartment").append(tmpStr);

            var width; 
            if(doorVertices[elem_panel.substring(4)].width > doorVertices[elem_panel.substring(4)].height){
                width = doorVertices[elem_panel.substring(4)].width*conversionFactor*zoomFactor;
            }
            else{
                width = doorVertices[elem_panel.substring(4)].height*conversionFactor*zoomFactor;
            }
            var position = doorVertices[elem_panel.substring(4)].distFromRoomNode*conversionFactor;
            var elevation = doorVertices[elem_panel.substring(4)].elevation*conversionFactor*zoomFactor;
            var height = doorVertices[elem_panel.substring(4)].height3D*conversionFactor*zoomFactor;

            $('#door_widthInput').val(round(width));
            $('#door_positionInput').val(round(position));  
            $('#door_elevationInput').val(round(elevation));
            $('#door_heightInput').val(round(height));
            
        }

        else if(metric_system == "ft"){
            var tmpName = "door_width";
            var tmpName1 = "door_width_inch"
            var tmpStr  = ' <div class = "row">\n\
                                <div class = "col-xs-8">\n\
                                    <div class="input-group"> \n\
                                        <span class="input-group-addon"> Length &nbsp &nbsp</span>\n\
                                        <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                        <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                    </div>\n\
                                </div>\n\
                                <div class = "col-xs-4">\n\
                                    <div class="input-group"> \n\
                                        <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                        <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                    </div>\n\
                                </div>\n\
                            </div>';
            $("#modifyCompartment").append(tmpStr);

            tmpName = "door_position"; 
            tmpName1 = "door_position_inch";     
            tmpStr  = ' <div class = "row">\n\
                            <div class = "col-xs-8">\n\
                                <div class="input-group"> \n\
                                    <span class="input-group-addon"> Position &nbsp &nbsp</span>\n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                </div>\n\
                            </div>\n\
                            <div class = "col-xs-4">\n\
                                <div class="input-group"> \n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                </div>\n\
                            </div>\n\
                        </div>';
        
            $("#modifyCompartment").append(tmpStr);

            tmpName = "door_elevation";
            tmpName1 = "door_elevation_inch";
            tmpStr  = ' <div class = "row">\n\
                            <div class = "col-xs-8">\n\
                                <div class="input-group"> \n\
                                    <span class="input-group-addon"> Elevation &nbsp &nbsp</span>\n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                </div>\n\
                            </div>\n\
                            <div class = "col-xs-4">\n\
                                <div class="input-group"> \n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                </div>\n\
                            </div>\n\
                        </div>';

            $("#modifyCompartment").append(tmpStr);

            tmpName = "door_height";
            tmpName1 = "door_height_inch";
            tmpStr  = ' <div class = "row">\n\
                            <div class = "col-xs-8">\n\
                                <div class="input-group"> \n\
                                    <span class="input-group-addon"> Height &nbsp &nbsp</span>\n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName + '" id="' + tmpName + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName + '">ft</span> \n \
                                </div>\n\
                            </div>\n\
                            <div class = "col-xs-4">\n\
                                <div class="input-group"> \n\
                                    <input type="number" min="0" max="3600" step="1" class="form-control" placeholder="0" aria-describedby="' + tmpName1 + '" id="' + tmpName1 + 'Input"></input> \n \
                                    <span class="input-group-addon" id="' + tmpName1 + '">in</span> \n \
                                </div>\n\
                            </div>\n\
                        </div>';

            $("#modifyCompartment").append(tmpStr);

            var width; 
            if(doorVertices[elem_panel.substring(4)].width > doorVertices[elem_panel.substring(4)].height){
                width = doorVertices[elem_panel.substring(4)].width*conversionFactor*zoomFactor;
            }
            else{
                width = doorVertices[elem_panel.substring(4)].height*conversionFactor*zoomFactor;
            }
            var position = doorVertices[elem_panel.substring(4)].distFromRoomNode*conversionFactor;
            var elevation = doorVertices[elem_panel.substring(4)].elevation*conversionFactor*zoomFactor;
            var height = doorVertices[elem_panel.substring(4)].height3D*conversionFactor*zoomFactor;

            width = to_ft(width);
            var width_inch = nfc(ft_in(width - Math.floor(width)),0);

            position = to_ft(position);
            var position_inch = nfc(ft_in(position - Math.floor(position)),0);

            elevation = to_ft(elevation);
            var elevation_inch = nfc(ft_in(elevation - Math.floor(elevation)),0);

            height = to_ft(height);
            var height_inch = nfc(ft_in(height - Math.floor(height)),0);


            $('#door_widthInput').val(Math.floor(width));
            $('#door_width_inchInput').val(width_inch);

            $('#door_positionInput').val(Math.floor(position)); 
            $('#door_position_inchInput').val(position_inch); 

            $('#door_elevationInput').val(Math.floor(elevation));
            $('#door_elevation_inchInput').val(elevation_inch);

            $('#door_heightInput').val(Math.floor(height));
            $('#door_height_inchInput').val(height_inch);

            
        }

        var left_wall_count = 0;
        var right_wall_count = 0;
        var up_wall_count = 0;
        var down_wall_count = 0;
        var inside_direction = "";

        var doorNode = doorVertices[parseInt(elem_panel.substring(4))];

        if(doorNode.angle == 0 ){

            for(var i = 0; i < vertices.length; i++ ){
                if(i < vertices.indexOf(vertices[i].nextNode1)){
                    if((doorNode.x - vertices[i].x)*(doorNode.x - vertices[i].nextNode1.x) <= 0){
                        if(vertices[i].y < doorNode.y){
                            up_wall_count++;
                        }
                        else{
                            down_wall_count++;
                        }
                    }
                }

                if(i < vertices.indexOf(vertices[i].nextNode2)){
                    if((doorNode.x - vertices[i].x)*(doorNode.x - vertices[i].nextNode2.x) <= 0){
                        if(vertices[i].y < doorNode.y){
                            up_wall_count++;
                        }
                        else{
                            down_wall_count++;
                        }
                    }
                }
            }

            if(up_wall_count % 2 == 1){
                inside_direction = "up"
            }
            else{
                inside_direction = "down"
            }

            if(doorNode.direction == inside_direction){
                tmpName = "door_direction";
                tmpStr  = ' <div class="input-group"> \n\
                                <span class="input-group-addon"> Direction &nbsp &nbsp </span>\n\
                                <input id = "'+ tmpName +'" checked type="checkbox" data-on-text = "IN" data-off-text = "OUT"> \n \
                            </div>';
                $("#modifyCompartment").append(tmpStr);
            }
            else{
                tmpName = "door_direction";
                tmpStr  = ' <div class="input-group"> \n\
                                <span class="input-group-addon"> Direction &nbsp &nbsp </span>\n\
                                <input id = "'+ tmpName +'" type="checkbox" data-on-text = "IN" data-off-text = "OUT"  > \n \
                            </div>';
                $("#modifyCompartment").append(tmpStr);
            }
        }

        else if(doorNode.angle == 90){

            for(var i = 0; i < vertices.length; i++ ){
                if(i < vertices.indexOf(vertices[i].nextNode1)){
                    if((doorNode.y - vertices[i].y)*(doorNode.y - vertices[i].nextNode1.y) <= 0){
                        if(vertices[i].x < doorNode.x){
                            left_wall_count++;
                        }
                        else{
                            right_wall_count++;
                        }
                    }
                }

                if(i < vertices.indexOf(vertices[i].nextNode2)){
                    if((doorNode.y - vertices[i].y)*(doorNode.y - vertices[i].nextNode2.y) <= 0){
                        if(vertices[i].x < doorNode.x){
                            left_wall_count++;
                        }
                        else{
                            right_wall_count++;
                        }
                    }
                }
            }

            if(left_wall_count % 2 == 1){
                inside_direction = "down";
            }
            else{
                inside_direction = "up";
            }

            if(doorNode.direction == inside_direction){
                tmpName = "door_direction";
                tmpStr  = ' <div class="input-group"> \n\
                                <span class="input-group-addon"> Direction &nbsp &nbsp </span>\n\
                                <input id = "'+ tmpName +'" checked type="checkbox" data-on-text = "IN" data-off-text = "OUT"  > \n \
                            </div>';
                $("#modifyCompartment").append(tmpStr);
            }
            else{
                tmpName = "door_direction";
                tmpStr  = ' <div class="input-group"> \n\
                                <span class="input-group-addon"> Direction &nbsp &nbsp </span>\n\
                                <input id = "'+ tmpName +'" type="checkbox" data-on-text = "IN" data-off-text = "OUT"  > \n \
                            </div>';
                $("#modifyCompartment").append(tmpStr);
            }
            
        }

        tmpStr  = ' <div id="dimensionModalApplyChanges">\n \
                        <center><button id="dimensionModalApplyChangesButton" class="btn btn-raised btn-primary btn-xs" onclick="change_door()" >Apply Changes</button></center>\n \
                    </div>';
        $("#modifyCompartment").append(tmpStr);

        $(function() {
            $('#door_direction').bootstrapSwitch();
        });


        $(document).ready(function(){
            $(document).unbind("keypress");
            $(document).keypress(function(event){
                if(event.which == 13){
                    change_door();
                }
            });
        })

        newLine = '<li class="panel_list" onclick = "del_door();">Remove Door</li>';
        $("#rightClickMenu").append(newLine);

        $("#modifyCompartment").slideDown();
        $("#rightClickMenu").slideDown();

        $("#info").animate({width : 'show'}, {
            complete: function(){
                $(".panel_content").fadeIn();    
                $('.panel_content').show();
            }
        });

        $('#door_direction').on('switchChange.bootstrapSwitch', function (e, state) {
            if(doorVertices[parseInt(elem_panel.substring(4))].direction == "down"){
                doorVertices[parseInt(elem_panel.substring(4))].direction = "up";
            }
            else{
                doorVertices[parseInt(elem_panel.substring(4))].direction = "down";
            }
        }); 
    }
}

function open_dimension_option(element){

    // var centerX,centerY;
    // var newLine;
    // var lineLength;
    // var changeNode;

    // if(typeof(element) == "string"){

    //     if(elem_clicked.charAt(2) == "h" || elem_clicked.charAt(2) == "v"){
    //         changeNode = vertices[elem_clicked.charAt(0)];
    //         if(elem_clicked.charAt(1) == '1'){
    //             centerX = (changeNode.x + changeNode.nextNode1.x)/2;
    //             centerY = (changeNode.y + changeNode.nextNode1.y)/2 + 80;
    //             lineLength = float(dist(changeNode.x, changeNode.y, changeNode.nextNode1.x, changeNode.nextNode1.y));
    //         }

    //         else if(elem_clicked.charAt(1) == '2'){
    //             centerX = (changeNode.x + changeNode.nextNode2.x)/2;
    //             centerY = (changeNode.y + changeNode.nextNode2.y)/2 + 80;
    //             lineLength = float(dist(changeNode.x, changeNode.y, changeNode.nextNode2.x, changeNode.nextNode2.y));
    //         }
    //     }

    //     else if(elem_clicked.charAt(3) == "h" || elem_clicked.charAt(3) == "v"){
    //         changeNode = vertices[elem_clicked.substring(0,2)];
    //         if(elem_clicked.charAt(2) == '1'){
    //             centerX = (changeNode.x + changeNode.nextNode1.x)/2;
    //             centerY = (changeNode.y + changeNode.nextNode1.y)/2 + 80;
    //             lineLength = float(dist(changeNode.x, changeNode.y, changeNode.nextNode1.x, changeNode.nextNode1.y));
    //         }

    //         else if(elem_clicked.charAt(2) == '2'){
    //             centerX = (changeNode.x + changeNode.nextNode2.x)/2;
    //             centerY = (changeNode.y + changeNode.nextNode2.y)/2 + 80;
    //             lineLength = float(dist(changeNode.x, changeNode.y, changeNode.nextNode2.x, changeNode.nextNode2.y));
    //         }
    //     }

    //     if(metric_system == "mm"){
    //         newLine = '<input id="line_length" class="dimension_input" style="z-index:500; position:absolute;top:'+ centerY +'px;left:'+ centerX +'px;"></input>';
    //         $("#canvas").append(newLine);

    //         $("#line_length").val(round(lineLength*conversionFactor));

    //         centerX = centerX + 75;

    //         newLine = '<button id = "'+element+'" class="dimension_btn" onclick="change_line_length(this.id)" style="position:absolute;top:'+ centerY +'px;left:'+ centerX +'px;">\n\
    //                     <i class="fa fa-lg fa-arrows-h"></i>\n\
    //                     </button>';
    //         $("#canvas").append(newLine);
    //     }

    //     else if(metric_system == "ft"){
    //         var centerX1 = centerX - 60;
    //         newLine = '<div id = "dimension" >\n\
    //                         <div class="input-group" style="z-index:500; position:absolute;top:'+ centerY +'px;left:'+ centerX1 +'px;">\n\
    //                             <input id="line_length_ft" class="dimension_ft" ></input>\n\
    //                             <span >ft</span>\n\
    //                             <input id="line_length_in" class="dimension_ft"></input>\n\
    //                             <span >in</span>\n\
    //                         </div>\n\
    //                     </div>';
    //         $("#canvas").append(newLine);

    //         var line_length_ft = to_ft(round(lineLength*conversionFactor));
    //         var line_length_in = ft_in(line_length_ft - Math.floor(line_length_ft));

    //         $("#line_length_ft").val(Math.floor(line_length_ft));
    //         $("#line_length_in").val(nfc(line_length_in,0));

    //         centerX = centerX + 75;

    //         newLine = '<button id = "'+element+'" class="dimension_btn" onclick="change_line_length(this.id)" style="position:absolute;top:'+ centerY +'px;left:'+ centerX +'px;"></button>';
    //         $("#canvas").append(newLine);

    //     }

    //     $(document).ready(function(){
    //         $(document).unbind("keypress");
    //         $(document).keypress(function(event){
    //             if(event.which == 13){
    //                 change_line_length(element);
    //             }
    //         });
    //     })
    // }

    populate_colors();

}

function change_line_length(element){

    var changeNode;
    var change;

    if(metric_system == "mm"){
        change = $("#line_length").val()/conversionFactor;
    }

    else if(metric_system == "ft"){
        var line_length_ft = $("#line_length_ft").val();
        var line_length_in = $("#line_length_in").val();
        line_length_in = in_ft(line_length_in);
        line_length_ft = parseFloat(line_length_ft) + parseFloat(line_length_in);
        change = to_mm(line_length_ft)/conversionFactor;
    }

    if(element.charAt(2) == "h" || element.charAt(2) == "v"){

        changeNode = vertices[element.charAt(0)];

        if(element.charAt(2) == "h"){
            if(element.charAt(1) == "1"){
                if(changeNode.x > changeNode.nextNode1.x){
                    changeNode.x = changeNode.nextNode1.x + change;
                }
                else {
                    changeNode.nextNode1.x = changeNode.x + change;
                }
            }

            else if(element.charAt(1) == "2"){
                if(changeNode.x > changeNode.nextNode2.x){
                    changeNode.x = changeNode.nextNode2.x + change;
                }
                else {
                    changeNode.nextNode2.x = changeNode.x + change;
                }
            }
        }

        else if(element.charAt(2) == "v"){
            if(element.charAt(1) == "1"){
                if(changeNode.y > changeNode.nextNode1.y){
                    changeNode.y = changeNode.nextNode1.y + change;
                }
                else {
                    changeNode.nextNode1.y = changeNode.y + change;
                }
            }

            else if(element.charAt(1) == "2"){
                if(changeNode.y > changeNode.nextNode2.y){
                    changeNode.y = changeNode.nextNode2.y + change;
                }
                else {
                    changeNode.nextNode2.y = changeNode.y + change;
                }
            }
        }


    }

    else if(element.charAt(3) == "h" || element.charAt(3) == "v"){
        changeNode = vertices[element.substring(0,2)];

        if(element.charAt(3) == "h"){
            if(element.charAt(2) == "1"){
                if(changeNode.x > changeNode.nextNode1.x){
                    changeNode.x = changeNode.nextNode1.x + change;
                }
                else {
                    changeNode.nextNode1.x = changeNode.x + change;
                }
            }

            else if(element.charAt(2) == "2"){
                if(changeNode.x > changeNode.nextNode2.x){
                    changeNode.x = changeNode.nextNode2.x + change;
                }
                else {
                    changeNode.nextNode2.x = changeNode.x + change;
                }
            }
        }

        else if(element.charAt(3) == "v"){
            if(element.charAt(2) == "1"){
                if(changeNode.y > changeNode.nextNode1.y){
                    changeNode.y = changeNode.nextNode1.y + change;
                }
                else {
                    changeNode.nextNode1.y = changeNode.y + change;
                }
            }

            else if(element.charAt(2) == "2"){
                if(changeNode.y > changeNode.nextNode2.y){
                    changeNode.y = changeNode.nextNode2.y + change;
                }
                else {
                    changeNode.nextNode2.y = changeNode.y + change;
                }
            }
        }


    }

    
    empty_dimension_option();

}

function empty_dimension_option(){
    $("#line_length").remove();
    $("#line_length_ft").remove();
    $("#line_length_in").remove();
    $("#dimension span").each(function(){
        $(this).remove();
    })
    $(".dimension_btn").remove();

}

function change_texture(element){
    texture = img[element];
}