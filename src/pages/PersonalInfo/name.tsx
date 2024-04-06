import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import { Combobox } from '@/components/ui/combobox';
import { genders } from '../Onborading/options';
import Section from './section';

const NameSection = () => {
  const [editable, setEditable] = useState(false);
  const [date, setDate] = useState(new Date());

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState('');

  return (
    <Section
      editable={editable}
      title="Name"
      onClick={() => setEditable(!editable)}
    >
      <div className="flex my-5 items-center justify-between w-full">
        <div className="flex w-1/5">
          <Input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            disabled={!editable}
          />
          <Label
            htmlFor="avatar"
            className={`${editable ? 'cursor-pointer' : 'cursor-not-allowed'} w-full h-full`}
          >
            <Avatar className="rounded-full w-full h-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
          </Label>
        </div>
        <div className="flex flex-col w-3/5">
          <Label className="my-1 text-md font-semibold">Email</Label>
          <Input
            disabled={!editable}
            type="text"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className="flex my-5 items-center justify-between w-full">
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">First Name</Label>
          <Input
            disabled={!editable}
            type="text"
            placeholder="Enter your first name"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Middle Name</Label>
          <Input
            disabled={!editable}
            type="text"
            placeholder="Enter your last name"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Last Name</Label>
          <Input
            disabled={!editable}
            type="text"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      <div className="flex my-5 items-center justify-between w-full">
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Prefered Name</Label>
          <Input
            disabled={!editable}
            type="text"
            placeholder="Enter your prefered name"
          />
        </div>
      </div>
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-1/3">
          <Label className="my-1 text-md font-semibold">SSN</Label>
          <Input
            type="text"
            placeholder="Enter your ssn"
            disabled={!editable}
          />
        </div>
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Date of Birth</Label>
          <DatePicker disabled={!editable} value={date} onSelect={setDate} />
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">Gender</Label>
          <Combobox
            open={genderOpen}
            value={genderValue}
            buttonText="Gender"
            options={genders}
            disabled={!editable}
            onOpenChange={setGenderOpen}
            onSelect={currentValue => {
              setGenderValue(currentValue === genderValue ? '' : currentValue);
              setGenderOpen(false);
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export default NameSection;
