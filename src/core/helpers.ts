// parse json with try catch and generic type
export const parseJSON = <T>(stringifiedJson: string): T | null => {
  let parsed: T | null = null;

  try {
    parsed = JSON.parse(stringifiedJson) as T;
  } catch (err) {
    console.error('parseJSON: %s', stringifiedJson);
  }

  return parsed;
};

// write to local storage indirectly
export const writeToLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value ?? ''));
};

// read from local storage indirectly
export const readFromLocalStorage = <T>(key: string): T | null => {
  const item: string | null = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  return parseJSON<T>(item) ?? null;
};

// remove from local storage indirectly
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
