'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import 'smart-webcomponents-react/source/modules/smart.form';
import 'smart-webcomponents-react/source/modules/smart.datetimepicker';
import 'smart-webcomponents-react/source/modules/smart.dropdownlist';
import 'smart-webcomponents-react/source/modules/smart.input';
import 'smart-webcomponents-react/source/modules/smart.maskedtextbox';
import 'smart-webcomponents-react/source/styles/smart.default.css';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const form = new window.Smart.Form('#plannerQuestionnaire', {
      label: 'Project Planner Questionnaire',
      labelAlign: 'center',
      viewMode: 'breadcrumb',
      showSummary: false,
      showButtons: true,
      controls: [
        {
          controlType: 'group',
          label: 'Step 1',
          dataField: 'step1',
          columns: 2,
          labelPosition: 'top',
          controls: [
            {
              dataField: 'taskProcessType',
              controlType: 'dropdownlist',
              placeholder: 'Specifications',
              cssClass: 'outlined',
              label: 'What specific tasks, applications, or processes do you plan to run on AWS?',
              columnSpan: 2,
              controlOptions: {
                dataSource: [
                  "Hosting a website",
                  "Running a database",
                  "Processing large amounts of data",
                  "Backup and disaster recovery",
                  "AI/ML workloads",
                  "e-commerce platform",
                  "other"
                ]
              },
              required: true
            },
            {
              dataField: 'primaryBusinessObjective',
              controlType: 'dropdownlist',
              placeholder: 'Primary Business Objective',
              cssClass: 'outlined',
              label: 'What are your primary business objectives and goals for this project?',
              columnSpan: 2,
              controlOptions: {
                dataSource: [
                  "Increase revenue",
                  "improve customer experience",
                  "reduce costs",
                  "enhance security",
                  "scale operations",
                  "other"
                ]
              },
              required: true
            },
            {
              dataField: 'existingInfrastructure',
              controlType: 'dropdownlist',
              placeholder: 'Existing infrastructure',
              cssClass: 'outlined',
              label: 'Do you have any existing infrastructure, and how do you plan to integrate or migrate it to AWS?',
              columnSpan: 2,
              controlOptions: {
                dataSource: [
                  "We have on-premise servers.",
                  "We use another cloud provider.",
                  "We're starting from scratch",
                  "We're not sure",
                  "other"
                ]
              },
              required: true
            },
          ]
        },
        {
          controlType: 'group',
          label: 'Step 2',
          dataField: 'step2',
          columns: 2,
          labelPosition: 'top',
          controls: [
            {
              dataField: 'scalabilityPerformanceRequirements',
              controlType: 'dropdownlist',
              placeholder: 'Scalability Performance Requirements',
              cssClass: 'outlined',
              label: 'What are your scalability and performance requirements?',
              columnSpan: 2,
              controlOptions: {
                dataSource: [
                  "Handle seasonal spikes in traffic",
                  "Support a growing number of users",
                  "Maintain fast response times under heavy load",
                  "other"
                ]
              },
              required: true
            },
            {
              dataField: 'securityComplianceGovernance',
              controlType: 'dropdownlist',
              placeholder: 'Security Compliance & Governance',
              cssClass: 'outlined',
              label: 'What are your security, compliance, and governance requirements?',
              columnSpan: 2,
              controlOptions: {
                dataSource: [
                  "Data encryption",
                  "User access control",
                  "compliance with specific regulations (e.g., GDPR, HIPAA)",
                  "audit trails",
                  "other"
                ]
              },
              required: true
            },
          ]
        },
        {
          controlType: 'group',
          label: 'Review',
          dataField: 'orderSummary',
          controls: [
            {
              controlType: 'group',
              columns: 2,
              dataField: 'order',
              controls: [
                {
                  controlType: 'template',
                  dataField: 'products',
                  columnSpan: 2
                }
              ]
            },
            {
              controlType: 'group',
              columns: 2,
              columnSpan: 2,
              controls: [
                {
                  controlType: 'button',
                  action: 'submit',
                  label: 'Generate',
                  cssClass: 'primary',
                  align: 'right'
                },
                {
                  controlType: 'button',
                  action: 'reset',
                  label: 'Reset',
                  align: 'left'
                }
              ]
            }
          ]
        }
      ]
    });

    const updateOrderSummary = () => {
      const value = form.value;
      form.onValueChanges = null;
      form.orderSummary.order.products.value = `
<section id="order" class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold mb-4">Summary</h2>
<div id="orderSummary" class="space-y-4">
    <div class="flex flex-col gap-2 border-b pb-2">
        <span class="font-semibold">What specific tasks, applications, or processes do you plan to run on AWS?</span>
        <span>${value.step1.taskProcessType}</span>
    </div>
    <div class="flex flex-col gap-2 border-b pb-2">
        <span class="font-semibold">Do you have any existing infrastructure, and how do you plan to integrate or migrate it to AWS?</span>
        <span>${value.step1.primaryBusinessObjective}</span>
    </div>
    <div class="flex flex-col gap-2 border-b pb-2">
        <span class="font-semibold">What are your primary business objectives and goals for this project?</span>
        <span>${value.step1.existingInfrastructure}</span>
    </div>
    <div class="flex flex-col gap-2 border-b pb-2">
        <span class="font-semibold">What are your scalability and performance requirements?</span>
        <span>${value.step2.scalabilityPerformanceRequirements}</span>
    </div>
    <div class="flex flex-col gap-2 border-b pb-2">
        <span class="font-semibold">What are your security, compliance, and governance requirements</span>
        <span>${value.step2.securityComplianceGovernance}</span>
    </div>
</div>
</section>
`;
      form.onValueChanges = () => {
        updateOrderSummary();
      };
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const value = form.value;
      localStorage.setItem('plannerQuestionnaire', JSON.stringify(value));
      alert('Redirecting to the AI editor...');
      router.push('/ai/editor');
    };

    document.querySelector('#plannerQuestionnaire').addEventListener('submit', handleSubmit);

    updateOrderSummary();
    form.onValueChanges = () => {
      updateOrderSummary();
    };
  }, []);

  return (
      <div className={'flex items-center justify-center w-full mt-20'}>
        <form id="plannerQuestionnaire"></form>
      </div>
  );
};

export default Page;