import { Separator } from '@/components/ui/separator';
import NameSection from './name';
import AddressSection from './address';
import ContactSection from './contact';
import EmergencySection from './emergency';
import EmploymentSection from './employment';

const PersonalInfo = () => {
  return (
    <div className="flex flex-grow">
      <div className="flex flex-col w-4/5 mx-auto bg-white rounded-lg mb-2">
        <header className="text-3xl font-semibold mt-16 mb-5 mx-28">
          Profile
        </header>
        <Separator className="my-5 w-4/5 self-center" />
        <div className="flex flex-col mt-5 mb-16 mx-44">
          <NameSection />
          <Separator className="my-2" />
          <AddressSection />
          <Separator className="my-2" />
          <ContactSection />
          <Separator className="my-2" />
          <EmploymentSection />
          <Separator className="my-2" />
          <EmergencySection />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
