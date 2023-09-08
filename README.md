![project watchdog logo](./public/img/readme_banner.jpg)

Project Watchdog is a project managment system that helps students and adviosrs to collaborate on a project by tracking each step of their project phase. It has useful features like task assignment, progress report, project archive and project history.

## See it in action 
[Project Watchdog YouTube](https://www.youtube.com/watch?v=N5oyiKK3oA4)

## Getting Started

To get started with the project you need to install [node](https://nodejs.org/en/) and [mongodb](https://www.mongodb.com/download-center?) on your local machine.

### Prerequisites

To get started clone the repo

```bash
git clone https://gitlab.com/rabira-hierpa/project_watchdog.git
cd project-watchdog/
```

### Install dependencies

To install all the dependencies for both the backend and front-end

```bash
npm run install-all  #or
yarn run install-all
```

To get the development server started

```bash
npm start
```

Or you can do

```bash
git clone https://gitlab.com/rabira-hierpa/project_watchdog.git
cd project_watchdog/
npm install # or yarn start
npm start # starts the front-end 
```

To run the backend (express app)

```bash
git clone https://gitlab.com/rabira-hierpa/project_watchdog.git
cd project_watchdog/server
npm install # or yarn start
npm start # starts the backend
```

## Deployment

To deploy the app to your local server you can do

```bash
git clone https://gitlab.com/rabira-hierpa/project_watchdog.git
cd project-watchdog/
npm install #or yarn start
npm build
```

## Built With

* [React](https://reactjs.org/) - The frontend UI framework used
* [Yarn](https://yarnpkg.com/en/) - Dependency Management
* [react-chart-js](https://github.com/jerairrest/react-chartjs-2) - Used for drawing project charts
* Express - Used for building the RESTful API
* Passport - Used for user authentication

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [TraversyMedia](http://twitter.com/traversymedia)
* [Acadaminde](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w)
