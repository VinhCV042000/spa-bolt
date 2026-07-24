import type {
  Spa2PressAward,
  Spa2PressBanner,
  Spa2PressArticle,
  Spa2PressContact,
  Spa2AdjustableImage,
  Spa2PressArticleType} from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2PressAwards,
  spa2PressBanner,
  spa2PressContact,
  spa2PressArticles
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2PressPageView } from 'src/sections/spa2/view/spa2-content-pages4';
import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2PressPageView renders on the public /spa2/press page: the page banner,
// the awards grid, the press-coverage article list, and the press-contact
// info — read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. The article-type
// filter chips on the public page are purely interactive UI (no admin-
// editable content) and are intentionally not mocked here, matching the
// project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const ARTICLE_TYPES: Spa2PressArticleType[] = [
  'Feature',
  'Ranking',
  'Business',
  'Review',
  'Award',
  'Interview',
];

const EMPTY_AWARD_FORM = {
  name: '',
  org: '',
  icon: 'solar:medal-ribbon-star-bold-duotone',
  color: '#2E8B7A',
};
const EMPTY_ARTICLE_FORM = {
  outlet: '',
  logo: '',
  date: '',
  title: '',
  type: 'Feature' as Spa2PressArticleType,
  url: '',
};

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

export function Spa2PressManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2PressBanner>(() => ({
    ...spa2PressBanner,
    image: { ...spa2PressBanner.image },
  }));
  const [awards, setAwards] = useState<Spa2PressAward[]>(spa2PressAwards);
  const [articles, setArticles] = useState<Spa2PressArticle[]>(spa2PressArticles);
  const [contact, setContact] = useState<Spa2PressContact>(spa2PressContact);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'awards' | 'articles' | 'contact' | 'preview'>(
    'banner'
  );

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const updateContact = (key: keyof Spa2PressContact, value: string) => {
    setContact((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2PressBanner, image: { ...spa2PressBanner.image } });
    setAwards(spa2PressAwards);
    setArticles(spa2PressArticles);
    setContact(spa2PressContact);
    setDirty(false);
  };

  // ---- Awards ----
  const [openAwardForm, setOpenAwardForm] = useState(false);
  const [editAwardId, setEditAwardId] = useState<string | null>(null);
  const [deleteAwardId, setDeleteAwardId] = useState<string | null>(null);
  const [awardForm, setAwardForm] = useState(EMPTY_AWARD_FORM);

  const handleAwardChange =
    (field: keyof typeof awardForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setAwardForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreateAward = () => {
    setAwardForm(EMPTY_AWARD_FORM);
    setEditAwardId(null);
    setOpenAwardForm(true);
  };
  const openEditAward = (award: Spa2PressAward) => {
    setAwardForm({ name: award.name, org: award.org, icon: award.icon, color: award.color });
    setEditAwardId(award.id);
    setOpenAwardForm(true);
  };
  const handleAwardSubmit = useCallback(() => {
    if (editAwardId !== null) {
      setAwards((p) => p.map((x) => (x.id === editAwardId ? { ...x, ...awardForm } : x)));
    } else {
      setAwards((p) => [...p, withId({ ...awardForm })]);
    }
    setOpenAwardForm(false);
    setDirty(true);
  }, [awardForm, editAwardId]);
  const handleAwardDelete = useCallback(() => {
    setAwards((p) => p.filter((x) => x.id !== deleteAwardId));
    setDeleteAwardId(null);
    setDirty(true);
  }, [deleteAwardId]);

  // ---- Articles ----
  const [openArticleForm, setOpenArticleForm] = useState(false);
  const [editArticleId, setEditArticleId] = useState<string | null>(null);
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState(EMPTY_ARTICLE_FORM);

  const handleArticleChange =
    (field: keyof typeof articleForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setArticleForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreateArticle = () => {
    setArticleForm(EMPTY_ARTICLE_FORM);
    setEditArticleId(null);
    setOpenArticleForm(true);
  };
  const openEditArticle = (article: Spa2PressArticle) => {
    setArticleForm({
      outlet: article.outlet,
      logo: article.logo,
      date: article.date,
      title: article.title,
      type: article.type,
      url: article.url,
    });
    setEditArticleId(article.id);
    setOpenArticleForm(true);
  };
  const handleArticleSubmit = useCallback(() => {
    if (editArticleId !== null) {
      setArticles((p) => p.map((x) => (x.id === editArticleId ? { ...x, ...articleForm } : x)));
    } else {
      setArticles((p) => [...p, withId({ ...articleForm })]);
    }
    setOpenArticleForm(false);
    setDirty(true);
  }, [articleForm, editArticleId]);
  const handleArticleDelete = useCallback(() => {
    setArticles((p) => p.filter((x) => x.id !== deleteArticleId));
    setDeleteArticleId(null);
    setDirty(true);
  }, [deleteArticleId]);

  return (
    <Spa2ManageShell
      title={t('press.page_title')}
      description="Banner, giải thưởng, bài báo chí và thông tin liên hệ hiển thị trên trang Báo chí & Truyền thông công khai."
      breadcrumbLabel={t('nav.press')}
      publicPath={paths.spa2.press}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!dirty}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            {t('common.discard_changes')}
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{
              borderRadius: 50,
              px: 3,
              bgcolor: 'common.white',
              color: SPA2_TEAL,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
            }}
          >
            {t('common.save_changes')}
          </Button>
        </>
      }
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        {dirty && (
          <Chip
            size="small"
            variant="soft"
            color="warning"
            label={t('common.unsaved_changes')}
            icon={<Iconify icon="solar:pen-bold" width={14} />}
          />
        )}
        {savedAt && !dirty && (
          <Chip
            size="small"
            variant="soft"
            color="success"
            label={t('common.saved_at', { time: savedAt.toLocaleTimeString('vi-VN') })}
            icon={<Iconify icon="solar:check-circle-bold" width={14} />}
          />
        )}
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, v: typeof tab) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 65,
          zIndex: 10,
          bgcolor: 'background.paper',
          '& .MuiTab-root': { minHeight: 56, fontWeight: 600 },
          '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
          '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
        }}
      >
        <Tab
          value="banner"
          label={t('press.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="awards"
          label={t('press.awards_section')}
          icon={<Iconify icon="solar:medal-ribbon-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="articles"
          label={t('press.articles_section')}
          icon={<Iconify icon="solar:document-text-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="contact"
          label={t('press.contact_section')}
          icon={<Iconify icon="solar:letter-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('press.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('press.banner_image_help')}
                />
                <TextField
                  label={t('press.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('press.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('press.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Spa2PressPageView
                banner={banner}
                awards={awards}
                articles={articles}
                contact={contact}
              />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Awards */}
      {tab === 'awards' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateAward}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('press.award_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {awards.map((award) => (
            <Grid key={award.id} xs={12} sm={6} md={3}>
              <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: `${award.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1.5,
                  }}
                >
                  <Iconify icon={award.icon} width={30} sx={{ color: award.color }} />
                </Box>
                <Typography sx={{ fontWeight: 600, mb: 0.5, fontSize: 14 }}>
                  {award.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5 }}>
                  {award.org}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEditAward(award)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteAwardId(award.id)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Articles */}
      {tab === 'articles' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('press.articles_section')} ({articles.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateArticle}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('press.article_add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('press.col_title')}</TableCell>
                  <TableCell>{t('press.col_outlet')}</TableCell>
                  <TableCell>{t('press.col_date')}</TableCell>
                  <TableCell>{t('press.col_type')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            bgcolor: 'text.primary',
                            color: 'common.white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 11,
                            flexShrink: 0,
                          }}
                        >
                          {article.logo}
                        </Box>
                        <Typography variant="subtitle2" sx={{ maxWidth: 320 }}>
                          {article.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{article.outlet}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <Chip size="small" label={article.type} variant="soft" />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEditArticle(article)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteArticleId(article.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Contact */}
      {tab === 'contact' && (
        <Card sx={{ p: 3, borderRadius: 3, maxWidth: 520 }}>
          <Stack spacing={2.5}>
            <TextField
              label={t('press.contact_email')}
              value={contact.email}
              onChange={(e) => updateContact('email', e.target.value)}
              fullWidth
            />
            <TextField
              label={t('press.contact_media_kit_url')}
              value={contact.mediaKitUrl}
              onChange={(e) => updateContact('mediaKitUrl', e.target.value)}
              helperText={t('press.contact_media_kit_url_help')}
              fullWidth
            />
          </Stack>
        </Card>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PressPageView
            banner={banner}
            awards={awards}
            articles={articles}
            contact={contact}
          />
        </Box>
      )}

      {/* Award create / edit dialog */}
      <Dialog open={openAwardForm} onClose={() => setOpenAwardForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editAwardId !== null ? t('press.award_form_edit') : t('press.award_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('press.award_form_name')}
              value={awardForm.name}
              onChange={handleAwardChange('name')}
              fullWidth
            />
            <TextField
              label={t('press.award_form_org')}
              value={awardForm.org}
              onChange={handleAwardChange('org')}
              fullWidth
            />
            <TextField
              label={t('press.award_form_icon')}
              value={awardForm.icon}
              onChange={handleAwardChange('icon')}
              fullWidth
            />
            <TextField
              label={t('press.award_form_color')}
              value={awardForm.color}
              onChange={handleAwardChange('color')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAwardForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleAwardSubmit}
            disabled={!awardForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editAwardId !== null ? t('press.award_form_edit') : t('press.award_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Article create / edit dialog */}
      <Dialog
        open={openArticleForm}
        onClose={() => setOpenArticleForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editArticleId !== null ? t('press.article_form_edit') : t('press.article_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('press.article_form_title')}
              value={articleForm.title}
              onChange={handleArticleChange('title')}
              fullWidth
              multiline
              rows={2}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('press.col_outlet')}
                value={articleForm.outlet}
                onChange={handleArticleChange('outlet')}
                fullWidth
              />
              <TextField
                label={t('press.article_form_logo')}
                value={articleForm.logo}
                onChange={handleArticleChange('logo')}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('press.col_date')}
                value={articleForm.date}
                onChange={handleArticleChange('date')}
                placeholder="dd/mm/yyyy"
                fullWidth
              />
              <TextField
                select
                label={t('press.col_type')}
                value={articleForm.type}
                onChange={(e) =>
                  setArticleForm((p) => ({ ...p, type: e.target.value as Spa2PressArticleType }))
                }
                fullWidth
              >
                {ARTICLE_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label={t('press.article_form_url')}
              value={articleForm.url}
              onChange={handleArticleChange('url')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArticleForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleArticleSubmit}
            disabled={!articleForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editArticleId !== null ? t('press.article_form_edit') : t('press.article_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteAwardId}
        onClose={() => setDeleteAwardId(null)}
        title={t('press.award_delete_title')}
        content={t('press.award_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleAwardDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteArticleId}
        onClose={() => setDeleteArticleId(null)}
        title={t('press.article_delete_title')}
        content={t('press.article_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleArticleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
