// Code goes here

(function () {
    var app = angular.module('gemStore', ['store-directives']);

    app.controller('GalleryController', function () {
        this.imageIndex = 0;
        this.setCurrent = function (imageNumber) {
            console.log(imageNumber);
            this.imageIndex = imageNumber || 0;
        };
    });

    app.controller('StoreController', function ($scope, $http) {
        var store = this;
        store.products = [];
        $http.get(
           'api/store/items'
        ).success(function (data, status, headers, config) {
            store.products = data; // gems
        });
    });


    app.controller("ReviewController", function ($scope, $http) {

        this.review = {};

        this.addReview = function (product) {
            this.review.createdOn = Date.now();
            product.reviews.push(this.review);
            $http.post('api/store/item/' + product._id + '/addReview', this.review);
            this.review = {};
        };

    });

})();
