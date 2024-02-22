const { VITE_APP_API_URL } = import.meta.env;
export const baseUrl = VITE_APP_API_URL;
import axios from "axios";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

// export const postRequest = async (url, body) => {
//   try {
//     const response = await axios.post(url, body);
//     return response.data;
//   } catch (err) {
//     if (err.response) {
//       const errData = err.response.data;
//       if (errData.message) {
//         return { error: true, message: errData.message };
//       } else {
//         return { error: true, message: errData };
//       }
//     }
//     return { error: true, message: err.message };
//   }
// };

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "An error occured...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return data;
};

// export const getRequest = async (url) => {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (err) {
//     if (err.response) {
//       const errData = err.response.data;
//       if (errData.message) {
//         return { error: true, message: errData.message };
//       } else {
//         return { error: true, message: errData };
//       }
//     }
//     return { error: true, message: err };
//   }
// };
