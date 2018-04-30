const friends = require("../data/friends");
const path = require("path");


module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // Code to find best match

        // Initialize array to hold comparison results
        let smallest = 10000000;
        let bestFriend;

        //For loop through each friend in friends
        for (let i = 0; i < friends.length; i++) {
            // Array to total the differences in scores for potential matches
            let compArray = [];

            for (let j = 0; j < friends[i].scores.length; j++) {
                compArray.push(Math.abs(friends[i].scores[j] - req.body.scores[j]));

            }
            let matchScore = compArray.reduce((a, b) => a + b, 0);

            if (matchScore < smallest) {
                smallest = matchScore;
                bestFriend = friends[i];
            }
        }

        // Return best match to client
        res.json(bestFriend);

        // Add current user to friendsArray
        friends.push(req.body);
    });

}