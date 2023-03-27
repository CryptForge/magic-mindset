import { useState } from "react";
import jwtDecode from "jwt-decode";
import { API_BASE } from "./main";

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

export const profileUpload = (token, formData) => {
  return fetch(`${API_BASE}/user/profile/edit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const verifyUserAccount = (email) => {
  return fetch(`${API_BASE}/auth/verify/${email}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUser = (id, token) => {
  return fetch(`${API_BASE}/user/profile/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authPostForm = (event, url, token) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const request = Object.fromEntries(formData);
  event.currentTarget.reset();

  return authFetch(url, token, JSON.stringify(request), "POST");
};

export const authFetch = (url, token, body, method = "GET") => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
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

  return Date.now() / 1000 < decoded.exp;
}
