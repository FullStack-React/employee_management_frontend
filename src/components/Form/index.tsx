import type { ChangeEvent, FC } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Field {
  type: string;
  name: string;
  label: string;
  value: any;
  placeholder: string;
  touched: any;
  error: any;
  onChange: (e: ChangeEvent<any>) => void;
}

interface FormProps {
  title: string;
  fields: Field[];
  buttonText: string;
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
            <Input
              type={field.type}
              name={field.name}
              value={field.value}
              placeholder={field.placeholder}
              onChange={field.onChange}
            />
            <p className="text-red-500 text-sm">
              {field.touched && field.error}
            </p>
          </div>
        ))}
        <Button type="submit">{props.buttonText}</Button>
      </form>
    </CardContent>
  </Card>
);

export default Form;
