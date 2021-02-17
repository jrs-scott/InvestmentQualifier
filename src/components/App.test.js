import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';

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

it('should render a navbar and logo', () => {
  act(() => {
    render(<App />, container);
  });

  const navElement = document.querySelector(".navbar");
  const logo = document.querySelector("img");

  expect(navElement.textContent).toContain("ACME Investing");
  expect(logo).toBeTruthy();
});