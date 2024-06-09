import { Button, Drawer } from "antd";
import React from "react";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";

const ChatDrawer: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button type="text" onClick={showLoading}>
        <HiChatBubbleLeftEllipsis className="text-gray-500 h-4 w-4" />
      </Button>
      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={showLoading}>
          Reload
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
