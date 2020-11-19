# Event_Registration_App
## Hack Stack 1.0 
### Hackathon Project:
Our Project is the Event Registration app for stackhack1.0 and we built using Node js,Express,MongoDB,Bootstrap and EJS. We had done all the requirements which is mentioned in this hackathon. This project can be used with any other company's website for the registration purposes. The UI will be very flexible,easy to use and responsive.

[Live Demo](https://mm-hacks.herokuapp.com)
# Features:

## On Front End:

    Fields for Data Capture (All fields are mandatory)
        Full Name
        Mobile
        E-Mail
        Upload ID Card (Formats: png, jpeg)
        Registration type : Self/Group/Corporate/Others
        No of Tickets: (If self prepopulate to 1, rest case mandate user to enter)
    Provide a preview Screen which should :
        List all the fields as above.
        Display ID card in the preview.
    On Submission :
        Registration ID has to be generated and displayed on Success Screen.
        Store all the information captured in a local database

(Registration Date is generated as system date and get stored in Database)

## On Back end:

    This Backend should have database bindings to store the event registration info received from the Front End.
    The backend should be able to receive from and render to Front End all the event information, also store in and fetch from the database.
    Submit Screenshot, Source code & Deployment Instructions.

## Extra Features:
    
        Admin Login functionality.
        Display a Chart detailing count of Registration types.
        List all Registrations (Registration No, Date, Name fields should be displayed)
        Hyperlink to view on Click on Registration No
        
## Instructions:
 * Download and extract the zip file.
 * Then cd Project/ on the terminal. 
 * Run the command npm install. 
 * Run the mongoDB server. 
 * On mongoDb shell, copy and paste the command to add admins, db.admins.insertOne({ "username" : "name", "password" : "password" }); 
 * Run the node js server by the command npm start. 
 * https://localhost:3000 for registration and https://localhost:3000/admin for admin works

Thank you!
   
