# File/Video Handler for React with Node and MongoDB
- Project: Add images, image collections, pdf (still open!) & videos to the database or the server

# Covered Topics:
1.  Lifting State to the next ancestor component in the state tree for avoiding async behaviour
2.  Using local storage instead of a redux store or something else
3.  Use of Custom Hooks like (useUser, useDidMount, useFileHandler)
4.  Applying Suspense to let your component wait before it can render
5.  Add Loader from Ant Design
6.  Axios requests, configuration of the header | 'Content-Type': 'application/json' versus 'Content-Type': 'multipart/form-data' 

# Important: 
- You can place multiple defined objects in the body of an Axios POST request. 
- To do this, you can create an object that contains these two objects and then send that wrapper object in the request body. 

## More
1.  Problems Encountered:
- Async behaviour of the use state hook, not reflect state changes directly 
2.  Comment to Headers: 
- Header plays a crucial role in, they contain important information about the request

## Idea for streaming the video from mongo db is from: 
https://www.youtube.com/watch?v=y6Z-SZt-Xvw
