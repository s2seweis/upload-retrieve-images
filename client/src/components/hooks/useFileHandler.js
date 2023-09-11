/* eslint-disable no-alert */
import {useState, useEffect, useContext, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';

const useFileHandler = (test) => {
  console.log("line:1", test);
 
  const [imageFile, setImageFile] = useState(test);
  console.log("line:2", imageFile);
  const [isFileLoading, setFileLoading] = useState(false);

  
  //   useEffect((test) => {
  //   const timer = setTimeout(() => {
  //     setImageFile(test);
  //     // setTestState1 (user.image)
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);


  // const [imageFile, setImageFile] = useState(initState);
  // const [isFileLoading, setFileLoading] = useState(false);

  const removeImage = ({ id, name }) => {
    console.log("line:3", id);
    console.log("line:4", name);
    const items = imageFile[name]?.filter((item) => item.id !== id);

    setImageFile({
      ...imageFile,
      [name]: items
    });
  };
  // const removeImage = ({ id, name }) => {
  //   const items2 = imageFile[name].filter((item) => item.id !== id);

  //   setImageFile({
  //     ...imageFile,
  //     [name]: items2
  //   });
  // };

  const onFileChange = (event, { name, type }) => {
    console.log("line:10", event);
    const val = event.target.value;
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setFileLoading(true);
    if (!regex.exec(val)) {
      alert('File type must be JPEG or PNG', 'error');
      setFileLoading(false);
    } else if (size > 0.5) {
      alert('File size exceeded 500kb, consider optimizing your image', 'error');
      setFileLoading(false);
    } else if (type === 'multiple') {
      console.log("line:11, you are there?");
      Array.from(event.target.files).forEach((file) => {
        const reader = new FileReader();
        console.log("line:13", reader);
        reader.addEventListener('load', (e) => {
          console.log("line:12", e);
          setImageFile((oldFiles) => ({
            ...oldFiles,
            [name]: [...oldFiles[name], { file, url: e.target.result, id: uuidv4() }]
          }));
        });
        reader.readAsDataURL(file);
      });

      setFileLoading(false);
    } else { // type is single
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        setImageFile({
          ...imageFile,
          [name]: { file: img, url: e.target.result }
        });
        setFileLoading(false);
      });
      reader.readAsDataURL(img);
    }
  };
  // const onFileChange = (event, { name, type }) => {
  //   const val = event.target.value;
  //   const img = event.target.files[0];
  //   const size = img.size / 1024 / 1024;
  //   const regex = /(\.jpg|\.jpeg|\.png)$/i;

  //   setFileLoading(true);
  //   if (!regex.exec(val)) {
  //     alert('File type must be JPEG or PNG', 'error');
  //     setFileLoading(false);
  //   } else if (size > 0.5) {
  //     alert('File size exceeded 500kb, consider optimizing your image', 'error');
  //     setFileLoading(false);
  //   } else if (type === 'multiple') {
  //     Array.from(event.target.files).forEach((file) => {
  //       const reader = new FileReader();
  //       reader.addEventListener('load', (e) => {
  //         setImageFile((oldFiles) => ({
  //           ...oldFiles,
  //           [name]: [...oldFiles[name], { file, url: e.target.result, id: uuidv4() }]
  //         }));
  //       });
  //       reader.readAsDataURL(file);
  //     });

  //     setFileLoading(false);
  //   } else { // type is single
  //     const reader = new FileReader();

  //     reader.addEventListener('load', (e) => {
  //       setImageFile({
  //         ...imageFile,
  //         [name]: { file: img, url: e.target.result }
  //       });
  //       setFileLoading(false);
  //     });
  //     reader.readAsDataURL(img);
  //   }
  // };

  return {
    imageFile,
    setImageFile,
    isFileLoading,
    onFileChange,
    removeImage,
    // imageFile,
    // setImageFile,
    // isFileLoading,
    // onFileChange,
    // removeImage
  };
};

export default useFileHandler;
