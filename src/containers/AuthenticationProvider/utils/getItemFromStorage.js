export default function getItemFromStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key);

    return JSON.parse(serializedValue);
  } catch (e) {
    return undefined;
  }
}
