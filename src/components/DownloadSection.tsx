import React, { useState } from 'react';
import { Title, TextInput, Button, Flex } from '@mantine/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chemical } from '../pages/HomePage';

interface DownloadSectionProps {
  chemicals: Chemical[];
  onDownload: (companyName: string, clientName: string, format: string) => void;
  totalCostText: string | undefined;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ chemicals, onDownload, totalCostText }) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');

  const generateExcel = () => {
    let companyDetails = [['Company', companyName], ['Client', clientName], ['Total Cost', totalCostText]];
    // XLSX.utils.sheet_add_aoa(worksheet, [["Brand", "Chemical Name", "Percentage", "Cost Per KG/L"]], { origin: "A1" });
    let worksheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, companyDetails, {origin: -1});
    XLSX.utils.sheet_add_aoa(worksheet, [], {origin: -1});
    XLSX.utils.sheet_add_aoa(worksheet, [["Brand", "Chemical Name", "Percentage", "Cost Per KG/L"]], { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, chemicals, {skipHeader: true, origin: -1});
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Chemicals');
    XLSX.writeFile(workbook, 'chemicals.xlsx');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Report for ${clientName} - ${companyName}`, 10, 10);
    // Add the autoTable plugin
    (doc as any).autoTable({
      head: [['Brand', 'Chemical Name', 'Percentage', 'Cost per KG']],
      body: chemicals.map(chem => [chem.brand, chem.name, chem.percentage, chem.cost || '-']),
    });
    doc.text(totalCostText!, 10, chemicals.length * 30);
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
          <Button onClick={() => handleDownload('excel')} disabled={!companyName || !clientName}>Download Excel</Button>
          <Button onClick={() => handleDownload('pdf')} disabled={!companyName || !clientName}>Download PDF</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default DownloadSection;
