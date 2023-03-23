import {useModel } from "./model";

export const usePresenter = () => {
  const model = useModel();


  return { model };
};