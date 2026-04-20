import { Box } from '@chakra-ui/react';
import { RefObject, useEffect, useState } from 'react';

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = '#fbbf24';

// ─── Format button ───────────────────────────────────────────────────────────

const FmtBtn = ({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <Box
    as="button"
    title={label}
    aria-label={label}
    onClick={(e: React.MouseEvent) => {
      e.preventDefault();
      onClick();
    }}
    display="flex"
    alignItems="center"
    justifyContent="center"
    boxSize="26px"
    borderRadius={5}
    fontSize="12px"
    fontWeight={700}
    cursor="pointer"
    background="none"
    border="none"
    color={active ? ACCENT : '#d1d1d1'}
    bg={active ? 'rgba(251,191,36,0.15)' : 'transparent'}
    transition="background 0.12s ease, color 0.12s ease"
    _hover={{ bg: 'rgba(255,255,255,0.12)', color: 'white' }}
  >
    {icon}
  </Box>
);

const Divider = () => (
  <Box width="1px" height="16px" bg="rgba(255,255,255,0.15)" mx={1} />
);

// ─── Props ───────────────────────────────────────────────────────────────────

interface NoteFormatBarProps {
  editorRef: RefObject<HTMLDivElement>;
}

// ─── Component ───────────────────────────────────────────────────────────────

const NoteFormatBar = ({ editorRef }: NoteFormatBarProps) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPos(null);
        return;
      }
      const range = sel.getRangeAt(0);
      if (!editorRef.current?.contains(range.commonAncestorContainer)) {
        setPos(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setPos({
        top: rect.top - 48,
        left: rect.left + rect.width / 2,
      });
      setActive({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      });
    };

    document.addEventListener('selectionchange', onSelectionChange);
    return () =>
      document.removeEventListener('selectionchange', onSelectionChange);
  }, [editorRef]);

  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  if (!pos) return null;

  return (
    <Box
      position="fixed"
      top={`${pos.top}px`}
      left={`${pos.left}px`}
      transform="translateX(-50%)"
      bg="rgba(28,28,30,0.94)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255,255,255,0.12)"
      borderRadius={8}
      px={1}
      py={1}
      display="flex"
      alignItems="center"
      gap={0}
      zIndex={2000}
      boxShadow="0 4px 24px rgba(0,0,0,0.6)"
      pointerEvents="auto"
      onMouseDown={(e) => e.preventDefault()} // don't steal focus
    >
      <FmtBtn
        label="Bold (⌘B)"
        icon="B"
        active={active.bold}
        onClick={() => exec('bold')}
      />
      <FmtBtn
        label="Italic (⌘I)"
        icon="I"
        active={active.italic}
        onClick={() => exec('italic')}
      />
      <FmtBtn
        label="Underline (⌘U)"
        icon="U"
        active={active.underline}
        onClick={() => exec('underline')}
      />
      <Divider />
      <FmtBtn
        label="Heading"
        icon="H1"
        onClick={() => exec('formatBlock', 'h2')}
      />
      <FmtBtn
        label="Body text"
        icon="¶"
        onClick={() => exec('formatBlock', 'div')}
      />
      <Divider />
      <FmtBtn
        label="Bullet list"
        icon="•"
        onClick={() => exec('insertUnorderedList')}
      />
      <FmtBtn
        label="Numbered list"
        icon="1."
        onClick={() => exec('insertOrderedList')}
      />
    </Box>
  );
};

export default NoteFormatBar;
