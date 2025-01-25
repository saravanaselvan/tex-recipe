import React, { useState } from "react";
import { Table, Button, Divider, Title, Text, Flex } from "@mantine/core";
import CalculateMixModal from "./CalculateMixModal";
import { calculateMix } from "../utils/calculation";

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
  // const [quantity, setQuantity] = useState<number>(1);
  // const [totalPercent, setTotalPercent] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<string>("");

  // useEffect(() => {
  //   const totalPercentage = chemicals.reduce(
  //     (sum, chem) => sum + parseFloat(chem.percentage || "0"),
  //     0
  //   );
  //   setTotalPercent(totalPercentage);
  // }, [chemicals]);

  const handleCalculateMix = (quantity: number) => {
    const totalCost = calculateMix(chemicals, quantity);
    setTotalCost(`Total cost for ${quantity} KG/L is Rs. ${totalCost}`);
    console.log(`Calculating mix for ${quantity} liters`, chemicals);
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
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {chemicals.map((chem, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{chem.brand}</Table.Td>
                  <Table.Td>{chem.name}</Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>{chem.percentage}%</Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>{chem.cost || "-"}</Table.Td>
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
              {/* <Text>Total Cost for</Text> */}
              {/* <NumberInput
                size="sm"
                w={70}
                placeholder="Quantity"
                name="quantity"
                value={parseFloat(quantity.toString())}
                onChange={(value) => setQuantity(parseFloat(value!.toString()) || 1)}
              /> */}
              {/* <Text>KG/L is Rs. {calculateMix(chemicals, quantity)}.</Text> */}
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
