import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from 'react-router';
import { createMemoryHistory } from "history";
import BadRequest from './BadRequest';

let container = null;
const history = createMemoryHistory({ initialEntries: ["/badrequest"]}); // Mock initial route location

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with error message and button', () => {
  act(() => {
    render(
      <Router history={history}>
        <BadRequest />
      </Router>, 
      container
    );
  });

  expect(container.textContent).toContain("Oh snap");
  expect(document.querySelector("button")).toBeInTheDocument();
});

it('redirects to home on button click', () => {
  act(() => {
    render(
      <Router history={history}>
        <BadRequest />
      </Router>, 
      container
    ); 
  });

  // Initial path should be correct
  expect(history.location.pathname).toBe("/badrequest");

  // Select button element and simulate click event
  const homeButton = document.querySelector("button");
  homeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  // Verify path was redirected
  expect(history.location.pathname).toBe("/");
});
