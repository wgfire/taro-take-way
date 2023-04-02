import { getAddressList } from "@src/apis/address/add-address";
import { useModel } from "./model";

export const usePresenter = () => {
  const model = useModel();

  const getAddressListData = async () => {
    try {
      model.setState({ loading: true });
      const result = await getAddressList();
      console.log(result, "x");
      model.setState({address:result.data})
    } finally {
      model.setState({ loading: false });
    }
  };

  return { model, getAddressListData };
};
