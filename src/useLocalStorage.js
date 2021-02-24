import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(getFromLocalStorage);

  /** Given a key and initial value, 
   * check if there is currently a value in local storage with that key
   * - If so, return that value. 
   * - Otherwise, return the initial value.
  */
  function getFromLocalStorage() {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('err in getFromLocalStorage', err);
      return initialValue;
    }
  }

  /** Function that takes in a value and 
   * stores value in state and local storage.
   * 
   * If value passed is a function, 
   *    store result of the current value passed into that function.
   */
  function setValue(value) {
    try {
      // if you pass to setValue a function, then set the value to be what is
      // currently stored passed into the function.
      const valueToStore = 
        (value instanceof Function)
          ? value(storedValue) 
          : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error('error in setValue', err);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;