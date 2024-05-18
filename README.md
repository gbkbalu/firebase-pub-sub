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


### [Deploying Project to Firebase](pages/firebase-deploy.md)


firebase init emulators
firebase emulators:start

firebase deploy --only functions

firebase deploy --only functions:onCreateUser

  
<br><br>
