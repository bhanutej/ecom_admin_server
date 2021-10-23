import { message } from "antd";

export const notifyMessage = (type, notifyText) => {
  if (type === "error") {
    message.error(notifyText);
  }
};
