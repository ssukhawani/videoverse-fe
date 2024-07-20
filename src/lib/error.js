import { toast } from "@/components/ui/use-toast";
import { logMessage } from "@/constants/logMessage";

export const errors = {
    400: logMessage.BAD_REQUEST,
    401: logMessage.UN_AUTHORIZED,
    403: logMessage.PERMISSION_DENIED,
    404: logMessage.INVALID_REQUEST,
    500: logMessage.SERVER_ERROR,
  };
  
  function getTheErrorMessage(status) {
    return errors[status];
  }

  export function handleErrorToast(error) {
    if (error && error.response) {
      Object.entries(error.response.data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((error) => {
            toast({
              description: `${error.replace('This', `${key.charAt(0).toUpperCase() + key.slice(1)}`)}`,
              variant: "destructive",
            })
          });
        } else {
          if (key === "detail") {
            toast({
              description: value,
              variant: "destructive",
            })
          }
        }
      });
    } else {
      toast({
        description: getTheErrorMessage(error.status),
        variant: "destructive",
      })
    }
  }