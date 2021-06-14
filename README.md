<h1 align='center'>Doc-On-the-Go</h1>
## Team Members
1. Pranjal Srivastava
2. Ramankur Goswami
3. Shivam Purohit

## Inspiration
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/Inspiration.jpeg" width = "600" height = "400"/></p>
Our inspiration for this project was to help people during the Coronavirus pandemic. People coming together for a cause has always been a powerful tool in the tackling of a problem, we thought to add our contribution to the fight against coronavirus to the best of our abilities.

## Problem statements

### Pre-requisites required to run the application

1. **NodeJs**
2. Working **Firebase** account

## Steps to download and setup pre-requisites for our app

1. Download Nodejs - For downloading **nodejs** goto this [link](https://nodejs.org/en/download/).
2. Now goto [firebase](https://firebase.google.com/). Login to firebase with your google account.
3. Goto **console** and click on **Add Project**.
4. Enter the name of the project and all the required information and proceed.
5. Your project will be created on firebase.
6. Now on the dashboard, click on web icon. It will register the app in your project. Now enter all the necessary information about your app and click **create**.
7. Now your app is added to the project.
8. Goto **Firestore Database**. Click on **Create Database**. Then click on **Start in Test Mode** and keep all the information by default.
9. Goto **Authentication**. Click on **Get Started**. Now hover on **Email/Password** and click the pencil icon(edit icon). Enable the method and click **Save**.
10. Now, next to **Project Overview**, click on Settings icon and click **Project Settings**.
11. Scroll to the bottom of the settings page. In **Your apps** section, under **Firebase SDK snippet**, click on **Config**. Now copy the contents of **FirebaseConfig** and paste it somewhere.

## Steps to setup in the local system

1. Clone this repository - ```git clone https://github.com/pranjals149/Doc-On-the-Go.git```
2. Move into the cloned repository - ```cd Doc-On-the-Go```
3. Now, install the required dependencies - ```npm install```
4. Move in the **funtions** directory - ```cd functions```
5. Now, inside **functions** directory, install the required dependencies for running the backend server of the app - ```npm i```
6. Inside the **functions** directory, start the express backend server - ```firebase emulators:start```
7. Now, open **firebase.js** file inside **src**, and paste the content of **FirebaseConfig**(copied from firebase console) in place where previous FirebaseConfig was declared.
8. Now, back to the main project directory, start the react development server - ```npm start```
9. Now the application is Up and running on PORT NO. - **3000**
 
## Screenshots
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/Landing%20Page.png" width = "600" height = "400"/></p>
<p align='center'> **Landing Page** </p>
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/User%20Main%20Page.png" width = "600" height = "400"/></p>
<p align='center'> **User Main Page** </p>
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/Services.png" width = "600" height = "400"/></p>
<p align='center'> **Services Offered** </p>
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/Symptom%20Generator.png" width = "600" height = "400"/></p>
<p align='center'> **Symptom Generator** </p>
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/Appointment%20Booking.png" width = "600" height = "400"/></p>
<p align='center'> **Appointment Booking** </p>
<p align='center'><img src = "https://github.com/pranjals149/Doc-On-the-GO/blob/master/public/Snips/Resources.png" width = "600" height = "400"/></p>
<p align='center'> **Resources** </p>

## Video Link
