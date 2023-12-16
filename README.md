**Project Name**: Warehouse Management System
**Group**: Gabrielle Knapp & Ethan Morton
**Class**: Database Management - Marist College

**Project Organization**:
- WMS Source Code
  - Client
    - Public
      - css
        - account.css
        - adminLog.css
        - adminWarehouse.css
        - cart.css
        - favorites.css
        - global.css
        - home.css
        - index.css
        - transactionLog.css
        - warehouse.css
      - js
        - account.js
        - adminAccount.js
        - adminLog.js
        - adminWarehouse.js
        - cart.js
        - favorites.js
        - global.js
        - home.js
        - index.js
        - transactionLog.js
        - warehouse.js
      - images
        - background.jpg
        - redFox.png
    - views
      - account.html
      - adminAccount.html
      - adminHome.html
      - adminLog.html
      - adminWarehouse.html
      - cart.html
      - favorites.html
      - home.html
      - index.html
      - transactionLog.html
      - warehouse.html
  - Server
    - Controllers
      - accountController.js
      - adminLogController.js
      - cartController.js
      - transactionLogController.js
      - warehouseController.js
    - mysql.js
    - server.js
   
  **Description**:
  - Tracks User Accounts
  - Allows for users to add items to their favorites and to their cart
  - Allows for users to edit account information and use that info to check out from the cart
  - Allows for users to browse warehouse items
  - Allows for admins to edit, view, and delete accounts
  - Allows for admins to edit, view, add, and delete items from the warehouse
  - Allows for admins to track all transactions and all admin functions
  - Connects to a mySQL database to hold accounts, carts, transactions, logs, and warehouse items
