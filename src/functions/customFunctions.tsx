import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "../firebaseConfig";

export const generateUniqueNumber = () => {
  const timestamp = new Date().getTime(); // Get current timestamp
  const uniqueId = timestamp % 1000000; // Use modulo to ensure it's a 6-digit number

  return uniqueId;
};

export const getFirstNameByCardNumber = async (cardNumber: number) => {
  const db = getFirestore(app);
  const usersCollection = collection(db, "users");

  // Create a query to find the document where cardNumber matches
  const q = query(usersCollection, where("cardNumber", "==", cardNumber));

  try {
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if there's a matching document
    if (querySnapshot.size > 0) {
      // Access the first document in the result
      const userDoc = querySnapshot.docs[0];

      // Access the data of the document
      const userData = userDoc.data();

      // Retrieve the firstName from the data
      const firstName = userData.firstName;

      // Do something with the firstName
      console.log("User's firstName:", firstName);
    } else {
      // No matching document found
      console.log("No user found with the provided cardNumber");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
