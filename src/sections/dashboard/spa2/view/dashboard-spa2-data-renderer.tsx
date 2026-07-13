import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  data: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getArrayFromData(data: unknown): unknown[] | null {
  if (Array.isArray(data)) {
    return data;
  }

  if (isRecord(data)) {
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.packages)) return data.packages;
    if (Array.isArray(data.programs)) return data.programs;
    if (Array.isArray(data.profiles)) return data.profiles;
    if (Array.isArray(data.stats)) return data.stats;
    if (Array.isArray(data.tiers)) return data.tiers;
    if (Array.isArray(data.rules)) return data.rules;
    if (Array.isArray(data.sections)) return data.sections;
    if (Array.isArray(data.courses)) return data.courses;
    if (Array.isArray(data.therapists)) return data.therapists;
    if (Array.isArray(data.upcoming)) return data.upcoming;
    if (Array.isArray(data.plans)) return data.plans;
    if (Array.isArray(data.consultants)) return data.consultants;
    if (Array.isArray(data.rooms)) return data.rooms;
    if (Array.isArray(data.coverage)) return data.coverage;
    if (Array.isArray(data.branches)) return data.branches;
    if (Array.isArray(data.services)) return data.services;
    if (Array.isArray(data.entries)) return data.entries;
    if (Array.isArray(data.questions)) return data.questions;
    if (Array.isArray(data.commitments)) return data.commitments;
    if (Array.isArray(data.leaderboard)) return data.leaderboard;
    if (Array.isArray(data.features)) return data.features;
    if (Array.isArray(data.topics)) return data.topics;
    if (Array.isArray(data.awards)) return data.awards;
    if (Array.isArray(data.tips)) return data.tips;
    if (Array.isArray(data.recentBookings)) return data.recentBookings;
    if (Array.isArray(data.past)) return data.past;
    if (Array.isArray(data.story)) return data.story;
    if (Array.isArray(data.team)) return data.team;
    if (Array.isArray(data.certifications)) return data.certifications;
    if (Array.isArray(data.instructors)) return data.instructors;
    if (Array.isArray(data.related)) return data.related;
    if (Array.isArray(data.visionMission)) return data.visionMission;
    if (Array.isArray(data.designs)) return data.designs;
    if (Array.isArray(data.denominations)) return data.denominations;
    if (Array.isArray(data.areas)) return data.areas;
    if (Array.isArray(data.metrics)) return data.metrics;
    if (Array.isArray(data.categories)) return data.categories;
    if (Array.isArray(data.platforms)) return data.platforms;
    if (Array.isArray(data.steps)) return data.steps;
    if (Array.isArray(data.baseServices)) return data.baseServices;
    if (Array.isArray(data.catalog)) return data.catalog;
    if (Array.isArray(data.results)) return data.results;
  }

  return null;
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Có' : 'Không';
  if (typeof value === 'number') {
    if (value > 999) return fCurrency(value);
    return String(value);
  }
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function getTableColumns(rows: unknown[]): string[] {
  const first = rows[0];

  if (!isRecord(first)) {
    return ['value'];
  }

  const priority = ['name', 'title', 'slug', 'id', 'service', 'date', 'price', 'status', 'rating'];

  const keys = Object.keys(first).filter(
    (key) =>
      ![
        'image',
        'thumbnail',
        'icon',
        'desc',
        'description',
        'benefits',
        'perks',
        'includes',
        'notIncluded',
        'options',
      ].includes(key)
  );

  keys.sort((a, b) => {
    const ai = priority.indexOf(a);
    const bi = priority.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return keys.slice(0, 6);
}

function renderStatsCards(stats: unknown[]) {
  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => {
        const item = isRecord(stat) ? stat : { label: `Stat ${index + 1}`, value: stat };

        return (
          <Grid key={String(item.label ?? index)} xs={12} sm={6} md={3}>
            <Card sx={{ p: 2.5 }}>
              <Typography variant="h4">{formatCellValue(item.value)}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {formatCellValue(item.label)}
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

function renderTable(rows: unknown[]) {
  const columns = getTableColumns(rows);

  return (
    <TableContainer component={Card}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} sx={{ textTransform: 'capitalize' }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {columns.map((col) => (
                <TableCell key={col}>{formatCellValue(isRecord(row) ? row[col] : row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function renderObjectDetails(data: Record<string, unknown>) {
  const entries = Object.entries(data).filter(
    ([, value]) => typeof value !== 'object' || value === null
  );

  if (!entries.length) {
    return null;
  }

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={1.5}>
        {entries.map(([key, value]) => (
          <Stack key={key} direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle2" sx={{ minWidth: 140, textTransform: 'capitalize' }}>
              {key}
            </Typography>
            <Typography variant="body2">{formatCellValue(value)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

function renderSingleItem(item: Record<string, unknown>) {
  return (
    <Stack spacing={3}>
      {renderObjectDetails(item)}
      {Array.isArray(item.benefits) && (
        <Card sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
            Lợi ích
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {item.benefits.map((benefit) => (
              <Chip key={String(benefit)} label={String(benefit)} size="small" variant="soft" />
            ))}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function DashboardSpa2DataRenderer({ data }: Props) {
  if (data === null || data === undefined) {
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Không có dữ liệu.
      </Typography>
    );
  }

  if (isRecord(data) && isRecord(data.item)) {
    const related = getArrayFromData({ items: data.related });

    return (
      <Stack spacing={3}>
        {renderSingleItem(data.item)}
        {related && related.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Liên quan
            </Typography>
            {renderTable(related)}
          </Box>
        )}
      </Stack>
    );
  }

  if (isRecord(data) && Array.isArray(data.stats)) {
    return (
      <Stack spacing={3}>
        {renderStatsCards(data.stats)}
        {Array.isArray(data.services) && data.services.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dịch vụ nổi bật
            </Typography>
            {renderTable(data.services)}
          </Box>
        )}
      </Stack>
    );
  }

  if (isRecord(data) && isRecord(data.profile)) {
    return (
      <Stack spacing={3}>
        {renderObjectDetails(data.profile)}
        {Array.isArray(data.recentBookings) && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Lịch sử đặt lịch
            </Typography>
            {renderTable(data.recentBookings)}
          </Box>
        )}
      </Stack>
    );
  }

  const list = getArrayFromData(data);

  if (list && list.length > 0) {
    return renderTable(list);
  }

  if (isRecord(data)) {
    const nestedLists = Object.entries(data).filter(
      ([, value]) => Array.isArray(value) && value.length
    );

    if (nestedLists.length) {
      return (
        <Stack spacing={3}>
          {renderObjectDetails(
            Object.fromEntries(Object.entries(data).filter(([, value]) => !Array.isArray(value)))
          )}
          {nestedLists.map(([key, value]) => (
            <Box key={key}>
              <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
                {key}
              </Typography>
              {renderTable(value as unknown[])}
            </Box>
          ))}
        </Stack>
      );
    }

    return renderObjectDetails(data);
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="body2">{formatCellValue(data)}</Typography>
    </Card>
  );
}
