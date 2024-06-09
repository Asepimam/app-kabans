import { Button, Modal } from "antd";
import React, { useState } from "react";
import DeleteTask from "./DeleteTask";

const ActionModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    // Lakukan aksi hapus di sini
    console.log("Aksi Hapus");
    // munculkan DeleteTask jika diperlukan
    return <DeleteTask />;
    // setModalVisible(false);
  };

  const handleEdit = () => {
    // Lakukan aksi edit di sini
    console.log("Aksi Edit");
    // Tutup modal setelah menyelesaikan aksi edit jika diperlukan
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="text" onClick={() => setModalVisible(true)}></Button>
      <Modal
        title="Pilihan"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        style={{
          display: "flex",
          width: "100px",
          height: "200px",
        }}>
        <div className="flex flex-row gap-4">
          <DeleteTask />
        </div>
      </Modal>
    </div>
  );
};

export default ActionModal;
