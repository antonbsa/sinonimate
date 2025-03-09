import { useRef, useEffect } from 'react';
import { ulid } from 'ulid';

export default function EditableText() {
  const editorRef = useRef(null);
  const spansRef = useRef({}); // map to store span elements keyed by ULID
  let currentSpan = null;

  useEffect(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current;

    const handleInput = (event) => {
      const lastChar = event.data;
      const selection = window.getSelection();

      if (!lastChar || !selection.rangeCount) return; // ignore non-character inputs
      event.preventDefault(); // avoid default browser input insertion

      const isLetterOrNumber = event.inputType === 'insertText' && /^[\p{L}\p{N}]$/u.test(lastChar);
      const separators = [' ', '.', ',', ';', '!', '?'];
      const defaultInputTypes = ['insertParagraph', 'insertLineBreak'];
      const defaultInputBehaviorConditions = [
        !isLetterOrNumber,
        separators.includes(lastChar),
        defaultInputTypes.includes(event.inputType),
      ];
      if (defaultInputBehaviorConditions.some(Boolean)) {
        // stop wrapping text
        currentSpan = null;
        // insert separator as plain text
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(lastChar);
        range.insertNode(textNode);
        // move cursor after the inserted text node
        const separatorRange = document.createRange();
        separatorRange.setStartAfter(textNode);
        separatorRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(separatorRange);
        return;
      }

      if (!currentSpan) {
        const spanId = ulid();
        const span = document.createElement('span');
        span.id = spanId;
        span.contentEditable = true;
        span.className = 'word';
        span.style.background = 'lightgray';
        span.style.borderRadius = '3px';
        span.style.cursor = 'pointer';

        // store the span in our ref map
        spansRef.current[spanId] = span;

        // use the ID to grab its textContent on click
        span.onclick = () => {
          const clickedSpan = spansRef.current[spanId];
          console.warn(`Clicked on: ${clickedSpan.textContent}`);
        };

        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
        currentSpan = span;
      }

      currentSpan.textContent += lastChar;

      // move cursor after the current span
      const newRange = document.createRange();
      newRange.setStartAfter(currentSpan);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    };

    editor.addEventListener('beforeinput', handleInput);
    editor.addEventListener('input', (e) => e.preventDefault());

    return () => {
      editor.removeEventListener('beforeinput', handleInput);
      editor.removeEventListener('input', (e) => e.preventDefault());
    };
  }, []);

  return (
    <div
      id='editor'
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      style={{
        minHeight: '100px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        whiteSpace: 'pre-wrap',
        cursor: 'text',
      }}
    />
  );
}
