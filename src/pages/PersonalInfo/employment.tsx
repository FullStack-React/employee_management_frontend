import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/datepicker';
import { Combobox } from '@/components/ui/combobox';
import { useState } from 'react';
import Section from './section';
import { visaTypes } from '../Onborading/options';

const EmploymentSection = () => {
  const [editable, setEditable] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);
  const [visa, setVisa] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Section
      editable={editable}
      title="Employment"
      onClick={() => setEditable(!editable)}
    >
      <div className="flex my-5 justify-between items-end w-full">
        <div className="flex flex-col w-2/5">
          <Label className="my-1 text-md font-semibold">Visa Title</Label>
          <Combobox
            open={visaOpen}
            value={visa}
            buttonText="What is your work authorization?"
            options={visaTypes}
            disabled={!editable}
            onOpenChange={setVisaOpen}
            onSelect={currentValue => {
              setVisa(currentValue === visa ? '' : currentValue);
              setVisaOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">Start Date</Label>
          <DatePicker
            value={startDate}
            onSelect={setStartDate}
            disabled={!editable}
          />
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">End Date</Label>
          <DatePicker
            value={endDate}
            onSelect={setEndDate}
            disabled={!editable}
          />
        </div>
      </div>
    </Section>
  );
};

export default EmploymentSection;
