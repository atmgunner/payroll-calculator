import jsPDF from 'jspdf';

function exportPayslip(result) {
  const doc = new jsPDF();
  let y = 20;

  function line(text, size = 11, bold = false) {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(text, 15, y);
    y += size === 11 ? 8 : 10;
  }

  function divider() {
    doc.setDrawColor(200);
    doc.line(15, y, 195, y);
    y += 8;
  }

  line('Ethiopian Payroll Calculator', 16, true);
  line('Payslip Breakdown', 10);
  y += 4;
  divider();

  line('Basic Salary', 11, true);
  line(`${result.basicSalary.toLocaleString()} ETB`);
  y += 2;

  line('Gross Salary', 11, true);
  line(`${result.grossSalary.toLocaleString()} ETB`);
  y += 2;

  line('Taxable Income', 11, true);
  line(`${result.taxableIncome.toLocaleString()} ETB`);
  y += 2;

  divider();

  line('Deductions', 12, true);
  line(`Income Tax: -${result.incomeTax.toLocaleString()} ETB`);
  line(`Pension (Employee, 7%): -${result.pension.employee.toLocaleString()} ETB`);
  if (result.customDeductions > 0) {
    line(`Custom Deductions: -${result.customDeductions.toLocaleString()} ETB`);
  }
  y += 2;

  if (result.overtime.total > 0) {
    line('Overtime Pay', 12, true);
    if (result.overtime.day > 0) line(`Day: ${result.overtime.day.toLocaleString()} ETB`);
    if (result.overtime.night > 0) line(`Night: ${result.overtime.night.toLocaleString()} ETB`);
    if (result.overtime.restDay > 0) line(`Rest Day: ${result.overtime.restDay.toLocaleString()} ETB`);
    if (result.overtime.holiday > 0) line(`Holiday: ${result.overtime.holiday.toLocaleString()} ETB`);
    y += 2;
  }

  divider();

  line(`Total Deductions: -${result.totalDeductions.toLocaleString()} ETB`, 12, true);
  y += 4;
  line(`NET SALARY: ${result.netSalary.toLocaleString()} ETB`, 15, true);

  const today = new Date().toLocaleDateString('en-GB');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated ${today} — based on Proclamation No. 1395/2025`, 15, 285);

 const dateForFilename = new Date().toISOString().split('T')[0]; // e.g. "2026-08-27"
doc.save(`Payslip-${dateForFilename}.pdf`);
}

export default exportPayslip;