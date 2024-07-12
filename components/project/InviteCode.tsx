"use client";
import { useProject } from "@/utils/contexts/projectContext";
import { Button, Input, message, Space } from "antd";
import { useState } from "react";

export default function InviteCode() {
  const { handleInviteCode } = useProject();
  const [inviteCode, setInviteCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      !inviteCode ||
      inviteCode.length !== 6 ||
      !/\d/.test(inviteCode) ||
      /[^\x00-\x7F]/.test(inviteCode)
    ) {
      return message.error("Invalid invite code");
    }

    setLoading(true);
    try {
      await handleInviteCode(inviteCode);
      setInviteCode("");
    } catch (error) {
      message.error("Failed to process invite code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          disabled={loading} // Disable input saat loading
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}>
          {" "}
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
}
