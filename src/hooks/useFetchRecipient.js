import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(
        `${baseUrl}/api/users/find/${recipientId}`
      );

      if (response.error) {
        return setError(response.error);
      }

      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);

  return { recipientUser };
};

// import { useEffect, useState } from "react";
// import { baseUrl, getRequest } from "../utils/services";

// export const useFetchRecipientUser = (chat, user) => {
//   const [recipientUser, setRecipientUser] = useState(null);
//   const [error, setError] = useState(null);

//   const recipientId = chat?.members.find((id) => id !== user?._id);

//   useEffect(() => {
//     const getUser = async () => {
//       console.log("Current chat:", chat);
//       console.log("Current user:", user);
//       console.log("Recipient ID:", recipientId);

//       if (!recipientId) {
//         console.log("Recipient ID not found, returning null.");
//         return null;
//       }

//       console.log("Fetching user data for recipient ID:", recipientId);
//       const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

//       if (response.error) {
//         console.error("Error fetching user data:", response.error);
//         return setError(response.error);
//       }

//       console.log("User data fetched successfully:", response);
//       setRecipientUser(response);
//     };
//     getUser();
//   }, [chat, user, recipientId]);

//   return { recipientUser };
// };
