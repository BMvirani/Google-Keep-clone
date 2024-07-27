import axios from "axios";
import config from "../../../config/config";
import en from "../en/en";

const t = en;
class AxiosService {
  static getApiHeader = () => {
    // let token =
      // typeof window !== "undefined" && localStorage.getItem("accessToken");
    // if (typeof window !== "undefined") {
    //   token = localStorage.getItem("accessToken");
    // }
    var header = {
      Accept: "application/json",
      deviceType: "web",
    };
    // if (token) {
    //   header.Authorization = "Bearer " + token;
    // }
    return header;
  };

  static callGetAPI = async (apiName, isToastParam, authHeaders = null) => {
    return await axios
      .get(apiName, {
        headers: authHeaders || this.getApiHeader(),
      })
      .then(async (response) => {
        if (response?.status === 200 && isToastParam) {
        }
        return response;
      })
      .catch((error) => {
        if (error.request.status === 403 || error.request.status === 401) {
        } else {
        }
      });
  };

  static callPostAPI = async (
    apiName,
    param,
    isToastParam,
    authHeaders = null
  ) => {
    return await axios
      .post(apiName, param, {
        headers: authHeaders || this.getApiHeader(),
      })
      .then(async (response) => {
        if (response?.status === 200) {
          if (response?.status === 200 && isToastParam) {
          }
        } else if (
          (response.status == 222 || response.status == 203) &&
          isToastParam
        ) {
          if (response.status == 222) {
          } else if (response.status == 203 && isToastParam) {
          }
        }
        return response;
      })
      .catch((error) => {
        if (error.request.status === 403 || error.request.status === 401) {
          if (isToastParam) {
          }
        } else {
        }
      });
  };

  static callPutAPI = async (
    apiName,
    param,
    isToastParam,
    authHeaders = null
  ) => {
    console.log('apiName', apiName)
    return await axios
      .put(apiName, param, {
        headers: authHeaders || this.getApiHeader(),
      })
      .then(async (response) => {

        if (response?.status === 200 && isToastParam) {
          if (response?.status === 200) {
          }
        } else if (
          (response?.status == 222 || response?.status == 203) &&
          isToastParam
        ) {
          if (response?.status == 222) {
          }
          if (response?.status == 203 && isToastParam) {
          }
        }
        return response;
      })
      .catch((error) => {
        console.log('error', error)
        if (error) {
          console.log('error', error)
        } else {
        }
      });
  };

  static callDeleteAPI = async (apiName, isToastParam, authHeaders = null) => {
    return await axios
      .delete(apiName, {
        headers: authHeaders || this.getApiHeader(),
      })
      .then(async (response) => {
        if (response?.status === 200 && isToastParam) {
        } else if (response.status === 203 && isToastParam) {
        }
        return response;
      })
      .catch((error) => {
        if (error?.request.status === 403 || error.request.status === 401) {
        } else {
        }
      });
  };
}

export default AxiosService;
