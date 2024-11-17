'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';

import { RestaurantDtoTagsEnum } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';

export type RestaurantTag = (typeof RestaurantDtoTagsEnum)[keyof typeof RestaurantDtoTagsEnum];

const TAGS = Object.values(RestaurantDtoTagsEnum).map((tag) => ({
  value: tag,
  label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
}));

interface FancyMultiSelectProps {
  selected: { value: RestaurantTag; label: string }[];
  onSelectedChange: (selected: { value: RestaurantTag; label: string }[]) => void;
}

export function FancyMultiSelect({ selected, onSelectedChange }: FancyMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback(
    (tag: { value: RestaurantTag; label: string }) => {
      onSelectedChange(selected.filter((s) => s.value !== tag.value));
    },
    [selected, onSelectedChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            onSelectedChange(selected.slice(0, -1));
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [selected, onSelectedChange]
  );

  const selectables = TAGS.filter((tag) => !selected.includes(tag));

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selected.map((tag) => (
            <Badge key={tag.value} variant='secondary'>
              {tag.label}
              <button
                className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(tag);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(tag)}
              >
                <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder='Select tags...'
            className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in max-h-52 overflow-auto'>
              <CommandGroup className='overflow-auto'>
                {selectables.map((tag) => (
                  <CommandItem
                    key={tag.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      onSelectedChange([...selected, tag]);
                    }}
                    className={'cursor-pointer'}
                  >
                    {tag.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
