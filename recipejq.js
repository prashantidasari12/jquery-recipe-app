$(document).ready(function(){
	var container = $("#recipie-box");    //getting id for main container for recipes
	var individualRecipeContainer = $('#individualRecipeContainer');
	var counter = 0;
	var recipeContainer;
	if (container) {
		$.ajax({
			type:'GET',
			dataType: 'jsonp',
			url:"http:localhost:3000/recipes",
			success:function(data){
				var recipeData = data;
				creatingRecipes(recipeData);	//call function to create list of recipes	
			}
		});
	}
	if (individualRecipeContainer) {
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
	}
	
	
	function creatingRecipes(recipeData){
		localStorage.removeItem("recipeContentId");

		var i;
		
		for(i = 0;i < recipeData.length; i++ ){
			recipeContainer = $("<div></div>");   //creating div element for recipe box
			recipeContainer.click({'id':recipeData[i].id}, function(e){
				navigateToIndividualRecipes(e);
			});
			recipeContainer.attr({
				"id":"image-box1",
				"class":"recipe-name",
				"style":"background:"+ recipeData[i].background
			});
			container.append(recipeContainer);  //putting div element in container
			//recipeContainer.click(navigateToIndividualRecipes());
			
			var imageTag = $("<img/>");  // creating img element for recipe cover image
			imageTag.attr({
				"src":"./images/"+ recipeData[i].images[0],
				"width":"100%",
				"height":"65%",
				"class":"figure-img firecipie-detail"
				});
			recipeContainer.append(imageTag); // placing the image in div element


			var chefImage = $("<img/>"); // creating image element for chef image
			chefImage.attr({
				"src":"./images/"+ recipeData[i].chef.avatar,
				"class":"img-circle custom-position"
			});
			recipeContainer.append(chefImage); //placing the image in div element


			var titleContainer = $("<div></div>"); // creating another div element for recipe title
			titleContainer.attr({
				"class":"titleDiv"
			});
			recipeContainer.append(titleContainer); // placing the div with recipeContainer div


			var recipeTitleElement = $("<p></p>"); // creating the p element for recipe title
			recipeTitleElement.text(recipeData[i].title);
			recipeTitleElement.attr({
				"class":"marginAdjustment"
			});
			titleContainer.append(recipeTitleElement); //placing the title in the titleContainer div


			for(var j = 0; j < 4; j++){             // for loop for star rating
				var starRating = $("<i></i>");		// creating i element for star symbol
				starRating.attr({
					"class":"glyphicon glyphicon-star starPosition"
				});
				titleContainer.append(starRating);  //placing the rating in the titleContainer div
			}


			var bookmarkSymbol = $("<i></i>");    //creating i element for bookmark symbol
				bookmarkSymbol.attr({
					"class":"glyphicon glyphicon-bookmark bookmarkPosition"
				});
				titleContainer.append(bookmarkSymbol);  // placing bookmark symbol in titleContainer div
			counter++;
		}

	}
	function createIndividualRecipe(recipe) {
		console.log("the id is: ",recipe);
	}
	function navigateToIndividualRecipes(event){
		console.log("the id of the clicked element is: ",event.data.id);
		//individualRecipeContent = JSON.stringify(recipeData[id]);
		localStorage.setItem("recipeContentId",event.data.id);
		location.href = 'individualRecipe.html'

	}
	// $.GET('recipes.json').then(function(data){
	// 	console.log("the data is: ",data);
	// });
	// $.get('./recipes.json', function(data) {
	// 	console.log("the data is: ",data);
	// });
	// $.getJSON("recipes.json", function(data) {
	// 	console.log("the data is: ",data);
	// });
});