import { useState } from "react";
import jwtDecode from "jwt-decode";

export const postForm = (event, url) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const request = Object.fromEntries(formData);
  event.currentTarget.reset();

  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(request),
  });
};

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function isTokenValid(token) {
  const decoded = jwtDecode(token);
  const expirationDate = new Date(decoded.exp);
  const now = new Date();

  return now < expirationDate;
}
