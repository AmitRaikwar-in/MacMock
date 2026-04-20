// ─── Note ID ──────────────────────────────────────────────────────────────────

const generateNoteId = (): string => Date.now().toString();

// ─── Content helpers ──────────────────────────────────────────────────────────

const getFirstLineFromString = (str: string) => str.split('\n')[0];

const getAllStringExceptFirstLine = (str: string) =>
  str.split('\n').slice(1).join('\n');

/** Extract plain-text title from note HTML content */
const getTitleFromContent = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.innerText || div.textContent || '';
  return text.split('\n')[0].trim() || 'New Note';
};

/** Extract plain-text preview (everything after the first line) */
const getPreviewFromContent = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.innerText || div.textContent || '';
  return text.split('\n').slice(1).join(' ').trim().slice(0, 120);
};

/** Count words in HTML content */
const countWords = (html: string): number => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = (div.innerText || div.textContent || '').trim();
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
};

export {
  generateNoteId,
  getFirstLineFromString,
  getAllStringExceptFirstLine,
  getTitleFromContent,
  getPreviewFromContent,
  countWords,
};
