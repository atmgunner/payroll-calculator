import { useState } from 'react';
import DetailedBreakdown from './DetailedBreakdown';
import exportPayslip from './exportPayslip';

function Row({ label, value, muted }) {
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-gray-100">
      <span className={`text-sm ${muted ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
      <span className={`font-mono text-sm ${muted ? 'text-gray-400' : 'text-gray-900 font-semibold'}`}>
        {value.toLocaleString()} ETB
      </span>
    </div>
  );
}

function ResultBreakdown({ result }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <p className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400 mb-4">
        Breakdown
      </p>

      <button
        type="button"
        onClick={() => exportPayslip(result)}
        className="mb-4 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors"
      >
        Download PDF ↓
      </button>

      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-1">Net Salary</p>
        <p className="text-4xl font-black text-gray-900">{result.netSalary.toLocaleString()} <span className="text-lg font-normal text-gray-400">ETB</span></p>
      </div>
      
      <Row label="Gross Salary" value={result.grossSalary} />
      <Row label="Taxable Income" value={result.taxableIncome} muted />
      <Row label="Income Tax" value={-result.incomeTax} />
      <Row label="Pension (Employee, 7%)" value={-result.pension.employee} />
      {result.customDeductions > 0 && (
        <Row label="Custom Deductions" value={-result.customDeductions} />
      )}
      {result.overtime.total > 0 && (
        <Row label="Overtime Pay" value={result.overtime.total} muted />
      )}

      <div className="mt-4 pt-4 border-t-2 border-gray-900 flex justify-between items-baseline">
        <span className="text-sm font-semibold text-gray-900">Total Deductions</span>
        <span className="font-mono text-sm font-semibold text-gray-900">
          −{result.totalDeductions.toLocaleString()} ETB
        </span>
      </div>
      <button
        type="button"
        onClick={() => setShowDetails((s) => !s)}
        className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
      >
        {showDetails ? 'Hide' : 'Show'} detailed calculation ↓
      </button>

      {showDetails && <DetailedBreakdown result={result} basicSalary={result.grossSalary - result.transportExemption.exempt - result.transportExemption.taxable - result.overtime.total} />}
    </div>
  );
}


export default ResultBreakdown;