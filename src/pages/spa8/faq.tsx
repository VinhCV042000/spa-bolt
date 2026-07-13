import { Helmet } from 'react-helmet-async';

import { Spa8FaqPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Câu hỏi thường gặp</title>
      </Helmet>
      <Spa8FaqPageView />
    </>
  );
}
