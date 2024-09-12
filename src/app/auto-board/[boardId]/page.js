import AutoBoardDetail from "@/app/auto-board/_component/AutoBoardDetail";

export const metadata = {
    title: `Auto Board | Board Detail`,
    description: 'Board Detail for Auto Board'
};

const Page = ({params}) => {


  const { boardId } = params;

  return (
      <AutoBoardDetail boardId={boardId}/>
  );
};

export default Page;