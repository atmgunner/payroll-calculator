import { getTaxBracket } from './payrollEngine';

function DetailedBreakdown({ result, basicSalary }) {
  const bracket = getTaxBracket(result.taxableIncome);

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex flex-col gap-4 text-xs text-gray-600 leading-relaxed">
      <div>
        <p className="font-semibold text-gray-800 mb-1">Taxable Income</p>
        <p>{basicSalary.toLocaleString()} (basic) + {result.transportExemption.taxable.toLocaleString()} (taxable transport) + overtime {result.overtime.total.toLocaleString()} + other allowances = <span className="font-mono">{result.taxableIncome.toLocaleString()}</span></p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">Income Tax — Bracket {bracket.label} ETB ({(bracket.rate * 100).toFixed(0)}%)</p>
        <p className="font-mono">{result.taxableIncome.toLocaleString()} × {bracket.rate} − {bracket.deduction} = {result.incomeTax.toLocaleString()}</p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">Pension (on Basic Salary only)</p>
        <p className="font-mono">Employee: {basicSalary.toLocaleString()} × 7% = {result.pension.employee.toLocaleString()}</p>
        <p className="font-mono">Employer: {basicSalary.toLocaleString()} × 11% = {result.pension.employer.toLocaleString()}</p>
      </div>

      {result.overtime.total > 0 && (
        <div>
          <p className="font-semibold text-gray-800 mb-1">Overtime Pay (hourly rate: {result.overtime.hourlyRate.toLocaleString()})</p>
          {result.overtime.day > 0 && <p className="font-mono">Day: {result.overtime.day.toLocaleString()}</p>}
          {result.overtime.night > 0 && <p className="font-mono">Night: {result.overtime.night.toLocaleString()}</p>}
          {result.overtime.restDay > 0 && <p className="font-mono">Rest Day: {result.overtime.restDay.toLocaleString()}</p>}
          {result.overtime.holiday > 0 && <p className="font-mono">Holiday: {result.overtime.holiday.toLocaleString()}</p>}
        </div>
      )}

      <div>
        <p className="font-semibold text-gray-800 mb-1">Net Salary</p>
        <p className="font-mono">{result.grossSalary.toLocaleString()} − ({result.incomeTax.toLocaleString()} + {result.pension.employee.toLocaleString()}{result.customDeductions > 0 ? ` + ${result.customDeductions.toLocaleString()}` : ''}) = {result.netSalary.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default DetailedBreakdown;