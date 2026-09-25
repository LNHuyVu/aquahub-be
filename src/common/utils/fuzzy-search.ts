import { SelectQueryBuilder } from 'typeorm';

/**
 * Remove Vietnamese diacritics / tones from a string
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

/**
 * Applies multi-token unaccented fuzzy search to a TypeORM SelectQueryBuilder.
 *
 * @param queryBuilder The TypeORM SelectQueryBuilder instance
 * @param search Search text entered by user (can be accented or unaccented, multi-word)
 * @param targetColumns Array of columns to search in (e.g. ['fish.nameVi', 'fish.nameEn', 'fish.scientificName'])
 */
export function applyFuzzySearch<T extends object>(
  queryBuilder: SelectQueryBuilder<T>,
  search: string | undefined | null,
  targetColumns: string[],
): SelectQueryBuilder<T> {
  if (!search || typeof search !== 'string') return queryBuilder;

  const trimmed = search.trim();
  if (!trimmed) return queryBuilder;

  // Split search into non-empty tokens
  const rawTokens = trimmed
    .split(/[\s,._-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (rawTokens.length === 0) return queryBuilder;

  const combinedParams: Record<string, string> = {};

  const tokenConditions = rawTokens.map((token, index) => {
    const paramKey = `fuzzy_tok_${index}_${Math.random().toString(36).substring(2, 7)}`;
    const cleanToken = removeVietnameseTones(token).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    combinedParams[paramKey] = `\\y${cleanToken}`;

    const colsOr = targetColumns
      .map((col) => `unaccent(${col}) ~* :${paramKey}`)
      .join(' OR ');

    return `(${colsOr})`;
  });

  queryBuilder.andWhere(`(${tokenConditions.join(' AND ')})`, combinedParams);

  return queryBuilder;
}
