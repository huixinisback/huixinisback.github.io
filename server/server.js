const express = require('express');
const cors = require('cors');
const { db, auth, storage } = require('./firebaseAdmin'); // Assuming storage is also exported

const app = express();

app.use(express.json());
app.use(cors());

// Route for getting a user profile from Firestore
app.get('/api/user/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(doc.data());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Hypothetical route for generating clothing options
app.get('/api/clothing/generate/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    // This is a placeholder. You'll need to replace it with your own logic
    // for fetching and generating clothing options based on user preferences or attributes
    const clothingItems = await db.collection('clothing').where('userId', '==', uid).get();
    if (clothingItems.empty) {
      return res.status(404).json({ message: 'No clothing items found for this user.' });
    }
    const itemsData = clothingItems.docs.map(doc => doc.data());
    return res.status(200).json(itemsData);
  } catch (error) {
    console.error('Error fetching clothing items:', error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
