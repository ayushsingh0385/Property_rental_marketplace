# Property Rental Marketplace

Welcome to the Property Rental Marketplace project! This platform facilitates seamless connections between property owners and potential tenants, streamlining the rental process for all parties involved.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure registration and login for both property owners and tenants.
- **Property Listings**: Owners can list properties with detailed descriptions and images.
- **Booking System**: Tenants can book properties directly through the platform.
- **Review System**: Tenants can leave reviews for properties they've rented.
- **Search Functionality**: Tenants can search for properties based on various criteria such as location, price, and property type. **(In Development)**

## Technologies Used

- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB
- **Frontend**: EJS templating engine, HTML, CSS, JavaScript
- **Authentication**: Passport.js
- **Image Uploads**: Cloudinary

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ayushsingh0385/Property_rental_marketplace.git
   cd Property_rental_marketplace
   ```

2. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

   Replace `your_mongodb_connection_string`, `your_cloudinary_cloud_name`, `your_cloudinary_key`, and `your_cloudinary_secret` with your actual credentials.

4. **Start the Application**:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

## Usage

- **Register**: Create an account as either a property owner or a tenant.
- **Login**: Access your account using your credentials.
- **List a Property** (for owners): Navigate to the "Add Property" section, fill in the property details, and upload images.
- **Search for Properties** (for tenants): Use the search bar to find properties that meet your criteria. **(In Development)**
- **Book a Property**: Select a property and proceed with the booking process. **(In Development)**
- **Leave a Review**: After your stay, leave a review to help future tenants.

## Project Structure

```bash
Property_rental_marketplace/
├── controllers/        # Application logic
├── init/               # Initialization scripts
├── models/             # Database schemas
├── public/             # Static files (CSS, JS, images)
├── routes/             # Route definitions
├── utils/              # Utility functions
├── views/              # EJS templates
├── .gitignore          # Files to be ignored by Git
├── app.js              # Main application file
├── cloudconfig.js      # Cloudinary configuration
├── middlewares.js      # Custom middleware functions
├── package.json        # Project metadata and dependencies
└── schema.js           # Validation schemas
```

## Contributing

We welcome contributions to enhance the Property Rental Marketplace. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

## Developed by [Ayush Singh](https://github.com/ayushsingh0385)

Thank you for using the Property Rental Marketplace! If you have any questions or need assistance, feel free to open an issue on the [GitHub repository](https://github.com/ayushsingh0385/Property_rental_marketplace/).
