var recent_colors = ['#1ABB9C'];
var line_selected;

project_click = function(){
    $("#panel_fixed_header li").each(function(){
        $(this).removeClass("active_panel_header_li");
    })
    $('.Project').addClass("active_panel_header_li");
    $('.panel_content').show();                                       
    hide_panel_content();
    $("#Project").slideDown();
    
}

texture_click = function(){
    $("#panel_fixed_header li").each(function(){
        $(this).removeClass("active_panel_header_li");
    })
    $('.Texture').addClass("active_panel_header_li");
    $('.panel_content').show();                                       
    hide_panel_content();
    $("#Texture").slideDown();
}

room_click = function(){
    $("#panel_fixed_header li").each(function(){
        $(this).removeClass("active_panel_header_li");
    })
    $('.Room').addClass("active_panel_header_li");
    $('.panel_content').show();
    hide_panel_content();
    $("#Room").slideDown();
}

window_click = function(){
    $("#panel_fixed_header li").each(function(){
        $(this).removeClass("active_panel_header_li");
    })
    $('.Window').addClass("active_panel_header_li");
    $('.panel_content').show();
    hide_panel_content();
    $("#Window").slideDown();
    
}

door_click = function(){
    $("#panel_fixed_header li").each(function(){
        $(this).removeClass("active_panel_header_li");
    })
    $('.Door').addClass("active_panel_header_li");
    $('.panel_content').show();
    hide_panel_content();
    $("#Door").slideDown();
} 

function hide_panel_content(){
    $("#Project").hide();
    $("#Room").hide();
    $("#Window").hide();
    $("#Door").hide();
    $("#Texture").hide();
    $("#modifyCompartment").hide();
    $("#rightClickMenu").hide();
    if($(".individual_color").is(":visible")){
        var color = rgb2hex($('.individual_color')[0].style.backgroundColor);

        if(recent_colors.indexOf(color) == -1){
            if(recent_colors.length < 8) {
                recent_colors.push(color);
            } else if (recent_colors.length >= 8) {
                recent_colors.shift();
                recent_colors.push(color);
            }  
        }  
    }
    $("#room_colors").hide();
}

function empty_panel_content(){
    $('#info .panel_list').each(function(){
        $(this).remove();
    });
    $('#info > hr').each(function(){
        $(this).remove();
    });

    $('#info .panel_object').each(function(){
        $(this).remove();
    });


    $("#info button").each(function(){
        $(this).remove();
    });

    $("#modifyCompartment div").each(function(){    
        $(this).remove();
    });

    $("#info .panel_title").remove();

    if($(".individual_color").is(":visible")){
        var color = rgb2hex($('.individual_color')[0].style.backgroundColor);

        if(recent_colors.indexOf(color) == -1){
            if(recent_colors.length < 8) {
                recent_colors.push(color);
            } else if (recent_colors.length >= 8) {
                recent_colors.shift();
                recent_colors.push(color);
            }  
        }  
    }


    $("#room_colors div").each(function(){
        $(this).remove();
    })
}


// $("#sidebar-menu").click(function(){

//     $('.custom-menu > li').each(function(){
//         $(this).remove();
//     });
//     $('.custom-menu > hr').each(function(){
//         $(this).remove();
//     });

//     $(".custom-menu").hide();
// });


var hexDigits = new Array
    ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(parseInt(rgb[1])).substring(6) + hex(parseInt(rgb[2])).substring(6) + hex(parseInt(rgb[3])).substring(6);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }

//********Function to Populate Room Colors Menu********//
function populate_colors() {   
    
    selected_patch = null;

    var colors_array = ["#de9358","#dec56b","#98a347","#eabc7e","#a9383f","#52767c","#5e6771", "#dbe3eb", "#ffd540", "#8B5644", "#EAE7E3", "#B4DCD4", "#F7F8F4", "#E19B56", "#CF4738"];

    empty_panel_content();
    hide_panel_content();

    var new_heading = ' <div class="panel_title"> \n\
                            <a class="site_title" style="position:absolute; top:0;z-index: -100;"><span>Wall Color</span></a>\n\
                            <span style="float:right;"id="close_panel" onclick="showRoomOptions()"><i class="fa fa-md fa-forward fa-rotate-180"></i></span>\n\
                        </div>';
    $("#info").append(new_heading);

    var color_hex;
    line_selected = elem_clicked;

    if(elem_clicked.charAt(2) == "h" || elem_clicked.charAt(2) == "v"){
        var node = vertices[parseInt(elem_clicked.charAt(0))];
        if(elem_clicked.charAt(1) == "1"){
            color_hex = node.color1;
        }
        else if(elem_clicked.charAt(1) == "2"){
            color_hex = node.color2;
        }
    }
    else if(elem_clicked.charAt(3) == "h" || elem_clicked.charAt(3) == "v"){
        var node = vertices[parseInt(elem_clicked.substring(0,2))];
        if(elem_clicked.charAt(2) == "1"){
            color_hex = node.color1;
        }
        else if(elem_clicked.charAt(2) == "2"){
            color_hex = node.color2;
        }
    }
    


    var new_line = '<div class = "individual_color" style = "background :'+color_hex+';"><span onclick = "show_palette()"><i class="fa fa-md fa-forward fa-lg"></i></span></div>'
    // $('#individual_color').css('background', color_hex);
    $('#room_colors').append(new_line);

    // recently used colors
    var new_line = "<div class = 'container_recent_color' style = 'display:none;'></div>";
    $("#room_colors").append(new_line);

    var new_line = "<span class = 'panel_heading' >Recently Used Colors</span>";
    $(".container_recent_color").append(new_line);

    for(var k = 0; k < recent_colors.length; k++) {
        var new_line = '<div id = "'+recent_colors[k]+'" class = "colorArray" style = "background :'+recent_colors[k]+';" onclick = "change_individual_color(this.id,\''+line_selected+'\')"><span></span></div>'
        $(".container_recent_color").append(new_line);
    }

    // standard colors
    var new_line = "<div class = 'container_color' style = 'display:none;'></div>";
    $("#room_colors").append(new_line);

    var new_line = "<span class = 'panel_heading'>Standard Colors</span>";
    $(".container_color").append(new_line);

    for(var k = 0; k < colors_array.length; k++) {
        var new_line = '<div id = "'+colors_array[k]+'" class = "colorArray" style = "background :'+colors_array[k]+';" onclick = "change_individual_color(this.id,\''+line_selected+'\')"><span></span></div>'
        $(".container_color").append(new_line);
    }

    var new_line = "<div class = 'container_color1' style = 'display:none;'></div>";
    $("#room_colors").append(new_line);

    var new_line = '<div class="demo2 input-group"><input type="text" class = "form-control color_picker_individual" value="'+color_hex+'"><span class="input-group-addon"><i></i></span></div>';
    $(".container_color1").append(new_line);

    $('#room_colors').slideDown();

    $(function(){
        $('.demo2').colorpicker();
    });

}

//********Function to Show HIde Color Palette********//
function show_palette() {
    $(".container_recent_color").slideToggle();
    $(".container_color").slideToggle();
    $(".container_color1").slideToggle();
}

function change_individual_color(new_color,line_selected){

    if(line_selected.charAt(2) == "h" || line_selected.charAt(2) == "v"){
        var node = vertices[line_selected.charAt(0)];
        if(line_selected.charAt(1) == "1"){
            node.color1 = new_color;
            if(node.nextNode1.nextNode1 == node){
                node.nextNode1.color1 = new_color;
            }
            else{
                node.nextNode1.color2 = new_color;   
            }
        }
        else if(line_selected.charAt(1) == "2"){
            node.color2 = new_color;
            if(node.nextNode2.nextNode1 == node){
                node.nextNode2.color1 = new_color;
            }
            else{
                node.nextNode2.color2 = new_color;   
            }

        }
    }
    else if(line_selected.charAt(3)=="h" || line_selected.charAt(3) == "v"){
        var node = vertices[line_selected.substring(0,2)];
        if(line_selected.charAt(2) == "1"){
            node.color1 = new_color;
            if(node.nextNode1.nextNode1 == node){
                node.nextNode1.color1 = new_color;
            }
            else{
                node.nextNode1.color2 = new_color;   
            }
        }
        else if(line_selected.charAt(2) == "2"){
            node.color2 = new_color;
            if(node.nextNode2.nextNode1 == node){
                node.nextNode2.color1 = new_color;
            }
            else{
                node.nextNode2.color2 = new_color;   
            }
        }
    }
    $('.demo2').colorpicker('setValue',new_color);    
}














