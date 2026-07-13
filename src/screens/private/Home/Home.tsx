import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { WallpaperComponent, Window } from '@components';
import { settingsStore, useShallow, wallpaperSelector } from '@settingsStore';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { ProgramType, processStore, activeAppSelector } from '@processStore';
import { Launchpad } from './Launchpad';
import { LaunchpadContext } from '../Mac';
import WindowAppMap from './AppMap';

const Home = () => {
  const { launchpad } = useContext(LaunchpadContext);
  const { wallpaper } = settingsStore(useShallow(wallpaperSelector));
  const activeApp = processStore(useShallow(activeAppSelector));

  const shouldShowAppWindow = (app: ProgramType) =>
    activeApp(app) !== undefined;
  return (
    <Box aria-label="home" width={'100vw'} height={'100vh'}>
      <Box width={'100vw'} height={'100vh'} position={'absolute'} zIndex={-10}>
        <WallpaperComponent id={wallpaper} />
      </Box>
      <Box
        width={'100vw'}
        height={7}
        top={0}
        position={'absolute'}
        zIndex={1000}
        bg={'black'}
      >
        <TopBar />
      </Box>
      <Box
        width={'100vw'}
        height={'10vh'}
        position={'absolute'}
        bottom={0}
        zIndex={950}
      >
        <BottomBar />
      </Box>

      {launchpad ? (
        <Launchpad />
      ) : (
        <>
          {Object.values(ProgramType).map((app) => {
            return (
              shouldShowAppWindow(app) && (
                <Window
                  key={app}
                  app={app}
                  children={WindowAppMap[app as ProgramType] ?? null}
                />
              )
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Home;
