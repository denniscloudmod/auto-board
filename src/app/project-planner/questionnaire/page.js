'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import 'smart-webcomponents-react/source/modules/smart.form';
import 'smart-webcomponents-react/source/modules/smart.datetimepicker';
import 'smart-webcomponents-react/source/modules/smart.dropdownlist';
import 'smart-webcomponents-react/source/modules/smart.input';
import 'smart-webcomponents-react/source/modules/smart.maskedtextbox';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import QuestionnaireForm from "@/components/forms/QuestionnaireForm";

const Page = () => {
  return (
      <div className={'flex items-center justify-center w-full mt-20'}>
        <QuestionnaireForm/>
      </div>
  );
};

export default Page;