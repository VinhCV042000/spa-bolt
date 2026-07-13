import { Helmet } from 'react-helmet-async';

import { Spa2LoyaltyRewardsPageView } from 'src/sections/spa2/view/spa2-content-pages3';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Loyalty Rewards</title>
      </Helmet>
      <Spa2LoyaltyRewardsPageView />
    </>
  );
}
