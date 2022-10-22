# project_design
Photo&amp;Video-sharing Social Network APP -  UI & Frontend; 

User Story Point Scale: 1 point = 8 hours/person

Figma UI: https://www.figma.com/file/p2u4b7FHO5W7OtodvFqyIc/HW1-Wireframe-%26-Prototype?node-id=0%3A1

RESTful API on Swaggerhub: https://app.swaggerhub.com/apis/offersoverflow/OfferOverflow_Penngram/1.0.0

RESTful API Documentation: https://app.swaggerhub.com/apis-docs/offersoverflow/OfferOverflow_Penngram/1.0.0

# HW2 grading instructions with command lines:

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
      Step 5 -- Try the required features: 
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

# Progress:
HW1: Architecture Design (Completed)

HW2: Implementation (View) & UI Testing. 

PDF instruction: https://static.us.edusercontent.com/files/4b4xtthdOb9R50f31q9THOFb
due date: Oct 21 at 11:59 pm on Gradescope
       
       Sprint 1: Translate your wireframes into static react components. 
              Create and validate your CSS files. At the end of the sprint, 
              you should have all your react components (for hw2) ready.

       Sprint 2: Make the components interactive by adding states (redux) 
              and events handlers and start UI testing. You should be able to register, login, 
              and create a post at the end of this sprint with all the information only stored locally.

       Sprint 3: Implement backend communication by implementing the endpoints
              listed in your SwaggerHub document. Mock the backend to get preconfigured 
              responses and complete UI testing.

