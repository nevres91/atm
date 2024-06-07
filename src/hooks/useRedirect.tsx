import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// *Redirect when theres no user logged in

const useRedirect = (currentCard: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentCard) {
      navigate("/inside");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);
};

export default useRedirect;
