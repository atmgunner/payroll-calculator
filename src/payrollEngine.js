const PENSION_EMPLOYEE_RATE = 0.07;
const PENSION_EMPLOYER_RATE = 0.11;

const TRANSPORT_EXEMPTION_RATE = 0.25;
const TRANSPORT_EXEMPTION_CAP = 2200;

const STANDARD_MONTHLY_HOURS = 208; // 8 hours x 26 working days

const OVERTIME_RATES = {
  day: 1.5,      // 6am - 10pm
  night: 1.75,   // 10pm - 6am
  restDay: 2.0,  // weekly rest day
  holiday: 2.5,  // public holiday
};

function getTaxBracket(taxableIncome) {
  if (taxableIncome <= 2000) return { label: '0 – 2,000', rate: 0, deduction: 0 };
  if (taxableIncome <= 4000) return { label: '2,001 – 4,000', rate: 0.15, deduction: 300 };
  if (taxableIncome <= 7000) return { label: '4,001 – 7,000', rate: 0.20, deduction: 500 };
  if (taxableIncome <= 10000) return { label: '7,001 – 10,000', rate: 0.25, deduction: 850 };
  if (taxableIncome <= 14000) return { label: '10,001 – 14,000', rate: 0.30, deduction: 1350 };
  return { label: 'Over 14,000', rate: 0.35, deduction: 2050 };
}

function calculateIncomeTax(taxableIncome) {
  if (taxableIncome <= 0) {
    return 0;
  }

  const bracket = getTaxBracket(taxableIncome);
  const tax = taxableIncome * bracket.rate - bracket.deduction;

  return Math.max(0, Math.round(tax * 100) / 100);
}

function calculatePension(basicSalary) {
  const employee = Math.round(basicSalary * PENSION_EMPLOYEE_RATE * 100) / 100;
  const employer = Math.round(basicSalary * PENSION_EMPLOYER_RATE * 100) / 100;
  return { employee, employer, total: employee + employer };
}

function calculateTransportExemption(basicSalary, transportAllowance) {
  const exemptLimit = Math.min(basicSalary * TRANSPORT_EXEMPTION_RATE, TRANSPORT_EXEMPTION_CAP);
  const exempt = Math.min(transportAllowance, exemptLimit);
  const taxable = Math.max(0, transportAllowance - exempt);
  return { exempt, taxable };
}

function calculateOvertimePay(basicSalary, hours = {}) {
  const hourlyRate = basicSalary / STANDARD_MONTHLY_HOURS;

  const day = (hours.day || 0) * hourlyRate * OVERTIME_RATES.day;
  const night = (hours.night || 0) * hourlyRate * OVERTIME_RATES.night;
  const restDay = (hours.restDay || 0) * hourlyRate * OVERTIME_RATES.restDay;
  const holiday = (hours.holiday || 0) * hourlyRate * OVERTIME_RATES.holiday;

  const total = day + night + restDay + holiday;

  return {
    hourlyRate: round2(hourlyRate),
    day: round2(day),
    night: round2(night),
    restDay: round2(restDay),
    holiday: round2(holiday),
    total: round2(total),
  };
}

function calculateNetSalary({
  basicSalary,
  transportAllowance = 0,
  positionAllowance = 0,
  housingAllowance = 0,
  overtimeHours = {},
  customDeductions = 0,
}) {
  const transport = calculateTransportExemption(basicSalary, transportAllowance);
  const pension = calculatePension(basicSalary);
  const overtime = calculateOvertimePay(basicSalary, overtimeHours);

  const taxableIncome =
    basicSalary + transport.taxable + positionAllowance + housingAllowance + overtime.total;

  const incomeTax = calculateIncomeTax(taxableIncome);

  const grossSalary =
    basicSalary + transportAllowance + positionAllowance + housingAllowance + overtime.total;

  const totalDeductions = incomeTax + pension.employee + customDeductions;
  const netSalary = grossSalary - totalDeductions;

  return {
    basicSalary: round2(basicSalary),
    grossSalary: round2(grossSalary),
    taxableIncome: round2(taxableIncome),
    incomeTax: round2(incomeTax),
    pension,
    transportExemption: transport,
    overtime,
    customDeductions: round2(customDeductions),
    totalDeductions: round2(totalDeductions),
    netSalary: round2(netSalary),
  };
}

function round2(num) {
  return Math.round(num * 100) / 100;
}

export {
  calculateIncomeTax,
  calculatePension,
  calculateTransportExemption,
  calculateOvertimePay,
  calculateNetSalary,
  getTaxBracket,
};