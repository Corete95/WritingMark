import React, { createContext, FC, useEffect, useState } from "react";
import axios from "axios";
import { IListBox } from "typings/db";

export const DataContext = createContext<Partial<any>>([]);
export const DataProvider: FC = ({ children }) => {
  const [listData, setListData] = useState<any>();

  useEffect(() => {
    axios("http://localhost:3000/data/test.json").then((res) => {
      setListData(res.data);
    });
  }, []);

  const changeBookmark = (id: number) => {
    setListData(
      listData?.map((data: IListBox) => {
        if (data?.id == id) {
          return {
            ...data,
            bookmark: data.bookmark + 1,
          };
        }
        return data;
      }),
    );
  };

  return (
    <DataContext.Provider value={{ listData, setListData, changeBookmark }}>
      {children}
    </DataContext.Provider>
  );
};
