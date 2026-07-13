import { Box, Text } from '@chakra-ui/react';
import { Note } from '@appStore';
import { countWords, getTitleFromContent } from '../utils';
import { useEffect, useRef } from 'react';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';

// ─── Props ───────────────────────────────────────────────────────────────────

interface NoteEditorProps {
  note: Note | undefined;
  onUpdate: (note: Note) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

const NoteEditor = ({ note, onUpdate }: NoteEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();
  const currentNoteId = useRef<string | undefined>();

  const { mainColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );
  const isDark = settingsStore((state) => state.Display.darkMode);

  // Dynamic Editor CSS
  const editorCss = `
    .notes-editor {
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: ${textColor};
      caret-color: #fbbf24;
      word-break: break-word;
      height: 100%;
    }
    .notes-editor:empty:before {
      content: attr(data-placeholder);
      color: ${isDark ? 'rgba(255,255,255,0.3)' : '#c7c7cc'};
      pointer-events: none;
    }
    .notes-editor > div:first-child,
    .notes-editor > p:first-child {
      font-size: 26px;
      font-weight: 700;
      color: ${textColor};
      line-height: 1.2;
      margin-bottom: 4px;
      letter-spacing: -0.02em;
    }
    .notes-editor h2 {
      font-size: 18px;
      font-weight: 600;
      color: ${textColor};
      margin: 12px 0 4px;
    }
    .notes-editor input[type="checkbox"] {
      margin-right: 6px;
      accent-color: #fbbf24;
    }
    .notes-editor ::selection { background: rgba(251,191,36,0.35); }
    
    .hashtag {
      color: #ff9500;
      font-weight: 500;
    }
    .highlight-cyan {
      background-color: rgba(0, 255, 255, ${isDark ? '0.3' : '0.2'});
      border-radius: 4px;
      padding: 0 2px;
    }
    .highlight-pink {
      background-color: rgba(255, 105, 180, ${isDark ? '0.3' : '0.2'});
      border-radius: 4px;
      padding: 0 2px;
    }
    .highlight-orange {
      background-color: rgba(255, 165, 0, ${isDark ? '0.3' : '0.2'});
      border-radius: 4px;
      padding: 0 2px;
    }
  `;

  useEffect(() => {
    let style = document.getElementById(
      'notes-editor-styles',
    ) as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'notes-editor-styles';
      document.head.appendChild(style);
    }
    style.textContent = editorCss;
  }, [editorCss]);

  // Mock HTML Data (dynamic colors)
  const mockSvg = `
  <svg width="400" height="250" viewBox="0 0 400 250" style="margin: 16px 0; max-width: 100%;">
    <rect x="120" y="50" width="120" height="120" fill="none" stroke="#5ac8fa" stroke-width="4" />
    <text x="180" y="105" font-family="sans-serif" font-size="18" fill="#5ac8fa" text-anchor="middle">Box</text>
    <text x="180" y="130" font-family="sans-serif" font-size="18" fill="#5ac8fa" text-anchor="middle">Breathing</text>
    
    <!-- Arrows -->
    <path d="M120 40 L240 40" stroke="#34c759" stroke-width="3" />
    <polygon points="240,40 230,35 230,45" fill="#34c759" />
    <text x="180" y="25" font-family="sans-serif" font-size="16" fill="#34c759" text-anchor="middle">1</text>
    
    <path d="M250 50 L250 170" stroke="#ff3b30" stroke-width="3" />
    <polygon points="250,170 245,160 255,160" fill="#ff3b30" />
    <text x="265" y="115" font-family="sans-serif" font-size="16" fill="#ff3b30" text-anchor="middle">2</text>
    
    <path d="M240 180 L120 180" stroke="#af52de" stroke-width="3" />
    <polygon points="120,180 130,175 130,185" fill="#af52de" />
    <text x="180" y="200" font-family="sans-serif" font-size="16" fill="#af52de" text-anchor="middle">3</text>
    
    <path d="M110 170 L110 50" stroke="#ff2d55" stroke-width="3" />
    <polygon points="110,50 105,60 115,60" fill="#ff2d55" />
    <text x="90" y="115" font-family="sans-serif" font-size="16" fill="#ff2d55" text-anchor="middle">4</text>
    
    <!-- Labels -->
    <text x="290" y="60" font-family="sans-serif" font-size="14" fill="${textColor}">1 Breathe in</text>
    <text x="290" y="90" font-family="sans-serif" font-size="14" fill="${textColor}">2 Hold</text>
    <text x="290" y="120" font-family="sans-serif" font-size="14" fill="${textColor}">3 Breathe out</text>
    <text x="290" y="150" font-family="sans-serif" font-size="14" fill="${textColor}">4 Hold</text>
  </svg>
  `;

  const mockHtml = `
  <div>Teaching Holistic Health 🧘‍♀️</div>
  <div><b>Brainstorm for first in-class session</b></div>
  <div style="margin-bottom: 16px;"><span class="hashtag">#school</span> <span class="hashtag">#kine210</span> <span class="hashtag">#practicum</span></div>
  <div><b>Topic idea: Mind-Body Connection</b></div>
  <div>Getting class assignments next week but we should expect third, fourth, or fifth-graders. "Mind-Body Connection" could be a cool angle; <span class="highlight-cyan">lots of different ways to approach it,</span> it's <span class="highlight-cyan">accessible to everyone,</span> <span class="highlight-cyan">doesn't require any special gear,</span> <span class="highlight-cyan">non-competitive,</span> etc. We could <span class="highlight-orange">start with a box breathing exercise</span> to demonstrate the <span class="highlight-pink">connection between thinking, doing, and feeling</span> and use it as a segue into a lesson about <span class="highlight-cyan">thinking of ourselves as interconnected systems.</span></div>
  <div>${mockSvg}</div>
  <div>Box breathing is a technique used to center and destress. Studies show controlled breathing has myriad physiological benefits—it soothes the autonomic nervous system, reduces cortisol, etc. This might be a little advanced but I think we should try to find a way to explain these systems in a way that will make sense to elementary school students.</div><br>
  <div>I think it would be great to start off by having the whole class try box breathing together and then talking about how it made everyone feel. Starting with something calming that gets everyone on the same page seems like a good idea in case we get a class right after recess, too. This is effectively an introduction to</div>
  `;

  // Sync content when selected note changes
  useEffect(() => {
    if (!editorRef.current || !note) return;
    if (currentNoteId.current === note.id) return; // avoid overwriting mid-edit
    currentNoteId.current = note.id;

    const isMock = note.title === 'Teaching Holistic Health 🧘‍♀️';
    let html = '';

    if (isMock && (!note.content || !note.content.includes('highlight-cyan'))) {
      html = mockHtml;
      onUpdate({ ...note, content: mockHtml });
    } else {
      html =
        note.content ||
        `<div>${note.title || 'New Note'}</div><div>${note.description || ''}</div>`;
    }

    editorRef.current.innerHTML = html;
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = () => {
    if (!editorRef.current || !note) return;
    const html = editorRef.current.innerHTML;

    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const title = getTitleFromContent(html);
      const div = document.createElement('div');
      div.innerHTML = html;
      const fullText = (div.innerText || div.textContent || '').trim();
      const description = fullText
        .split('\n')
        .slice(1)
        .join(' ')
        .trim()
        .slice(0, 120);

      onUpdate({
        ...note,
        title,
        description,
        content: html,
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const mod = e.metaKey || e.ctrlKey;
    if (!mod) return;
    switch (e.key) {
      case 'b':
        e.preventDefault();
        document.execCommand('bold');
        break;
      case 'i':
        e.preventDefault();
        document.execCommand('italic');
        break;
      case 'u':
        e.preventDefault();
        document.execCommand('underline');
        break;
    }
  };

  const wordCount = note?.content ? countWords(note.content) : 0;

  if (!note) {
    return (
      <Box
        flex={1}
        bg={mainColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={3}
        opacity={0.35}
      >
        <Text fontSize="52px">🗒️</Text>
        <Text
          fontSize="14px"
          color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
        >
          Select or create a note
        </Text>
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      bg={mainColor}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Editor area */}
      <Box
        flex={1}
        overflowY="auto"
        px={10}
        py={10}
        onClick={() => editorRef.current?.focus()}
        css={{
          scrollbarWidth: 'thin',
          scrollbarColor: isDark
            ? 'rgba(255,255,255,0.1) transparent'
            : '#e5e5e5 transparent',
        }}
      >
        <Box
          ref={editorRef}
          className="notes-editor"
          contentEditable
          suppressContentEditableWarning
          aria-label="note-editor"
          data-placeholder="Start writing…"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
      </Box>

      {/* Status bar */}
      <Box
        height="28px"
        bg={mainColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Text
          fontSize="11px"
          color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
        >
          {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : ''}{' '}
          at{' '}
          {note.updatedAt
            ? new Date(note.updatedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''}
        </Text>
        <Text
          fontSize="11px"
          color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
        >
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </Text>
      </Box>
    </Box>
  );
};

export default NoteEditor;
