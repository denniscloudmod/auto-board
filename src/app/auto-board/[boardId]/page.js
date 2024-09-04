import BoardCreateList from "@/app/auto-board/_component/BoardCreateList";

export const metadata = {
    title: 'Auto Board',
    description: 'Create a new board.'
};

const Page = ({params}) => {


  const { boardId } = params;


  return (
      <BoardCreateList boardId={boardId}/>
  );
};

export default Page;