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

- Now, run `flask run` under NotYelp and `npm start` under react-app

### Your local host should be running with full functionality now!
