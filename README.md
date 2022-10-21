# project_design
Photo&amp;Video-sharing Social Network APP -  UI &amp; 

User Story Point Scale: 1 point = 8 hours/person

Figma UI: https://www.figma.com/file/p2u4b7FHO5W7OtodvFqyIc/HW1-Wireframe-%26-Prototype?node-id=0%3A1

RESTful API on Swaggerhub: https://app.swaggerhub.com/apis/offersoverflow/OfferOverflow_Penngram/1.0.0

RESTful API Documentation: https://app.swaggerhub.com/apis-docs/offersoverflow/OfferOverflow_Penngram/1.0.0

# HW2 grading instruction command lines:

      Step 1 -- install react packages: 
                                      0. open terminal window 1 and run following commands:
                                      1. **"git clone <our repo url>"**
                                      2. **"cd .../project---design-hw1-team_offersoverflow/bestapp666/client" **
                                      3. **"npm install --force"**
                                       
      Step 2 -- start front end app:  
                                      0. In terminal window 1, run following commands:
                                      1. **"npm start"**
                                      
      Step 3 -- start mocking back end:  
                                      0. open another terminal window 2 and run following commands:
                                      1. **"cd .../project---design-hw1-team_offersoverflow/bestapp666/client/json_server" **
                                      2. **"json-server --watch db.json --port 8080"**
                               
      Step 4 -- testing the mini app:  
                                      0. open the browser in step 2 with url: **"http://localhost:3000/"**
                                      1. Start playing around this app to your hearts content! 
                                      2. There are following **notice points** for each features.
                                                (eg. the current registered users in our db.json file)

**Notice:** The navbar on the top is only for grading and development purposes. will be removed in the final versions.

reigster
login
- use your account (username/password)
- or use one of those: dog, pig, curry, obama, elon, trump
search
- try one of these usernames: dog, pig, curry, obama, elon, trump

follow/unfollow
try followers/followings
upload a post
browse feed
try update followings and check back feed

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

