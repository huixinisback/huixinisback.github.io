import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { eventEmitter } from '../utils/EventEmitter';
import '../styles/ClothingUpload.css';
import NavLinks from "../Navbar/NavLinks"; // Path to the NavLinks component

const ClothingUpload = () => {
  const [clothName, setClothName] = useState("");
  const [clothImage, setClothImage] = useState(null);
  const [attributeOne, setAttributeOne] = useState("");
  const [attributeTwo, setAttributeTwo] = useState("");
  const [description, setDescription] = useState("");
  const [favourite, setFavourite] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setClothImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clothImage) return; // Early return if no image is selected
    try {
      const imageRef = ref(storage, `images/${clothImage.name}`);
      await uploadBytes(imageRef, clothImage);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "clothes"), {
        clothName,
        clothImage: imageUrl,
        attributeOne,
        attributeTwo,
        description,
        favourite,
      });

      eventEmitter.emit('clothingAdded'); // Emit event after successful upload
      // Optionally reset form fields here, for example:
      setClothName('');
      setClothImage(null);
      setAttributeOne('');
      setAttributeTwo('');
      setDescription('');
      setFavourite(false);

      // Display success alert
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <NavLinks /> {/* Include the NavLinks component here */}
      <div className="clothing-upload">
        <h2>Upload Clothing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clothName">Clothes Name:</label>
            <input
              type="text"
              id="clothName"
              value={clothName}
              onChange={(e) => setClothName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="clothImage">Image:</label>
            <input
              type="file"
              id="clothImage"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="attributeOne">Attribute One:</label>
            <input
              type="text"
              id="attributeOne"
              value={attributeOne}
              onChange={(e) => setAttributeOne(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="attributeTwo">Attribute Two:</label>
            <input
              type="text"
              id="attributeTwo"
              value={attributeTwo}
              onChange={(e) => setAttributeTwo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="favourite">Favourite:</label>
            <input
              type="checkbox"
              id="favourite"
              checked={favourite}
              onChange={(e) => setFavourite(e.target.checked)}
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default ClothingUpload;
