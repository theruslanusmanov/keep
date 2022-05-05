import {render, screen} from "@testing-library/react";
import {NEW_NOTE_PLACEHOLDER, NotesComponent} from "./notes.component";
import {NotesAPI} from "./notes.api";


describe('NotesComponent', function () {

  beforeEach(() => {
    render(<NotesComponent />);
  })

  it('should show textarea with right placeholder', function () {
    const textareaElement = screen.getByPlaceholderText(NEW_NOTE_PLACEHOLDER);
    expect(textareaElement).toBeInTheDocument();
  });

  it('should create note', function () {
    const createNoteSpy = jest.spyOn(NotesAPI, 'createNote')
    const loadNotesSpy = jest.spyOn(NotesAPI, 'getNotes')
    const buttonElement = screen.getByRole(/button/i);

    buttonElement.click();

    expect(buttonElement).toBeInTheDocument();
    expect(createNoteSpy).toHaveBeenCalledTimes(1);
    expect(loadNotesSpy).toHaveBeenCalledTimes(1);
  });
});