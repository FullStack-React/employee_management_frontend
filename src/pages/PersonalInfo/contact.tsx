import Section from './section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const ContactSection = () => {
  const [editable, setEditable] = useState(false);

  return (
    <Section
      editable={editable}
      title="Contact"
      onClick={() => setEditable(!editable)}
    >
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-2/5">
          <Label className="my-1 text-md font-semibold">Cell Phone</Label>
          <Input type="text" placeholder="Cell Phone" disabled={!editable} />
        </div>
        <div className="flex flex-col w-2/5">
          <Label className="my-1 text-md font-semibold">Work Phone</Label>
          <Input type="text" placeholder="Work Phone" disabled={!editable} />
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
