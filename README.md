# next-fathom

`next-fathom` is a React hook specifically designed for Next.js that adds [Fathom Analytics](https://usefathom.com/), a privacy-focused analytics tool, to your site. When installed, it will automatically initialize Fathom and track page views using the Next.js router.

### Installation

```bash
yarn add @haydenbleasel/next-fathom
```

### Usage

```tsx
import { useFathom } from '@haydenbleasel/next-fathom';

const Component = () => {
  const { trackGoal } = useFathom('YOUR_SITE_ID', options);

  return <p onClick={() => trackGoal('YOUR_GOAL_ID', 20)}>Goal achieved!</p>;
};
```

### Options

Options can be passed to the hook to customize the behavior of the Fathom script. These options are exported from [`LoadOptions`](https://github.com/derrickreimer/fathom-client#arguments) on the [`fathom-client`](https://github.com/derrickreimer/fathom-client) package.

### Return Value

The `useFathom` hook actually returns three values:

1. `trackGoal` - directly exported from `fathom-client`, this function can be used to track goals.
2. `setSite` - directly exported from `fathom-client`, this function can be used to change the site ID.
3. `setTrackingEnabled` - this function can be used to enable or disable tracking. This maps to `fathom-client`'s `enableTrackingForMe` and `blockTrackingForMe`, initially set to the result of `isTrackingEnabled()`.
