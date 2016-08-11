window.onload = function() {

    var catLinks = document.getElementsByClassName('catlink');
    var picture = document.getElementById('pic');
    var name = document.getElementById('name');
    var number = document.getElementById('number');
    var clicks = document.getElementById('clicks');
    var flag;


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

//First view - left sidebar with links
    var viewLinks = {
        render: function () {
            for (var i = 0; i < catLinks.length; i++) {
                octopus.insertLinks(i);
            }
        },

        show: function () {
            for (var i = 0; i < catLinks.length; i++) {
                catLinks[i].addEventListener('click', (function (copy) {
                    return function () {
                        event.preventDefault();
                        octopus.showCat(copy);
                    };
                })(i));
            }
        }
    };

//Second view - cat view Area
    var viewCat = {
        countClicks: function () {
            picture.addEventListener('click', function() {
                octopus.increaseClicks();
            });
        }
    };

//Third view - admin panel

    var viewAdmin = {
        init: function () {
            this.admin = document.getElementById('admin');
            this.panel = document.getElementById('adminarea');
            this.adminname = document.getElementById('adminname');
            this.adminpic = document.getElementById('adminpic');
            this.adminclicks = document.getElementById('adminclicks');
            this.save = document.getElementById('save');
            this.cancel = document.getElementById('cancel');
            admin.addEventListener('click', function () {
                if (viewAdmin.panel.style.display === '') {
                    viewAdmin.panel.style.display = 'block';
                    octopus.getCatData();

                }
                else {
                    viewAdmin.panel.style.display = '';
                }
            });
        },

        canc: function () {
            cancel.addEventListener('click', function () {
                viewAdmin.panel.style.display = '';
            });
        },

        safe: function () {
            save.addEventListener ('click', function () {
                octopus.setCatData();
                viewAdmin.panel.style.display = '';
            });
        }
    };

//Our Octopus
    var octopus = {
        insertLinks: function (i) {
            catLinks[i].href = cats[i].pic;
            catLinks[i].innerHTML = cats[i].name;
        },

        showCat: function (copy) {
            name.innerHTML = cats[copy].name;
            picture.src = cats[copy].pic;
            picture.style.display = 'block';
            clicks.style.display = 'block';
            number.innerHTML = cats[copy].clicks;
            flag = copy;
        },

        increaseClicks: function () {
            cats[flag].clicks++;
            number.innerHTML = cats[flag].clicks;
        },

        getCatData: function () {
            viewAdmin.adminname.value = cats[flag].name;
            viewAdmin.adminpic.value = cats[flag].pic;
            viewAdmin.adminclicks.value = cats[flag].clicks;
        },

        setCatData: function () {
            cats[flag].name = viewAdmin.adminname.value;
            cats[flag].pic = viewAdmin.adminpic.value;
            cats[flag].clicks = viewAdmin.adminclicks.value;
            this.showCat(flag);
        },

        init: function() {
            viewLinks.render();
            viewAdmin.init();
            viewAdmin.canc();
            viewAdmin.safe();
            viewLinks.show();
            viewCat.countClicks();
        }
    };

octopus.init();

};

