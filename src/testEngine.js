import { calculateOvertimePay } from './payrollEngine';

console.log(calculateOvertimePay(20800, { day: 5, night: 2, restDay: 0, holiday: 1 }));