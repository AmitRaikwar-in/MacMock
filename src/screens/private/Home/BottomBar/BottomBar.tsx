import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Box, Divider } from '@chakra-ui/react';
import { BottomBarProps, ProgramItem } from './type';
import { ProgramButtonDraggable } from './components';
import { getAllAppOtherThanBottomBarApps, reorder } from './utils';
import PROGRAMS from './components/constants';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';
import {
  activeAppActionsSelector,
  activeAppRunningSelector,
  activeAppSelector,
  allActiveAppsSelector,
  processStore,
  ProgramType,
} from '@processStore';
import { LaunchpadContext } from '../../Mac';
import { ProgramButton } from '../common';
import { LaunchpadProgramsList } from '../Launchpad/constants';
import { BottomBarProgramType } from './components/types';

const InitialProgramOrderList: ProgramItem[] = Object.entries(PROGRAMS).map(
  (value) => ({
    type: value[0] as BottomBarProgramType,
    name: value[1].name,
    id: value[1].name,
  }),
);

const BottomBar = (_props: BottomBarProps) => {
  const { launchpad, setLaunchpad } = useContext(LaunchpadContext);
  const [state, setState] = useState<ProgramItem[]>(InitialProgramOrderList);
  const { bottomBarBgColor } = settingsStore(useShallow(darkModeColorSelector));
  const { addApp, bringToFront } = processStore(
    useShallow(activeAppActionsSelector),
  );
  const { allActiveApps, getActiveApp, activeAppRunning } = processStore(
    useShallow((state) => ({
      getActiveApp: activeAppSelector(state),
      allActiveApps: allActiveAppsSelector(state),
      ...activeAppRunningSelector(state),
    })),
  );

  const runningMiddleApps = getAllAppOtherThanBottomBarApps(
    allActiveApps as ProgramType[],
  ).slice(-3);

  function onDragEnd(result: DropResult) {
    if (
      result.destination &&
      result.destination.index !== result.source.index
    ) {
      const newList = reorder(
        state,
        result.source.index,
        result.destination.index,
      );

      setState(newList);
    }
  }

  const binCurrentAppState =
    getActiveApp(BottomBarProgramType.FINDER as unknown as ProgramType) ??
    undefined;

  useEffect(() => {
    if (activeAppRunning !== ProgramType.LAUNCHPAD) {
      setLaunchpad(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAppRunning, setLaunchpad]);

  return (
    <Box
      aria-label="bottom-bar"
      w={'100%'}
      zIndex={900}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list" direction="horizontal">
          {(provided) => (
            <>
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                display={'flex'}
                height={'auto'}
                p={1}
                my={1}
                mx={'auto'}
                position={'fixed'}
                alignItems={'center'}
                transition={'all 0.3s ease-in-out'}
                bg={bottomBarBgColor}
                borderRadius={'3xl'}
                border={'1px solid gray'}
                dropShadow={'md'}
                bottom={0}
                style={{ backdropFilter: 'blur(6px)' }}
                zIndex={10}
                gap={4}
              >
                {state.map((program, index) => {
                  const currentApp = getActiveApp(
                    program.type as unknown as ProgramType,
                  );
                  return (
                    <ProgramButtonDraggable
                      type={program.type}
                      key={program.name}
                      id={program.id}
                      isActive={
                        currentApp !== undefined ||
                        (program.type === BottomBarProgramType.LAUNCHPAD &&
                          launchpad === true)
                      }
                      index={index}
                      onClickHandler={(app: BottomBarProgramType) => {
                        if (app === BottomBarProgramType.LAUNCHPAD) {
                          setLaunchpad(!launchpad);
                          return; // Prevents opening app when launchpad is open
                        }
                        setLaunchpad(false); // Close launchpad when opening app
                        !currentApp
                          ? setTimeout(() => {
                              addApp(app as unknown as ProgramType);
                            }, 500)
                          : bringToFront(app as unknown as ProgramType);
                      }}
                    />
                  );
                })}
                {provided.placeholder}
                {runningMiddleApps.length !== 0 ? (
                  <>
                    <Divider orientation="vertical" height={' 16'} />
                    {runningMiddleApps.map((app) => {
                      const currentApp = getActiveApp(app);
                      return (
                        <ProgramButton
                          name={app.valueOf().toString()}
                          key={app}
                          variant="bottomBar"
                          icon={LaunchpadProgramsList[app].icon}
                          isActive={currentApp !== undefined}
                          onClickHandler={() => {
                            !currentApp
                              ? setTimeout(() => {
                                  addApp(app);
                                }, 500)
                              : bringToFront(app);
                          }}
                        />
                      );
                    })}
                  </>
                ) : null}
                <Divider orientation="vertical" height={'16'} />
                <ProgramButton
                  name="Bin"
                  variant="bottomBar"
                  icon={LaunchpadProgramsList['bin'].icon}
                  isActive={binCurrentAppState !== undefined}
                  onClickHandler={() => {
                    !binCurrentAppState
                      ? setTimeout(() => {
                          addApp(ProgramType.BIN);
                        }, 500)
                      : bringToFront(ProgramType.BIN);
                  }}
                />
              </Box>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default BottomBar;
