import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = (data: any[], title: string) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  let yPosition = 40;
  data.forEach((item, index) => {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(10);
    doc.text(`${index + 1}. ${JSON.stringify(item)}`, 20, yPosition);
    yPosition += 10;
  });
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

export const exportToExcel = (data: any[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};