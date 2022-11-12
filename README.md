GitHub Repo: https://github.com/cis557/project---design-hw1-team_offersoverflow

Grading Setup:

      Step 1 -- install react packages: 
                                      1. open terminal window 1 and run following commands:
                                      2. "git clone <our repo url>"
                                      3. "cd .../project---design-hw1-team_offersoverflow/bestapp666/client" 
                                      4. "npm install --force"
                                       
      Step 2 -- start frontend app:  
                                      1. In terminal window 1, run following commands:
                                      2. "npm start"
                                      
      Step 3 -- start mocking backend:  
                                      1. open another terminal window 2 and run following commands:
                                      2. "cd .../project---design-hw1-team_offersoverflow/bestapp666/client/json_server" 
                                      3. "json-server --watch db.json --port 8080"
                               
      Step 4 -- testing the mini app:  
                                      1. open the browser in step 2 with url: "http://localhost:3000/"
                                      2. Start playing around this app to your hearts content! 
                                      3. There are following **notice points** for each features.
                                                (eg. the current registered users in our db.json file)
                                                
# Progress:

# HW3: Implementation (View) & Unit Testing (Completed)
PDF instruction: https://github.com/cis557/project---design-hw1-team_offersoverflow/blob/main/Project%20-%20HW3.pdf

***HW3 Demo: https://drive.google.com/file/d/1CK2IBO49mhrhXFM6HybLWf3il4PG6swY/view?usp=share_link***

HW3 Features:

                                      1. Like & unlike posts on both user pages and feed page
                                          - check the changes on the like list for any action performed
                                      2. Post & edit & delete comments on a post on both user pages and feed page
                                          - check the changes on the comment list for any action performed
                                      3. Edit & delete posts on the logged-in user's page
                                          - try update and delete
                                      4. Follower suggestions
                                          - Two users are following the same 3 users, they will appear in follower suggestions
                                      5. Mention another user in comments
                                          - click the @ to direct to the user page.

# HW2: Implementation (View) & UI Testing (Completed)
PDF instruction: https://github.com/cis557/project---design-hw1-team_offersoverflow/blob/main/Project%20-%20HW2.pdf

HW2 Features:

                                      1. User Reigstration
                                          - use an online media link for avatar
                                      2. Login/Auth
                                          - use your registered account (username/password)
                                          - or use one of those: curry, obama, elon (find the usernames and passwords from the db.json file)
                                          - try non-existing usernames or wrong password
                                      4. User Profile Page
                                          - view your followers/followings 
                                          - view your posts
                                          - upload a post
                                      5. Create a Post
                                          - click profile picture or username on the top right dark nav bar.
                                          - upload a local file or use an online media link, add description
                                      6. Activity Feed
                                          - see the most recent posts from each of your followings
                                          - change your followings and see the updates in feed page
                                          - click their profile pictures to visit their profile pages
                                      7. Search/Follow/Unfollow Users
                                          - try to search one of these usernames: dog, pig, curry, obama, elon, trump
                                          - try to search non-existing usernames
                                          - follow/unfollow users and see the updates

**Notice:** The navbar on the top is only for grading and development purposes, and it will be removed in the final version.

# HW1: Architecture Design (Completed)
PDF instruction: https://github.com/cis557/project---design-hw1-team_offersoverflow/blob/main/Project%20-%20HW1.pdf

Photo&amp;Video-sharing Social Network APP -  UI & Frontend; 

User Story Point Scale: 1 point = 8 hours/person

Figma UI: https://www.figma.com/file/p2u4b7FHO5W7OtodvFqyIc/HW1-Wireframe-%26-Prototype?node-id=0%3A1

RESTful API on Swaggerhub: https://app.swaggerhub.com/apis/offersoverflow/OfferOverflow_Penngram/1.0.0

RESTful API Documentation: https://app.swaggerhub.com/apis-docs/offersoverflow/OfferOverflow_Penngram/1.0.0
