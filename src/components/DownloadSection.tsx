import { Button, Flex, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";

interface DownloadSectionProps {
  onDownload: (companyName: string, clientName: string, format: string) => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ onDownload }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const handleDownload = (format: string) => {
    onDownload(companyName, clientName, format);
  };

  return (
    <>
      <Title order={3} mb={20}>Download Report</Title>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
      >
        <TextInput
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.currentTarget.value)}
          w={{ sm: 400 }}
        />
        <TextInput
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.currentTarget.value)}
          w={{ sm: 400 }}
        />
        <Flex gap={8}>
          <Button onClick={() => handleDownload("excel")}>Download Excel</Button>
          <Button onClick={() => handleDownload("pdf")}>Download PDF</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default DownloadSection;
