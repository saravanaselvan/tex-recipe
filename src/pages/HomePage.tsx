import { Container } from "@mantine/core";
import React from "react";
import ChemicalForm from "../components/ChemicalForm";
import ChemicalTable from "../components/ChemicalTable";
import DownloadSection from "../components/DownloadSection";
import Header from "../components/Header";
import { useChemicalContext } from "../context/ChemicalContext";

const HomePage: React.FC = () => {
  const { chemicals } = useChemicalContext();

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
      <ChemicalForm />
      <ChemicalTable />
      {chemicals.length > 0 && <DownloadSection />}
    </Container>
  );
};

export default HomePage;
