# TheMovieDB React App

TheMovieDB React App is a web application that allows users to search for movies and view detailed information about them. The application uses the MovieDB API to fetch movie data, including movie posters, trailers, and other relevant information. The app is designed to be user-friendly, responsive, and accessible on various devices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Testing](#testing)
- [License](#license)

## Features

- Search for movies using keywords
- View movie details, including runtime, genre, status, and overview
- Watch movie trailers
- View movie posters.
- Switch languages for movie details and interface
- Responsive design for mobile and desktop devices

## Features to come
- Browse movies using filter (popularity, genre, adult content filter...)
- Rate movies through TheMovieDB guest session (no need to authenticate yourself to TMDB).
- Night mode.
## Installation

To set up the Fresh Tomatoes application on your local machine, follow these steps:

1. Clone the repository:

```git clone https://github.com/barodrig/tmdb-react-app.git```

2. Navigate to the project directory:

```cd TMDB-React-App```

3. Install the required dependencies:

```npm install```

4. Create a `.env` file in the root of the project directory with the following content (replace `YOUR_API_KEY` with your own API key from The MovieDB):

```REACT_APP_API_KEY=YOUR_API_KEY```

5. Start the development server:

```npm start```

The application will be available at `http://localhost:3000/`.

## Usage

1. Use the search bar to enter keywords and find movies that match your query.

2. Click on a movie to view its details, including runtime, genre, status, and overview.

3. Watch movie trailers directly within the application.

4. Switch between different languages to view movie details and interface in your preferred language.

5. Enjoy a responsive design that works well on both mobile and desktop devices.

## Technologies

- React
- TypeScript
- The MovieDB API
- I18N
- CSS Modules
- Cypress

## Testing

To run tests for TheMovieDB-React-App, follow these steps:

1. Navigate to the project directory:

```cd TMDB-React-App```

2. Run the test suite:

```npm test```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

If you have any questions or suggestions, feel free to create an issue or submit a pull request.
