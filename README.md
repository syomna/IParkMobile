
# IPark Mobile

IPark Mobile is a mobile application that provides parking solutions for users. It allows users to find the nearest available garage, reserve it using either cash or card payment methods, and offers support for English and Arabic languages. The app is fully responsive and works well on different devices.

## Technologies Used

-   React Native: A JavaScript framework for building native mobile applications.
-   Firebase: A platform for creating web and mobile applications that offers real-time data storage and authentication.
-   Google Cloud: Provides access to Google Maps and Google Places API for location-based services and also Google Matrix Distance API to calculate distances and travel times between locations.
-   Stripe: A payment processing platform used to implement payment functionality.

## Getting Started

To run the IPark Mobile application on your local machine, follow these steps:

1.  Clone the repository:
    
  
    
    `git clone https://github.com/syomna/IParkMobile.git` 
    
2.  Navigate to the project directory:
    
   
    
    `cd IParkMobile` 
    
3.  Install the dependencies:
    
    
    
    `npm install` 
    
4.  Configure Firebase:
    
    -   Create a new Firebase project.
    -   Enable Firebase Authentication, Realtime Database, and Storage.
    -   Obtain your Firebase configuration credentials.
5.  Set up Stripe:
    
    -   Create a Stripe account.
    -   Obtain your Stripe API keys.
    -   Replace the keys values in the project
6.  Start the development server:
    
    -   For Android:
        
       
        
        `npx react-native run-android` 
        
        
    
    Make sure you have a emulator running or a physical device connected.
    
7.  The IPark Mobile app will launch on your emulator or connected device.
    

## Contributing

Contributions to IPark Mobile are welcome! If you would like to contribute, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes with descriptive commit messages.
4.  Push your branch to your forked repository.
5.  Open a pull request, describing your changes in detail.

## Acknowledgements

We would like to acknowledge the following resources that helped us develop IPark Mobile:

-   React Native documentation: [https://reactnative.dev/](https://reactnative.dev/)
-   Firebase documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
-   Google Cloud documentation: [https://cloud.google.com/](https://cloud.google.com/)
-   Stripe documentation: [https://stripe.com/docs](https://stripe.com/docs)
