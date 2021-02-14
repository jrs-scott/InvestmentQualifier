import { 
  approvalMsg,
  rejectionMsg,
  errorMsg
 } from './constants';

/* Suggested Improvements:
    - Make API calls to return actual data and save/retrieve from database
    - Add request ID and use that as a query param instead of the message
    - Return a more specific message for declined approvals instead of a generic const
    - Type check data for the request/response objects
*/

export async function assessQualifications(assessmentInfo) {
  let resp = {
    qualified: false,
    message: 'Results pending...',
    error: false
  };

  if (assessmentInfo.investmentAmount > 9000000) {
    resp.message = errorMsg;
    resp.error = true;
  } else if (assessmentInfo.creditScore < 600
      || assessmentInfo.investmentAmount > (assessmentInfo.annualIncome / 5)
      || assessmentInfo.investmentAmount > (assessmentInfo.netWorth * .03)) {
    resp.message = rejectionMsg;
  } else {
    resp.qualified = true;
    resp.message = approvalMsg;
  }

  console.log(resp);

  return resp;
};