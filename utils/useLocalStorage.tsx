import { useEffect, useState, Dispatch, SetStateAction } from "react";

type StoredValue<T> = T | null;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [StoredValue<T>, Dispatch<SetStateAction<StoredValue<T>>>] {
  const isClient = typeof window !== "undefined"; // Check if running in client-side

  const storedValue = isClient ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<StoredValue<T>>(initial);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isClient]);

  return [value, setValue];
}

// import { useEffect, useState, Dispatch, SetStateAction } from "react";

// type StoredValue<T> = T | null;

// export function useLocalStorage<T>(
//   key: string,
//   initialValue: T,
// ): [StoredValue<T>, Dispatch<SetStateAction<StoredValue<T>>>] {
//   // create a answers object and then store it in local storage and then inside it store the answers when the hook is called

//   const storedValue = localStorage.getItem(key);
//   const initial = storedValue ? JSON.parse(storedValue) : initialValue;

//   const [value, setValue] = useState<StoredValue<T>>(initial);

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }
