"use client";

import { TaskProps } from "@/utils/types/task";
import { Card } from "antd";
import { Draggable } from "../Draggable";
const { Meta } = Card;
const Taks = ({ props }: { props: TaskProps }) => {
  const { id, title, expire_date } = props;
  return (
    <>
      <Draggable id={id}>
        <Card>
          <Meta title={title} description={expire_date} />
        </Card>
      </Draggable>
    </>
  );
};
export default Taks;
