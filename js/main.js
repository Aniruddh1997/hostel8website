$(document).ready(function(){

	if(sessionStorage.length == 0){
		if(typeof(Storage) !== "undefined"){
	        sessionStorage.setItem("user_login","false");
	  
	    } else {
	        alert("SessionStorage Not Supported");
	    }
	}

	var user_login = sessionStorage.getItem("user_login");
	if(user_login == "true"){
		var tmpStr = '	<button class="btn btn-raised btn-default" id = "user_info" style = "cursor:pointer;margin-top: 25px;" onclick="account1_click()">\n\
							<i class="fa fa-lg fa-user"></i>Aniruddh<i class="fa fa-lg fa-angle-down" style="color:#000;"></i>\n\
						</button>'
		$("#user_info").replaceWith(tmpStr);
		$("#dropdown3")[0].style.display = "block";
		// $("#dropMenu")[0].style.display = "block";
		$("#dropdown4")[0].style.display = "none";
	}

	//so that the fixed header appears at the right spot while initially loading the website
	if($("#dummy_header").is(":visible")){
		$("#main_header")[0].style.top = "51px";
	}
	else{
		$("#main_header")[0].style.top = "0px";
	}

	//the dummy header disappears while resizing
	$(window).resize(function(){
		if($(window).scrollTop() < 51){
			if($("#dummy_header").is(":visible")){
				$("#main_header")[0].style.top = "51px";
			}
			else{
				$("#main_header")[0].style.top = "0px";
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
				$(".nav_headers").each(function(){
					$(this)[0].style.paddingTop = '12px';
					$(this)[0].style.paddingBottom = '12px';
				})

				$("#main_header").animate({
					height : "50px"
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
				$(".nav_headers").each(function(){
					$(this)[0].style.paddingTop = '25px';
					$(this)[0].style.paddingBottom = '25px';
				})
				
				$("#main_header").animate({
					height : "80px"
				},10)
				$("#main_header img").animate({
					width : "200px"
				},10)
				$("#main_header button").animate({
					marginTop : "25px"
				},10)
			}
			else{
				$("#main_header")[0].style.top = "51px";

				$("#main_header").animate({
					height : "80px"
				},10)
				$("#main_header img").animate({
					width : "200px"
				},10)
				$("#main_header button").animate({
					marginTop : "25px"
				},10)
			}
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

	account1_click = function(){
		$("#account_dropdown").slideToggle();
		
	}

	account2_click = function(){
		flowPath = 2;
		$("#login_modal").modal("show");
	}

	$("#dropdown4").click(function(){
		flowPath = 2;
		$("#login_modal").modal("show");
	})


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

    	$("#co_page .card").removeClass("active");

    	$("#"+id).slideDown();
    	$("#co_"+id).addClass("active");
    }

    carousel_click = function(id){
    	$(".carousel-indicators li:nth-child("+id+")").click();
    	$(".gallery_nav li").removeClass("active");
    	$(".gallery_nav li").removeClass("arrow_box");
    	$(".gallery_nav li").css({"background-color": "#fff", "color": "#000"});
    	$(".gallery_nav li:nth-child("+id+")").addClass("active");
    	$(".gallery_nav li:nth-child("+id+")").addClass("arrow_box");
    	$(".gallery_nav li:nth-child("+id+")").css({"background-color": "#000", "color": "#fff"});
    }

    $(".gallery_nav li").hover(
    	function(){
    		if(!$(this).hasClass("active")){
    			$(this).css("background-color", "#ccc");
    		}
    	},function(){
    		if(!$(this).hasClass("active")){
    			$(this).css("background-color", "#fff");
    		}
    	}
    ) 
})