import { ArrowRightCircleIcon } from '@assets';
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { processStore, loginSelector, useShallow } from '@processStore';
import { settingsStore, usersSelector } from '@settingsStore';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ─── Sub-components ──────────────────────────────────────────────────────────

interface UserAvatarButtonProps {
  src: string;
  name: string;
  isOpen: boolean;
  onClick: () => void;
}

const UserAvatarButton = ({
  src,
  name,
  isOpen,
  onClick,
}: UserAvatarButtonProps) => (
  <Box
    aria-label="user-button"
    role="button"
    tabIndex={0}
    position="fixed"
    bottom="24%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    gap={2}
    cursor="pointer"
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    sx={{
      '&:hover .avatar-ring': {
        boxShadow: '0 0 0 3px rgba(255,255,255,0.85)',
        transform: 'scale(1.06)',
      },
      '&:hover .avatar-name': {
        opacity: 1,
      },
    }}
  >
    {/* Circular avatar with ring glow on hover */}
    <Box
      className="avatar-ring"
      borderRadius="full"
      overflow="hidden"
      boxSize="56px"
      boxShadow="0 0 0 2px rgba(255,255,255,0.3)"
      transition="transform 0.25s ease, box-shadow 0.25s ease"
      flexShrink={0}
    >
      <Image src={src} alt="Profile" boxSize="56px" objectFit="cover" />
    </Box>

    {/* Username — always rendered, fades in on expanded */}
    <Text
      className="avatar-name"
      color="white"
      fontSize={15}
      fontWeight={500}
      whiteSpace="nowrap"
      opacity={isOpen ? 1 : 0.75}
      transition="opacity 0.25s ease"
      letterSpacing="0.01em"
      textShadow="0 1px 4px rgba(0,0,0,0.6)"
    >
      {name}
    </Text>
  </Box>
);

interface PasswordInputProps {
  value: string;
  placeholder: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const PasswordInput = ({
  value,
  placeholder,
  isLoading,
  onChange,
  onSubmit,
}: PasswordInputProps) => (
  <InputGroup width="48" height="10" gap={1}>
    <Input
      aria-label="password-text-input"
      placeholder={placeholder}
      variant="solid"
      type="password"
      fontSize={14}
      height="26px"
      borderRadius="20"
      value={value}
      margin={0}
      alignSelf="center"
      width="sm"
      maxLength={20}
      bgColor="#0000007f"
      color="#fff"
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onSubmit();
      }}
    />
    <InputRightElement marginRight={1} height="100%" alignItems="center">
      {isLoading ? (
        <Spinner size="sm" aria-label="spinner" color="whiteAlpha.700" />
      ) : (
        <Box
          as="button"
          aria-label="login-button"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          color="whiteAlpha.700"
          fontSize="18px"
          transition="color 0.2s ease, transform 0.2s ease"
          _hover={{
            color: 'white',
            transform: 'translateX(2px)',
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))',
          }}
          _active={{ transform: 'translateX(1px) scale(0.9)' }}
          onClick={onSubmit}
          background="none"
          border="none"
          padding={0}
        >
          <ArrowRightCircleIcon width="18px" height="18px" />
        </Box>
      )}
    </InputRightElement>
  </InputGroup>
);

// ─── HintPopover ─────────────────────────────────────────────────────────────

interface HintPopoverProps {
  label: string;
  hint: string;
}

const HintPopover = ({ label, hint }: HintPopoverProps) => (
  <Popover placement="top" isLazy>
    <PopoverTrigger>
      <Box
        as="button"
        aria-label="password-hint-button"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        boxSize="18px"
        borderRadius="full"
        border="1.5px solid rgba(255,255,255,0.45)"
        color="rgba(255,255,255,0.55)"
        fontSize="11px"
        fontWeight={600}
        cursor="pointer"
        background="none"
        transition="border-color 0.2s ease, color 0.2s ease"
        _hover={{
          borderColor: 'rgba(255,255,255,0.9)',
          color: 'white',
        }}
      >
        ?
      </Box>
    </PopoverTrigger>
    <PopoverContent
      bg="rgba(30,30,30,0.4)"
      backdropFilter="blur(24px)"
      border="1px solid rgba(255,255,255,0.15)"
      boxShadow="0 8px 32px rgba(0,0,0,0.5)"
      borderRadius={12}
      color="white"
      maxW="260px"
      fontSize={13}
    >
      <PopoverArrow bg="rgba(30,30,30,0.4)" />
      <PopoverHeader
        fontSize={12}
        fontWeight={600}
        color="rgba(255,255,255,0.55)"
        borderColor="rgba(255,255,255,0.1)"
        letterSpacing="0.04em"
        textTransform="uppercase"
        pb={1}
      >
        {label}
      </PopoverHeader>
      <PopoverBody lineHeight={1.6} color="rgba(255,255,255,0.85)">
        {hint}
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

// ─── Constants ───────────────────────────────────────────────────────────────

const LOGIN_DELAY_MS = 2000;

// ─── Main Component ──────────────────────────────────────────────────────────

const UserLoginComponent = () => {
  const { t } = useTranslation();

  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, togglePasswordVisibility] = useBoolean();
  const [isLoading, toggleIsLoading] = useBoolean();

  const { login, isUserLocked } = processStore(useShallow(loginSelector));
  const {
    name,
    password: userPasswordData,
    profilePicture,
  } = settingsStore(useShallow(usersSelector)).userData;

  const handleLogin = useCallback(() => {
    if (isLoading) return;

    toggleIsLoading.on();

    setTimeout(() => {
      if (password === userPasswordData) {
        login();
      }
      toggleIsLoading.off();
    }, LOGIN_DELAY_MS);
  }, [isLoading, login, password, toggleIsLoading, userPasswordData]);

  const statusTextKey = isUserLocked
    ? 'LockScreen.loginPasswordText1'
    : 'LockScreen.loginPasswordText2';

  return (
    <>
      {/* Full-screen click-away overlay — dismisses password section on outside click */}
      <Box
        position="fixed"
        inset={0}
        zIndex={-1}
        cursor="default"
        opacity={isPasswordVisible ? 1 : 0}
        pointerEvents={isPasswordVisible ? 'auto' : 'none'}
        transition="opacity 0.3s ease"
        onClick={togglePasswordVisibility.off}
        aria-hidden="true"
      />

      <Box
        aria-label="user-login-component"
        width="100%"
        position="fixed"
        bottom="15%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        zIndex={0}
        gap={2}
      >
        <UserAvatarButton
          src={profilePicture}
          name={name}
          isOpen={isPasswordVisible}
          onClick={togglePasswordVisibility.toggle}
        />

        <Box
          display={isPasswordVisible ? 'flex' : 'none'}
          transition="all 0.5s"
          alignItems="center"
          position="relative"
        >
          <PasswordInput
            value={password}
            placeholder={t('LockScreen.inputPlaceholder')}
            isLoading={isLoading}
            onChange={setPassword}
            onSubmit={handleLogin}
          />
          {/* Password hint trigger — positioned to the right of the input */}
          <Box
            position="absolute"
            right="-28px"
            opacity={isPasswordVisible ? 1 : 0}
            pointerEvents={isPasswordVisible ? 'auto' : 'none'}
            transition="opacity 0.4s ease"
          >
            <HintPopover
              label={t('LockScreen.passwordHintLabel')}
              hint={t('LockScreen.passwordHint')}
            />
          </Box>
        </Box>

        <Text
          align="center"
          fontSize={12}
          color="white"
          opacity={isPasswordVisible ? 1 : 0}
          transition="all 1s"
        >
          {t(statusTextKey)}
        </Text>
      </Box>
    </>
  );
};

export default UserLoginComponent;
