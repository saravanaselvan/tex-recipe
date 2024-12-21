import React, { useState } from "react";
import { Table, Button, Divider, Title, Text, Flex } from "@mantine/core";
import CalculateMixModal from "./CalculateMixModal";

interface Chemical {
  brand: string;
  name: string;
  percentage: string;
  cost?: string;
}

interface ChemicalTableProps {
  chemicals: Chemical[];
  addWater: () => void;
}

const ChemicalTable: React.FC<ChemicalTableProps> = ({
  chemicals,
  addWater,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCalculateMix = (liters: number) => {
    console.log(`Calculating mix for ${liters} liters`, chemicals);
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
                <Table.Th>Percentage</Table.Th>
                <Table.Th>Cost per KG</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {chemicals.map((chem, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{chem.brand}</Table.Td>
                  <Table.Td>{chem.name}</Table.Td>
                  <Table.Td>{chem.percentage}%</Table.Td>
                  <Table.Td>{chem.cost || "-"}</Table.Td>
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
