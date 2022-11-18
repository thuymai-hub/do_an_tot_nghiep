import { Select } from 'antd';
import React from 'react';
import { Input, TextArea } from '../Input';
import { TFormField } from './interface';

const components: any = {
  Input: Input,
  TextArea: TextArea,
  Select: Select
};

export const BaseForm: React.FC<TFormField> = ({ formField }) => {
  return (
    <div className="grid grid-cols-12 gap-x-2 gap-y-4">
      {Object.keys(formField).map((key: string) => {
        const field = formField[key];
        const Component = components[field.component || 'Input'];

        return (
          <div key={field.name} className={`${field.className || 'col-span-12'}`}>
            <div className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: field.label || '' }} />

            <Component placeholder={field.placeholder} value={field.value} />
          </div>
        );
      })}
    </div>
  );
};
