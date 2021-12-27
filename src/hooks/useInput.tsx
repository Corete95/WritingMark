import { useCallback, useState } from "react";

const useInput = (initiaData: any) => {
  const [value, setValue] = useState(initiaData);
  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
