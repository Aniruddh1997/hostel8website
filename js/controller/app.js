var getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}

var user_login = sessionStorage.getItem("user_login");
var app = angular.module('myApp', ['ngRoute',"angucomplete-alt","ngAnimate"]);
var flowPath;

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		resolve : {
			"check" :function($rootScope,$location){
				$rootScope.floorplan = false;
			  	$rootScope.description = false;
			  	$rootScope.address = false;
			  	$rootScope.builder = false;
			  	$rootScope.dashboard = false;
			  	if(user_login == "true"){
			  		$location.path("/logged_in");
			  	}
			  	else{
			  		$location.path('/');
			  	}
			}
		},
		templateUrl : 'views/products.html'
	})

	.when('/logged_in',{
		resolve : {
			"check" :function($rootScope,$location){
				if(user_login == "true"){
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	$rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}
				else{
					$location.path('/');
				}
				
			}
		},
		templateUrl : 'views/logged_in.html'
	})

	.when('/floorplan',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.floorplan){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					// $rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	$rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/floorplan.html'
		
	})
	.when('/description',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.description){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	// $rootScope.description = false;
				  	$rootScope.address = false;
				  	$rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/description.html'
		
	})
	.when('/address',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.address){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	// $rootScope.address = false;
				  	$rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/address.html'
		
	})

	.when('/dashboard',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.dashboard){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	$rootScope.builder = false;
				  	// $rootScope.dashboard = false;

				  	$rootScope.design = false;
				  	$rootScope.wishlist = false;
				  	$rootScope.shortlist = false;
				  	$rootScope.order = false;
				  	$rootScope.profile_info = true;
				  	$rootScope.profile_password = false;
				  	$rootScope.profile_address = false;

				}

			}
		},
		templateUrl : 'views/dashboard.html'
		
	})

	.when('/city',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.builder){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	// $rootScope.builder = false;
				  	$rootScope.builder_floorplan = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/city.html',
		// controller : 'myCtrl'

	})

	.when('/builder/builders',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.builder){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	// $rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/builders.html'
	})
	.when('/builder/project',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.builder){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	// $rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/project.html'
	})
	.when('/builder/floorplan',{
		resolve : {
			"check" : function($location,$rootScope){
				if(!$rootScope.builder){
					if(user_login == "true"){
						$location.path('/logged_in');
					}
					else{
						$location.path('/');
					}
					
				}
				else{
					$rootScope.floorplan = false;
				  	$rootScope.description = false;
				  	$rootScope.address = false;
				  	// $rootScope.builder = false;
				  	$rootScope.dashboard = false;
				}

			}
		},
		templateUrl : 'views/builder.html',
		// controller : 'myCtrl'
	})
	.otherwise({
		redirectTo : '/'
	})
})

app.controller('myCtrl', function ($scope, $http, $location, $rootScope) {
	// $locationProvider.html5Mode(true).hashPrefix('!');
  	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  	$rootScope.floorplan = false;
  	$rootScope.description = false;
  	$rootScope.address = false;
  	$rootScope.builder = false;
  	$rootScope.dashboard = false;

  	$rootScope.design = false;
  	$rootScope.wishlist = false;
  	$rootScope.shortlist = false;
  	$rootScope.order = false;
  	$rootScope.profile_info = true;
  	$rootScope.profile_password = false;
  	$rootScope.profile_address = false;

    // $(".combobox").combobox();
    $scope.$on('$viewContentLoaded', function () {

		setTimeout(function(){
			$(".img-responsive").each(function(){
				$(this).height($(this).width()*9/16);
			})

			$("#builder_filter").find(".filter_remove").animate(
				{opacity:0},
				{complete : function(){
					$("#builder_filter").find(".filter_remove").remove();
					$("#builder_filter").find(".filter_add").each(function(){
						$(this)[0].style.display = "block";
					})
					$("#builder_filter").find(".filter_add").animate({opacity:1});
				}
			});
			},2);
		// $rootScope.builder = true;
	});

    $scope.cities = [{name : "Bangalore"}, {name : "Mumbai"}];

    $scope.builders =  [{name : "Acheson Builders", city:"Bangalore"}, {name : "Asset Builders", city:"Bangalore"}, {name : "Builder's League", city:"Bangalore"}, 
   						{name : "Mchome", city:"Mumbai"}, {name : "Murphy Builders", city:"Mumbai"}, {name : "Prime Builders", city:"Mumbai"}];
   	$scope.builder_blr = [{name : "Acheson Builders", city:"Bangalore"}, {name : "Asset Builders", city:"Bangalore"}, {name : "Builder's League", city:"Bangalore"}]
   	$scope.builder_mum = [{name : "Mchome", city:"Mumbai"}, {name : "Murphy Builders", city:"Mumbai"}, {name : "Prime Builders", city:"Mumbai"}];

    $scope.projects = [{name : "Project1"}, {name : "Project2"},{name : "Project3"}, {name : "Project4"}];
    $scope.project_blr = [{name : "Project1"}, {name : "Project2"}];
    $scope.project_mum = [{name : "Project3"}, {name : "Project4"}];

    $scope.floorplans = [{city : "Bangalore", project: "Project1", builder:"Asset Builders" , src: "images/floorplans.jpeg", name:"2BHK"},
    					 {city : "Bangalore", project: "Project2", builder:"Asset Builders" , src: "images/floorplans.jpeg", name:"2BHK"},		
				   		 {city : "Bangalore", project: "Project2", builder: "Builder's League", src: "images/floorplans.jpeg", name:"2BHK"},
				   		 {city : "Bangalore", project: "Project1", builder: "Builder's League", src: "images/floorplans.jpeg", name:"2BHK"},
				   		 {city : "Mumbai", project: "Project3", builder: "Mchome", src: "images/floorplans.jpeg", name:"2BHK"},
				   		 {city : "Mumbai", project: "Project4", builder: "Mchome", src: "images/floorplans.jpeg", name:"2BHK"},
				   		 {city : "Mumbai", project: "Project3", builder: "Murphy Builders", src: "images/floorplans.jpeg", name:"2BHK"},
				   		 {city : "Mumbai", project: "Project4", builder:"Murphy Builders" , src: "images/floorplans.jpeg", name:"2BHK"},
    ];

    $scope.cities_src = [{src : "images/blore.png", city:"Bangalore"},{src : "images/mumbai.png", city:"Mumbai"}];

    $scope.builder_src = [];

    $scope.builder_blr_src = [{src : "images/acheson.png", name : "Acheson Builders", city:"Bangalore"},{src : "images/asset.png", name : "Asset Builders", city:"Bangalore"},
					         {src : "images/builder.png", name : "Builder's League", city:"Bangalore"}];
    $scope.builder_mum_src = [{src : "images/mchome.png", name : "Mchome", city:"Mumbai"},{src : "images/murphy.png", name : "Murphy Builders", city:"Mumbai"},
    					     {src : "images/prime.png", name : "Prime Builders", city:"Mumbai"}];

    $scope.project_src = [];

    $scope.project_blr_src = [{src : "images/project1.jpg", name : "Project1"},{src : "images/project2.jpg", name : "Project2"}]
					         
    $scope.project_mum_src = [{src : "images/project3.jpg", name : "Project3"},{src : "images/project4.jpg", name : "Project4"}]
    					     


    $scope.selected_city = "";
    $scope.selected_builder = "";
    $scope.selected_project = "";

    $scope.selected_city_func = function(selected){
    	if(selected) {
    		$scope.city_select(selected.title);
    		$scope.$broadcast('angucomplete-alt:clearInput', 'ex2');
    		$scope.$broadcast('angucomplete-alt:clearInput', 'ex3');

    		$scope.selected_builder = "";

		    $scope.selected_project = "";

    	} else {
    		// alert("nothing selected");
    	}
    } 
    $scope.selected_builder_func = function(selected){
    	if(selected) {
    		$scope.builder_select(selected.title,$scope.selected_city);
    		$scope.$broadcast('angucomplete-alt:clearInput', 'ex3');

		    $scope.selected_project = "";
    		
    	} else {
    		// alert("nothing selected");
    	}
    } 

    $scope.selected_project_func = function(selected) {
    	if(selected) {
    		$scope.selected_project = selected.title;
    		$scope.visible("builder_floorplan");
    	} else {
    		$scope.selected_project = "";
    	}
    	
    }

    $scope.city_select = function(caller){
		if(caller == "Bangalore"){
			$scope.builders = $scope.builder_blr;
			$scope.selected_city = "Bangalore";
			$scope.builder_src = $scope.builder_blr_src;
			
		}
		else if(caller == "Mumbai"){
			$scope.builders = $scope.builder_mum;
			$scope.selected_city = "Mumbai";
			$scope.builder_src = $scope.builder_mum_src;
			
		}
		$scope.visible("builder");
    }

    $scope.builder_select = function(caller,city){
    	if(city == "Bangalore"){
    		$scope.projects = $scope.project_blr;
    		$scope.project_src = $scope.project_blr_src;
    		$scope.selected_builder = caller;
    	}
    	else if(city == "Mumbai"){
    		$scope.projects = $scope.project_mum;
    		$scope.project_src = $scope.project_mum_src;
    		$scope.selected_builder = caller;
    	}
    	$scope.visible("project");
    }

    $scope.city_src_select = function(city){
    	$scope.selected_city = city;
    	if (city == "Bangalore"){
    		$scope.builder_src = $scope.builder_blr_src;
    		$scope.builders = $scope.builder_blr;
    	}
    	else if (city == "Mumbai"){
    		$scope.builder_src = $scope.builder_mum_src;
    		$scope.builders = $scope.builder_mum;
    	}
    	$scope.visible("builder");
    }

    $scope.builder_src_select = function(city,builder){
    	$scope.selected_city = city;
    	$scope.selected_builder = builder;
    	if(city == "Bangalore"){
    		$scope.builders = $scope.builder_blr;
    		$scope.projects = $scope.project_blr;
    		$scope.project_src = $scope.project_blr_src;
    	}
    	else if (city == "Mumbai"){
    		$scope.builders = $scope.builder_mum;
    		$scope.projects = $scope.project_mum;
    		$scope.project_src = $scope.project_mum_src;
    	}
    	$scope.visible("project");
    }

    $scope.project_src_select = function(project){
    	$scope.selected_project = project;
    	$scope.visible("builder_floorplan");
    }


  	$scope.visible = function(page){
  		user_login = sessionStorage.getItem("user_login");

  		$rootScope.floorplan = false;
	  	$rootScope.description = false;
	  	$rootScope.address = false;
	  	$rootScope.builder = false;
	  	$rootScope.dashboard = false;

  		if(user_login == "true") {
  			var tmpStr = '	<button class="btn btn-raised btn-default" id = "user_info" style = "cursor:pointer;margin-top: 25px;" onclick="account1_click()">\n\
  								<i class="fa fa-lg fa-user"></i>Aniruddh<i class="fa fa-lg fa-angle-down" style="color:#000;"></i>\n\
  							</button>';
			$("#user_info").replaceWith(tmpStr);
			$("#dropdown3")[0].style.display = "block";
			// $("#dropMenu")[0].style.display = "block";
			$("#dropdown4")[0].style.display = "none";



  			if(page == "floorplan"){
  				$rootScope.floorplan = true;
	  			room_design('squareRoom');
	  			$location.path('/floorplan');
	  		} 
	  		else if(page == "product"){
	  			$location.path('/product');
	  		}	
	  		else if(page == "description"){
	  			$rootScope.description = true;
	  			$location.path('/description');
	  		}
	  		else if(page == "address"){
	  			$rootScope.address = true;
	  			$location.path('/address');
	  		}
	  		else if(page == "city"){
	  			$rootScope.builder = true;
	  			$location.path('/city');
	  		}
	  		else if(page == "builder"){
	  			$rootScope.builder = true;
	  			$location.path('/builder/builders');
	  		}
	  		else if(page == "project"){
	  			$rootScope.builder = true;
	  			$location.path('/builder/project');
	  		}
	  		else if(page == "builder_floorplan"){
	  			$rootScope.builder = true;
	  			$location.path('/builder/floorplan');
	  		}
	  		else if(page == "dashboard"){
	  			$rootScope.dashboard = true;
	  			$location.path('/dashboard');
	  		}
	  		else if(page == "logged_in"){
	  			$location.path('/logged_in');
	  		}

  		} 
  		else if(user_login == "false") {
  			var tmpStr = '	<button class="btn btn-raised btn-default" id = "user_info" style = "cursor:pointer;margin-top: 25px;" onclick="account2_click()">\n\
  								<i class="fa fa-lg fa-user"></i><span style="padding-right:15px;">Login/Signup</span>\n\
							</button>'
			$("#user_info").replaceWith(tmpStr);
			$("#dropdown3")[0].style.display = "none";
			$("#dropMenu")[0].style.display = "none";
			$("#dropdown4")[0].style.display = "block";

  			// if(page == "floorplan"){
	  		// 	$("#login_modal").modal("show");
  				
	  		// } 
	  		if(page == "floorplan"){
  				$location.path('/product');
	  		} 
	  		else if(page == "product"){
	  			$location.path('/product');
	  		}	
	  		else if(page == "description"){
	  			$rootScope.description = true;
	  			$location.path('/description');
	  		}
	  		else if(page == "address"){
	  			$location.path('/product');
	  		}
	  		else if(page == "city"){
	  			$location.path('/product');
	  		}
	  		else if(page == "builder"){
	  			$location.path('/product');
	  		}
	  		else if(page == "project"){
	  			$location.path('/product');
	  		}
	  		else if(page == "builder_floorplan"){
	  			$location.path('/product');
	  		}
	  		else if(page == "dashboard"){
	  			$location.path('/product');
	  		}
	  		else if(page == "logged_in"){
	  			$location.path('/product');
	  		}
  		} 

  		$('#start_options').modal("hide");
  		$("#account_dropdown").slideUp();
  		
  	};

  	$scope.generate_room = function(){
        coordinateTransfer();

        if(typeof(Storage) !== "undefined"){
            sessionStorage.removeItem("room_coordinates");
            sessionStorage.removeItem("window_coordinates");
            sessionStorage.removeItem("door_coordinates");

            sessionStorage.setItem("room_coordinates",JSON.stringify(coordinatesToTransfer));
            sessionStorage.setItem("window_coordinates",JSON.stringify(windowCoordinatesToTransfer));
            sessionStorage.setItem("door_coordinates",JSON.stringify(doorCoordinatesToTransfer));
        	$scope.visible("product");
        } else {
            alert("SessionStorage Not Supported");
        }
    }


  	$scope.login_func = function(){
		if($scope.login_form.$valid){

			if(typeof(Storage) !== "undefined"){
                sessionStorage.setItem("user_login","true");
                user_login = sessionStorage.getItem("user_login");

                if(flowPath == 1) {
					$('#login_modal').modal("hide");
					$("#start_options").modal("show");
				} 
				else if(flowPath == 2) {
					$('#login_modal').modal("hide");
					$scope.visible("logged_in");
				}
				else if(flowPath == 3){
					$("#login_modal").modal("hide");
					$("#design_consultation").modal("show");
				}

				var tmpStr = '	<button class="btn btn-raised btn-default" id = "user_info" style = "cursor:pointer;margin-top: 25px;" onclick="account1_click()">\n\
	  								<i class="fa fa-lg fa-user"></i>Aniruddh<i class="fa fa-lg fa-angle-down" style="color:#000;"></i>\n\
	  							</button>';
				$("#user_info").replaceWith(tmpStr);
				$("#dropdown3")[0].style.display = "block";
				// $("#dropMenu")[0].style.display = "block";
				$("#dropdown4")[0].style.display = "none";
          
            } else {
                alert("SessionStorage Not Supported");
            }
		}

		// else{
		// 	if($("#email1").val() == undefined || $("#email1").val() == null || $("#email1").val() == "" ){
		// 		$("#email1").parent().removeClass("has-success").addClass("has-error");
		// 	}

		// 	if($("#password1").val() == undefined || $("#password1").val() == null || $("#password1").val() ==""){
		// 		$("#password1").parent().removeClass("has-success").addClass("has-error");
		// 	}
		// }
  	}

  	$scope.fb_login = function(){
		FB.login(function(response){
			if(response.status === "connected"){
				console.log("you are connected");
				if(typeof(Storage) !== "undefined"){
	            	sessionStorage.setItem("user_login","true");
	            	user_login = sessionStorage.getItem("user_login");

	            		if(flowPath == 1) {
							$('#login_modal').modal("hide");
							$("#start_options").modal("show");

						} 
						else if(flowPath == 2) {
							$('#login_modal').modal("hide");
							$scope.visible("logged_in");
						}
						else if(flowPath == 3){
							$("#login_modal").modal("hide");
							$("#design_consultation").modal("show");
						}

						var tmpStr = '	<button class="btn btn-raised btn-default" id = "user_info" style = "cursor:pointer;margin-top: 25px;" onclick="account1_click()">\n\
			  								<i class="fa fa-lg fa-user"></i>Aniruddh<i class="fa fa-lg fa-angle-down" style="color:#000;"></i>\n\
			  							</button>';
						$("#user_info").replaceWith(tmpStr);
						$("#dropdown3")[0].style.display = "block";
						// $("#dropMenu")[0].style.display = "block";
						$("#dropdown4")[0].style.display = "none";
	      
	            } else {
	                alert("SessionStorage Not Supported");
	            }
			}
			else if(response.status === "not_authorized"){
				console.log("you have not authorized the app");
			}
			else{
				console.log("you are not logged into Facebook");
			}
		},{scope : "email"});
	}

    $scope.signup_func = function(){
    	var name = $('#name').val();
    	var email = $('#email2').val();
    	var password = $('#password2').val();
    	var password_confirm = $('#password3').val();
    	// if(name == "") {
    	// 	$("#name").parent().removeClass("has-success").addClass("has-error");
    	// 	return;
    	// }
    	// if(email == "") {
    	// 	$("#email2").parent().removeClass("has-success").addClass("has-error");
    	// 	return;
    	// }
    	// if(password == "") {
    	// 	$("#password2").parent().removeClass("has-success").addClass("has-error");
    	// 	return;
    	// }
    	// if(password_confirm == "") {
    	// 	$("#password3").parent().removeClass("has-success").addClass("has-error");
    	// 	return;
    	//}
    	if(password == password_confirm && $scope.signup_form.$valid) {
    		//take the sha512 of password before sending to server
    		//api call for user signup
    		$('#login').addClass("active"); 
    		$('#signup').removeClass("active");
    		$('#login_tab').parent().addClass("active"); 
    		$('#signup_tab').parent().removeClass("active");

    	} 
    	// else {
    	// 	$("#password2").parent().removeClass("has-success").addClass("has-error");
    	// 	$("#password3").parent().removeClass("has-success").addClass("has-error");
    	// }
    }

    $scope.logout_func = function(){
       	sessionStorage.clear()
       	sessionStorage.setItem("user_login", "false");
       	user_login = sessionStorage.getItem("user_login");

       	room_design('squareRoom');
        $scope.visible('product');
        FB.getLoginStatus(function(response){
        	if(response.status === "connected"){
        		FB.logout();
        	}
        })

        signOut();

    }

    $scope.starting_pt_click = function(){
    	if(user_login == "true"){
    		$("#start_options").modal("show");
    	}
    	else{
    		$("#login_modal").modal("show");
    		flowPath = 1;

    	}
    }

    $scope.angucomplete_drop = function(elem){
    	var selector = elem + " *";
    	if(!$(elem + "_dropdown").is(":visible")){
    		$scope.$broadcast('angucomplete-alt:clearInput', elem.substring(1));
    		$(selector).each(function(){
	    		$(this).focus();
	    	})
    	}
    	
    }

    $scope.dashboard_data = function(data){
    	$rootScope.design = false;
	  	$rootScope.wishlist = false;
	  	$rootScope.shortlist = false;
	  	$rootScope.order = false;
	  	$rootScope.profile_info = false;
	  	$rootScope.profile_password = false;
	  	$rootScope.profile_address = false;


	  	$("#dashboard-panel li").each(function(){
	  		$(this).removeClass("active");
	  	})

	  	if(data == "design"){
	  		$rootScope.design = true;
	  		$("#design").addClass("active");
	  	}
	  	else if(data == "wishlist"){
	  		$rootScope.wishlist = true;
	  		$("#wishlist").addClass("active");
	  	}
	  	else if(data == "shortlist"){
	  		$rootScope.shortlist = true;
	  		$("#shortlist").addClass("active");
	  	}
	  	else if(data == "order"){
	  		$rootScope.order = true;
	  		$("#order").addClass("active");
	  	}
	  	else if(data == "profile_info"){
	  		$rootScope.profile_info = true;
	  		$("#profile_info").addClass("active");
	  	}
	  	else if(data == "profile_password"){
	  		$rootScope.profile_password = true;
	  		$("#profile_password").addClass("active");
	  	}
	  	else if(data == "profile_address"){
	  		$rootScope.profile_address = true;
	  		$("#profile_address").addClass("active");
	  	}
    }

    $scope.addToWishlist = function($event){
    	// $event.target.parentElement.innerHTML = "";
    	if($event.target.nodeName != "DIV"){
	    	if($event.target.parentElement.innerHTML == '<i class="fa fa-heart-o"></i>'){
	    		$event.target.parentElement.innerHTML = '<i class="fa fa-heart"></i>';
	    	}
	    	else{
	    		$event.target.parentElement.innerHTML = '<i class="fa fa-heart-o"></i>';
	    	}
	    }
    	$event.stopPropagation();
    }

    $scope.design_consult = function(){
    	if(user_login == "true"){
    		$("#design_consultation").modal("show");
    	}
    	else{
    		flowPath = 3;
    		$("#login_modal").modal("show");
    	}
    }

    $scope.book_consult = function(){
    	var fname = $('#design_firstName').val();
    	var lname = $('#design_lastName').val();
    	var phone = $('#design_phone').val();
    	var email = $('#design_email').val();
    	if(fname == "") {
    		$("#design_firstName").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(lname == "") {
    		$("#design_lastName").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(phone == "") {
    		$("#design_phone").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(email == "") {
    		$("#design_email").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	$("#design_consultation").modal("hide");
    	$.snackbar({content: "Consultation Booked"});
    }

	// $rootScope.onSignIn = function(googleUser){
 //       	var profile = googleUser.getBasicProfile();
	//   	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	//   	console.log('Name: ' + profile.getName());
	//   	console.log('Image URL: ' + profile.getImageUrl());
	//   	console.log('Email: ' + profile.getEmail());

 //  	}

 //  	$rootScope.signOut = function(){
	//     var auth2 = gapi.auth2.getAuthInstance();
	//     auth2.signOut().then(function () {
	//       	console.log('User signed out.');
	//     });
	// }

});
