import apiRoutes from "../../../../config/apiRoutes";
import AxiosService from "../axios.services";


class AuthService {
  static Login = async (param) => {
    let apiName = apiRoutes.login;
    let rawResult = await AxiosService.callPostAPI(apiName, param);
    return { status: rawResult.status, data: rawResult.data };
  };

  static signout = async (param) => {
    let apiName = apiRoutes.auth.signout;
    let rawResult = await AxiosService.callPostAPI(apiName, param);
    return rawResult;
  };
}

export default AuthService;
