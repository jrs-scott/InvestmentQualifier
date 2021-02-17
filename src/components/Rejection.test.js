import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from 'react-router-dom';
import Rejection from './Rejection';
import { getByTestId } from "@testing-library/react";
import { rejectionMsg } from "../constants";

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

it('should render rejection message', () => {
  let testHistory, testLocation, testMatch;

  act(() => {
    render(
      <MemoryRouter initialEntries={["/rejection/test"]}>
        <Rejection />
        <Route
          path="*"
          render={({ history, location, match }) => {
            testHistory = history;
            testLocation = location;
            testMatch = match;
            return null;
          }}
        />
      </MemoryRouter>, 
      container
    );
  });
  
  // Assert primary container renders with header content
  const containerElement = document.querySelector(".card");
  expect(containerElement.textContent).toContain("Unable to Approve Request");

  // Verify error message and URL params are right
  const msgElement = getByTestId(container, "rejection-message");
  expect(msgElement.textContent).toBe(rejectionMsg);
  expect(testMatch.params[0]).toContain("test");
});