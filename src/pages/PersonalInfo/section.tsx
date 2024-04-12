import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface SectionProps {
  editable: boolean;
  title: string;
  children: ReactNode;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  loading?: boolean;
  clickable?: boolean;
}

const Section = (props: SectionProps) => {
  return (
    <form className="my-5" onSubmit={props.onSubmit}>
      <div className="flex justify-between my-5">
        <header className="text-2xl font-semibold">{props.title}</header>
        {props.editable ? (
          <div className="flex justify-end">
            <Button disabled={props.loading} className="mr-5" type="submit">
              {props.loading && <Loader2 className="animate-spin mr-2" />}
              Save
            </Button>
            <Button type="button" onClick={props.onCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            disabled={props.clickable === undefined ? false : !props.clickable}
            type="button"
            className="w-1/6"
            onClick={props.onEdit}
          >
            Edit
          </Button>
        )}
      </div>
      {props.children}
    </form>
  );
};

export default Section;
