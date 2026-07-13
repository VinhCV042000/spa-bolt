import { Helmet } from 'react-helmet-async';

import { Spa2VIPRoomPageView } from 'src/sections/spa2/view/spa2-content-pages4';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | VIP Room</title>
      </Helmet>
      <Spa2VIPRoomPageView />
    </>
  );
}
