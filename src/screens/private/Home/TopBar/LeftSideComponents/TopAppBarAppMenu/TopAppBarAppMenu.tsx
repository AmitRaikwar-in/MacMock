import { Box } from '@chakra-ui/react';
import {
  activeAppActionsSelector,
  processStore,
  useShallow,
} from '@processStore';
import { ProgramType } from '@processStore';
import { MenuBranch } from './component';
import { TopAppBarAppMenuDatMap } from './constants';

const TopAppBarAppMenu = () => {
  // Single atomic selector that reads activeApp and its app-data together,
  // ensuring both values are always in sync within one Zustand subscription.
  const { activeAppRunning, hasWindowOpen } = processStore(
    useShallow((state) => {
      const active = state.ActiveApp.activeApp;
      const appData = state.ActiveApp.apps[active];
      return {
        activeAppRunning: active,
        hasWindowOpen: appData !== undefined,
      };
    }),
  );
  const { removeApp } = processStore(useShallow(activeAppActionsSelector));

  // Show Finder options by default whenever no program window is open
  const resolvedApp = hasWindowOpen ? activeAppRunning : ProgramType.FINDER;

  const menuTree = TopAppBarAppMenuDatMap[resolvedApp].menuTree.map(
    (branch) => ({
      ...branch,
      items: Object.fromEntries(
        Object.entries(branch.items).map(([key, item]) => [
          key,
          item.isQuitAction
            ? { ...item, action: () => removeApp(resolvedApp) }
            : item,
        ]),
      ),
    }),
  );

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      {Object.values(menuTree).map((app, index) => {
        return (
          <MenuBranch
            key={index + '-' + app}
            title={app.title}
            type={app.type}
            items={app.items}
          />
        );
      })}
    </Box>
  );
};

export default TopAppBarAppMenu;
