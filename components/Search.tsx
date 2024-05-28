"use client";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);
const SearchComponen: React.FC = () => {
  return (
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
  );
};
export default SearchComponen;
