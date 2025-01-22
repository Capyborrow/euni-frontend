import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthData } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/Auth/Refresh",
      {},
      {
        withCredentials: true,
      }
    );
    console.log("New Token:", response.data.accessToken);
    setAuth((prev: AuthData | null) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        user: prev?.user || "",
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
