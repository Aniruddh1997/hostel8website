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

		$(".img-responsive").each(function(){
			$(this).height($(this).width()*9/16);
		})
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

	$("#start1").hover(
		function(){
			$("#start1").attr("src","images/Assets-01.svg");
			$("#start_caption1")[0].style.color = "#33AD93";
		},function(){
			$("#start1").attr("src","images/Assets-03.svg");
			$("#start_caption1")[0].style.color = "#000";
		}
	);

	$("#start2").hover(
		function(){
			$("#start2").attr("src","images/Assets-04.svg");
			$("#start_caption2")[0].style.color = "#33AD93";
		},function(){
			$("#start2").attr("src","images/Assets-02.svg");
			$("#start_caption2")[0].style.color = "#000";
		}
	);

	// $(document).click(function(event){
	// 	var a = true;
	// 	var b = true;
	// 	$(".dropdown_menu li").each(function(){
	// 		if(event.target == this){
	// 			a =false;
	// 		}
	// 	})

	// 	if(a){
	// 		$(".dropdown_menu").find(".active_li").siblings().slideUp();
	// 	}

	// 	$("#account1 *").each(function(){
	// 		if(event.target == this){
	// 			b =false;
	// 		}
	// 	})

		// if(b){
		// 	$("#account_dropdown").slideUp();
		// }
	// })

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

    change_texture = function(index){
    	texture = texture_img[index];
    }

    menu_drop = function(){
    	$("#dropMenu").slideToggle();
    } 

    open_council = function(id){
    	$("#gsec")[0].style.display = "none";
    	$("#sport")[0].style.display = "none";
    	$("#cult")[0].style.display = "none";
    	$("#tech")[0].style.display = "none";
    	$("#comp")[0].style.display = "none";
    	$("#maint")[0].style.display = "none";
    	$("#mess")[0].style.display = "none";

    	$("#"+id).slideDown();
    }
})