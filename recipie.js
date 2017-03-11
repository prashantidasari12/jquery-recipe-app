dvar jason = JSON.parse(JSON.stringify(recipes));
var i;
var text="";
var counter = 0;
var individualRecipeContent = "";
//getting id of main container for recipes
var container = document.getElementById("recipie-box");
var individualRecipeContainer = document.getElementById('individualRecipeContainer');
if (container != null) {
	for(i = 0; i < jason.length; i++){
		//creating each recipe container
		var recipeContainer = document.createElement("div");
		recipeContainer.setAttribute("style","background:"+jason[i].background);	
		recipeContainer.setAttribute("id","image-box1");
		recipeContainer.setAttribute("class","recipie-name");
		recipeContainer.setAttribute("onclick","navigateToIndividualRecipe("+counter+")");
		container.appendChild(recipeContainer);		//appending recipes container to main container

		//creating image element for recipe container
		var imageTag = document.createElement("img");
		imageTag.setAttribute("src", "./images/"+jason[i].images[0]);
		imageTag.setAttribute("width","100%");
		imageTag.setAttribute("height","65%");
		imageTag.setAttribute("class","figure-img firecipie-detail");
		recipeContainer.appendChild(imageTag);			//appending image to recipes contianer


		var imageTag1 = document.createElement("img");
		imageTag1.setAttribute("src", "./images/"+jason[i].chef.avatar);
		imageTag1.setAttribute("class","img-circle custom-position");
		recipeContainer.appendChild(imageTag1);

		//creating a div element for title

		var titleContainer = document.createElement("div");
		//titleContainer.setAttribute("style","background:"+jason[i].background);
		titleContainer.setAttribute("class","titleDiv");
		recipeContainer.appendChild(titleContainer);
		
		//creating paragraph element for recipe title
		var recipeTitleElement = document.createElement("p");
		titleContainer.appendChild(recipeTitleElement);		//appending p element to recipe container
		recipeTitleElement.innerHTML = jason[i].title;
		//var recipeTitle = document.createTextNode(jason[i].title);
		//recipeTitleElement.appendChild(recipeTitle);			//appending to recipe title

		//creating rating elements
		for(var j =0; j < 4; j++){
			var starRating = document.createElement("i");
			starRating.setAttribute("class","glyphicon glyphicon-star star-position");
			titleContainer.appendChild(starRating);
		}

		//creating bookmark element
		var bookmarkSymbol = document.createElement("i");
		bookmarkSymbol.setAttribute("class","glyphicon glyphicon-bookmark bookmark-position");
		titleContainer.appendChild(bookmarkSymbol);
		counter++;
	};
}
else if (individualRecipeContainer != null) {
	individualRecipeContent = localStorage.getItem("recipeContent");
	individualRecipeContent = JSON.parse(localStorage.getItem("recipeContent"));
	console.log("the final data is: ",individualRecipeContent);
	for(var k = 0; k < individualRecipeContent.images.length; k++) {
		var recipePage = document.getElementById("carouselRide");

		var carouselDiv = document.createElement("div");
		document.getElementsByClassName("chefImage")[0].setAttribute("src","./images/"+ individualRecipeContent.chef.avatar);

		
		if(k == 0){
			carouselDiv.setAttribute("class","item active");
			recipePage.appendChild(carouselDiv);
			var imageCarousel = document.createElement("img");
			imageCarousel.setAttribute("src","./images/" + individualRecipeContent.images[k]);
			carouselDiv.appendChild(imageCarousel);
		} else {
			carouselDiv.setAttribute("class","item");
			recipePage.appendChild(carouselDiv);
			var imageCarousel = document.createElement("img");
			imageCarousel.setAttribute("src","./images/" + individualRecipeContent.images[k]);
			carouselDiv.appendChild(imageCarousel);
		}
	};
	
	document.getElementById('recipeTitle').innerHTML =  individualRecipeContent.title;
	document.getElementById("chefName").innerHTML = individualRecipeContent.chef.firstName + " " + individualRecipeContent.chef.lastName;
	document.getElementById("chefType").innerHTML = "(" + individualRecipeContent.chef.chefType + ")";
	document.getElementById("recipeDescription").innerHTML = individualRecipeContent.description;

	for(var l = 0; l < individualRecipeContent.ingredients.length; l++) {
		var ingredientList = document.getElementById("ingredientList");
		var listItems = document.createElement("li");
		listItems.innerHTML = individualRecipeContent.ingredients[l];
		ingredientList.appendChild(listItems);
	}
	for(var m = 0; m < individualRecipeContent.directions.length; m++){
		var cookingDirectionList = document.getElementById("cookingDirectionList");
		var listDirection = document.createElement("li");
		listDirection.innerHTML = individualRecipeContent.directions[m];
		cookingDirectionList.appendChild(listDirection);
	}

	document.getElementById("individualRecipeContainer").setAttribute("style","background:" + individualRecipeContent.background);
	console.log("the individualRecipeContent is: ",individualRecipeContent);
}
function navigateToIndividualRecipe(id) {
	individualRecipeContent = JSON.stringify(jason[id]);
	localStorage.setItem("recipeContent", individualRecipeContent);
	location.href = 'individualRecipe.html';
}

