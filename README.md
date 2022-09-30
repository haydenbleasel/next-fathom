# next-fathom

`next-fathom` is a tiny, SSR-friendly React hook specifically designed for Next.js that adds [Fathom Analytics](https://usefathom.com/), a privacy-focused analytics tool, to your site. When installed, it will automatically initialize Fathom and track page views using the Next.js router.

### Installation

```bash
yarn add @haydenbleasel/next-fathom
```

### Usage

```tsx
import useFathom from '@haydenbleasel/next-fathom';

const Component = () => {
  const { trackGoal, setTrackingEnabled } = useFathom('YOUR_SITE_ID', options);

  return (
    <div>
      <p onClick={() => trackGoal('YOUR_GOAL_ID', 20)}>Goal achieved!</p>
      <p onClick={() => setTrackingEnabled(false)}>Disable tracking</p>
    </div>
  );
};
```

### Options

Options can be passed to the hook to customize the behavior of the Fathom script. These options are exported from [`LoadOptions`](https://github.com/derrickreimer/fathom-client#arguments) on the [`fathom-client`](https://github.com/derrickreimer/fathom-client) package.

The `url` option within `LoadOptions` has built-in compensation if you forget to enter the `script.js` endpoint, meaning you can simply pass the domain name of your Fathom instance e.g. `https://analytics.example.com` and it will append `/script.js` for you.

### Return Values

The `useFathom` hook returns two values:

1. `trackGoal` - directly exported from `fathom-client`, this function can be used to track goals.
2. `toggleTracking(boolean)` - this function can be used to toggle, enable or disable tracking. When passed a boolean, this maps to `fathom-client`'s `enableTrackingForMe` and `blockTrackingForMe`. If not passed a boolean, it will toggle the current state. The initial value is the result of `fathom-client`'s `isTrackingEnabled()`.

The `setSite` function is not exported, as a change to the Site ID as the first argument to the hook will un-hook from the router and re-initialize the Fathom script.
