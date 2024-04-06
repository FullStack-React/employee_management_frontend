import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import Section from './section';

interface EmergencyContact {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
}

const EmergencySection = () => {
  const [editable, setEditable] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact[]>([
    {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: '',
    },
  ]);

  return (
    <Section
      editable={editable}
      title="Emergency Contact"
      onClick={() => setEditable(!editable)}
    >
      {emergencyContact.map((contact, index) => (
        <div key={index}>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">First Name</Label>
              <Input
                value={contact.firstName}
                onChange={e => {
                  const newEmergencyContact = [...emergencyContact];
                  newEmergencyContact[index].firstName = e.target.value;
                  setEmergencyContact(newEmergencyContact);
                }}
                type="text"
                placeholder="Enter first name"
                disabled={!editable}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Middle Name</Label>
              <Input
                value={contact.middleName}
                onChange={e => {
                  const newEmergencyContact = [...emergencyContact];
                  newEmergencyContact[index].middleName = e.target.value;
                  setEmergencyContact(newEmergencyContact);
                }}
                type="text"
                placeholder="Enter middle name"
                disabled={!editable}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Last Name</Label>
              <Input
                value={contact.lastName}
                onChange={e => {
                  const newEmergencyContact = [...emergencyContact];
                  newEmergencyContact[index].lastName = e.target.value;
                  setEmergencyContact(newEmergencyContact);
                }}
                type="text"
                placeholder="Enter last name"
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Email</Label>
              <Input
                value={contact.email}
                onChange={e => {
                  const newEmergencyContact = [...emergencyContact];
                  newEmergencyContact[index].email = e.target.value;
                  setEmergencyContact(newEmergencyContact);
                }}
                type="text"
                placeholder="Enter email address"
                disabled={!editable}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Phone</Label>
              <Input
                value={contact.phone}
                onChange={e => {
                  const newEmergencyContact = [...emergencyContact];
                  newEmergencyContact[index].phone = e.target.value;
                  setEmergencyContact(newEmergencyContact);
                }}
                type="text"
                placeholder="Enter phone number"
                disabled={!editable}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">relationship</Label>
              <Input
                value={contact.relationship}
                onChange={e => {
                  const newEmergencyContact = [...emergencyContact];
                  newEmergencyContact[index].relationship = e.target.value;
                  setEmergencyContact(newEmergencyContact);
                }}
                type="text"
                placeholder="Indicate relationship"
                disabled={!editable}
              />
            </div>
          </div>
          <Button
            variant="link"
            className="text-blue-600 self-start p-0"
            onClick={() =>
              setEmergencyContact([
                ...emergencyContact.slice(0, index),
                ...emergencyContact.slice(index + 1),
              ])
            }
          >
            -remove
          </Button>
        </div>
      ))}
      <Button
        variant="link"
        className="text-blue-600 self-start p-0"
        onClick={() =>
          setEmergencyContact([
            ...emergencyContact,
            {
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
              phone: '',
              relationship: '',
            },
          ])
        }
      >
        +add new
      </Button>
    </Section>
  );
};

export default EmergencySection;
