import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createMemoryHistory } from "history";
import { Router } from 'react-router';
import { act } from "react-dom/test-utils";
import { fireEvent, getByTestId } from "@testing-library/react";
import Assessment from './Assessment';

/* Suggested Improvements:
    - Test redirects for submissions
    - Test UI alert when the data call errors
    - Find a different approach to waiting for the async data call to complete
*/

let container = null;
const history = createMemoryHistory({ initialEntries: ["/"]}); // Mock initial route location

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render marketing banner and assessment form', () => {
  act(() => {
    render(
      <Router history={history}>
        <Assessment />;
      </Router>, 
      container
    );
  });

  // Verify marketing banner
  const marketingContainer = document.querySelector(".jumbotron");
  expect(marketingContainer.textContent).toContain("Pre-Qualify");

  // Check form has inputs and submit button
  const formElement = document.querySelector("form");
  const inputElements = document.querySelectorAll("input");
  const submitButton = document.querySelector("button");

  expect(formElement).toContainElement(inputElements[0]);
  expect(formElement).toContainElement(submitButton);
  expect(inputElements.length).toEqual(5);
});

it('should call assessQualifications on valid form submission', () => {
  const mockData = {
    investmentAmount: '1000.00',
    investmentType: 'Stocks',
    netWorth: '100000.00',
    annualIncome: '100000.00',
    creditScore: '800'
  };

  act(() => {
    render(
      <Router history={history}>
        <Assessment />;
      </Router>, 
      container
    );
  });

  // Provide acceptance criteria and submit form
  fireEvent.change(getByTestId(container, "investmentAmount-input"), { target: { value: mockData.investmentAmount } });
  fireEvent.change(getByTestId(container, "investmentType-input"), { target: { value: mockData.investmentType } });
  fireEvent.change(getByTestId(container, "netWorth-input"), { target: { value: mockData.netWorth } });
  fireEvent.change(getByTestId(container, "annualIncome-input"), { target: { value: mockData.annualIncome } });
  fireEvent.change(getByTestId(container, "creditScore-input"), { target: { value: mockData.creditScore } });
  fireEvent.submit(getByTestId(container, "form"));

  // Since the service doesn't make an external call, it's not mocked
  // Wait for the async call to finish before asserting results
  setTimeout(() => {
    expect(assessQualifications).toHaveBeenCalledWith(mockData);
    expect(redirectUser).toHaveBeenCalledTimes(1);
    done();
  }, 0);
});
