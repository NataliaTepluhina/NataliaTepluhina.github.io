//TODO: 3) Add conponent filters to the page


(function() {

        angular
            .module('storeApp')
            .controller('StoreController', StoreController);

        StoreController.$inject = ['$sessionStorage', 'GetPizzas', '$scope'];

        function StoreController($sessionStorage, GetPizzas, $scope) {
            var that = this;

            this.storage = $sessionStorage;
            
            GetPizzas.async().then(function () {
                that.pizzas = GetPizzas.data();

                that.components = [];
                that.pizzas.forEach(function (element) {
                    element.price = parseFloat(element.price);
                    element.amount = 1;
                    for (var i = 0; i < element.components.length; i++) {
                        if (that.components.indexOf(element.components[i]) === -1) {
                            that.components.push(element.components[i]);
                        }
                    }
                });
            });



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
                console.log(this.basket);
                this.updateStorage();
            };

            this.removeItem = function(item) {
                this.amount -= item.amount;
                this.cost -= item.amount*item.price;
                item.amount = 1;
                this.basket.splice(this.basket.indexOf(item),1);
                console.log(this.basket);
                this.updateStorage();
            };

            this.changeAmount = function (item, increment) {
                item.amount += increment;
                this.amount += increment;
                this.cost += item.price*increment;
                if (item.amount === 0) {
                    this.basket.splice(this.basket.indexOf(item),1);
                    item.amount ++;
                }
                console.log(this.basket);
                this.updateStorage();
            }

            this.chooseComponent = function(component) {
                return component;
            }


    }
})();