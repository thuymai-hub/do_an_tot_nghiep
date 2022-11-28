import { Button } from "antd";

type ButtonFixedProps = {
  onClickButton?: Function;
  text?: string;
  icon?: any;
  loading?: boolean;
  size?: any;
  htmlType?: any;
  styleButton?: any;
  isDisable?: any;
  background?: string;
};

const SaveButton = ({
  text,
  onClickButton,
  icon,
  loading,
  size,
  htmlType,
  styleButton,
  isDisable,
  background,
}: ButtonFixedProps) => {
  return (
    <Button
      disabled={isDisable && isDisable}
      style={{
        borderRadius: "6px",
        backgroundColor: background || "green",
        borderColor: background || "green",
        color: "white",
      }}
      htmlType={htmlType ? htmlType : "button"}
      onClick={() => {
        onClickButton && onClickButton();
      }}
      size={size ? size : "middle"}
    >
      <b>{text}</b>
    </Button>
  );
};

export default SaveButton;
