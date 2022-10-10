# Welcome to EventLyfe, clone of EventBrite

## This project was developed utilizing:

- #### Backend: Python/Flask

- #### Frontend: React/Redux/JS/HTML/CSS

- #### DB: SQLAlchemy

- #### Hosted on Heroku

* [Live Link](https://eventlyfe.herokuapp.com/login)

## Wiki Links:

- [App Features](https://github.com/giordanferda/EventLyfe-Capstone/wiki/App-Features)
- [Database Schema](https://github.com/giordanferda/EventLyfe-Capstone/wiki/Database-Schema)
- [Redux State Shape](https://github.com/giordanferda/EventLyfe-Capstone/wiki/Redux-State-Shape)
- [User Stories](https://github.com/giordanferda/EventLyfe-Capstone/wiki/User-Stories)
- [Wireframes](https://github.com/giordanferda/EventLyfe-Capstone/wiki/Wireframes)
- [API-Routes](https://github.com/giordanferda/EventLyfe-Capstone/wiki/API-Routes)

---

## How to run EventLyfe Locally:

- Clone the repository in your terminal: `git clone https://github.com/giordanferda/EventLyfe`
- cd into EventLyfe folder and run `pipenv install`
- Open two terminal paths for both EventLyfe and react-app.
- Under EventLyfe run ` pipenv shell`` then  `flask run`, for react-app run `npm install```
- Create a `.env` file under the root of the backend folder with the following contents:

```
REACT_APP_BASE_URL=http://localhost:5000
```

- In the terminal under EventLyfe, migrate and seed files as follows:

```
flask db upgrade
flask seed all
```

- Now, run `flask run` under EventLyfe and `npm start` under react-app

### Your local host should be running with full functionality now!


# Splash Page
![Splash](https://user-images.githubusercontent.com/93215380/194821804-1537d854-8e5e-460e-9bf0-f237f7487585.png)

# Event Page
![AllEvents](https://user-images.githubusercontent.com/93215380/194821931-7f7c997f-4647-4347-8fea-9f5afa5b5270.png)

# Event Detail Page
![EventDetail](https://user-images.githubusercontent.com/93215380/194822043-4517fff9-3e6d-4706-9ef7-b50581d39fde.png)

# Manage Events Page
![image](https://user-images.githubusercontent.com/93215380/194823670-a5429d77-d050-4649-b077-8c115e2d06b7.png)

# Create Event Page
![image](https://user-images.githubusercontent.com/93215380/194824283-6f47652e-8285-4341-8fbd-151c5b89c3a7.png)


# Edit Event Modal
![image](https://user-images.githubusercontent.com/93215380/194823610-22914519-dcfb-4369-b3ee-9e378a10702b.png)

# Create Review Modal
![image](https://user-images.githubusercontent.com/93215380/194823866-472294f6-28df-404d-aa70-4573852419c2.png)

# Review Card
![image](https://user-images.githubusercontent.com/93215380/194823997-a7f2941b-7286-4beb-8fb6-59d57c23cc74.png)



