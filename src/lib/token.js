import { jwtDecode } from "jwt-decode";

export function decodeAndValidateToken(token) {
    try {
      const decoded = jwtDecode(token);
      const isValid = decoded && (decoded.exp * 1000 > Date.now());
      // console.log(decoded,isValid)
      return {
        decodedToken: decoded,
        isValidToken: isValid,
      };
    } catch (error) {
      // console.error("Invalid token:", error.message);
      return {
        decodedToken: null,
        isValidToken: false,
      };
    }
  }