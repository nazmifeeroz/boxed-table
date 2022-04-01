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
      const pageNumber = screen.getByText(/Go to page/i);
      expect(pageNumber).toBeInTheDocument();
    });

    await waitFor(() => {
      const titleHeader = screen.getByText(/Title/i);
      expect(titleHeader).toBeInTheDocument();
    });
  });

  test("on next button pressed, paginates to page 2", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<App />);

    await waitFor(() => {
      const titleHeader = screen.getByText(/Title/i);
      expect(titleHeader).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const pageNumber = screen.getByTestId(
        "go-to-page-input"
      ) as HTMLInputElement;
      expect(pageNumber.value).toBe("2");
    });
  });

  test("on previous button pressed, paginates to page 1", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<App />);

    await waitFor(() => {
      const titleHeader = screen.getByText(/Title/i);
      expect(titleHeader).toBeInTheDocument();
    });

    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);

    await waitFor(() => {
      const pageNumber = screen.getByTestId(
        "go-to-page-input"
      ) as HTMLInputElement;
      expect(pageNumber.value).toBe("1");
    });
  });

  test("on select page size", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<App />);

    await waitFor(() => {
      const titleHeader = screen.getByText(/Title/i);
      expect(titleHeader).toBeInTheDocument();
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
  });

  test("on change page input", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<App />);

    await waitFor(() => {
      const titleHeader = screen.getByText(/Title/i);
      expect(titleHeader).toBeInTheDocument();
    });

    const gotoPageInput = screen.getByTestId("go-to-page-input");
    fireEvent.change(gotoPageInput, { target: { value: 4 } });

    await waitFor(() => {
      const pageNumber = screen.getByTestId(
        "go-to-page-input"
      ) as HTMLInputElement;
      expect(pageNumber.value).toBe("4");
    });
  });

  test("on checkbox checked", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => posts,
    });

    render(<App />);

    await waitFor(() => {
      const displaySelection = screen.queryByTestId("display-selection");
      expect(displaySelection).not.toBeInTheDocument();
    });

    const allCheckBoxes = screen.getAllByTestId("row-checkbox");
    fireEvent.click(allCheckBoxes[0]);

    await waitFor(() => {
      const displaySelection = screen.getByTestId("display-selection");
      expect(displaySelection).toBeInTheDocument();
    });
  });
});
