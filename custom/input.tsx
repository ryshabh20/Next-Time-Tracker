import { InputProps } from "react-select";

const Input = ({ classname, name, placeholder, type, label }:InputProps) => {
  return <input
    name={name}
    className={classname}
    placeholder={placeholder}
    type={type}
  ></input>;
};

export default Input;
