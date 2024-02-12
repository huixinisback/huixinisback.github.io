import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { eventEmitter } from '../utils/EventEmitter';
import '../styles/ClothingGallery.css';
import NavLinks from "../Navbar/NavLinks";

const ClothingGallery = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const clothesCollectionRef = collection(db, "clothes");
        const clothesSnapshot = await getDocs(clothesCollectionRef);
        const clothesData = clothesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClothes(clothesData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchClothes();

    eventEmitter.on('clothingAdded', fetchClothes);

    return () => {
      eventEmitter.off('clothingAdded', fetchClothes);
    };
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "clothes", id));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      setClothes(clothes.filter((clothing) => clothing.id !== id));
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  return (
    <div>
      <NavLinks />
      {clothes.length === 0 ? (
        <div className="empty-gallery">
          <p>Add Clothings To find them here</p>
        </div>
      ) : (
        <div className="clothing-gallery">
          {clothes.map((clothing) => (
            <div key={clothing.id} className="clothing-item">
              <img src={clothing.clothImage} alt={clothing.clothName} className="card-img-top" />
              <h3>
                {clothing.clothName}
                {clothing.attributeOne || clothing.attributeTwo ? ` (${clothing.attributeOne || ''}${clothing.attributeOne && clothing.attributeTwo ? ', ' : ''}${clothing.attributeTwo || ''})` : ''}
              </h3>
              <p>{clothing.description}</p>
              <button onClick={() => handleDelete(clothing.id, clothing.clothImage)} className="btn btn-danger">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClothingGallery;
