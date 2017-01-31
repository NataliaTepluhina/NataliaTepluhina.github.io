(function() {

    angular
        .module('storeApp')
        .controller('StoreController', StoreController);

    StoreController.$inject = ['$sessionStorage'];

    function StoreController($sessionStorage) {
        this.storage = $sessionStorage;

        //Array of pizzas in stock
        this.pizzas = [
            {
                name: 'Margherita',
                cover: 'img/margarita.jpg',
                price: 5.1,
                amount: 1
            },

            {
                name: 'Margherita Chile',
                cover: 'img/margarita-chili.jpg',
                price: 5.2,
                amount: 1
            },

            {
                name: 'Hawaii',
                cover: 'img/gavayskaya.jpg',
                price: 7.15,
                amount: 1
            },

            {
                name: 'Havana',
                cover: 'img/gavana.jpg',
                price: 5.85,
                amount: 1
            },

            {
                name: 'Hunter',
                cover: 'img/hunter.jpg',
                price: 6.8,
                amount: 1
            },

            {
                name: 'Jamaica',
                cover: 'img/jamaica.jpg',
                price: 6.9,
                amount: 1
            },

            {
                name: 'Munich',
                cover: 'img/munich.jpg',
                price: 6.5,
                amount: 1
            },

            {
                name: 'Nicosian',
                cover: 'img/nicosya.jpg',
                price: 6.5,
                amount: 1
            },

            {
                name: 'Pepperoni',
                cover: 'img/pepperoni.jpg',
                price: 5.8,
                amount: 1
            },

            {
                name: 'Picante',
                cover: 'img/picante.jpg',
                price: 6.15,
                amount: 1
            },

            {
                name: 'Student',
                cover: 'img/student.jpg',
                price: 5.35,
                amount: 1
            },

            {
                name: 'Vegan',
                cover: 'img/vega.jpg',
                price: 5.2,
                amount: 1
            }
        ];

        this.updateStorage = function () {
            this.storage.basket = this.basket;
            this.storage.amount = this.amount;
            this.storage.cost = this.cost;
        };


        if(this.storage.basket) {
            this.basket = this.storage.basket;
            this.cost = this.storage.cost;
            this.amount = this.storage.amount;
        }
        else {
            this.basket = []; //array of pizzas user added to shopping cart
            this.cost = 0; //total cost of added pizzas
            this.amount = 0; //total pizzas amount
            this.showCart = false; //visibility of shopping cart div while user doesn't buy any pizza
        }

        this.addToBasket = function(item) {
            if(this.basket.length > 0 && (this.basket.indexOf(item) != -1)) {
                this.basket[this.basket.indexOf(item)].amount ++;
            }
            else {
                this.basket.push(item);
            }
            this.title = item.name; //show name of last added pizza
            this.cost += item.price; //show total cost
            this.amount ++;
            this.showCart = true;

            this.updateStorage();
        };

        this.removeItem = function(item) {
            this.amount -= item.amount;
            this.cost -= item.amount*item.price;
            this.basket.splice(this.basket.indexOf(item),1);

            this.updateStorage();
        };

        this.changeAmount = function (item, increment) {
            item.amount += increment;
            this.amount += increment;
            this.cost += item.price*increment;
            if (item.amount === 0) {
                this.removeItem(item);
            }

            this.updateStorage();
        }


    }
})();