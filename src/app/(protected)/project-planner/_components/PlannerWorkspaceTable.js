'use client';
import React, {Fragment, useEffect, useState} from 'react';
import {getProjectPlans} from "@/actions/project-plan/all";
import {EllipsisVertical, ListEndIcon, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Transition, Menu} from "@headlessui/react";
import {deleteProjectPlan} from "@/actions/project-plan/destroy";
import {useToast} from "@/hooks/use-toast";

const PlannerWorkspaceTable = () => {

    const toast = useToast();
    const [projects, setProjects] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProjectPlans = async () => {
            try {
                const {data, error} = await getProjectPlans()
                // console.log('Resultss', data)
                setProjects(data)
            } catch (error){
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProjectPlans()
    }, []);

    if (isLoading) {
        return (
            <div className={'flex items-center justify-center mt-1/2'}>
                <Loader2 className={'animate-spin w-4 h-4'}/>
            </div>
        );
    }

    if (error) {
        return <div className={'text-red-500'}>Error: {error.message}</div>;
    }


    const deleteProject = async (indexToDelete) => {
        try {
            const result = await deleteProjectPlan(indexToDelete)
            setProjects(prevProjects => prevProjects.filter(project => project.id !== indexToDelete))
            toast.toast({title: 'Project deleted successfully', variant: 'destructive'})
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.toast({title: 'Error deleting project', description: error.message, variant: 'destructive'})
        }
    };

    return (
        <div className="container mx-auto py-8 text-sm">
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr>
                    <th className="px-4 py-2 border">Project Name</th>
                    <th className="px-4 py-2 border">Created</th>
                    <th className="px-4 py-2 border">Last Updated</th>
                    <th className="px-4 py-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {projects?.map((project, index) => (
                    <tr key={index} className="text-center">
                        <td className="px-4 py-2 border"><Link className={'p-8'} href={`/project-planner/docs/${project.id}`}>{project.title}</Link></td>
                    <td className="px-4 py-2 border">{project.createdAt.toLocaleString()}</td>
                        <td className="px-4 py-2 border">{project.updatedAt.toLocaleString()}</td>
                        <td className="px-4 py-2 border flex items-center justify-center space-x-2 text-sm">
                            <div className={'flex-1 flex items-center justify-center space-x-2 text-sm'}>
                                <Button asChild className="bg-black text-white px-2 py-1 rounded hover:bg-gray-500">
                                    <Link href={`#`}>Create Autoboard </Link>
                                </Button>
                                <Button asChild className="bg-gray-200 px-4 py-2 rounded mr-2 hover:bg-gray-500 hover:text-white">
                                    <Link href={`https://cms-plum-omega.vercel.app/?id=${project.id}`}>Create static CMS</Link>
                                </Button>
                            </div>
                            <DropdownMenu onDelete={() => deleteProject(project.id)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const DropdownMenu = ({ onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md focus:outline-none">
          <EllipsisVertical />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openModal}
                    className={`${
                      active ? 'text-red' : 'text-black'
                      // active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex items-center px-4 py-2 text-sm w-full`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M12 20.5A8.5 8.5 0 104.4 4.5m1.7 6.7a8.5 8.5 0 0110.9 9.6M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Project
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this project? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    onDelete();
                    closeModal();
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default PlannerWorkspaceTable;