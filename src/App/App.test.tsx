import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import posts from "../../__tests__/mocks/posts.json";
import App from ".";

describe("Boxed table", () => {
  beforeAll(() => {
    jest.spyOn(window, "fetch");
  });

  afterEach(() => {
    cleanup();
  });

  test("renders page with table", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<App />);

    await waitFor(() => {
      const pageNumber = screen.getByText(/1 of 5/i);
      expect(pageNumber).toBeInTheDocument();
    });

    await waitFor(() => {
      const pageNumber = screen.getByText(/1 of 5/i);
      expect(pageNumber).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const pageNumber = screen.getByText(/2 of 5/i);
      expect(pageNumber).toBeInTheDocument();
    });

    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);

    await waitFor(() => {
      const pageNumber = screen.getByText(/1 of 5/i);
      expect(pageNumber).toBeInTheDocument();
    });

    const selectPageSize = screen.getByTestId("select-page-size");
    fireEvent.change(selectPageSize, {
      target: {
        value: 30,
      },
    });

    await waitFor(() => {
      const rowsData = screen.getAllByTestId("row-data");
      expect(rowsData.length).toEqual(30);
    });

    const gotoPageInput = screen.getByTestId("go-to-page-input");
    fireEvent.change(gotoPageInput, { target: { value: 4 } });

    await waitFor(() => {
      const pageNumber = screen.getByText(/4 of 4/i);
      expect(pageNumber).toBeInTheDocument();
    });
  });
});
