import {render, screen} from "@testing-library/react";
import {NEW_NOTE_PLACEHOLDER, NotesComponent} from "./notes.component";

describe('NotesComponent', function () {
  it('should show textarea with right placeholder', function () {
    render(<NotesComponent />);
    const textareaElement = screen.getByPlaceholderText(NEW_NOTE_PLACEHOLDER);
    expect(textareaElement).toBeInTheDocument();
  });
});