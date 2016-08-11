window.onload = function() { 
//Our model
    var cats = [{
            name: "Tom",
            pic: "img/cat1.jpg",
            clicks: 0
        },

        {
            name: "Jane",
            pic: "img/cat2.jpg",
            clicks: 0
        },

        {
            name: "Cleo",
            pic: "img/cat3.jpg",
            clicks: 0
        },

        {
            name: "Sam",
            pic: "img/cat4.jpg",
            clicks: 0
        },

        {
            name: "Kitty",
            pic: "img/cat5.jpg",
            clicks: 0
        }
    ];

    var Cat = function (data) {
        this.clickCount = ko.observable(data.clicks);
        this.name = ko.observable(data.name);
        this.imgSrc = ko.observable(data.pic);
    };


    var ViewModel = function () {
        var self = this;
        this.catList = ko.observableArray([]);

        cats.forEach(function(key) {
            self.catList.push( new Cat (key) );
        });

        this.currentCat = ko.observable(this.catList[0]);

        self.incrementCounter = function() {
            self.currentCat().clickCount(self.currentCat().clickCount() + 1);
        };

        self.showCat = function (clickedCat) {
            self.currentCat(clickedCat);
        };
    };



    ko.applyBindings( new ViewModel() );

};