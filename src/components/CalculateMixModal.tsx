import { Button, Group, Modal, NumberInput } from '@mantine/core';
import React, { useState } from 'react';

interface CalculateMixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: (quantity: number) => void;
}

const CalculateMixModal: React.FC<CalculateMixModalProps> = ({ isOpen, onClose, onCalculate }) => {
  const [quantity, setQuantity] = useState<string>('');

  const handleCalculate = () => {
    onCalculate(parseFloat(quantity));
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Calculate Mix">
      <NumberInput
        label="Enter Quantity (KG/L)"
        placeholder="Enter Quantity (KG/L)"
        value={parseFloat(quantity)}
        onChange={(value) => setQuantity(value?.toString() || '')}
      />
      <Group mt="md">
        <Button onClick={handleCalculate}>Calculate</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </Group>
    </Modal>
  );
};

export default CalculateMixModal;
