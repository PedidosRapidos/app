import { useState } from "react";

export const useForm = <T extends Record<any, any>>(initState: T) => {
  const [state, setState] = useState(initState);

  const onChange = <K extends keyof T>(field: K, value: T[K]) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    setForm: setState,
    form: state,
    onChange,
  };
};
