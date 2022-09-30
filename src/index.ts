import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { LoadOptions } from 'fathom-client';
import {
  load,
  trackPageview,
  blockTrackingForMe,
  enableTrackingForMe,
  isTrackingEnabled,
  trackGoal,
} from 'fathom-client';

const useFathom = (
  siteId: string,
  options?: LoadOptions
): {
  trackGoal: typeof trackGoal;
  toggleTracking: (enabled?: boolean) => void;
} => {
  const { events } = useRouter();

  useEffect(() => {
    const newOptions = { ...options };

    if (newOptions.url) {
      const { origin } = new URL(newOptions.url);

      newOptions.url = new URL('script.js', origin).href;
    }

    load(siteId, options);

    const onRouteChangeComplete = () => trackPageview();

    events.on('routeChangeComplete', onRouteChangeComplete);

    onRouteChangeComplete();

    return () => {
      events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [events, options, siteId]);

  const toggleTracking = (enabled?: boolean) => {
    if (enabled === undefined) {
      if (isTrackingEnabled()) {
        blockTrackingForMe();
      } else {
        enableTrackingForMe();
      }
    } else if (enabled) {
      enableTrackingForMe();
    } else {
      blockTrackingForMe();
    }
  };

  return { trackGoal, toggleTracking };
};

export default useFathom;
