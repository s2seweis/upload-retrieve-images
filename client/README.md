# File Handler for React with Node and MongoDB

## Covered Topics:

- Lifting State to the next ancestor component in the state tree for avoiding async behaviour
- Using local storage instead of a redux store & useSelector
- Use of Custom Hooks like (useUser, useDidMount, useFileHandler)
- Applying Suspense to let your component wait before it can render
- Add Loader from Ant Design

2.  Result:
- File Handler for add images, image collections, pdf & videos to the database or the server


3.  Additional for the project:
- Customize the file upload button


4.  Problems Encountered:
- Async behaviour of the use state hook, not reflect state changes directly 


5.  Currently: 

- axios post request, config the header: 
- 'Content-Type': 'application/json' versus 'Content-Type': 'multipart/form-data'
- Header plays a crucial role in conveying important information about the request being made
- Here are some common headers used in a POST request:
- Content-Type: This header specifies the type of data that is being sent in the request body. 
- Content-Length: This header indicates the size of the request body in bytes. It helps the server know how much data to expect.
- Authorization: This header contains the authentication token or credentials needed to access the requested resource.
- Cookie: For authentication or tracking purposes, they can include the Cookie header with the appropriate cookie values.


### Need making the test for the file upload with Content-Type': 'application/json' and 'Content-Type': 'multipart/form-data'

6. Next: 
- Build Playground & Add Route
