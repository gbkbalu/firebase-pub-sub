# Deploying the Project to Firebase

Before proceeding, make sure you have alreday created a live **Firebase project** and enabled **Firestore** database on it.

You may also want to stop the Firebase Emulator. Simply close the terminal where the emulator is currently running.

```bash
# Login to firebase (if you haven't already done)
$ firebase login

# Check whether you have linked your local project to live Firebase project. If so, you should see the label "(current)" in your project ID
$ firebase projects:list

# Link the local project with live Firebase project (if you haven't already done)
$ firebase init

# Deploy the project to Firebase
$ firebase deploy

# If you get errors, try deploying individually
$ firebase deploy --only functions
$ firebase deploy --only firestore
```

Once completed, verify the deployment from the [Firebase console](https://console.firebase.google.com/).

