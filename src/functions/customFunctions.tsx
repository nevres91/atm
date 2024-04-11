import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import app from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { error } from "console";
import { useCardContext } from "../context/CardContext";

const db = getFirestore(app);

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

// !Get account balance
export const getBalance = async (cardNumber: string) => {
  const transactionDoc = await getDoc(doc(db, "transactions", `${cardNumber}`));
  if (transactionDoc) {
    const transactionsData = transactionDoc.data();
    const balance: number = transactionsData?.balance;
    return balance;
  } else {
    console.log("Account not found");
  }
};

// ! Set accounnt balance
export const setAccBalance = async (cardNumber: string, value: number) => {
  console.log(cardNumber);
  console.log("db:", db);
  const transactionDocRef = doc(db, "transactions", `${cardNumber}`);
  console.log("transactionDocRef", transactionDocRef);
  try {
    await setDoc(transactionDocRef, { balance: value }, { merge: true });
  } catch (error) {
    errorToast("An error occured!");
    console.error(error);
  }
};

// !Get a card's isConfiscated status.
export const getConfiscateStatus = async (cardNumber: string) => {
  const cardNumbersCollection = await getDoc(
    doc(db, "cardNumbers", `${cardNumber}`)
  );
  if (cardNumbersCollection) {
    const cardNumbersData = cardNumbersCollection.data();
    const isConfiscatedStatus = cardNumbersData?.isConfiscated;
    return isConfiscatedStatus;
  } else {
    console.log("Account not found");
  }
};

// !Change Confiscate status.
export const setConfiscateStatus = async (
  cardNumber: string,
  status: boolean
) => {
  const cardNumbersRef = doc(db, "cardNumbers", `${cardNumber}`);
  const cardNumbersCollection = await getDoc(cardNumbersRef);
  if (cardNumbersCollection) {
    await updateDoc(cardNumbersRef, {
      isConfiscated: status,
    });
  } else {
    console.log("Account not found");
  }
};

// !Fetch all accounts with names and account number
export const fetchAccounts = async () => {
  const usersCollection = collection(db, "users");
  const querySnapshot = await getDocs(usersCollection);
  const accounts: any = [];
  querySnapshot.forEach((doc) => {
    const { cardNumber, firstName, lastName } = doc.data();
    accounts.push({ firstName, lastName, cardNumber });
  });
  return accounts;
};
