import React, { useState } from 'react';
import { Title, TextInput, Button, Flex } from '@mantine/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chemical } from '../pages/HomePage';

interface DownloadSectionProps {
  chemicals: Chemical[];
  onDownload: (companyName: string, clientName: string, format: string) => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ chemicals, onDownload }) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(chemicals);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Chemicals');
    XLSX.writeFile(workbook, 'chemicals.xlsx');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Chemical Report', 20, 10);
    // Add the autoTable plugin
    (doc as any).autoTable({
      head: [['Brand', 'Chemical Name', 'Percentage', 'Cost per KG']],
      body: chemicals.map(chem => [chem.brand, chem.name, chem.percentage, chem.cost || '-']),
    });
    doc.save('chemicals.pdf');
  };

  const handleDownload = (format: string) => {
    if (format === 'excel') {
      generateExcel();
    } else if (format === 'pdf') {
      generatePDF();
    }
    onDownload(companyName, clientName, format);
  };

  return (
    <>
      <Title order={3} mb={20}>Download Report</Title>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
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
          <Button onClick={() => handleDownload('excel')}>Download Excel</Button>
          <Button onClick={() => handleDownload('pdf')}>Download PDF</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default DownloadSection;
