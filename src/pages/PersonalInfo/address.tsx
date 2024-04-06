import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Combobox } from '@/components/ui/combobox';
import { states } from '../Onborading/options';
import Section from './section';

const AddressSection = () => {
  const [editable, setEditable] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState('');

  return (
    <Section
      editable={editable}
      title="Address"
      onClick={() => setEditable(!editable)}
    >
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-1/2">
          <Label className="my-1 text-md font-semibold">Street</Label>
          <Input type="text" placeholder="Street Line" disabled={!editable} />
        </div>
        <div className="flex flex-col w-1/3">
          <Label className="my-1 text-md font-semibold">APT</Label>
          <Input type="text" placeholder="APT#" disabled={!editable} />
        </div>
      </div>
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">City</Label>
          <Input type="text" placeholder="City" disabled={!editable} />
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">State</Label>
          <Combobox
            open={stateOpen}
            value={stateValue}
            buttonText="State"
            options={states}
            placeholder="Select a State..."
            disabled={!editable}
            onOpenChange={setStateOpen}
            onSelect={currentValue => {
              setStateValue(currentValue === stateValue ? '' : currentValue);
              setStateOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Zip Code</Label>
          <Input type="text" placeholder="Zip Code" disabled={!editable} />
        </div>
      </div>
    </Section>
  );
};

export default AddressSection;
