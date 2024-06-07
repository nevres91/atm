import { useEffect, useState } from "react";
import { useCardContext } from "../context/CardContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import { errorToast, getConfiscateStatus } from "../functions/customFunctions";

const useUserData = (uid: any) => {
  const [userName, setUserName] = useState("");
  const { setCurrentCard, isConfiscated, setIsConfiscated } = useCardContext();

  useEffect(() => {
    const getUserData = async () => {
      const db = getFirestore(app);
      try {
        const users = await getDoc(doc(db, "users", `${uid}`));
        if (users.exists()) {
          const usersData = users.data();
          const cardNumber = usersData.cardNumber;
          const confStatus = await getConfiscateStatus(cardNumber);
          setCurrentCard(cardNumber);
          setIsConfiscated(confStatus);
          setUserName(`${usersData.firstName} ${usersData.lastName}`);
        }
      } catch (error) {
        errorToast("Error fetching user data");
      }
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);
  return { userName, isConfiscated };
};

export default useUserData;
