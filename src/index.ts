import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { LoadOptions } from 'fathom-client';
import {
  load,
  trackPageview,
  blockTrackingForMe,
  enableTrackingForMe,
  isTrackingEnabled,
  trackGoal,
  setSite,
} from 'fathom-client';

const useFathom = (
  siteId: string,
  options?: LoadOptions
): {
  trackGoal: typeof trackGoal;
  setSite: typeof setSite;
  setTrackingEnabled: (enabled: boolean) => void;
} => {
  const { events } = useRouter();
  const [trackingEnabled, setTrackingEnabled] = useState(isTrackingEnabled());

  useEffect(() => {
    if (trackingEnabled) {
      enableTrackingForMe();
    } else {
      blockTrackingForMe();
    }
  }, [trackingEnabled]);

  useEffect(() => {
    load(siteId, options);

    const onRouteChangeComplete = () => trackPageview();

    events.on('routeChangeComplete', onRouteChangeComplete);

    onRouteChangeComplete();

    return () => {
      events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [events, options, siteId]);

  return { trackGoal, setTrackingEnabled, setSite };
};

export default useFathom;
