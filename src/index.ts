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
} from 'fathom-client';

const useFathom = (
  siteId: string,
  options?: LoadOptions
): {
  trackGoal: typeof trackGoal;
  toggleTracking: (enabled?: boolean) => void;
} => {
  const { events } = useRouter();
  const defaultState =
    typeof window === 'undefined' ? null : isTrackingEnabled();
  const [trackingEnabled, setTrackingEnabled] = useState(defaultState);
  const toggleTracking = (enabled?: boolean) =>
    setTrackingEnabled(enabled ?? !trackingEnabled);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (trackingEnabled) {
      enableTrackingForMe();
    } else {
      blockTrackingForMe();
    }
  }, [trackingEnabled]);

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

  return { trackGoal, toggleTracking };
};

export default useFathom;
