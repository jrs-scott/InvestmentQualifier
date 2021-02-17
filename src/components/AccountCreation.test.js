import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, getByTestId } from "@testing-library/react";
import AccountCreation from './AccountCreation';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render assessment form', () => {
  act(() => {
    render(<AccountCreation />, container);
  });
  
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll("input");
  const submitButton = document.querySelector("button");
  
  expect(form).toContainElement(inputs[0]);
  expect(form).toContainElement(submitButton);
  expect(inputs.length).toEqual(3);
});

it("should return success message on valid form submission", () => {
  act(() => {
    render(<AccountCreation />, container);
  });

  // Provide valid data for the form and trigger submission
  fireEvent.change(getByTestId(container, "username-input"), { target: { value: 'test@email.com' } });
  fireEvent.change(getByTestId(container, "password-input"), { target: { value: 'qwerty123' } });
  fireEvent.change(getByTestId(container, "passwordConfirm-input"), { target: { value: 'qwerty123' } });
  fireEvent.submit(getByTestId(container, "form"));

  // Assert UI updated after form was processed
  expect(container.textContent).toContain("An account has been created for test@email.com");
});