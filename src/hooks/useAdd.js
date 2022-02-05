import { useState, useMemo } from "react";

const useAdd = () => {
  const [count, setCount] = useState(0);
  const action = useMemo(() => {
    return {
      changeCount: () => setCount((s) => s + 1),
    };
  }, []);
  return {
    count,
    action,
  };
};

export default useAdd;
