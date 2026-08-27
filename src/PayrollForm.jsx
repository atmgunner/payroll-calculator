import { useState } from 'react';
import { calculateNetSalary } from './payrollEngine';
import FieldLabel from './FieldLabel';
import AccordionSection from './AccordionSection';

function PayrollForm({ onCalculate }) {
  const [basicSalary, setBasicSalary] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('');
  const [positionAllowance, setPositionAllowance] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [overtimeDay, setOvertimeDay] = useState('');
  const [overtimeNight, setOvertimeNight] = useState('');
  const [overtimeRestDay, setOvertimeRestDay] = useState('');
  const [overtimeHoliday, setOvertimeHoliday] = useState('');
  const [customDeductions, setCustomDeductions] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const result = calculateNetSalary({
      basicSalary: Number(basicSalary) || 0,
      transportAllowance: Number(transportAllowance) || 0,
      positionAllowance: Number(positionAllowance) || 0,
      housingAllowance: Number(housingAllowance) || 0,
      overtimeHours: {
        day: Number(overtimeDay) || 0,
        night: Number(overtimeNight) || 0,
        restDay: Number(overtimeRestDay) || 0,
        holiday: Number(overtimeHoliday) || 0,
      },
      customDeductions: Number(customDeductions) || 0,
    });

    onCalculate(result);
  }

  const inputClass = 'border border-gray-300 rounded-sm px-2 py-1.5 w-full';
  const labelClass = 'flex flex-col gap-1';
  const captionClass = 'text-[11px] text-gray-500';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white border border-gray-300 rounded-md max-w-md shadow-sm">
      <label className={labelClass}>
        <FieldLabel label="Basic Salary (ETB)" info="Your fixed monthly salary before any allowances or deductions. Pension and overtime are both calculated from this figure." />
        <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} required min="0" className={inputClass} />
      </label>

      <label className={labelClass}>
        <FieldLabel label="Transport Allowance (ETB)" info="Exempt from tax up to 25% of Basic Salary, capped at 2,200 ETB/month. Any amount above that is taxed normally." />
        <input type="number" value={transportAllowance} onChange={(e) => setTransportAllowance(e.target.value)} min="0" className={inputClass} />
        <span className={captionClass}>Exempt up to 25% of basic, max 2,200 ETB.</span>
      </label>

      <AccordionSection title="Other Allowances" icon="💰" accent="amber">
        <label className={labelClass}>
          <FieldLabel label="Position / Representation Allowance (ETB)" info="Fully taxable if paid in cash. Position-based rules may apply depending on your employer's policy." />
          <input type="number" value={positionAllowance} onChange={(e) => setPositionAllowance(e.target.value)} min="0" className={inputClass} />
        </label>

        <label className={labelClass}>
          <FieldLabel label="Housing Allowance (ETB)" info="Fully taxable, added directly to your taxable income alongside basic salary." />
          <input type="number" value={housingAllowance} onChange={(e) => setHousingAllowance(e.target.value)} min="0" className={inputClass} />
        </label>
      </AccordionSection>

      <AccordionSection title="Overtime Hours" icon="🕒" accent="teal">
        <label className={labelClass}>
          <FieldLabel label="Day (6am–10pm)" info="Paid at 1.5x your ordinary hourly rate. Labour Proclamation No. 1156/2019, Art. 68(a)." />
          <input type="number" value={overtimeDay} onChange={(e) => setOvertimeDay(e.target.value)} min="0" className={inputClass} />
          <span className={captionClass}>150% of hourly rate — Art. 68(a)</span>
        </label>

        <label className={labelClass}>
          <FieldLabel label="Night (10pm–6am)" info="Paid at 1.75x your ordinary hourly rate. Labour Proclamation No. 1156/2019, Art. 68(b)." />
          <input type="number" value={overtimeNight} onChange={(e) => setOvertimeNight(e.target.value)} min="0" className={inputClass} />
          <span className={captionClass}>175% of hourly rate — Art. 68(b)</span>
        </label>

        <label className={labelClass}>
          <FieldLabel label="Weekly Rest Day" info="Paid at 2x your ordinary hourly rate. Labour Proclamation No. 1156/2019, Art. 68(c)." />
          <input type="number" value={overtimeRestDay} onChange={(e) => setOvertimeRestDay(e.target.value)} min="0" className={inputClass} />
          <span className={captionClass}>200% of hourly rate — Art. 68(c)</span>
        </label>

        <label className={labelClass}>
          <FieldLabel label="Public Holiday" info="Paid at 2.5x your ordinary hourly rate. Labour Proclamation No. 1156/2019, Art. 68(d)." />
          <input type="number" value={overtimeHoliday} onChange={(e) => setOvertimeHoliday(e.target.value)} min="0" className={inputClass} />
          <span className={captionClass}>250% of hourly rate — Art. 68(d)</span>
        </label>
      </AccordionSection>

      <AccordionSection title="Custom Deductions" icon="➖" accent="rose">
        <label className={labelClass}>
          <FieldLabel label="Staff loan, union dues, etc. (ETB)" info="Deducted directly from your net pay. These do NOT reduce your taxable income — only income tax and pension are pre-tax." />
          <input type="number" value={customDeductions} onChange={(e) => setCustomDeductions(e.target.value)} min="0" className={inputClass} />
        </label>
      </AccordionSection>

      <button type="submit" className="bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700">
        Calculate
      </button>
    </form>
  );
  <div className="bg-white rounded-md p-6 shadow-sm">
  <ResultBreakdown result={result} />
</div>
}

export default PayrollForm;