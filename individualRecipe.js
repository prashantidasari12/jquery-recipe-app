$(document).ready(function(){
	var contentId = localStorage.getItem('recipeContentId')
	$.ajax({
		type:'GET',
		dataType: 'jsonp',
		url:"http:localhost:3000/recipes/"+contentId,
		success:function(data){
			var recipeData = data;
			createIndividualRecipe(recipeData);	//call function to create list of recipes	
		}
	});
	
	function createIndividualRecipe(recipe) {
		var recipePage = $("#carouselRide");
		for(var k = 0; k < recipe.images.length; k++){
			// var carouselDiv = $("<div></div>");
			if ( k == 0){
				recipePage.append('<div class="item active"><img src="./images/'+recipe.images[k]+'"></div>');
				// carouselDiv.attr({
				// "class":"item active"
				// });				
				// recipePage.append(carouselDiv);
				// var imageCarousel = $("<img>");
				// imageCarousel.attr({
				// 	"src":"./images/" + recipe.images[k]
				// });
				// carouselDiv.append(imageCarousel);
			} else  {
				recipePage.append('<div class="item"><img src="./images/'+recipe.images[k]+'"></div>');
				// carouselDiv.attr({
				// 	"class":"item"
				// });
				// recipePage.append(carouselDiv);
				// var imageCarousel = $("<img>");
				// imageCarousel.attr({
				// 	"src":"./images/"+ recipe.images[k] 
				// });
				// carouselDiv.append(imageCarousel);
			}
		};
		var chefImage = $(".chefImage");
		chefImage.attr({
			"src":"./images/"+ recipe.chef.avatar
		});
		$("#recipeTitle").text(recipe.title);
		$("#chefName").text(recipe.chef.firstName + " " + recipe.chef.lastName);
		$("#chefType").text(recipe.chef.chefType);
	    $("#recipeDescription").text(recipe.description);
	    for(var l = 0; l < recipe.ingredients.length; l++){
	    	var ingredientsList = $("#ingredientList");
	    	var listItem = $("<li>"+recipe.ingredients[l]+ "</li>");
	    	//listItem.text(recipe.ingredients[l]);
	    	ingredientsList.append(listItem);
	    }
	    for(var m = 0; m < recipe.directions.length; m++){
	    	var cookingDirection = $("#cookingDirectionList");
	    	var directionList = $("<li>" +recipe.directions[m]+ "</li>");
	    	//directionList.html(recipe.directions[m]);
	    	cookingDirection.append(directionList);
	    }
	}
});
