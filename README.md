# project_design
Photo&amp;Video-sharing Social Network APP -  UI &amp; 

User Story Point Scale: 1 point = 8 hours/person

Figma UI: https://www.figma.com/file/p2u4b7FHO5W7OtodvFqyIc/HW1-Wireframe-%26-Prototype?node-id=0%3A1

RESTful API on Swaggerhub: https://app.swaggerhub.com/apis/offersoverflow/OfferOverflow_Penngram/1.0.0

RESTful API Documentation: https://app.swaggerhub.com/apis-docs/offersoverflow/OfferOverflow_Penngram/1.0.0

# HW2 grading instructions:
git clone:
cd to client
npm install --force

frontend (one terminal window)
cd to client
npm start

mocking backend (another terminal window)
cd to json_server
json-server --watch db.json --port 8080

The navbar on the top is only for grading and development purposes. will be removed in the final versions.

reigster
login
- use your account (username/password)
- or use one of those: dog, pig, curry, obama, elon, trump
search
- try one of these usernames:
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

