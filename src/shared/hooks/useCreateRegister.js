import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions";

const useCreateRegister = () => {
  const dispatch = useDispatch();

  const register = useCallback(
    (authDetails, user, token) => {
      Keyboard.dismiss();
      dispatch(actions.register(authDetails, user, token));
    },
    [dispatch]
  );

  return register;
};

export default useCreateRegister;
