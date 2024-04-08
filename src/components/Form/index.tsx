import type { ChangeEvent, FC } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Field {
  type: string;
  name: string;
  label: string;
  value: any;
  placeholder: string;
  options?: any[];
  touched: any;
  error: any;
  onChange: (e: any) => void;
}

interface FormProps {
  title: string;
  fields: Field[];
  buttonText: string;
  loading?: boolean;
  onSubmit: (values: any) => void;
}

const Form: FC<FormProps> = props => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{props.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={props.onSubmit}>
        {props.fields.map(field => (
          <div key={field.name} className="my-5">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === 'select' ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={field.onChange}
              />
            )}
            <p className="text-red-500 text-sm">
              {field.touched && field.error}
            </p>
          </div>
        ))}
        <Button disabled={props.loading} type="submit">
          {props.loading && <Loader2 className="animate-spin mr-2" />}
          {props.buttonText}
        </Button>
      </form>
    </CardContent>
  </Card>
);

export default Form;
