import {useState} from 'react';

export const useToggle = (
  initialValue: boolean,
): [boolean, () => void, (value: React.SetStateAction<boolean>) => void] => {
  const [booleanValue, setBooleanValue] = useState(initialValue);

  const toggle = () => {
    setBooleanValue(!booleanValue);
  };

  return [booleanValue, toggle, setBooleanValue];
};
