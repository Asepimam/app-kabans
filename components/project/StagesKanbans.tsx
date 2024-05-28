import { StageKanbanProps } from "@/utils/types/stege";
import Stage from "./Stage";

const StagesKanbans: React.FC<StageKanbanProps> = ({ stages }) => {
  return (
    <div className="flex flex-row">
      {stages.map((stage) => (
        <div key={stage.id} className="flex flex-col">
          <Stage props={stage} />
        </div>
      ))}
    </div>
  );
};

export default StagesKanbans;
