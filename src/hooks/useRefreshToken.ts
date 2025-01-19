import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthData } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev: AuthData | null) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        user: prev?.user || "",
        roles: prev?.roles || [],
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
