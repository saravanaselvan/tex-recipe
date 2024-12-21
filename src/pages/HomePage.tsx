import { Container } from "@mantine/core";
import React, { useState } from "react";
import ChemicalForm from "../components/ChemicalForm";
import ChemicalTable from "../components/ChemicalTable";
import DownloadSection from "../components/DownloadSection";
import Header from "../components/Header";

export interface Chemical {
  brand: string;
  name: string;
  percentage: string;
  cost?: string;
}

const HomePage: React.FC = () => {
  const [chemicals, setChemicals] = useState<Chemical[]>([]);

  const addChemical = (chemical: Chemical) =>
    setChemicals([...chemicals, chemical]);
  const addWater = () => {
    const totalPercentage = chemicals.reduce(
      (sum, chem) => sum + parseFloat(chem.percentage || "0"),
      0
    );
    if (totalPercentage < 100) {
      setChemicals([
        ...chemicals,
        {
          brand: "",
          name: "Water",
          percentage: `${100 - totalPercentage}`,
          cost: "",
        },
      ]);
    }
  };

  return (
    <Container
      size="lg"
      px="md"
      style={{
        background: "white",
        paddingBottom: "20px",
        paddingTop: "20px",
        height: "95%",
        marginTop: "20px",
        marginBottom: "20px",
        borderRadius: "5px",
      }}
    >
      <Header />
      <ChemicalForm addChemical={addChemical} />
      <ChemicalTable chemicals={chemicals} addWater={addWater} />
      {chemicals.length > 0 && (
        <>
          <DownloadSection
            onDownload={(company, client, format) => console.log(`Download ${format}`, { company, client })} chemicals={chemicals}          />
        </>
      )}
    </Container>
  );
};

export default HomePage;
