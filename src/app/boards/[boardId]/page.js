'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Kanban from "smart-webcomponents-react/kanban";
import 'smart-webcomponents-react/source/styles/smart.default.css'
import Link from "next/link";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";

const BoardPage = ({params}) => {
  const router = useRouter();
  const [users, setUsers] = useState([
    {
      id: 1,
      email: 'user2@example.com',
      name: 'User 1',
      profile: {
        bio: 'Bio for User 1',
      },
      allowAdd: true,
      allowComment: true,
      allowDrag: true,
      allowEdit: true,
      allowRemove: true,
    },
    {
      id: 2,
      email: 'user2@example.com',
      name: 'User 2',
      profile: {
        bio: 'Bio for User 2',
      },
      allowAdd: true,
      allowComment: true,
      allowDrag: true,
      allowEdit: true,
      allowRemove: true,
    },
    {
      id: 3,
      email: 'user3@example.com',
      name: 'User 3',
      profile: {
        bio: 'Bio for User 3',
      },
      allowAdd: true,
      allowComment: true,
      allowDrag: true,
      allowEdit: true,
      allowRemove: true,
    },
    {
      id: 4,
      email: 'user4@example.com',
      name: 'User 4',
      profile: {
        bio: 'Bio for User 4',
      },
      allowAdd: true,
      allowComment: true,
      allowDrag: true,
      allowEdit: true,
      allowRemove: true,
    }
  ]);
  const [board, setBoard] = useState(null);

  const { boardId } = params;


  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    const currentBoard = storedBoards.find((b) => b.id === parseInt(boardId, 10));
    setBoard(currentBoard);
  }, [boardId]);


  if (!board) return <div>Loading...</div>;

  const { title, columns, color } = board || {};

  console.log("title", title);
  console.log("color", color);
  console.log("columns", columns);


  return (
      <div className="relative w-full h-screen" style={{backgroundColor: color, opacity: 0.8}}>

        <button className={'absolute top-4 left-4 flex gap-2 items-center text-sm '} onClick={() => router.push('/')}>
          <ChevronLeftIcon className="h-6 w-6"/> <span>Back</span>
        </button>


        <div className={'w-[80%] mx-auto'}>
          <h1 className={'text-xl font-bold text-center py-12'}>{title}</h1>
          <Kanban
              id="projectKanban"
              // dataSource={tasks}
              columns={columns}
              editable={true}
              taskActions={true}
              taskComments={true}
              taskDue={true}
              taskProgress={true}
              userList={true}
              users={users}
              currentUser={users[0]?.id}
              taskTags={true}
              taskPriority={true}
              addNewButton={true}

              allowColumnEdit={true}
              addNewColumn={true}
              allowColumnRemove={true}
              columnSummary={true}
              collapsible={true}
              // autoColumnHeight={true}
              columnActions={true}
              columnFooter={true}
              columnColorEntireSurface={true}
              onSortPrepare={true}

              allowColumnReorder={true}
              addNewButtonDisplayMode={'bottom'}
              applyColumnColorToTasks={true}
              autoSaveState={true}
              taskActionsPosition={'right'}
              taskContentTemplate={'content'}
              taskHeaderTemplate={'header'}
              taskFooterTemplate={'footer'}
              taskTemplate={'task'}
              taskRemove={true}
              taskSummary={true}
              taskSummaryTemplate={'summary'}
              taskSummaryPosition={'bottom'}
              priorityList={true}
          />
        </div>


      </div>
  );
};

export default BoardPage;