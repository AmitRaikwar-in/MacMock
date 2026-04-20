import { Box, Tooltip, Input, Text } from '@chakra-ui/react';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = '#fbbf24';

// ─── Props ───────────────────────────────────────────────────────────────────

interface NoteToolbarProps {
  hasSelection: boolean;
  isPinned: boolean;
  onNew: () => void;
  onDelete: () => void;
  onPin: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onToggleSidebar: () => void;
  notesCount: number;
}

// ─── Icon button ─────────────────────────────────────────────────────────────

const ToolbarBtn = ({
  label,
  icon,
  onClick,
  danger,
  active,
  disabled,
}: {
  label: string;
  icon: string | React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  active?: boolean;
  disabled?: boolean;
}) => {
  const { iconColor } = settingsStore(useShallow(darkModeColorSelector));

  return (
    <Tooltip label={label} placement="bottom" hasArrow openDelay={500}>
      <Box
        as="button"
        aria-label={label}
        onClick={onClick}
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxSize="32px"
        borderRadius="8px"
        fontSize="16px"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.35 : 1}
        color={active ? ACCENT : danger ? '#ff3b30' : iconColor}
        transition="background 0.15s ease, color 0.15s ease"
        background="none"
        border="none"
        _hover={
          disabled
            ? {}
            : {
                bg: danger ? 'rgba(255,59,48,0.1)' : 'rgba(128,128,128,0.15)',
              }
        }
      >
        {icon}
      </Box>
    </Tooltip>
  );
};

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const SidebarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
  </svg>
);

const ComposeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PinIcon = ({ active }: { active: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={active ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="17" x2="12" y2="22"></line>
    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z"></path>
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

const NoteToolbar = ({
  hasSelection,
  isPinned,
  onNew,
  onDelete,
  onPin,
  searchQuery,
  onSearchChange,
  onToggleSidebar,
  notesCount,
}: NoteToolbarProps) => {
  const { menuColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );
  const isDark = settingsStore((state) => state.Display.darkMode);

  return (
    <Box
      height="54px"
      bg={menuColor}
      backdropFilter="blur(20px)"
      borderBottom={`1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      flexShrink={0}
      aria-label="notes-toolbar"
    >
      {/* Left Area */}
      <Box display="flex" alignItems="center" gap={4} width="240px">
        <ToolbarBtn
          label="Toggle Sidebar"
          icon={<SidebarIcon />}
          onClick={onToggleSidebar}
        />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Text
            fontSize="13px"
            fontWeight="600"
            color={textColor}
            lineHeight="1"
          >
            All iCloud
          </Text>
          <Text
            fontSize="11px"
            color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
            lineHeight="1"
            mt="2px"
          >
            {notesCount} {notesCount === 1 ? 'note' : 'notes'}
          </Text>
        </Box>
      </Box>

      {/* Center Area (Formatting Pill) */}
      <Box
        display="flex"
        alignItems="center"
        bg={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
        borderRadius="12px"
        p="2px"
        gap="2px"
      >
        <ToolbarBtn label="Options" icon="⋯" onClick={() => {}} />
        <ToolbarBtn
          label="New Note (⌘N)"
          icon={<ComposeIcon />}
          onClick={onNew}
        />
        <Box
          w="1px"
          h="16px"
          bg={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}
          mx="4px"
        />
        <ToolbarBtn
          label="Format"
          icon={
            <Text fontWeight="600" fontSize="14px">
              Aa
            </Text>
          }
          onClick={() => {}}
        />
        <ToolbarBtn label="Checklist" icon="☑" onClick={() => {}} />
        <ToolbarBtn label="Table" icon="▦" onClick={() => {}} />
        <ToolbarBtn label="Attachment" icon="📎" onClick={() => {}} />
        <ToolbarBtn label="Drawing" icon="🎨" onClick={() => {}} />
      </Box>

      {/* Right Area */}
      <Box
        display="flex"
        alignItems="center"
        gap={3}
        width="240px"
        justifyContent="flex-end"
      >
        <ToolbarBtn
          label={isPinned ? 'Unpin' : 'Pin'}
          icon={<PinIcon active={isPinned} />}
          onClick={onPin}
          disabled={!hasSelection}
          active={isPinned}
        />
        <ToolbarBtn label="Share" icon="↗" onClick={() => {}} />
        <ToolbarBtn
          label="Delete"
          icon="🗑️"
          onClick={onDelete}
          danger
          disabled={!hasSelection}
        />
        <Box
          display="flex"
          alignItems="center"
          bg={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
          borderRadius="8px"
          px={2}
          py="4px"
          width="140px"
        >
          <Box
            color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
            mr="6px"
            display="flex"
          >
            <SearchIcon />
          </Box>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            variant="unstyled"
            fontSize="13px"
            h="auto"
            color={textColor}
            _placeholder={{
              color: isDark ? 'rgba(255,255,255,0.4)' : '#8e8e93',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NoteToolbar;
