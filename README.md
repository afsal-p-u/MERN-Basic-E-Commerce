Client - Client(Branch)
Admin Panel - Admin(Branch)
---------------------------

Server folder
-------------
1. - npm install or yarn 
2. create .env file in root folder then add the following info:
    # mongodb url eg: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<foldername>?retryWrites=&w=majority
    URL = 
    # port eg: 5000
    PORT = 
    # passphase for aes eg: timeisimportant
    PASS_SECRET = 
    # jwt secret key eg: stopwastingtime
    JWT_SECRET_KEY = 
    # stripe secret (private) key
    STRIPE_SECRET_KEY = 
3. npm start or yarn start



