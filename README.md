# TheMovieDB React App

TheMovieDB React App is a web application that allows users to search for movies and view detailed information about them. The application uses the MovieDB API to fetch movie data, including movie posters, trailers, and other relevant information. The app is designed to be user-friendly, responsive, and accessible on various devices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Production Mode](#production-mode)
- [Technologies](#technologies)
- [Testing](#testing)
- [License](#license)

## Prerequisites
Ensure that you have the following installed on your local machine:

- Node.js (v14 or newer)
- npm (v6 or newer)

You can check the versions by running:

```bash
node -v
npm -v
```

## Features

- Search for movies using keywords
- View movie details, including runtime, genre, status, and overview
- Watch movie trailers
- View movie posters.
- Switch languages for movie details and interface
- Responsive design for mobile and desktop devices

## Installation

To set up the Fresh Tomatoes application on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/barodrig/tmdb-react-app.git
```

2. Navigate to the project directory:

```bash
cd TMDB-React-App
```

3. Install the required dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the project directory with the following content (replace `YOUR_API_KEY` with your own API key from The MovieDB):

```bash
REACT_APP_API_KEY=YOUR_API_KEY
```

5. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000/`.

## Usage

1. Use the search bar to enter keywords and find movies that match your query.

2. Click on a movie to view its details, including runtime, genre, status, and overview.

3. Watch movie trailers directly within the application.

4. Switch between different languages to view movie details and interface in your preferred language.

5. Enjoy a responsive design that works well on both mobile and desktop devices.

## Production Mode


1. Build the application: 

```bash
npm run build:production
```

2. Serve the application: 
```bash
`serve -s build`
```

The application will be running at `http://localhost:5000`
*If you encounter an issue, ensure that you have created and populated your ```.env``` file and installed dependencies with ```npm install```.
Refer to [Usage](#usage).*

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

```bash
cd TMDB-React-App
```

2. Run the cypress E2E tests :

```bash
npm run test
```

## Features to come
- Implement movie browsing using filters such as popularity, genre, and adult content filter.
- Enable users to rate movies through The MovieDB guest session.
- Introduce a night mode for a more comfortable user experience in low-light environments.

## Area for Improvement
- **Unit tests:** The application currently lacks unit tests. Incorporating these tests will ensure each part of the application works as intended independently.
- **End-to-End tests:** While some E2E tests have been implemented using Cypress, the coverage could be more comprehensive to ensure the application works as expected in a real-world scenario.
- **API call optimization:** Enhancing the optimization of API calls can improve the application's performance and responsiveness.
- **Responsive Design:** Further enhancements in the responsive design can provide an improved user experience across various device sizes.
- **CSS modules:** The current application uses CSS modules for styling. Consider replacing these with styled components for better styling encapsulation and ease of maintenance.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

If you have any questions or suggestions, feel free to create an issue or submit a pull request.
