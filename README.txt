# FreshCart — Online Grocery Store Front-End Project

## How to run
1. Extract the ZIP file.
2. Open the `index.html` file in Chrome, Edge or Firefox.
3. Login using any valid email and a password with at least 4 characters.
4. Browse categories, search groceries, sort products, add items to the cart and place a demo order.

## Files
- `index.html` — page structure and login/store UI
- `style.css` — complete responsive styling
- `script.js` — product data, search, categories, cart and demo login
- `README.txt` — project instructions

## Features
- Login page
- Responsive navigation bar
- Search groceries
- Category filtering
- 21 grocery products with pictures
- Price and unit display
- Sorting
- Add to cart
- Increase/decrease cart quantity
- Cart total
- Demo checkout
- LocalStorage for login/cart
- Mobile responsive design

## Note
The product photographs use remote Unsplash image URLs, so an internet connection is needed for the pictures to load. The project itself is front-end only; there is no real database, payment gateway or server authentication.


## User and Admin Roles

### User Role
- Login as User with any valid email and a password of at least 4 characters.
- Browse/search/filter groceries.
- Add products to cart, change quantities and place a demo order.

### Admin Role
- Select Admin on the login screen.
- Demo admin credentials:
  Email: admin@freshcart.com
  Password: admin123
- Admin can view dashboard statistics.
- Admin can add new products using product name, category, price, unit and image URL.
- Admin can delete products.
- Admin can switch back to the store with "View Store".

### Important
This is still a front-end-only college project. The roles are simulated with JavaScript and LocalStorage, not secure server-side authentication. For a real e-commerce website, authentication and admin permissions should be handled by a backend/database.
