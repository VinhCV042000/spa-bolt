import { Helmet } from 'react-helmet-async';

import { Spa13TrainingView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13TrainingPage() {
  return (
    <>
      <Helmet>
        <title>Training — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13TrainingView />
    </>
  );
}
