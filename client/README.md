### Next:
1. Customize the file upload button
- https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8


02/09/2023 (2 h)
- check if I can cut the component into smaller chunks
- read: how to avoid that some state will be rendered again
- try to finish the single image component
- go to the image collection component
- for components & and pages with much state, makes the inline style the code messier 

- useEffect Hook for dispach the state to the useState hook?


#### Next: Lifting up the state to maintain data consistency

1. lift up the useEffect hook to an extra layer that is higer in the hierarchy so that i can pass down the user state as props to the EditUSer component

2. Passing down the User State |user.imageCollection| as initial state to the imageFile hook

3. Should fix that the imageFile hook get an empty initial state


### Problem: The initial state of the useState Hook not wait for the parameter passed down  