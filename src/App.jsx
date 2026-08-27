import { useState } from 'react';
import PayrollForm from './PayrollForm';
import ResultBreakdown from './ResultBreakdown';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen animate-[pageFadeIn_0.4s_ease-out]">
      <div className={`px-6 py-16 transition-all duration-300 ${result ? 'max-w-3xl mx-auto' : 'max-w-lg mx-auto text-center'}`}>
        <div className={`mb-12 ${result ? '' : 'flex flex-col items-center'}`}>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
            Proclamation No. 1395/2025
          </span>
          <h1 className="text-6xl font-black tracking-tight text-gray-900 mt-2 leading-none">
            Payroll<br />Calculator
          </h1>
          <p className="text-gray-500 mt-4 max-w-md text-sm leading-relaxed">
            Gross-to-net salary breakdown under Ethiopia's current tax brackets, pension rules, and overtime law.
          </p>
        </div>

        <div className={result ? 'grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-start text-left' : ''}>
          <div className="bg-white rounded-md p-6 shadow-sm">
            <PayrollForm onCalculate={setResult} />
          </div>

          {result && (
            <>
              <div className="hidden md:block w-px bg-gray-200 self-stretch" />
              <div className="bg-white rounded-md p-6 shadow-sm animate-[resultSlideIn_0.4s_ease-out]">
                <ResultBreakdown result={result} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;