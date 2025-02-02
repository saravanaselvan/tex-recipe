import { Container } from "@mantine/core";
import React, { useEffect, useState } from "react";
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
  const [recalculateWater, setRecalculateWater] = useState(false);
  const [totalCostText, setTotalCostText] = useState<string | undefined>(undefined);

  useEffect(() => {
    if(!recalculateWater) return;
    const totalPercentage = chemicals.filter((chem) => chem.name !== "Water").reduce(
      (sum, chem) => sum + parseFloat(chem.percentage || "0"),
      0
    );
    
    const isWaterAdded = chemicals.some((chem) => chem.name === "Water");
    if(isWaterAdded) {
      const newChemicals = chemicals.filter((chem) => chem.name !== "Water");
      setChemicals([
        ...newChemicals,
        {
          brand: "",
          name: "Water",
          percentage: `${100 - totalPercentage}`,
          cost: "",
        },
      ]);      
    }
    setRecalculateWater(false);
  }, [recalculateWater]);
  const addChemical = (chemical: Chemical) => {
    setChemicals([...chemicals, chemical]);
    setRecalculateWater(!recalculateWater);
  }
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
      <ChemicalTable chemicals={chemicals} addWater={addWater} setTotalCostText={setTotalCostText}/>
      {chemicals.length > 0 && (
        <>
          <DownloadSection
            onDownload={(company, client, format) => console.log(`Download ${format}`, { company, client })} chemicals={chemicals} totalCostText={totalCostText} />
        </>
      )}
    </Container>
  );
};

export default HomePage;
