# RDSCinemas (Movie API)

This project provides APIs for **RDSCinemas**, a movie application that allows users to download movies and add them to a wishlist. The project is built using Node.js, Express, and MongoDB, and adheres to modern backend development practices.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Authentication**: Secure user login and signup using JWT and bcrypt.
- **Movie Management**: APIs for downloading movies and managing a wishlist.
- **Database Integration**: MongoDB is used for data storage, managed via Mongoose.
- **File Uploads**: Handled using Multer for adding images or videos.
- **CORS Support**: Enabled for cross-origin resource sharing.
- **API Documentation**: Swagger UI for API visualization and interaction.
- **Logging**: Winston is used for logging application activities.

---

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Rajdeep777/rdscinemas.git](https://github.com/Rajdeep777/RDSCinemas-Backend.git)
   cd rdscinemas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the environment variables as described below.

4. Start the development server:
   ```bash
   nodemon
   ```

---

## Environment Variables
The application requires the following environment variables to be set in a `.env` file:

| Variable          | Description                          | Example Value          |
|--------------------|--------------------------------------|------------------------|
| `DB_URI`          | MongoDB connection string           | `mongodb://localhost` |
| `JWT_SECRET`      | Secret key for JWT authentication   | `your_jwt_secret`     |

---

## Scripts

| Command       | Description                              |
|---------------|------------------------------------------|
| `nodemon` | Starts the application with `nodemon` for development. |

---

## Dependencies

The following packages are used in this project:

- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Password hashing.
- **[body-parser](https://www.npmjs.com/package/body-parser)**: Parsing request bodies.
- **[cors](https://www.npmjs.com/package/cors)**: Enabling cross-origin requests.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Managing environment variables.
- **[express](https://www.npmjs.com/package/express)**: Web framework.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: User authentication via tokens.
- **[mongodb](https://www.npmjs.com/package/mongodb)**: MongoDB driver.
- **[mongoose](https://www.npmjs.com/package/mongoose)**: Object modeling for MongoDB.
- **[multer](https://www.npmjs.com/package/multer)**: File uploads.
- **[nodemon](https://www.npmjs.com/package/nodemon)**: Development server monitoring.
- **[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)**: API documentation.
- **[winston](https://www.npmjs.com/package/winston)**: Logging utility.

---

## Project Structure

```plaintext
rdscinemas/
├── config/                       # Configuration logic
├── error-handler/                # Application Error
├── public/                       # Static files
├── src/                          # Main app logic
      ├── features/               # Features of App
            ├── downloader/       # Downloading feature
            ├── like/             # like feature
            ├── movie/            # Adding movies feature
            ├── user/             # Adding users feature
            ├── wishlist/         # Wishlist movie feature
       ├── middlewares/           # Custom middleware 
├── uploads/                      # Uploaded files (if any)
├── index.js                      # Entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
├── package-lock.json/            # Dependencies management
├── swagger.json/                 # API documentation
```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License
This project is licensed under the ISC License.

**Author**: Rajdeep Singh  
For any questions or issues, please contact: [email@example.com](mailto:email@example.com)
