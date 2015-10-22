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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a url defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // select current feed
                var feed = allFeeds[i];
                // ensure the url is defined
                expect(feed.url).toBeDefined();
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // select current feed
                var feed = allFeeds[i];
                // ensure name is defined
                expect(feed.name).toBeDefined();
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("should be Initially hidden", function() {
            // chech if menu is hidden
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("should become visible when menu button is clicked", function() {
            // select menu link
            var menuLink = document.getElementsByClassName("menu-icon-link")[0];
            // simulate click event
            menuLink.click();
            // See check if menu is visible
            expect(document.body.classList.contains("menu-hidden")).toBe(false);
            // Hide Menu Again
            menuLink.click();
            // Check if Menu Hides Again
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            //load the second feed
            loadFeed(0, function() {
                //invoe callback
                done();
            });
        });
        // when load feed is done
        it("should load feed", function(done) {
            // find the list of entries in the feed
            var entries = document.getElementsByClassName("entry");
            // check if feed has at least 1 entry
            expect(entries.length).not.toBe(0);
            // finish
            done();
        });
    });
    describe("New Feed Selection", function() {
        /* TODO: Write a new test suite named "New Feed Selection"

            /* TODO: Write a test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */
        // small utility for selecting random feed
        var randomFeedIndex = 0;
        // returns a randomly selected integer
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        beforeEach(function(done) {
            // select a random index
            randomFeedIndex = getRandomInt(0, allFeeds.length);
            // load the random feed
            loadFeed(randomFeedIndex, function() {
                // invoke callback
                done();
            });
        });
        it("Should load New Feed", function(done) {
            var headerTitle = document.getElementsByClassName("header-title")[0];
            // ensure the title updates appropriately
            expect(headerTitle.innerHTML).toBe(allFeeds[randomFeedIndex].name);
            // call done
            done();
            // load default feed again
            loadFeed(0, null);
        });
    });
}());