import React, { useState } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';

const Prescription = () => {
  const [file, setFile] = useState();

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  function handleChange(e) {
    if (e.target.name === 'file') {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:5000/api/prescription/add';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('userId', userInfo._id);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    // await axios.post(url, formData, config)
    //   .then((response) => {
    //     console.log(response);
    //   }
    //   )
    //   .catch((error) => {
    //     console.log(error);
    //   }
    //   );

    const response = await axios.post(url, formData, config);
    if (response.status === 200) {
      alert('Prescription added successfully');
    }
  }

  return (
    <div>
      <h1>Prescription</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <form onSubmit={handleSubmit}>
        <h1>Upload here</h1>
        <input type="file" name="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Prescription;
