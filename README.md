 ## To run this project with your own resources ->
    1. Open the project in VS code
    2. Go to visitors_count_backend and open count.json file. Override both values to 0.
    3. Now download visitors.csv file and delete all rows except header row. Replace that file in project folder to receive fresh data.
    4. Open terminal of VS code
    5. cd backend -> npm install -> node index.js
        If you see 'server started at 9999...' message in terminal, then backend is up
    6. Add new Terminal in VS code
    7. cd frontend -> npm install (wait till all dependencies are downloaded) -> npm start
    8. In browser, you will see url as localhost:3000. You are on Home page now. You can append /about or /contact or /visitors after localhost:3000 to navigate to these pages. At /visitors page, you will see the count of visits and visitors.

## How to test
    1. Open localhost:3000 in different browser or different machine. Count of visits and count of visitors will get updated.
    2. Open localhost:3000 in same browser but different tab. This time only count of visits will get updated. Becuase visitor is still same.
    3. Counts should not increase if you navigate between the pages or refresh the pages.

## Technologies used
    1. Node Js for backend
    2. React Js for frontend
    3. HTML
    4. CSS

## Interactive features
    1. Visitors data download - By going to /visitors page, you can get location and ip addresses of visitors.

## Demo
![1](https://github.com/user-attachments/assets/1f609949-88da-40e5-982d-5e9c95adb3b2)

![2](https://github.com/user-attachments/assets/a77434a8-a7c8-4350-b693-3788ab3ce23e)

![3](https://github.com/user-attachments/assets/52436d0f-a8e0-4252-8e7e-9a81ba2e59f8)
