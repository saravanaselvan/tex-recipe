import React, { useState } from 'react';
import { Modal, TextInput, NumberInput, Button, Group } from '@mantine/core';

interface CalculateMixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: (liters: number) => void;
}

const CalculateMixModal: React.FC<CalculateMixModalProps> = ({ isOpen, onClose, onCalculate }) => {
  const [liters, setLiters] = useState<string>('');

  const handleCalculate = () => {
    onCalculate(parseFloat(liters));
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Calculate Mix">
      <NumberInput
        label="Enter Liters"
        placeholder="Enter Liters"
        value={parseFloat(liters)}
        onChange={(value) => setLiters(value?.toString() || '')}
      />
      <Group mt="md">
        <Button onClick={handleCalculate}>Calculate</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </Group>
    </Modal>
  );
};

export default CalculateMixModal;
