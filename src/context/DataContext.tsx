import React, { createContext, FC, useEffect, useState } from "react";
import axios from "axios";
import { IListBox } from "typings/db";
import { createBrowserHistory } from "history";

export const DataContext = createContext<Partial<any>>([]);
export const DataProvider: FC = ({ children }) => {
  const [listData, setListData] = useState<any>();
  const [queryString, setQueryString] = useState<string>("test.json");
  const history = createBrowserHistory();
  useEffect(() => {
    axios("http://localhost:3000/data/test.json").then((res) => {
      setListData(res.data);
    });
  }, []);

  useEffect(() => {
    axios(`http://localhost:3000/data/${queryString}`).then((res) => {
      setListData(res.data);
    });
  }, [queryString]);
  console.log("test", history);
  console.log("1", queryString);
  console.log("2", listData);
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
    <DataContext.Provider
      value={{ listData, setListData, changeBookmark, setQueryString }}
    >
      {children}
    </DataContext.Provider>
  );
};
