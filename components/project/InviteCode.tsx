"use client";
import { useProject } from "@/utils/contexts/projectContext";
import { Button, Input, Space } from "antd";
import { useState } from "react";

export default function InviteCode() {
  const { handleInviteCode } = useProject();
  const [inviteCode, setInviteCode] = useState<string>("");

  const handleSubmit = async () => {
    if (
      !inviteCode ||
      inviteCode.length !== 5 ||
      !/\d/.test(inviteCode) ||
      /[^\x00-\x7F]/.test(inviteCode)
    ) {
      return;
    }

    await handleInviteCode(inviteCode);
    setInviteCode("");
  };

  return (
    <div className="flex items-center gap-3">
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Space.Compact>
    </div>
  );
}
