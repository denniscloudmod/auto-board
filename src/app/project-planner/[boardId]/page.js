import AutoBoardDetail from "@/app/auto-board/_component/AutoBoardDetail";
import PlannerKanbanBoard from "@/app/project-planner/_components/PlannerKanbanBoard";

export const metadata = {
    title: `Auto Board | Board Detail`,
    description: 'Board Detail for Auto Board'
};

const Page = ({params}) => {


  const { boardId } = params;

  return (
      <PlannerKanbanBoard boardId={boardId}/>
  );
};

export default Page;