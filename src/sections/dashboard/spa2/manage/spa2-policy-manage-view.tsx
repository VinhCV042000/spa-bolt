import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
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

import { useTranslate } from 'src/locales';
import { spa2PolicyBanner, spa2PolicyArticles } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import { SPA2_INK, SPA2_TEAL, SPA2_CREAM, SPA2_TEAL_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages the editable metadata behind /spa2/policy (Spa2PolicyPageView): the
// hero (eyebrow / 3-line title / subtitle / version label), the 4 highlight
// cards, and the 7-item sticky nav tab (label/icon/article number/order).
//
// Spa2PolicyPageView itself is a fixed multi-section legal document (7 "Điều
// X" clauses, each with hand-authored prose + helper components) — it is not
// a realistic CMS/WYSIWYG target this round, so the clause body text stays
// hardcoded in the public view. Only the navigational/structural metadata
// that IS reused verbatim by the public page is data-driven here. Because
// each article id is wired to a specific hardcoded section via
// `id="pol-<id>"`, articles can be relabelled/reordered/re-iconed but not
// added or removed from this screen.
// ─────────────────────────────────────────────────────────────────────────────

type Article = (typeof spa2PolicyArticles)[number];
type Highlight = (typeof spa2PolicyBanner.highlights)[number];

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

export function Spa2PolicyManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2PolicyBanner,
    titleLines: [...spa2PolicyBanner.titleLines],
    highlights: spa2PolicyBanner.highlights.map((h) => ({ ...h })),
  }));
  const [articles, setArticles] = useState<Article[]>(spa2PolicyArticles);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'preview'>('banner');
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: '', icon: '', article: '' });

  const updateBanner = (key: 'eyebrow' | 'subtitle' | 'versionLabel', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateTitleLines = (value: string) => {
    setBanner((prev) => ({ ...prev, titleLines: value.split('\n') }));
    setDirty(true);
  };
  const updateHighlight = (idx: number, key: keyof Highlight, value: string) => {
    setBanner((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => (i === idx ? { ...h, [key]: value } : h)),
    }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({
      ...spa2PolicyBanner,
      titleLines: [...spa2PolicyBanner.titleLines],
      highlights: spa2PolicyBanner.highlights.map((h) => ({ ...h })),
    });
    setArticles(spa2PolicyArticles);
    setDirty(false);
  };

  const openEdit = (item: Article) => {
    setForm({ label: item.label, icon: item.icon, article: item.article });
    setEditId(item.id);
  };

  const handleSubmit = useCallback(() => {
    setArticles((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    setEditId(null);
    setDirty(true);
  }, [form, editId]);

  const handleMoveUp = useCallback((id: string) => {
    setArticles((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx <= 0) return p;
      const next = [...p];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
    setDirty(true);
  }, []);

  const handleMoveDown = useCallback((id: string) => {
    setArticles((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx >= p.length - 1) return p;
      const next = [...p];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
    setDirty(true);
  }, []);

  return (
    <Spa2ManageShell
      title={t('policy.page_title')}
      description="Banner, highlight cards và nhãn điều khoản hiển thị trên trang Chính sách công khai."
      breadcrumbLabel={t('nav.policy')}
      publicPath={paths.spa2.policy}
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
          label={t('policy.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('policy.list_section')}
          icon={<Iconify icon="solar:bill-list-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - eyebrow/title/subtitle/version + 4 highlight cards */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <TextField
                  label={t('policy.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('policy.banner_title_lines')}
                  helperText={t('policy.banner_title_lines_help')}
                  value={banner.titleLines.join('\n')}
                  onChange={(e) => updateTitleLines(e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('policy.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('policy.banner_version')}
                  value={banner.versionLabel}
                  onChange={(e) => updateBanner('versionLabel', e.target.value)}
                  fullWidth
                  size="small"
                />
              </Stack>
            </Card>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5 }}>
              {t('policy.highlights_section')}
            </Typography>
            <Stack spacing={1.5}>
              {banner.highlights.map((h, idx) => (
                <Card key={`${h.label}-${idx}`} sx={{ p: 2, borderRadius: 2.5 }}>
                  <Stack direction="row" spacing={1.5}>
                    <TextField
                      label={t('policy.highlight_icon')}
                      value={h.icon}
                      onChange={(e) => updateHighlight(idx, 'icon', e.target.value)}
                      size="small"
                      sx={{ width: '30%' }}
                    />
                    <TextField
                      label={t('policy.highlight_label')}
                      value={h.label}
                      onChange={(e) => updateHighlight(idx, 'label', e.target.value)}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label={t('policy.highlight_sub')}
                      value={h.sub}
                      onChange={(e) => updateHighlight(idx, 'sub', e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Box sx={{ bgcolor: SPA2_CREAM, py: 5, px: 3 }}>
                <Typography sx={{ fontSize: 11, color: SPA2_TEAL_DARK, mb: 1 }}>
                  {banner.versionLabel}
                </Typography>
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                  {banner.eyebrow.toUpperCase()}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, mt: 1 }}
                >
                  {banner.titleLines.map((line, idx) => (
                    <Box component="span" key={`${line}-${idx}`} sx={{ display: 'block' }}>
                      {line}
                    </Box>
                  ))}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 400 }}>
                  {banner.subtitle}
                </Typography>
                <Grid container spacing={1.5} sx={{ mt: 2 }}>
                  {banner.highlights.map((h, idx) => (
                    <Grid key={`${h.label}-${idx}`} xs={6}>
                      <Spa2SoftCard sx={{ textAlign: 'center', py: 2 }}>
                        <Iconify icon={h.icon} width={24} sx={{ color: SPA2_TEAL, mb: 0.5 }} />
                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: SPA2_INK }}>
                          {h.label}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>
                          {h.sub}
                        </Typography>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Nhãn điều khoản (nav tabs) */}
      {tab === 'list' && (
        <Card>
          <Stack sx={{ p: 2 }}>
            <Alert
              severity="info"
              icon={<Iconify icon="solar:info-circle-bold" />}
              sx={{ borderRadius: 2 }}
            >
              {t('policy.list_note')}
            </Alert>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={40}>{t('faq.col_order')}</TableCell>
                  <TableCell>{t('policy.col_article')}</TableCell>
                  <TableCell>{t('policy.col_label')}</TableCell>
                  <TableCell>{t('policy.col_icon')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((item, index) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack alignItems="center" spacing={0.5}>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveUp(item.id)}
                          disabled={index === 0}
                        >
                          <Iconify icon="eva:arrow-up-fill" width={14} />
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                          {index + 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveDown(item.id)}
                          disabled={index === articles.length - 1}
                        >
                          <Iconify icon="eva:arrow-down-fill" width={14} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={item.article} />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify icon={item.icon} width={16} sx={{ color: SPA2_TEAL }} />
                        <Typography variant="subtitle2">{item.label}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {item.icon}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={t('common.edit')}>
                        <IconButton size="small" onClick={() => openEdit(item)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Live preview — mirrors Spa2PolicyPageView's hero + highlights + sticky nav */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, px: 3 }}>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid xs={12} md={7}>
                  <Stack spacing={1.5}>
                    <Chip
                      size="small"
                      icon={<Iconify icon="solar:clock-circle-bold" width={13} />}
                      label={banner.versionLabel}
                      sx={{ width: 'fit-content', bgcolor: 'common.white' }}
                    />
                    <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                      {banner.eyebrow.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1 }}
                    >
                      {banner.titleLines.map((line, idx) => (
                        <Box component="span" key={`${line}-${idx}`} sx={{ display: 'block' }}>
                          {line}
                        </Box>
                      ))}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', maxWidth: 480 }}>
                      {banner.subtitle}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid xs={12} md={5}>
                  <Grid container spacing={1.5}>
                    {banner.highlights.map((h, idx) => (
                      <Grid key={`${h.label}-${idx}`} xs={6}>
                        <Spa2SoftCard sx={{ textAlign: 'center', py: 2.5 }}>
                          <Iconify icon={h.icon} width={26} sx={{ color: SPA2_TEAL, mb: 0.5 }} />
                          <Typography sx={{ fontSize: 12, fontWeight: 600, color: SPA2_INK }}>
                            {h.label}
                          </Typography>
                          <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>
                            {h.sub}
                          </Typography>
                        </Spa2SoftCard>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box sx={{ borderBottom: `1px solid ${SPA2_CREAM}` }}>
            <Container>
              <Tabs
                value={0}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                  '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
                }}
              >
                {articles.map((n) => (
                  <Tab
                    key={n.id}
                    label={n.label}
                    icon={<Iconify icon={n.icon} width={15} />}
                    iconPosition="start"
                    sx={{
                      minHeight: 50,
                      fontSize: 13,
                      textTransform: 'none',
                      color: 'text.secondary',
                    }}
                  />
                ))}
              </Tabs>
            </Container>
          </Box>

          <Box sx={{ py: 5 }}>
            <Container maxWidth="md">
              <Alert
                severity="info"
                icon={<Iconify icon="solar:info-circle-bold" />}
                sx={{ borderRadius: 2 }}
              >
                {t('policy.body_note')}
              </Alert>
            </Container>
          </Box>
        </Box>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editId} onClose={() => setEditId(null)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('policy.form_edit')}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('policy.col_article')}
              value={form.article}
              onChange={(e) => setForm((p) => ({ ...p, article: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('policy.col_label')}
              value={form.label}
              onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('policy.col_icon')}
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              fullWidth
              placeholder="solar:calendar-bold"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditId(null)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {t('policy.form_edit')}
          </Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
