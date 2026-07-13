import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { SpaView } from 'src/sections/spa/view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('spa');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      <SpaView />
    </>
  );
}
