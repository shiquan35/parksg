# ParkWhereSG

Search for the nearest public carpark and lot availability to your destination in Singapore.

## To start the app

Run `npm i` for both backend and frontend files<br />
Then run `nodemon index` or `node index` in the backend folder, and run `npm run start` in the frontend folder.

Note:
if you do not have `node` `nodemon` globally installed, please install it (`npm i nodemon`, `npm i node`) after running `npm i`

## Things to note:

The UI for this app would fit most laptop and mobile screen sizes. Do note that if viewing this application from a tablet, the size of the display map may be larger than the screen size of the tablet.

## Interface:

The features of this application is available for all users, except the "Add to Favourites" function, which will require the user to create an account before being able to access it.

### Homepage / Map View

![image](https://user-images.githubusercontent.com/86793931/211341663-f23c6226-77de-4a5c-9db5-e92231260291.png)
Type in your destination in the search bar and the map will automatically populate the nearest carparks within the area of your destination.
<br />
Click on the carpark marker for specific information such as: Carpark Name, Lots Available, Duration of Parking Charges.

### Carpark Rates

![image](https://user-images.githubusercontent.com/86793931/211341890-c6b4b521-8c8a-4d59-8abe-d35dc5f33343.png)
<br />
The parking rates for most public parking in Singapore are of similar pricing with the exception of a few areas. These prices are taken from the HDB Website (https://www.hdb.gov.sg/car-parks/shortterm-parking/short-term-parking-charges)

### Dashboard

Users may save frequented carparks in their dashboard by clicking the "Add to Favourite" button on the map. Please note that the dashboard is only accessible to logged in users.<br /> <br />
![image](https://user-images.githubusercontent.com/86793931/211342741-3cc0cc58-f968-4f70-b827-cf7a9c17136e.png)
