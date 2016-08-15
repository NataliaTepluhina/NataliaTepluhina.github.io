/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed in the allFeeds object and 
         * ensures it has a URL defined and that the URL is not empty.
         */
         it('have an URL', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
         });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        }); 

    });


    describe('The menu', function() {

        /* Ensures the menu element is hidden by default.
         */
        it ('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes visibility when the menu icon 
        * is clicked.
        */

        //We perform two clicks imitation and check the body class after each one
        it('changes visibility when menu icon is clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {

        /* Ensures when the loadFeed function is called and completes its work, 
         * there is at least single .entry element within the .feed container.
         */

        //Perform loadFeed function asynchronously
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //Check if there are an .entry elements insine .feed div
        it('have at least a single .entry element', function (done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    describe('Initial Entries', function() {

        /* Ensures when a new feed is loaded by the loadFeed function 
         * that the content actually changes.
         */

        //First declare two variables for two different feeds
        var firstFeed;
        var secondFeed;

       
        beforeEach(function(done) {
             //Now we make firstFeed equal the feed text when the initial feed is loaded
            loadFeed(0, function() {
                firstFeed = $('.feed').children().text();

                //Loading new feed other than initial
                loadFeed(1, function() {
                    secondFeed = $('.feed').children().text();
                    done();
                });
            });


        });

        it('new feed is loaded and the content changes', function(done) {

            //Check if secondFeed isn't empty or undefined
            expect(secondFeed).toBeTruthy();
 
            //Check if our feeds are ont equal each other
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });     
}());
