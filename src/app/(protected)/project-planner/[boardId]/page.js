import AutoBoardDetail from "@/app/(protected)/auto-board/_component/AutoBoardDetail";
import PlannerKanbanBoard from "@/app/(protected)/project-planner/_components/PlannerKanbanBoard";
import PortalContainer from "@/app/(protected)/_components/PortalContainer";

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