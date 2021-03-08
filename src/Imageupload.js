import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db, storage } from './firebase';
import firebase from "firebase"
import imageUpload from "./imageUpload.css";

function Imageupload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setcaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageurl: url,
                            username: username
                        });
                        setProgress(0);
                        setcaption("");
                        setImage(null);
                    })
            }
        )
    };

    return (
        <div  className = "imageUpload">
            <input type="file" onChange={handleChange} />
            <input type="text" placeholder="Enter A Caption..."
                onChange={event => setcaption(event.target.value)} value={caption} />
            <progress value={progress} className="imageUpload__progress" max="100" />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default Imageupload;
