(function() {
	var app = angular.module('webApp', ['webApp-products']);

	app.controller('WebController', [ '$http', function($http) {
		var webApp = this;
		//Grabs all the data from json object
		webApp.products = [];
		$http.get('products.json').success(function(data){
			webApp.products=data;
		});
	}]);

	app.controller('GalleryController', function() {
		//Used to display all the images, not currently working
		this.current = 0;
		this.setCurrent = function(newGallery) {
			this.current = newGallery || 0;
		};
	});

	app.controller('ReviewController', function() {
		//This is used to display and control the reviews being added
		this.review = {};
		this.addReview = function(product) {
			product.reviews.push(this.review);
			this.review = {};
		};
	});


})();