import {
  Button,
  Flex,
  NumberInput,
  TextInput
} from "@mantine/core";
import React, { useState } from "react";

export interface Chemical {
  brand: string;
  name: string;
  percentage: string;
  cost?: string;
}

interface ChemicalFormProps {
  addChemical: (chemical: Chemical) => void;
}

const ChemicalForm: React.FC<ChemicalFormProps> = ({ addChemical }) => {
  const [chemical, setChemical] = useState<Chemical>({
    brand: "",
    name: "",
    percentage: "",
    cost: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChemical({ ...chemical, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addChemical(chemical);
    setChemical({ brand: "", name: "", percentage: "", cost: "" });
  };

  return (
    <div>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        // justify={{ sm: "center" }}
      >
        <TextInput
          label="Brand"
          placeholder="Brand"
          name="brand"
          value={chemical.brand}
          onChange={handleChange}
          withAsterisk
        />
        <TextInput
          label="Chemical Name"
          placeholder="Chemical Name"
          name="name"
          value={chemical.name}
          onChange={handleChange}
          withAsterisk
        />
        <NumberInput
          label="Percentage"
          placeholder="Percentage"
          name="percentage"
          value={parseFloat(chemical.percentage)}
          onChange={(value) =>
            setChemical({ ...chemical, percentage: value?.toString() || "" })
          }
          withAsterisk
        />
        <NumberInput
          label="Cost per KG/L"
          placeholder="Cost per KG/L"
          name="cost"
          value={parseFloat(chemical.cost || "0")}
          onChange={(value) =>
            setChemical({ ...chemical, cost: value?.toString() || "" })
          }
          withAsterisk
        />
        <Button onClick={handleAdd} style={{ alignSelf: "flex-end" }} disabled={!(chemical.brand && chemical.name && chemical.percentage && chemical.cost)}>Add Chemical</Button>
      </Flex>
    </div>
  );
};

export default ChemicalForm;
