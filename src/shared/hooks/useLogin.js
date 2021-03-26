import { useCallback } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions";

const useLogin = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    (user, authDetails) => dispatch(actions.login(user, authDetails)),
    [dispatch]
  );

  return login;
};

export default useLogin;
