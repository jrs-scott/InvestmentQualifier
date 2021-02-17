import { 
  approvalMsg,
  rejectionMsg,
  errorMsg
 } from './constants';

/* Suggested Improvements:
    - Make API calls to return actual data and save/retrieve from database
    - Add request ID to the response object and use that as a query param instead of 'message'
    - Type check properties for the request/response objects
    - Return a more specific message for declined approvals instead of a generic const
*/

export async function assessQualifications(assessmentInfo) {
  let response = {
    qualified: false,
    message: 'Results pending...',
    error: false
  };

  if (assessmentInfo.investmentAmount > 9000000) {
    response.message = errorMsg;
    response.error = true;
  } else if (assessmentInfo.creditScore < 600
      || assessmentInfo.investmentAmount > (assessmentInfo.annualIncome / 5)
      || assessmentInfo.investmentAmount > (assessmentInfo.netWorth * .03)) {
    response.message = rejectionMsg;
  } else {
    response.qualified = true;
    response.message = approvalMsg;
  }

  return response;
};