import { assessQualifications } from './data-service';
import { approvalMsg, errorMsg, rejectionMsg } from "./constants";

let mockData;

// Reset mock data for each test
beforeEach(() => {
  mockData = {
    investmentAmount: '1000.00',
    investmentType: 'Stocks',
    netWorth: '100000.00',
    annualIncome: '100000.00',
    creditScore: '800'
  };
});

it('should approve valid requests', async () => {
  const resp = await assessQualifications(mockData);

  expect(resp.qualified).toBe(true);
  expect(resp.message).toBe(approvalMsg);
  expect(resp.error).toBe(false);
});

it('should return an error for excessive investment amounts', async () => {
  mockData.investmentAmount = '9000001';

  const resp = await assessQualifications(mockData);

  expect(resp.qualified).toBe(false);
  expect(resp.message).toBe(errorMsg);
  expect(resp.error).toBe(true);
});

it('should reject credit scores below 600', async () => {
  mockData.creditScore = '599';

  const resp = await assessQualifications(mockData);

  expect(resp.qualified).toBe(false);
  expect(resp.message).toBe(rejectionMsg);
  expect(resp.error).toBe(false);
});

it('should reject investment requests over 1/5 of annual income', async () => {
  mockData.investmentAmount = '25000';

  const resp = await assessQualifications(mockData);

  expect(resp.qualified).toBe(false);
  expect(resp.message).toBe(rejectionMsg);
  expect(resp.error).toBe(false);
});

it('should reject investment requests over 3% of total networth', async () => {
  mockData.investmentAmount = '3500';

  const resp = await assessQualifications(mockData);

  expect(resp.qualified).toBe(false);
  expect(resp.message).toBe(rejectionMsg);
  expect(resp.error).toBe(false);
});