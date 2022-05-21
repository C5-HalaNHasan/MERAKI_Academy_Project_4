<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">AWAPapp</h3>

---

<p align="center"> This web app is built to enable the users to exchange their items with other users and to buy items from other users!
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [User Story](#user_story)
- [Guided By](#guided_by)

## 🧐 About <a name = "about"></a>
Do you have any item you want to get rid off? SWAPapp is the place!
With this app you can easily swap your items with others or sell them!
All you have to do is to join us and enjoy the experience!


## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have these softwares in your machine in order to run the app:
- [Visual Studio Code](#https://visualstudio.microsoft.com/)
- [GitBash](#https://gitforwindows.org/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)


### Installing

1. Clone the repo to your local machine using git bash.
```sh
git clone https://github.com/C5-HalaNHasan/MERAKI_Academy_Project_4.git
 ```

2. install npm packages in the fronend and backend
```sh
npm i
 ```

3. run server using git bash inside backend folder
```sh 
npm run dev
  ```

4. run application using git bash inside frontend folder
```sh
npm run start
 ```

Now you are ready to use the app!

## 🎈 Usage <a name="usage"></a>
The idea of the project is to swap/buy items with/from other users, the swap/buy will only be available for users residing in the same country.
Once the user enters the website: if he's not loggedIn or registered then he will be restricted from navigating the site;only the navBar with the login icon appear and a box rendering selected items in the main screen.
Once registered/loggedIn;the user can search for specific items by item name,category,price,and type if for swapping or selling.
If the user wants to swap an item with one of his items: the app filters the user items by price;if he has item/items with price greater than the wanted item then he can swap;if not swapping option will not be available for the user.
If swapping/buying is selected: the user will be redirected to the checkOut page where he's asked to enter his address for delivery,once this form is filled: the user will be redirected to his items with the swapped item added to his board, or redirected to the online payment section where he's asked to enter his card data with the amount equals to the wanted item price to be charged.
The user can modify/delete/add new items to his board,also he can modify his profile.


Add notes about how to use the system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express JS](https://expressjs.com/) - Server Framework
- [React JS](https://https://reactjs.org/) - Web Framework
- [Node JS](https://nodejs.org/en/) - Server Environment

## 🎞 User Story <a name = "user_story"></a>
Trello(https://trello.com/b/MLfnQ7a9/itemsexchange-project4)

## ⚠️ Guided By <a name = "guided_by"></a>

This project is guided by ©️ **[MERAKI Academy](https://www.meraki-academy.org)**
🎞
