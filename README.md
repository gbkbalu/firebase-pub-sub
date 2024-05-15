## Environmental Setup

### Required softwares:

    Visual Studio Code

### Installation Instructions
###### <span style=" font-size: 120%">  - Visual Studio Code </span>

Download the Visual Studio Code using below link <br>
[https://linuxize.com/post/how-to-install-visual-studio-code-on-ubuntu-18-04/](https://linuxize.com/post/how-to-install-visual-studio-code-on-ubuntu-18-04/)


### Required packages:

    node
    npm
    firebase tools
    java


###### <span style=" font-size: 120%"> -  Node:npm </span>

    $ sudo apt-get update

    $ sudo apt-get install build-essential libssl-dev curl

    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    $ source ~/.bashrc

    $ nvm install 16.13.0
#### To check node version:
    $ node -v
    $ npm -v

###### <span style=" font-size: 120%"> - firebase tools </span>

    $ npm install -g firebase-tools

#### Check the version of the tools. If your version is older, upgrade the tools by issuing the same "npm" command above.
    $ firebase --version

###### <span style=" font-size: 120%"> -  java </span>

[Install Java](https://openjdk.java.net/install/) version 11 or higher

### [Setting Up Local Firebase for Development](pages/firebase-local.md)

### [User Management setup in local](https://github.com/ramtulluri/nestapp-server/blob/master/pages/usermanagement%20setup%20in%20local.md)


### [Deploying Project to Firebase](pages/firebase-deploy.md)


firebase init emulators
firebase emulators:start

firebase deploy --only functions

firebase deploy --only functions:api --min-instances=1 --max-instances=5  
firebase deploy --only functions:onWriteUserReset
firebase deploy --only functions:onCreateUser

http://127.0.0.1:5001/nestapp-a9049/us-central1/api/setemailtemplates
https://us-central1-nestapp-a9049.cloudfunctions.net/api/setemailtemplates

SERVER_URL=http://127.0.0.1:5001/nestapp-a9049/us-central1/api/


Date Format in maintained in user daily data : MMDDYYYY

Generate encode using:

https://www.utilities-online.info/base64#.Xc5CMnUzY5l

{
"phoneNumber": "<phone-number>",
"mpin": "<m-pin>"
}

    
<br><br>
Here is a quick summary of various firestore functions used in the application

| Function Name           | Trigger                               | Description                                               | Implementation File   | REST Endpoint (if applicable) |
|-------------------------|---------------------------------------|-----------------------------------------------------------|-----------------------|-------------------------------|
| `sendMail`              | HTTP request (POST)                   | Sends emails to users based on provided template and data | sendMail.js           | `/api/sendMail`              |
| `sendWhatsAppMessage`   | Firestore `onCreate` (collection: "whatsapp") | Sends WhatsApp messages using an external service      | sendWhatsAppMessage.js| N/A                           |
| `sendInAppMessage`      | Firestore `onCreate` (collection: "inapp_messages") | Sends in-app notifications to users                 | sendInAppMessage.js   | N/A                           |
| `sendMessage`           | HTTP request (POST)                   | Sends SMS messages to users based on provided template and data | sendMessage.js    | `/api/sendMessage`           |
| `onuserlogin`           | Firestore `onCreate` (collection: "auditlog") | Handles user login events, sends notifications or OTPs   | onuserlogin.js       | N/A                           |
| `onCreateMandate`       | Firestore `onCreate` (collection: "mandate") | Handles creation of mandates, sends email notifications   | onCreateMandate.js   | N/A                           |
| `onUpdateEmail`         | Firestore `onWrite` (collection: "email") | Sends email verification or activation emails             | onUpdateEmail.js     | N/A                           |
| `onCreateNavMeta`       | Firestore `onCreate` (collection: "nav_meta") | Updates user logs and navigation metadata after creation  | onCreateNavMeta.js   | N/A                           |
| `onCreateNavDate`       | Firestore `onCreate` (collection: "nav_day") | Updates navigation metadata for the current date         | onCreateNavDate.js   | N/A                           |
| `onCreatePositionMeta`  | Firestore `onCreate` (collection: "position_meta") | Updates user position metadata after creation          | onCreatePositionMeta.js | N/A                         |
| `onCreateUserDailyData` | Firestore `onWrite` (collection: "user_daily_data") | Updates user logs and sends notifications based on user activity | onCreateUserDailyData.js | N/A                     |
| `onCreateWebhookEvent`  | Firestore `onCreate` (collection: "webhook_event") | Processes various webhook events and updates user logs    | onCreateWebhookEvent.js | N/A                          |
| `onWriteUserReset`      | Firestore `onWrite` (collection: "user_reset_pwd") | Sends OTP or password reset emails based on user actions  | onWriteUserReset.js  | N/A                           |
| `onUserUpdateEmail`     | Firestore `onCreate` (collection: "user_email_update") | Sends welcome or activation emails based on user updates | onUserUpdateEmail.js| N/A                           |
| `onCreateUser`          | Firestore `onCreate` (collection: "user") | Sends welcome or activation emails upon user creation     | onCreateUser.js      | N/A                           |
| `onMessageCreate`       | Firestore `onWrite` (collection: "messages") | Sends SMS messages using an external service             | onMessageCreate.js   | N/A                           |
| `onVoiceCallCreate`     | Firestore `onWrite` (collection: "voicecall") | Initiates voice calls using an external service          | onVoiceCallCreate.js | N/A                           |
| `emailevent`            | Pub/Sub topic                          | Sends emails or SMS based on received events               | emailevent.js        | N/A                           |
| `api`                   | HTTP request (Express app)             | Exposes Express API as a Firebase Cloud Function          | api.js               | N/A                           |

<br><br>
A high level diagram depicting various external systems used by WealthUpp server
<br>

```mermaid
graph TD
    subgraph "User Interaction"
        A( ---------------------------------------------------------  User -----------------------------------------------------)
        B(WealthUpp App)
    end

    A -- User functions * --> B
    
    subgraph "External Systems"
        K(Cybrilla)
        L(Fas2sms)
        M(YCloud)
        N(BillDesk)
        O(AMFI)
        P(Surepass)
    end

    B -- Purchase Mutual funds --> K
    B -- Send OTP to mobile as SMS --> L
    B -- WhatsApp messages --> M
    B -- Payment settlements --> N
    B -- NAV prices mutual funds --> O
    B -- PAN and AADHAR validation--> P

    subgraph "User Functions"
        reg(User Registration)
        login(User Login)
        kyc(KYC Verification)
        mandate(Provide Bank Mandate)
        risk(Set Risk Preference)
        decide(Decide Daily Investment)
        update(Update/Cancel Investment)
        invest(Invest in Mutual Funds)
        reg --> login --> kyc --> mandate --> risk --> decide --> update --> invest
    end

    ```

Run the following command: firebase setup:emulators:pubsub. This will download the jar file.
Try running the pubsub emulator again: firebase emulators:start --only pubsub