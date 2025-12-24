import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

export const TimeControl = memo(
  ({
    allTimes,
    initialValue,
    onChange,
  }: {
    allTimes: Readonly<{ id: number; label: string }[]>;
    initialValue?: number[];
    onChange: (times: number[]) => void;
  }) => {
    const [times, setTimes] = useState<number[]>(initialValue ?? []);

    useEffect(() => {
      if (initialValue) {
        setTimes(initialValue);
      }
    }, [initialValue]);

    const handleChange = (value: number[]) => {
      setTimes(value);
      onChange(value);
    };

    const handleRemove = (timeToRemove: number) => {
      const newTimes = times.filter((v) => v !== timeToRemove);
      setTimes(newTimes);
      onChange(newTimes);
    };

    return (
      <FormControl>
        <FormLabel>시간</FormLabel>
        <CheckboxGroup colorScheme="green" value={times} onChange={(values) => handleChange(values.map(Number))}>
          <Wrap spacing={1} mb={2}>
            {times
              .sort((a, b) => a - b)
              .map((time) => (
                <Tag key={time} size="sm" variant="outline" colorScheme="blue">
                  <TagLabel>{time}교시</TagLabel>
                  <TagCloseButton onClick={() => handleRemove(time)} />
                </Tag>
              ))}
          </Wrap>
          <Stack
            spacing={2}
            overflowY="auto"
            h="100px"
            border="1px solid"
            borderColor="gray.200"
            borderRadius={5}
            p={2}
          >
            {allTimes.map(({ id, label }) => (
              <Box key={id}>
                <Checkbox key={id} size="sm" value={id}>
                  {id}교시({label})
                </Checkbox>
              </Box>
            ))}
          </Stack>
        </CheckboxGroup>
      </FormControl>
    );
  },
);
