import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector(state => ({ ...state }));
  const fileUploadAndResize = e => {
    e.preventDefault();
    // console.log(e.target.files);
    // resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          uri => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then(res => {
                console.log('IMAGE UPLOAD RES DATA', res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch(err => {
                setLoading(false);
                console.log('CLOUDINARY UPLOAD ERROR ==> ', err);
              });
          },
          'base64'
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images [] in the parent component - ProductCreate
  };

  const handleImageRemove = public_id => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then(res => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter(item => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="form-group">
        {values.images.map(image => (
          <span
            onClick={() => handleImageRemove(image.public_id)}
            style={{ marginRight: '20px' }}
            key={image.public_id}
          >
            <Badge count="X" style={{ cursor: 'pointer' }}>
              <Avatar
                key={image.public_id}
                src={image.url}
                size={100}
                shape="square"
              />
            </Badge>
          </span>
        ))}
      </div>
      <div className="form-group" style={{ marginTop: '30px' }}>
        <label className="btn btn-primary btn-raised">
          Choose Image File
          <input
            className="form-control"
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
