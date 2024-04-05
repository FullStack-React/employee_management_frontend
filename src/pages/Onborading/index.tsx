import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import { Separator } from '@/components/ui/separator';
import { genders, states, citizenOp, identities, visaTypes } from './options';

interface EmergencyContact {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
}

const Onboarding = () => {
  const [stateOpen, setStateOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [citizenOpen, setCitizenOpen] = useState(false);
  const [identityOpen, setIdentityOpen] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);
  const [stateValue, setStateValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [citizen, setCitizen] = useState('');
  const [identity, setIdentity] = useState('');
  const [visa, setVisa] = useState('');

  const [date, setDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact[]>([
    { firstName: '', lastName: '', email: '', phone: '', relationship: '' },
  ]);

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col w-4/5 mx-auto bg-white">
        <header className="text-3xl font-semibold my-5 mx-28">
          Onboarding Application
        </header>
        <Separator className="my-5 w-4/5 self-center" />
        <div className="flex flex-col my-5 mx-44">
          <header className="text-2xl font-semibold my-5">
            Personal Information
          </header>
          <div className="flex my-5 items-center justify-between w-full">
            <div className="flex flex-col w-1/12 items-center">
              <Input
                onChange={e => {
                  if (e.target.files) {
                    if (e.target.files[0].size > 200000) {
                      alert('File size exceeds 200KB');
                    } else {
                      setAvatar(e.target.files[0]);
                    }
                  } else {
                    setAvatar(null);
                  }
                }}
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
              />
              <Label htmlFor="avatar" className="cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                  />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
              </Label>
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">First Name</Label>
              <Input type="text" placeholder="Enter your first name" />
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Last Name</Label>
              <Input type="text" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/2">
              <Label className="my-1 text-md font-semibold">Street</Label>
              <Input type="text" placeholder="Street Line" />
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">APT</Label>
              <Input type="text" placeholder="APT#" />
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">City</Label>
              <Input type="text" placeholder="City" />
            </div>
            <div className="flex flex-col w-1/5">
              <Label className="my-1 text-md font-semibold">State</Label>
              <Combobox
                open={stateOpen}
                value={stateValue}
                buttonText="State"
                options={states}
                placeholder="Select a State..."
                onOpenChange={setStateOpen}
                onSelect={currentValue => {
                  setStateValue(
                    currentValue === stateValue ? '' : currentValue,
                  );
                  setStateOpen(false);
                }}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Zip Code</Label>
              <Input type="text" placeholder="Zip Code" />
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/2">
              <Label className="my-1 text-md font-semibold">Email</Label>
              <Input type="text" placeholder="Enter your email address" />
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Cell Phone</Label>
              <Input type="text" placeholder="Enter your phone number" />
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">SSN</Label>
              <Input type="text" placeholder="Enter your ssn" />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">
                Date of Birth
              </Label>
              <DatePicker value={date} onSelect={setDate} />
            </div>
            <div className="flex flex-col w-1/5">
              <Label className="my-1 text-md font-semibold">Gender</Label>
              <Combobox
                open={genderOpen}
                value={genderValue}
                buttonText="Gender"
                options={genders}
                onOpenChange={setGenderOpen}
                onSelect={currentValue => {
                  setGenderValue(
                    currentValue === genderValue ? '' : currentValue,
                  );
                  setGenderOpen(false);
                }}
              />
            </div>
          </div>
          <div className="flex my-5 justify-start w-full">
            <div className="flex flex-col w-2/5">
              <Combobox
                open={citizenOpen}
                value={citizen}
                buttonText="Permanent resident or citizen of the U.S.?"
                options={citizenOp}
                onOpenChange={setCitizenOpen}
                onSelect={currentValue => {
                  setCitizen(currentValue === citizen ? '' : currentValue);
                  setCitizenOpen(false);
                }}
              />
            </div>
            {citizen === 'yes' && (
              <div className="ml-10 flex flex-col w-1/3">
                <Combobox
                  open={identityOpen}
                  value={identity}
                  buttonText="Citizen or Green Card"
                  options={identities}
                  onOpenChange={setIdentityOpen}
                  onSelect={currentValue => {
                    setIdentity(currentValue === identity ? '' : currentValue);
                    setIdentityOpen(false);
                  }}
                />
              </div>
            )}
          </div>
          {citizen === 'no' && (
            <div className="flex my-5 justify-between items-end w-full">
              <div className="flex flex-col w-2/5">
                <Combobox
                  open={visaOpen}
                  value={visa}
                  buttonText="What is your work authorization?"
                  options={visaTypes}
                  onOpenChange={setVisaOpen}
                  onSelect={currentValue => {
                    setVisa(currentValue === visa ? '' : currentValue);
                    setVisaOpen(false);
                  }}
                />
              </div>
              <div className="flex flex-col w-1/5">
                <Label className="my-1 text-md font-semibold">Start Date</Label>
                <DatePicker value={startDate} onSelect={setStartDate} />
              </div>
              <div className="flex flex-col w-1/5">
                <Label className="my-1 text-md font-semibold">End Date</Label>
                <DatePicker value={endDate} onSelect={setEndDate} />
              </div>
            </div>
          )}
          {visa === 'other' && (
            <div className="flex my-5 justify-between w-full">
              <div className="flex flex-col w-1/2">
                <Input type="text" placeholder="Specify visa type" />
              </div>
            </div>
          )}
          {visa === 'f1' && (
            <div className="flex my-5 justify-between w-full">
              <div className="flex flex-col w-1/2">
                <Label className="my-1 text-md font-semibold">
                  OPT Receipt
                </Label>
                <Input
                  onChange={e => {
                    if (e.target.files) {
                      if (e.target.files[0].size > 2000000) {
                        alert('File size exceeds 2MB');
                      } else {
                        setReceipt(e.target.files[0]);
                      }
                    } else {
                      setReceipt(null);
                    }
                  }}
                  type="file"
                  accept="application/pdf"
                />
              </div>
            </div>
          )}
          <Separator className="my-2 self-center" />
          <header className="text-2xl font-semibold my-5">
            Reference Information
          </header>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">First Name</Label>
              <Input type="text" placeholder="Enter first name" />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Middle Name</Label>
              <Input type="text" placeholder="Enter middle name" />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Last Name</Label>
              <Input type="text" placeholder="Enter last name" />
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Email</Label>
              <Input type="text" placeholder="Enter email address" />
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Phone</Label>
              <Input type="text" placeholder="Enter phone number" />
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">relationship</Label>
              <Input type="text" placeholder="Indicate relationship" />
            </div>
          </div>
          <Separator className="my-2 self-center" />
          <header className="text-2xl font-semibold my-5">
            Emergency Contact
          </header>
          {emergencyContact.map((contact, index) => (
            <>
              <div
                key={`${index}_1`}
                className="flex my-5 justify-between w-full"
              >
                <div className="flex flex-col w-1/4">
                  <Label className="my-1 text-md font-semibold">
                    First Name
                  </Label>
                  <Input
                    value={contact.firstName}
                    onChange={e => {
                      const newEmergencyContact = [...emergencyContact];
                      newEmergencyContact[index].firstName = e.target.value;
                      setEmergencyContact(newEmergencyContact);
                    }}
                    type="text"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <Label className="my-1 text-md font-semibold">
                    Middle Name
                  </Label>
                  <Input
                    value={contact.middleName}
                    onChange={e => {
                      const newEmergencyContact = [...emergencyContact];
                      newEmergencyContact[index].middleName = e.target.value;
                      setEmergencyContact(newEmergencyContact);
                    }}
                    type="text"
                    placeholder="Enter middle name"
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <Label className="my-1 text-md font-semibold">
                    Last Name
                  </Label>
                  <Input
                    value={contact.lastName}
                    onChange={e => {
                      const newEmergencyContact = [...emergencyContact];
                      newEmergencyContact[index].lastName = e.target.value;
                      setEmergencyContact(newEmergencyContact);
                    }}
                    type="text"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div
                key={`${index}_2`}
                className="flex my-5 justify-between w-full"
              >
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
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <Label className="my-1 text-md font-semibold">
                    relationship
                  </Label>
                  <Input
                    value={contact.relationship}
                    onChange={e => {
                      const newEmergencyContact = [...emergencyContact];
                      newEmergencyContact[index].relationship = e.target.value;
                      setEmergencyContact(newEmergencyContact);
                    }}
                    type="text"
                    placeholder="Indicate relationship"
                  />
                </div>
              </div>
            </>
          ))}
          <Button
            variant="link"
            className="text-blue-600 self-start p-0"
            onClick={() =>
              setEmergencyContact([
                ...emergencyContact,
                {
                  firstName: '',
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
          {(avatar || receipt) && (
            <>
              <Separator className="my-2 self-center" />
              <header className="text-2xl font-semibold my-5">
                Upload Documents
              </header>
              <ul className="flex flex-col w-1/2">
                {avatar && (
                  <li className="flex my-2 justify-between items-center">
                    <p>Profile Picture</p>
                    <p>{avatar.name}</p>
                  </li>
                )}
                {receipt && (
                  <li className="flex my-2 justify-between items-center">
                    <p>OPT Receipt</p>
                    <p>{receipt.name}</p>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
        <Button className="w-1/5 mx-auto mt-3 mb-16">Submit</Button>
      </div>
    </div>
  );
};

export default Onboarding;
