import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxProps {
  open: boolean;
  value: string;
  buttonText: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
}

export const Combobox = (props: ComboboxProps) => {
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={props.open}
          className={cn(
            'justify-between font-normal overflow-hidden',
            !props.value && 'text-muted-foreground',
          )}
        >
          {props.value
            ? props.options.find(option => option.value === props.value)?.label
            : props.buttonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {props.placeholder && (
            <CommandInput placeholder={props.placeholder} />
          )}
          <CommandList>
            <CommandEmpty>No State found.</CommandEmpty>
            <CommandGroup>
              {props.options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={props.onSelect}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      props.value === option.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
