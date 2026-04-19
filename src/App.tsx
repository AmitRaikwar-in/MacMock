import {
  ChakraUIProvider,
  ModalProvider,
  RouterProviderComponent,
} from '@providers';
import { useCallback, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

function App() {
  const handle = useFullScreenHandle();

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === 'F10') {
        try {
          const promise = handle.enter();
          if (promise && promise.catch) {
            promise.catch((err: any) => console.warn('Fullscreen error:', err));
          }
        } catch (err) {
          console.warn('Fullscreen error:', err);
        }
      } else if (event.key === 'Escape') {
        handle.exit();
      }
    },
    [handle],
  );

  useEffect(() => {
    const enterFullScreen = () => {
      if (!handle.active) {
        try {
          const promise = handle.enter();
          if (promise && promise.catch) {
            promise.catch((err: any) => console.warn('Fullscreen error:', err));
          }
        } catch (err) {
          console.warn('Fullscreen error:', err);
        }
      }
    };

    const handleFirstInteraction = () => {
      enterFullScreen();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handle, handleKeyPress]);

  return (
    <ChakraUIProvider>
      <FullScreen handle={handle}>
        <ModalProvider>
          <RouterProviderComponent />
        </ModalProvider>
      </FullScreen>
    </ChakraUIProvider>
  );
}

export default App;
