import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface SectionProps {
  editable: boolean;
  title: string;
  children: ReactNode;
  onClick: () => void;
}

const Section = (props: SectionProps) => {
  return (
    <>
      <div className="flex justify-between my-5">
        <header className="text-2xl font-semibold">{props.title}</header>
        {props.editable ? (
          <div className="flex justify-end">
            <Button className="mr-5" onClick={props.onClick}>
              Save
            </Button>
            <Button onClick={props.onClick}>Cancel</Button>
          </div>
        ) : (
          <Button className="w-1/6" onClick={props.onClick}>
            Edit
          </Button>
        )}
      </div>
      {props.children}
    </>
  );
};

export default Section;
