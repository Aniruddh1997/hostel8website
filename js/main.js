$(document).ready(function(){

	// if(sessionStorage.length == 0){
	// 	if(typeof(Storage) !== "undefined"){
	//         sessionStorage.setItem("user_login","false");
	  
	//     } else {
	//         alert("SessionStorage Not Supported");
	//     }
	// }

	// var user_login = sessionStorage.getItem("user_login");
	// if(user_login == "true"){
	// 	var tmpStr = '	<button class="btn btn-raised btn-default" id = "user_info" style = "cursor:pointer;margin-top: 25px;" onclick="account1_click()">\n\
	// 						<i class="fa fa-lg fa-user"></i>Aniruddh<i class="fa fa-lg fa-angle-down" style="color:#000;"></i>\n\
	// 					</button>'
	// 	$("#user_info").replaceWith(tmpStr);
	// 	$("#dropdown3")[0].style.display = "block";
	// 	// $("#dropMenu")[0].style.display = "block";
	// 	$("#dropdown4")[0].style.display = "none";
	// }

	//so that the fixed header appears at the right spot while initially loading the website
	if($("#dummy_header").is(":visible")){
		$("#main_header")[0].style.top = "51px";
		$("#main_header img")[0].style.top = "-5px";
		$("#main_header")[0].style.opacity = "1";
	}
	else{
		$("#main_header")[0].style.top = "0px";
		$("#main_header img")[0].style.top = "0px";
		$("#main_header")[0].style.opacity = "0.95";
	}

	//the dummy header disappears while resizing
	$(window).resize(function(){
		if($(window).scrollTop() < 51){
			if($("#dummy_header").is(":visible")){
				$("#main_header")[0].style.top = "51px";
				$("#main_header img")[0].style.top = "-5px";
				$("#main_header")[0].style.opacity = "1";
			}
			else{
				$("#main_header")[0].style.top = "0px";
				$("#main_header img")[0].style.top = "0px";
				$("#main_header")[0].style.opacity = "0.95";
			}
		}
		if($("#main_header .collapse.in").is(":visible")){
			$(".navbar-toggle").click();
			$(".navbar-collapse")[0].style.width = "auto";
		}

		$(".navbar-collapse")[0].style.width = "auto";

		// $(".img-responsive").each(function(){
		// 	$(this).height($(this).width()*9/16);
		// })
	})
	
	//the dummy header has position relative.so it doesn't appear on scrolling
	$(window).scroll(function(){
		if($("#dummy_header").is(":visible")){
			if($(window).scrollTop() >= 51){
				$("#main_header")[0].style.top = "0px";
				$("#main_header img")[0].style.top = "0px";
				$("#main_header")[0].style.opacity = "0.95";

				$(".nav_headers").each(function(){
					$(this)[0].style.paddingTop = '12px';
					$(this)[0].style.paddingBottom = '12px';
				})

				$("#main_header").animate({
					height : "45px"
				},10)
				$("#main_header img").animate({
					width : "120px"
				},10)
				$("#main_header button").animate({
					marginTop : "6px"
				},10)
			}
			else if($(window).scrollTop() < 51){
				var height = 51 - $(window).scrollTop();
				$("#main_header")[0].style.top = height + "px";
				$("#main_header img")[0].style.top = "-5px";
				$("#main_header")[0].style.opacity = "1";

				$(".nav_headers").each(function(){
					$(this)[0].style.paddingTop = '25px';
					$(this)[0].style.paddingBottom = '25px';
				})
				
				$("#main_header").animate({
					height : "70px"
				},10)
				$("#main_header img").animate({
					width : "200px"
				},10)
				$("#main_header button").animate({
					marginTop : "25px"
				},10)
			}
			// else{
			// 	$("#main_header")[0].style.top = "51px";
			// 	$("#main_header img")[0].style.top = "-5px";

			// 	$("#main_header").animate({
			// 		height : "70px"
			// 	},10)
			// 	$("#main_header img").animate({
			// 		width : "200px"
			// 	},10)
			// 	$("#main_header button").animate({
			// 		marginTop : "25px"
			// 	},10)
			// }
		}

		if ($(this).scrollTop() > 100) { 
	        $('#scroll').fadeIn(); 
	    } else { 
	        $('#scroll').fadeOut(); 
	    } 

	})

	$('#scroll').click(function(){ 
		$("html, body").animate({ scrollTop: 0 }, 600); 
		return false; 
	});


	$(".navbar-collapse").on("hide.bs.collapse",function(){
     	$(this).animate({
        	width : "0px"
      	})
      	$("html").animate({
	        left: "0px"
      	});
 	 	$(".navbar-fixed-top").animate({
	        marginRight : "0px",
	        left : "0px"
      	})

      	$("#main_header > .container-fluid").animate({
      		paddingRight : "15px"
      	})

      	$("#main_header > .container-fluid > .col-sm-3").animate({
      		paddingRight : "15px"
      	})

    })
    $(".navbar-collapse").on("show.bs.collapse",function(){
     	$(this).animate({
        	width : "250px"
      	})

      	$("html").animate({
	        left: "-250px"
      	});
 	 	$(".navbar-fixed-top").animate({
	        marginRight : "250px",
	        left : "-250px"
      	})
      	$("#main_header > .container-fluid").animate({
      		paddingRight : "0"
      	})

      	$("#main_header > .container-fluid > .col-sm-3").animate({
      		paddingRight : "0"
      	})
    })

    edit_address_click = function(){
    	$("#edit_address").slideToggle();
    }

    menu_drop = function(){
    	$("#dropMenu").slideToggle();
    } 

    open_council = function(id){
    	$("#council_info>div").css("display", "none");

    	$("#co_page img").removeClass("active");

    	$("#"+id).velocity('transition.swoopIn');
    	$("#co_"+id).addClass("active");
    }

    carousel_click = function(id){
    	$(".carousel-indicators li:nth-child("+id+")").click();
    	$("#changing_nav li").removeClass("active");
    	$("#changing_nav li").removeClass("arrow_box");
    	$("#changing_nav li").css({"background-color": "#161616", "color": "#fff"});
    	$("#changing_nav li:nth-child("+id+")").addClass("active");
    	$("#changing_nav li:nth-child("+id+")").addClass("arrow_box");
    	$("#changing_nav li:nth-child("+id+")").css({"background-color": "#0185cf", "color": "#000"});
    	i = id;
    	clearInterval(carousel_slide);
    	carousel_slide = setInterval(function(){
			i++;
			if(i>6){
				i=1;
			}
			carousel_click(i);
		},2000)
    }

    $(".gallery_nav li").hover(
    	function(){
    		if(!$(this).hasClass("active")){
    			$(this).css("background-color", "#333");
    		}
    	},function(){
    		if(!$(this).hasClass("active")){
    			$(this).css("background-color", "#161616");
    		}
    	}
    ) 

    show_gallery = function(id,index){
    	var x = 0;
    	$(".gallery.active img").fadeOut(function(){
    		x++;
    		if(x==1){
    			$("#" + id + " img").velocity("transition.swoopIn");
    		}
    	});

    	$("#" + id).velocity("transition.perspectiveDownIn");
    	
    	$(".gallery").removeClass("active");
    	$("#" + id).addClass("active");

    	$(".gallery_nav li").removeClass("arrow_box");
    	$(".gallery_nav li").removeClass("active");
    	$(".gallery_nav li").css({"background-color": "#161616", "color": "#fff"});

    	$(".gallery_nav li:nth-child("+index+")").addClass("arrow_box");
    	$(".gallery_nav li:nth-child("+index+")").addClass("active");
    	$(".gallery_nav li:nth-child("+index+")").css({"background-color": "#0185cf", "color": "#000"});

    }

    // $(".upcoming_events .col-md-4").hover(
    // 	function(){
    // 		var elem = $(this);
    // 		myVar = setTimeout(function(){
    // 			elem.find(".overlay").animate({height:"100%",opacity:"0.9"},150);
    // 		}, 150)	
    // 	},
    // 	function(){
    // 		$(this).find(".overlay").animate({height:"0%",opacity:"0"},150);
    // 		clearTimeout(myVar);
    // 	}
    // )

	carousel_ctrl = function(dir){
		var elem = $("#changing_nav li.active");
		$("#changing_nav li").removeClass("active");
		$("#changing_nav li").removeClass("arrow_box");
		$("#changing_nav li").css({"background-color": "#161616", "color": "#fff"});

		if(dir == "prev"){
			elem.prev().addClass("active");
			elem.prev().addClass("arrow_box");
			elem.prev().css({"background-color": "#0185cf", "color": "#000"});
		}
		else{
			elem.next().addClass("active");
			elem.next().addClass("arrow_box");
			elem.next().css({"background-color": "#0185cf", "color": "#000"});
		}
	}

    $('#co_page').jqcarousel();
    $('#co_page').css("height", "500px");

    $("#co_page>div").hover(
    	function(){
    		var elem = $(this);
    		myVar = setTimeout(function(){
    			elem.children().velocity('transition.shrinkIn');
    		}, 150)	
    	},
    	function(){
    		$(this).children().fadeOut();
    		clearTimeout(myVar);
    	});

	var i = 0;

	carousel_slide = setInterval(function(){
		i++;
		if(i>6){
			i=1;
		}
		carousel_click(i);
	},2000)


	$(function() {
	    $("#upcoming .col-md-4>div").hover(function(e) {
	    	var elem = $(this);
	        var el_pos = $(this).offset();
	        var edge = closestEdge(elem,e);

	        myVar1 = setTimeout(function(){
	        	elem.find("span")[0].style.display = "block";
		        if(edge == "left"){
	        		elem.find(".overlay")[0].style.width = "0%";
	        		elem.find(".overlay")[0].style.height = "100%";
	        		elem.find(".overlay")[0].style.left = "0";
	        		elem.find(".overlay")[0].style.right = "auto";
	        		elem.find(".overlay").animate({width: "100%"},150);
		        }
		        else if(edge == "right"){
	        		elem.find(".overlay")[0].style.width = "0%";
	        		elem.find(".overlay")[0].style.height = "100%";
	        		elem.find(".overlay")[0].style.right = "0";
	        		elem.find(".overlay")[0].style.left = "auto";
	        		elem.find(".overlay").animate({width: "100%"},150);
	        	}
	        	else if(edge == "top"){
	        		elem.find(".overlay")[0].style.width = "100%";
	        		elem.find(".overlay")[0].style.height = "0%";
	        		elem.find(".overlay")[0].style.top = "0";
	        		elem.find(".overlay")[0].style.bottom = "auto";
	        		elem.find(".overlay").animate({height: "100%"},150);
	        	}
	        	else{
	        		elem.find(".overlay")[0].style.width = "100%";
	        		elem.find(".overlay")[0].style.height = "0%";
	        		elem.find(".overlay")[0].style.bottom = "0";
	        		elem.find(".overlay")[0].style.top = "auto";
	        		elem.find(".overlay").animate({height: "100%"},150);
		        }
		    },50)
	    }, function(e) {
	    	var elem = $(this);
	        var el_pos = $(this).offset();
	        var edge = closestEdge(elem,e);
	        clearTimeout(myVar1);
	       	$(this).finish();

	        if(edge == "left"){
        		$(this).find(".overlay")[0].style.left = "0";
        		$(this).find(".overlay")[0].style.right = "auto";
        		$(this).find(".overlay").animate({width: "0%"},150,function(){
        			elem.find("span")[0].style.display = "none";
        		});
	        }
	        else if(edge == "right"){
        		$(this).find(".overlay")[0].style.right = "0";
        		$(this).find(".overlay")[0].style.left = "auto";
        		$(this).find(".overlay").animate({width: "0%"},150,function(){
        			elem.find("span")[0].style.display = "none";
        		});
        	}
        	else if(edge == "top"){
        		$(this).find(".overlay")[0].style.top = "0";
        		$(this).find(".overlay")[0].style.bottom = "auto";
        		$(this).find(".overlay").animate({height: "0%"},150,function(){
        			elem.find("span")[0].style.display = "none";
        		});
        	}
        	else{
        		$(this).find(".overlay")[0].style.bottom = "0";
        		$(this).find(".overlay")[0].style.top = "auto";
        		$(this).find(".overlay").animate({height: "0%"},150,function(){
        			elem.find("span")[0].style.display = "none";
        		});
	        }

	         // $(this).find(".overlay")[0].style.opacity = "0";
	        
	    });
	});

	// function closestEdge(x,y,w,h) {
 //        var topEdgeDist = distMetric(x,y,w/2,0);
 //        var bottomEdgeDist = distMetric(x,y,w/2,h);
 //        var leftEdgeDist = distMetric(x,y,0,h/2);
 //        var rightEdgeDist = distMetric(x,y,w,h/2);
    
 //        var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
 //        switch (min) {
 //            case leftEdgeDist:
 //                return "left";
 //            case rightEdgeDist:
 //                return "right";
 //            case topEdgeDist:
 //                return "top";
 //            case bottomEdgeDist:
 //                return "bottom";
	//     }
	// }
	    
	// function distMetric(x,y,x2,y2) {
	//     var xDiff = x - x2;
	//     var yDiff = y - y2;
	//     return (xDiff * xDiff) + (yDiff * yDiff);
	// }

	function closestEdge( elem, e ) {       

            /** the width and height of the current div **/
            var w = elem.width();
            var h = elem.height();
            var offset = elem.offset();
            /** calculate the x and y to get an angle to the center of the div from that x and y. **/
            /** gets the x value relative to the center of the DIV and "normalize" it **/
            var x = (e.pageX - offset.left - (w/2)) * ( w > h ? (h/w) : 1 );
            var y = (e.pageY - offset.top  - (h/2)) * ( h > w ? (w/h) : 1 );

            /** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
            /* first calculate the angle of the point, 
             add 180 deg to get rid of the negative values
             divide by 90 to get the quadrant
             add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) */
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180 ) / 90 ) + 3 )  % 4;


            /** do your animations here **/ 
            switch(direction) {
             case 0:
                return 'top';
             break;
             case 1:
                return 'right';
             break;
             case 2:
                   return 'bottom';
             break;
             case 3:
                   return 'left';
             break;
            }

	}

	$("#services .col-md-4>div").hover(function(e) {
	    	var elem = $(this);
	      
	        myVar2 = setTimeout(function(){
	        	elem.find("span")[0].style.display = "block";
	        	elem.find(".overlay")[0].style.width = "100%";
		        elem.find(".overlay").animate({height: "50px"},150);
		    },50)
	    }, function(e) {
	    	var elem = $(this);
	        clearTimeout(myVar2);
	       	$(this).finish();

	       	$(this).find(".overlay").animate({height: "0%"},150,function(){
    			elem.find("span")[0].style.display = "none";
    		});

	});

})