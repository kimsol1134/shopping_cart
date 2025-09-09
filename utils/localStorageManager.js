const storageManager = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return undefined;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
    }
  }
};

export default storageManager;