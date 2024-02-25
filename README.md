# FrameFusion-DUHacks3.0

FrameFusion is an online platform that connects artists with art enthusiasts. Artists can showcase and sell their artwork, while buyers can browse, purchase, and collect unique pieces of art.

Purpose:
    The purpose of FrameFusion is to provide a comprehensive and user-friendly online platform that facilitates the buying and selling of artwork while fostering a community of artists, art enthusiasts, and administrators. By offering a seamless experience for users to discover, explore, and purchase artworks, FrameFusion aims to promote artistic expression, support artists in showcasing their work, and connect them with a global audience. The platform also serves as a valuable tool for administrators to manage user and artist accounts, oversee artwork listings, and maintain the integrity of the platform.

Features:

1. Buyer
    1.1 Buyer Authentication:
        Description: Users can authenticate themselves securely using a username and password to access the application's features and functionalities.
    1.2 Buyer Registration:
        Description: Users can register for a new account by providing necessary details such as username, email, password. Upon successful registration, a user account is created.
    1.3 Browse Arts
        Description: Users can freely browse through the available artworks without the need to specify any search criteria. This allows users to explore a wide range of artworks at their leisure.
    1.4 Artwork Search
        Description: Users can search for artwork based on various criteria such as artist name and artwork category. The application displays a list of artworks that match the user's search criteria.
    1.5 Buy Artwork
        Description: Users can purchase artwork they like by proceeding to checkout directly from the artwork details page. They can also view details such as pricing, availability, and other relevant information before making a purchase.
    1.6 View Art Details
        Description: Users can view detailed information about a specific artwork, including its description, artist information, pricing, and availability.
    1.7 Payment Gateway Integration
        Description: Upon checkout, users are directed to the payment gateway for secure transaction processing. The payment gateway facilitates the transfer of funds from the buyer to the artist for purchased artworks.
    1.8 User Profiles
        Description: Users have profiles where they can manage their personal information, view their order history, and update their preferences.
        1.8.1 Update Personal Information
            Description: Users can update their personal information such as name, contact details, or any other relevant information.
        1.8.2 View Order History
            Description: Users can view their order history, including details such as order dates, purchased items, and order statuses.
        1.8.3 View User Profile
            Description: Users can view their own profile information, including details such as their username, email, and other relevant information.
    1.9 Visit Artist Profile
        Description: Users can view the profiles of artists whose artwork they are interested in. Artist profiles showcase the artist's bio, portfolio, and other relevant information.
    1.10 Responsive Design
        Description: The user interface of the application is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.

2. Artists
    2.1 Artist Authentication
        Description: Artists can authenticate themselves securely using a username and password to access the application's features and functionalities specific to artists.
    2.2 Artist Registration
        Description: Artists can register for a new account by providing necessary details such as unique username, email, password, portfolio, etc. Upon successful registration, an artist account is created.
    2.3 Create Artist Profile
        Description: Artists can create their profiles by providing details such as Artist unique name, profile picture, bio, and a portfolio showcasing their artworks.
    2.4 Artwork Management
        2.4.1 Add New Artwork
            Description: Artists can add a new artwork to their profile by providing details such as title, description, size and pricing.
        2.4.2 Update Artwork Details
            Description: Artists can update the details of an existing artwork in their profile, such as modifying the title, description, size, or pricing.
        2.4.3 Mark Artwork as Sold
            Description: Artists can mark an artwork in their profile as sold, indicating that it is no longer available for purchase.
        2.4.4 Remove Artwork 
            Description: Artists can remove an artwork from their profile, removing it from being visible to users.
    2.5 Manage Artist Profile
        2.5.1 Update Personal Information
            Description: Artists can update their personal information, such as their name, contact details, or any other relevant information.
        2.5.2 Change Profile Picture
            Description: Artists can change their profile picture to update their visual representation on the platform.
        2.5.3 Edit Bio
            Description: Artists can edit the bio section of their profile, providing a brief description or introduction about themselves.
        2.5.4 View Profile
            Description: Artists can view their own profile, including details such as their username, email, profile picture, bio, and artworks.
    2.6 View Orders
        Description: Artists can view orders placed for their artworks, including details such as order dates, buyer information, and order statuses (e.g., pending, completed). This feature allows artists to track the sales of their artworks and manage their orders.
    2.7 Artwork Search
        Description: Artists can search for artwork based on various criteria such as artist name and art categories. The application displays a list of artworks that match the artist's search criteria.
    2.8 View Art Details
        Description: Artist can view detailed information about a specific artwork, including its description, artist information, pricing, and availability.
    2.9 Responsive Design
        Description: The user interface for artists is designed to be responsive, ensuring a seamless experience across different devices.
  

Tech Stack :

    Frontend: React.js, Redux, React Router, Tailwind CSS
    Backend: Node.js, Express.js, MongoDB
    Store Art Images : AWS S3 (Simple Storage Service)
    Authentication: JWT (JSON Web Tokens)

Installation:

    ->Clone the repository: git clone https://github.com/Dhruvish0146/FrameFusion-DUHacks3.0
    ->Install dependencies: cd FrameFusion-DUHacks3.0 && npm install
    ->Set up environment variables:
        Create a .env file in the root directory of the backend (server) folder.
            *Add the following variables:
                    PORT=5000
                    MONGODB_URI=your-mongodb-uri
                    JWT_SECRET=your-jwt-secret

    ->Start the backend server: npm start in the backend (server) folder.
    ->Set up environment variables for the frontend:
    ->Start the frontend development server: npm start in the frontend (client) folder.

## Demo Video

[![FrameFusion Demo](https://youtu.be/rF6sY58Zqwg?feature=shared)]

