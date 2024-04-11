import React, { useEffect, useState } from "react";
import { fetchAccounts } from "../functions/customFunctions";

interface User {
  firstName: string;
  lastName: string;
  cardNumber: string;
}

const useFetchAccounts = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchAccounts();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);
  return users;
};

export default useFetchAccounts;
