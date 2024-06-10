// components/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
const FileUpload = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = async (acceptedFiles) => {
        setUploadProgress(0)
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        try {
            const url = MediaFilesUrl+'admin/imageupload'
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setUploadProgress(progress);
                },
            });

            setUploadedFile(response.data.fileName);
            document.getElementById("FinalFileName").value = response.data.fileName;
            const Fimg = MediaFilesUrl + MediaFilesFolder + '/' + response.data.fileName
            document.getElementById("Fimage").src = Fimg;
            
        } catch (error) {
            console.error('File upload error:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drag &amp; drop a file here, or click to select one</p>
            </div>
            <div style={{ fontSize: '10px' }}>
                {uploadProgress > 0 && (
                    <p>Uploading: {uploadProgress.toFixed(2)}%</p>
                )}
                {uploadedFile && <p>File uploaded: {uploadedFile}</p>}
            </div>
           
        </div>
    );
};

const dropzoneStyles = {
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
};

export default FileUpload;
