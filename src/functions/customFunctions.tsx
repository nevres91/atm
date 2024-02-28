import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function random4DigitNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}
// ! Success toast:
export const successToast = (message: string) => toast.success(message);
// ! Error toast:
export const errorToast = (message: string) => toast.error(message);

//! generate a unique six-digit number (card Number)
export const generateUniqueNumber = () => {
  const timestamp = new Date().getTime();
  const uniqueId = timestamp % 1000000;
  const paddedUniqueId = uniqueId.toString().padStart(6, "0");
  return paddedUniqueId;
};
//! generate a unique four-digit number (PIN Number)
export const generateUniquePinNumber = () => {
  const timestamp = new Date().getTime();
  const uniqueId = timestamp % 10000;
  const random4 = random4DigitNumber();
  const pin = uniqueId + random4;
  const finalPin = pin % 10000;
  const paddedUniqueId = finalPin.toString().padStart(4, "0");
  return paddedUniqueId;
};

//! Check if a card with provided card Number exists
export const getFirstNameByCardNumber = async (cardNumber: number) => {
  const db = getFirestore(app);
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("cardNumber", "==", cardNumber));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    errorToast("Error fetching user!");
    console.error("Error fetching user:", error);
  }
};

// ! Check if the pin of the provided card number is correct:
export const validatePin = async (pin: string) => {
  const db = getFirestore(app);
  const cardNumbersCollection = collection(db, "cardNumbers");
  const q = query(cardNumbersCollection, where("pin", "==", pin));
  try {
    const querysnapshot = await getDocs(q);
    if (querysnapshot.size > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    errorToast("Wrong pin entered");
    console.error("Error fetching user:", error);
  }
};
