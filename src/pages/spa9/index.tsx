import { Helmet } from 'react-helmet-async';

import { Spa9View } from 'src/sections/spa9/view';

// ----------------------------------------------------------------------

export default function Spa9Page() {
  return (
    <>
      <Helmet>
        <title>Soleil Méditerranée — Mediterranean Coastal Wellness</title>
        <meta
          name="description"
          content="Soleil Méditerranée — Wellness Địa Trung Hải với Roman Bath, dầu olive Hy Lạp, muối biển Camargue và đá núi lửa Santorini. Day Pass & Retreat packages."
        />
      </Helmet>
      <Spa9View />
    </>
  );
}
