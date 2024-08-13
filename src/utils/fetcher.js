import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";

const fetcher = ({
  method = "GET",
  request = "",
  payload = {},
  headerOptions
}) => {
  
  // const authorization = { Authorization: token }
  //   headerOptions=authorization
   // console.log(`${process.env.REACT_APP_HOST_API_KEY}`);
  const  url = `${process.env.REACT_APP_PAYROLL_API_URL}/${request}`;
 // console.log(url);
  
  const options = {
    method,
    url,
    data: payload,
    headers: {
      
      ...headerOptions,
    },
  };
  console.log("Options in Fetecher", options);
  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
       // console.log("res",res)
        if (res.status === "SUCCESS" || res.status === true || res.status === 200) {
         // console.log("yes")
          resolve(res);
        } else {
         // console.log("No")
          reject(res);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export default fetcher;
