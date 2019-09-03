export default function useSignOut(setTokenData, setUserData) {
  return () => {
    setTokenData(null);
    setUserData(null);
  };
}
