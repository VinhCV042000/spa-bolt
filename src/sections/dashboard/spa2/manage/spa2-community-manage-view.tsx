import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2CommunityPosts,
  spa2CommunityBanner,
  type Spa2CommunityPost,
  spa2CommunityChallenges,
  type Spa2CommunityBanner,
  type Spa2CommunityChallenge,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2CommunityPageView } from 'src/sections/spa2/view/spa2-content-pages6';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages6.tsx's
// Spa2CommunityPageView renders on the public /spa2/community page: the
// cream hero banner (eyebrow/title/subtitle), the feed of featured posts
// (avatar/author/role/time/content/optional image/tags/like+comment+share
// counters) and the "Thử thách cộng đồng" challenge sidebar (icon/name/
// participants/progress bar) - read from and written back in the same shape
// as src/_mock/_spa2, the single source of truth shared with the public
// view. The post composer, the like/join toggles and the "Top thành viên" /
// "Khám phá thêm" sidebar cards are purely client-derived interactive demo
// state (or shared data from other sections) and are intentionally not
// mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_POST: Omit<Spa2CommunityPost, 'id'> = {
  author: '',
  avatar: '',
  role: '',
  time: '',
  content: '',
  image: '',
  likes: 0,
  comments: 0,
  tags: [],
};

const EMPTY_CHALLENGE: Omit<Spa2CommunityChallenge, 'id'> = {
  name: '',
  participants: 0,
  icon: '🏆',
  color: SPA2_TEAL,
  progress: 0,
};

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon={icon} width={22} sx={{ color: SPA2_TEAL }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>
        {action}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Card>
  );
}

function PreviewFrame({ children }: { children: ReactNode }) {
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

// Mirrors the cream PageHero section rendered by Spa2CommunityPageView on
// the public page - eyebrow/title/subtitle centered, using the standard
// teal brand tokens (the hero image itself stays hardcoded to
// SPA2_PAGE_IMAGES.blog on the public page and is not manageable here).
function BannerPreview({ banner }: { banner: Spa2CommunityBanner }) {
  return (
    <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 460 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors one feed post card exactly as rendered in the public "Community &
// Lifestyle" feed (see Spa2CommunityPageView): avatar/author/role chip/
// time, content text, optional image, tag chips and the like/comment/share
// action row.
function PostPreviewCard({ post }: { post: Omit<Spa2CommunityPost, 'id'> }) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar src={post.avatar} sx={{ width: 44, height: 44 }} />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
              {post.author || '(Chưa đặt tên)'}
            </Typography>
            <Chip
              label={post.role}
              size="small"
              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 10, height: 18 }}
            />
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{post.time}</Typography>
        </Box>
      </Stack>
      <Typography sx={{ color: SPA2_INK, lineHeight: 1.75, mb: 2, fontSize: 14 }}>
        {post.content}
      </Typography>
      {post.image && (
        <Box
          sx={{
            height: 180,
            borderRadius: 3,
            backgroundImage: `url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mb: 2,
          }}
        />
      )}
      <Stack direction="row" spacing={0.75} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
        {post.tags.map((tag, idx) => (
          <Chip
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            label={`#${tag}`}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
          />
        ))}
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      <Stack direction="row" spacing={2}>
        <Button
          size="small"
          startIcon={<Iconify icon="solar:like-linear" width={16} />}
          sx={{ borderRadius: 99, color: 'text.secondary' }}
        >
          {post.likes}
        </Button>
        <Button
          size="small"
          startIcon={<Iconify icon="solar:chat-round-dots-linear" width={16} />}
          sx={{ borderRadius: 99, color: 'text.secondary' }}
        >
          {post.comments}
        </Button>
        <Button
          size="small"
          startIcon={<Iconify icon="solar:share-linear" width={16} />}
          sx={{ borderRadius: 99, color: 'text.secondary' }}
        >
          Chia sẻ
        </Button>
      </Stack>
    </Card>
  );
}

// Mirrors one "Thử thách cộng đồng" sidebar row exactly as rendered in the
// public view: icon, name, participant count and a progress bar colored
// with the challenge's own color.
function ChallengePreviewCard({ challenge }: { challenge: Omit<Spa2CommunityChallenge, 'id'> }) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ fontSize: 18 }}>{challenge.icon || '🏆'}</Typography>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
              {challenge.name || '(Chưa đặt tên)'}
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              {challenge.participants.toLocaleString()} người tham gia
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            bgcolor: challenge.color || SPA2_TEAL,
            border: `1px solid ${SPA2_CREAM_DARK}`,
            flexShrink: 0,
          }}
        />
      </Stack>
      <LinearProgress
        variant="determinate"
        value={Math.min(100, Math.max(0, challenge.progress))}
        sx={{
          height: 5,
          borderRadius: 99,
          bgcolor: SPA2_CREAM_DARK,
          '& .MuiLinearProgress-bar': { bgcolor: challenge.color || SPA2_TEAL, borderRadius: 99 },
        }}
      />
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows), matching the water
// therapy manage view's MiniListField convention - used here for the
// post's tag list.
function MiniListField({
  label,
  addLabel,
  items,
  onChangeItem,
  onAddItem,
  onRemoveItem,
}: {
  label: string;
  addLabel: string;
  items: string[];
  onChangeItem: (idx: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (idx: number) => void;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {label}
      </Typography>
      <Stack spacing={1}>
        {items.map((value, idx) => (
          <Stack
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              fullWidth
              size="small"
              value={value}
              onChange={(e) => onChangeItem(idx, e.target.value)}
            />
            <IconButton size="small" color="error" onClick={() => onRemoveItem(idx)}>
              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            </IconButton>
          </Stack>
        ))}
        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onAddItem}
          sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
        >
          {addLabel}
        </Button>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2CommunityManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2CommunityBanner>(() => ({ ...spa2CommunityBanner }));
  const [posts, setPosts] = useState<Spa2CommunityPost[]>(() =>
    spa2CommunityPosts.map((item) => ({ ...item, tags: [...item.tags] }))
  );
  const [challenges, setChallenges] = useState<Spa2CommunityChallenge[]>(() =>
    spa2CommunityChallenges.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'posts' | 'challenges' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Posts CRUD ----
  const [postDialog, setPostDialog] = useState(false);
  const [postEditId, setPostEditId] = useState<string | null>(null);
  const [postForm, setPostForm] = useState<Omit<Spa2CommunityPost, 'id'>>(EMPTY_POST);
  const [postDeleteId, setPostDeleteId] = useState<string | null>(null);

  const openCreatePost = () => {
    setPostForm(EMPTY_POST);
    setPostEditId(null);
    setPostDialog(true);
  };
  const openEditPost = (item: Spa2CommunityPost) => {
    const { id, ...rest } = item;
    setPostForm({ ...rest, tags: [...rest.tags] });
    setPostEditId(id);
    setPostDialog(true);
  };
  const submitPost = () => {
    const next: Omit<Spa2CommunityPost, 'id'> = {
      ...postForm,
      likes: Number(postForm.likes),
      comments: Number(postForm.comments),
      tags: postForm.tags.map((tag) => tag.trim()).filter(Boolean),
    };
    if (postEditId) {
      setPosts((prev) =>
        prev.map((item) => (item.id === postEditId ? { ...item, ...next } : item))
      );
    } else {
      setPosts((prev) => [...prev, withId(next)]);
    }
    setPostDialog(false);
    markDirty();
  };
  const confirmDeletePost = () => {
    setPosts((prev) => prev.filter((item) => item.id !== postDeleteId));
    setPostDeleteId(null);
    markDirty();
  };
  const reorderPosts = (next: Spa2CommunityPost[]) => {
    setPosts(next);
    markDirty();
  };

  const updateTag = (idx: number, value: string) => {
    setPostForm((p) => ({ ...p, tags: p.tags.map((tag, i) => (i === idx ? value : tag)) }));
  };
  const addTag = () => setPostForm((p) => ({ ...p, tags: [...p.tags, ''] }));
  const removeTag = (idx: number) =>
    setPostForm((p) => ({ ...p, tags: p.tags.filter((_, i) => i !== idx) }));

  // ---- Challenges CRUD ----
  const [challengeDialog, setChallengeDialog] = useState(false);
  const [challengeEditId, setChallengeEditId] = useState<string | null>(null);
  const [challengeForm, setChallengeForm] =
    useState<Omit<Spa2CommunityChallenge, 'id'>>(EMPTY_CHALLENGE);
  const [challengeDeleteId, setChallengeDeleteId] = useState<string | null>(null);

  const openCreateChallenge = () => {
    setChallengeForm(EMPTY_CHALLENGE);
    setChallengeEditId(null);
    setChallengeDialog(true);
  };
  const openEditChallenge = (item: Spa2CommunityChallenge) => {
    const { id, ...rest } = item;
    setChallengeForm({ ...rest });
    setChallengeEditId(id);
    setChallengeDialog(true);
  };
  const submitChallenge = () => {
    const next: Omit<Spa2CommunityChallenge, 'id'> = {
      ...challengeForm,
      participants: Number(challengeForm.participants),
      progress: Number(challengeForm.progress),
    };
    if (challengeEditId) {
      setChallenges((prev) =>
        prev.map((item) => (item.id === challengeEditId ? { ...item, ...next } : item))
      );
    } else {
      setChallenges((prev) => [...prev, withId(next)]);
    }
    setChallengeDialog(false);
    markDirty();
  };
  const confirmDeleteChallenge = () => {
    setChallenges((prev) => prev.filter((item) => item.id !== challengeDeleteId));
    setChallengeDeleteId(null);
    markDirty();
  };
  const reorderChallenges = (next: Spa2CommunityChallenge[]) => {
    setChallenges(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2CommunityBanner });
    setPosts(spa2CommunityPosts.map((item) => ({ ...item, tags: [...item.tags] })));
    setChallenges(spa2CommunityChallenges.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('community.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.community')}
      publicPath={paths.spa2.community}
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
          label={t('community.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="posts"
          label={t('community.posts_section')}
          icon={<Iconify icon="solar:chat-round-like-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="challenges"
          label={t('community.challenges_section')}
          icon={<Iconify icon="solar:cup-star-bold-duotone" width={20} />}
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
            <SectionCard
              title={t('community.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('community.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('community.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('community.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Posts */}
      {tab === 'posts' && (
        <SectionCard
          title={t('community.posts_section')}
          icon="solar:chat-round-like-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreatePost}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('community.add_post_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('community.drag_hint')}
          </Typography>
          {posts.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('community.no_posts')}
            </Typography>
          )}
          <Spa2SortableGrid items={posts} onReorder={reorderPosts}>
            <Grid container spacing={2}>
              {posts.map((item) => (
                <Grid key={item.id} xs={12} md={6}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <PostPreviewCard post={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditPost(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPostDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Challenges */}
      {tab === 'challenges' && (
        <SectionCard
          title={t('community.challenges_section')}
          icon="solar:cup-star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateChallenge}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('community.add_challenge_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('community.drag_hint')}
          </Typography>
          {challenges.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('community.no_challenges')}
            </Typography>
          )}
          <Spa2SortableGrid items={challenges} onReorder={reorderChallenges}>
            <Grid container spacing={2}>
              {challenges.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ChallengePreviewCard challenge={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditChallenge(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setChallengeDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2CommunityPageView banner={banner} posts={posts} challenges={challenges} />
        </Box>
      )}

      {/* Post add/edit dialog */}
      <Dialog open={postDialog} onClose={() => setPostDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {postEditId ? t('common.edit') : t('community.add_post_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('community.form_post_author')}
                    value={postForm.author}
                    onChange={(e) => setPostForm((p) => ({ ...p, author: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('community.form_post_role')}
                    value={postForm.role}
                    onChange={(e) => setPostForm((p) => ({ ...p, role: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('community.form_post_avatar')}
                  value={postForm.avatar}
                  onChange={(url) => setPostForm((p) => ({ ...p, avatar: url }))}
                  height={100}
                  rounded
                />
                <TextField
                  label={t('community.form_post_time')}
                  value={postForm.time}
                  onChange={(e) => setPostForm((p) => ({ ...p, time: e.target.value }))}
                  fullWidth
                  helperText="VD: 2 giờ trước"
                />
                <TextField
                  label={t('community.form_post_content')}
                  value={postForm.content}
                  onChange={(e) => setPostForm((p) => ({ ...p, content: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <Spa2SimpleImageField
                  label={t('community.form_post_image')}
                  value={postForm.image ?? ''}
                  onChange={(url) => setPostForm((p) => ({ ...p, image: url }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('community.form_post_likes')}
                    type="number"
                    value={postForm.likes}
                    onChange={(e) => setPostForm((p) => ({ ...p, likes: Number(e.target.value) }))}
                    fullWidth
                  />
                  <TextField
                    label={t('community.form_post_comments')}
                    type="number"
                    value={postForm.comments}
                    onChange={(e) =>
                      setPostForm((p) => ({ ...p, comments: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <MiniListField
                  label={t('community.form_post_tags')}
                  addLabel={t('community.add_tag_btn')}
                  items={postForm.tags}
                  onChangeItem={updateTag}
                  onAddItem={addTag}
                  onRemoveItem={removeTag}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <PostPreviewCard post={postForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPostDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPost}
            disabled={!postForm.author}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {postEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!postDeleteId}
        onClose={() => setPostDeleteId(null)}
        title={t('community.post_delete_title')}
        content={t('community.post_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePost}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Challenge add/edit dialog */}
      <Dialog
        open={challengeDialog}
        onClose={() => setChallengeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {challengeEditId ? t('common.edit') : t('community.add_challenge_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('community.form_challenge_name')}
                  value={challengeForm.name}
                  onChange={(e) => setChallengeForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('community.form_challenge_icon')}
                    value={challengeForm.icon}
                    onChange={(e) => setChallengeForm((p) => ({ ...p, icon: e.target.value }))}
                    fullWidth
                    helperText="🏆"
                  />
                  <TextField
                    label={t('community.form_challenge_participants')}
                    type="number"
                    value={challengeForm.participants}
                    onChange={(e) =>
                      setChallengeForm((p) => ({ ...p, participants: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label={t('community.form_challenge_color')}
                    value={challengeForm.color}
                    onChange={(e) => setChallengeForm((p) => ({ ...p, color: e.target.value }))}
                    fullWidth
                    helperText="#0D47A1"
                  />
                  <Tooltip title={challengeForm.color}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: challengeForm.color || SPA2_TEAL,
                        border: `1px solid ${SPA2_CREAM_DARK}`,
                        flexShrink: 0,
                      }}
                    />
                  </Tooltip>
                </Stack>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    {t('community.form_challenge_progress')} ({challengeForm.progress}%)
                  </Typography>
                  <Slider
                    value={challengeForm.progress}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(_, v) => setChallengeForm((p) => ({ ...p, progress: v as number }))}
                    sx={{ color: challengeForm.color || SPA2_TEAL }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ChallengePreviewCard challenge={challengeForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChallengeDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitChallenge}
            disabled={!challengeForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {challengeEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!challengeDeleteId}
        onClose={() => setChallengeDeleteId(null)}
        title={t('community.challenge_delete_title')}
        content={t('community.challenge_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteChallenge}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
