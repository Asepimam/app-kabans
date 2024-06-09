import { useTasks } from "@/utils/contexts/tasksContext";
import { createClient } from "@/utils/supabase/client";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import { MdDeleteOutline } from "react-icons/md";

const DeleteTask = ({ id }: { id: string }) => {
  const supabase = createClient();
  const { deleteTask } = useTasks();

  const onDeleteHandler = async () => {
    await deleteTask(id);
  };

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      onConfirm={onDeleteHandler}>
      <Button type="text">
        <MdDeleteOutline className="text-gray-500 h-4 w-4" />
      </Button>
    </Popconfirm>
  );
};

export default DeleteTask;
