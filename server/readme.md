# Next:
- Scond Part for Streaming from Mongo DB
- Need to add a schema for /init-video,for define the folder?
- For streaming the video i need a specific folder structure in Mongo DB: 
- like folder videos -> fs.chunks/fs.files
- GridFS is a way to store and retrieve files in MongoDB, and each GridFSBucket is associated with a specific collection (bucket) where files are stored.
- Use Grid FS with an open Connection is something you not do
- with mongoose i need to close the open connection first, in MongoClient, the client.db(databaseName) its not needed,  the MongoDB Node.js driver requires manual management of connections.

![Alt text](<Secont Part.png>)

# Comment:
- Storing the Video Files into Mongo DB not the best practise, better using a provider like aws s3 buckt, and get from there a video url
-use const mongodb = require('mongodb'); for the connection instead of const mongoose = require('mongoose');

# Packages:
- nodemon
- script stand in package.json file 
- npm run watch

# Keywords:
- storage engine images
- Using Base64 Encoding 
- Better to store the image File on the server, otherwise the payload can be to big?

# New Snippet for VC 
- Jump to line : strg/ctrl + g
- inside visual studio console + touch[filename] = build a new file 


