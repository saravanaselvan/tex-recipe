import React, { useState } from 'react';
import { Table, Button, Divider, Title, Text, Flex, TextInput, NumberInput } from '@mantine/core';
import CalculateMixModal from './CalculateMixModal';
import { calculateMix } from '../utils/calculation';
import { useChemicalContext } from '../context/ChemicalContext';
import { IconCircleDashedMinus } from '@tabler/icons-react';
import classes from './Components.module.css';

const ChemicalTable: React.FC = () => {
  const { chemicals, addWater, setTotalCostText, updateChemicals } = useChemicalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCost, setTotalCost] = useState<string>("");

  const handleCalculateMix = (quantity: number) => {
    const totalCost = calculateMix(chemicals, quantity);
    setTotalCost(`Total cost for ${quantity} KG/L is Rs. ${totalCost}`);
    setTotalCostText(`Total cost for ${quantity} KG/L is Rs. ${totalCost}`);
    console.log(`Calculating mix for ${quantity} liters`, chemicals);
  };

  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedChemicals = chemicals.map((chem, i) =>
      i === index ? { ...chem, [field]: value } : chem
    );
    updateChemicals(updatedChemicals);
  };

  const handleRemove = (index: number) => {
    const updatedChemicals = chemicals.filter((_, i) => i !== index);
    updateChemicals(updatedChemicals);
  };

  return (
    <div>
      <Divider my="md" />
      <Title order={3} mb={20}>Chemicals Added</Title>
      {chemicals.length === 0 && (
        <Text c="dimmed">
          No chemicals added. Please add using the form above.
        </Text>
      )}

      {chemicals.length > 0 && (
        <>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Brand</Table.Th>
                <Table.Th>Chemical Name</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>Percentage</Table.Th>
                <Table.Th style={{ textAlign: "right" }}>Cost per KG/L</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {chemicals.map((chem, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    {chem.name === 'Water' ? '' : 
                      <TextInput
                        value={chem.brand}
                        onChange={(e) => handleChange(index, 'brand', e.currentTarget.value)}
                      />
                    }
                  </Table.Td>
                  <Table.Td>
                    {chem.name === 'Water' ? chem.name : 
                      <TextInput
                        value={chem.name}
                        onChange={(e) => handleChange(index, 'name', e.currentTarget.value)}
                      />
                    }
                  </Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>
                    {chem.name === 'Water' ? chem.percentage : 
                      <NumberInput
                        classNames={{ input: classes.numberInput }}
                        suffix="%"
                        value={parseFloat(chem.percentage)}
                        onChange={(value) => handleChange(index, 'percentage', value || 0)}
                      />
                    }
                  </Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>
                    {chem.name === 'Water' ? '' : 
                      <NumberInput
                        classNames={{ input: classes.numberInput }}
                        value={parseFloat(chem.cost || '0')}
                        onChange={(value) => handleChange(index, 'cost', value || 0)}
                      />
                    }
                  </Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    <Button color="red" onClick={() => handleRemove(index)} leftSection={<IconCircleDashedMinus size={18} />}>
                      Remove
                    </Button>
                    {/* <Button color="red" onClick={() => handleRemove(index)}>Remove</Button> */}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Flex justify="flex-end" mt="md" gap={8}>
            <Button onClick={addWater}>
              Add Water
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>Calculate Mix</Button>
          </Flex>
          <Flex mt="md" align="center" gap={8}>
            <Text>{totalCost}</Text>
          </Flex>
          <CalculateMixModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCalculate={handleCalculateMix}
          />
          <Divider my="md" />
        </>
      )}
    </div>
  );
};

export default ChemicalTable;
