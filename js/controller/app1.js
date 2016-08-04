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
var app = angular.module('myApp', []);
var flowPath;

app.controller('myCtrl', function ($scope, $http) {
  	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  	$scope.floorplan = false;
  	$scope.product = true;
  	$scope.description = false;

  	$scope.visible = function(page){
  		user_login = sessionStorage.getItem("user_login");
  		if(user_login == "true") {
  			var tmpStr = '<div class="list-group hidden-xs hidden-sm" id = "user_info">\n\
						 	<div class="list-group-item" id="account1" style = "cursor:pointer;" onclick = "account1_click()">\n\
						    	<div class="row-picture pull-right" style = "padding-right:0;">\n\
						      		<img class="circle" src="images/user-shape.svg">\n\
						    	</div>\n\
						    	<div class="row-content pull-right" style="margin: 10px;padding-right:10px;">\n\
						      		<h4 class="list-group-item-heading" style = "transform:translateY(50%)">Aniruddh</h4>\n\
						    	</div>\n\
						  	</div>\n\
						</div>'
			$("#user_info").replaceWith(tmpStr);
			$("#dropdown3")[0].style.display = "block";
			$("#dropdown4")[0].style.display = "none";

  			if(page == "floorplan"){
	  			$scope.floorplan = true;
	  			room_design('squareRoom');
	  			$scope.product = false;
	  			$scope.description = false;
	  		} 
	  		else if(page == "product"){
	  			$scope.floorplan = false;
	  			$scope.product = true;
	  			$scope.description = false;
	  		}	
	  		else if(page == "description"){
	  			$scope.floorplan = false;
	  			$scope.product = false;
	  			$scope.description = true;
	  		}
  		} 
  		else if(user_login == "false") {
  			var tmpStr = '<div class="list-group hidden-xs hidden-sm" id = "user_info">\n\
						 	<div class="list-group-item" id="account2" style = "cursor:pointer;" onclick="account2_click()">\n\
						    	<div class="row-picture pull-right" style = "padding-right:0;">\n\
						      		<img class="circle" src="images/user-shape.svg">\n\
						    	</div>\n\
						    	<div class="row-content pull-right" style="margin: 10px;padding-right:10px;">\n\
						      		<h4 class="list-group-item-heading" style = "transform:translateY(50%)">Login/Signup</h4>\n\
						    	</div>\n\
						  	</div>\n\
						</div>'
			$("#user_info").replaceWith(tmpStr);
			$("#dropdown3")[0].style.display = "none";
			$("#dropdown4")[0].style.display = "block";

  			if(page == "floorplan"){
	  			$("#login_modal").modal("show");
  				flowPath = 1;
	  		} 
	  		else if(page == "product"){
	  			$scope.floorplan = false;
	  			$scope.product = true;
	  			$scope.description = false;
	  		}	
	  		else if(page == "description"){
	  			$scope.floorplan = false;
	  			$scope.product = false;
	  			$scope.description = true;
	  		}
  		} 

  		$('#start_options').modal("hide");
  		$("#account_dropdown").slideUp();
  		
  	};
  	$scope.login_func = function(){
		if($("#email1").val() != undefined && $("#email1").val() != null && $("#email1").val() != "" &&
			$("#password1").val() != undefined && $("#password1").val() != null && $("#password1").val() !=""){

			if(typeof(Storage) !== "undefined"){
                sessionStorage.setItem("user_login","true");
          
            } else {
                alert("SessionStorage Not Supported");
            }

           if(flowPath == 1) {
				$scope.visible("floorplan");
				$('#login_modal').modal("hide");
			} else if(flowPath == 2) {
				$scope.visible("product");
				$('#login_modal').modal("hide");
			}
			
		}

		else{
			if($("#email1").val() == undefined || $("#email1").val() == null || $("#email1").val() == "" ){
				$("#email1").parent().removeClass("has-success").addClass("has-error");
			}

			if($("#password1").val() == undefined || $("#password1").val() == null || $("#password1").val() ==""){
				$("#password1").parent().removeClass("has-success").addClass("has-error");
			}
		}
  	}

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

    $scope.signup_func = function(){
    	var name = $('#name').val();
    	var email = $('#email2').val();
    	var password = $('#password2').val();
    	var password_confirm = $('#password3').val();
    	if(name == "") {
    		$("#name").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(email == "") {
    		$("#email2").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(password == "") {
    		$("#password2").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(password_confirm == "") {
    		$("#password3").parent().removeClass("has-success").addClass("has-error");
    		return;
    	}
    	if(password == password_confirm) {
    		//take the sha512 of password before sending to server
    		//api call for user signup
    		$('#login').addClass("active"); 
    		$('#signup').removeClass("active");
    		$('#login_tab').parent().addClass("active"); 
    		$('#signup_tab').parent().removeClass("active");

    	} else {
    		$("#password2").parent().removeClass("has-success").addClass("has-error");
    		$("#password3").parent().removeClass("has-success").addClass("has-error");
    	}
    }

    $scope.logout_func = function(){
       	sessionStorage.clear()
       	sessionStorage.setItem("user_login", "false");
        $scope.visible('product');
    }

});
