# Interview Scheduler 📆

This repository is a demonstration of creating a modern client application using the React view library.

## Setup

Install dependencies with `npm install`.

## Pre-Setup Install

- [Scheduler-Api](https://github.com/MattSeligman/scheduler-api)
- [Scheduler-Dashboard](https://github.com/MattSeligman/scheduler-dashboard) (Optional)

## Running Webpack Development Server

```sh
npm start
```

![Start Project](https://github.com/MattSeligman/Scheduler/blob/master/docs/start_project.gif?raw=true)

## Functional Requirements

- Development focuses on a single page application (SPA) called _Interview Scheduler_, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Behavioural Requirements

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Technical Specifications

- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/)
- [Axios](https://github.com/axios/axios), [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Axios](https://github.com/axios/axios)
- [Storybook](https://storybook.js.org/), [Webpack Dev Server](https://github.com/webpack/webpack-dev-server), [Jest](https://jestjs.io/en/), [Testing Library](https://testing-library.com/)

The [Scheduler](https://github.com/lighthouse-labs/scheduler) client application created using [Create React App](https://facebook.github.io/create-react-app/). [Express](https://expressjs.com/) is the basis for the [Scheduler API](https://github.com/lighthouse-labs/scheduler-api) server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Reference

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Storybook Documentation](https://storybook.js.org/docs/basics/introduction/)
- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [Axios Example](https://github.com/axios/axios#example)

## Running Jest Test Framework

```sh
npm test
```

- Use `npm test` with scheduler-api and schedule when testing.
  ![Start Tests](https://github.com/MattSeligman/Scheduler/blob/master/docs/jest_tests.gif?raw=true)

## Running Storybook Visual Testbed

```sh
npm run storybook
```

![Storybook Tests](https://github.com/MattSeligman/Scheduler/blob/master/docs/storybook_tests.gif?raw=true)

## Cypress Tests

- Test Appointments
  ![Cypress Appointment Test](https://github.com/MattSeligman/Scheduler/blob/master/docs/cypress_appointments_tests.gif?raw=true)

- Test Navigation
  ![Cypress Navigation Test](https://github.com/MattSeligman/Scheduler/blob/master/docs/cypress_navigation_tests.gif?raw=true)
