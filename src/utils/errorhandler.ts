import Axios = require("axios");
import http = require("http");

type httpError = { request: http.ClientRequest };
type requestError = Axios.AxiosError | httpError | Error;

const isAxiosError = (arg: any): arg is Axios.AxiosError =>
  arg.response !== undefined;
const isHttpError = (arg: any): arg is httpError => arg.request !== undefined;

export const errHandler = (error: requestError) => {
  if (isAxiosError(error)) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response!.data);
    console.log(error.response!.status);
    console.log(error.response!.headers);
  } else if (isHttpError(error)) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error: ", error.message);
  }
  console.log((error as Axios.AxiosError).config);
};
