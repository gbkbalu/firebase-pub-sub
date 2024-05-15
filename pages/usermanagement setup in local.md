## User Management setup in local

### To  Clone the project from the GitHub 

```bash 
  $ git clone branch_url
  # For this setup we are cloning masterbranch 
  $ git clone https://github.com/ramtulluri/nestapp-server.git
  
```

Note: 
    For project setup node and firebase tools need to be installed. if your not installed follow [README.md](https://github.com/ramtulluri/nestapp-server/blob/master/README.md)

### nestapp-a9049 project settingup in your local machine:

```bash
    #Sign in with your Google account If you don't have one, sign-up
    firebase login

    firebase use nestapp-a9049
```
_Notes_:

Need to [Sign in with your Google account](https://accounts.google.com). If you don't have one, [sign-up here](https://accounts.google.com/signup?hl=en)

### Before running emulators need to install node modules for application:

```bash
    npm install firebase-functions
    
    npm install atob

    npm install passport

    npm install @google-cloud/pubsub

    npm install express-session

    npm install cookie-parser

    npm install deep-email-validator

    npm install passport-local

    npm install composable-middlewar
    
```

### To run project after setup:

```bash
    # On Emulators features setup:
    # - Choose Functions and Firestore
    # - Accept the default values for other settings
    # - Would you like to download the emulators now? Choose Yes
    $ firebase init emulators
    
    # This will starts all firebase emulators for you
    $ firebase emulators:start
    # The emulator UI should be available at http://localhost:4000

```


_Notes:_

1.If you encounter any error like some moudle is missing and need to install with npm then install that module using npm like 
```bash 
  $ npm install <modulename>
```

2.If you clone this project from my github repo, change the default project id with your own in `.firebaserc`

```json
{
  "projects": {
    "default": "nestapp-a9049"
  }
}
```






    