import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} FilterParams
 * @property {Record<string, unknown>} filters - Current filter values.
 * @property {number}                  page    - Current 1-based page number.
 * @property {string}                  search  - Current search string.
 */

// ─── Pure utility ─────────────────────────────────────────────────────────────

/**
 * Converts a filter snapshot into a URL query string.
 * Skips values that are `null`, `undefined`, or `""`.
 * Omits `page` when it equals `1`.
 *
 * @param {Object} [params]
 * @param {Record<string, unknown>} [params.filters]
 * @param {number}                  [params.page]
 * @param {string}                  [params.search]
 * @returns {string} URL-encoded query string, e.g. `"search=foo&fromDate=2024-01-01"`.
 *
 * @example
 * buildQuery({ filters: { fromDate: "2024-01-01", toDate: "" }, page: 2, search: "foo" });
 * // → "search=foo&page=2&fromDate=2024-01-01"
 */
export function buildQuery({ filters, page, search } = {}) {
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (page && page > 1) query.set("page", String(page));
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value != null && value !== "") query.set(key, String(value));
    });
  }
  return query.toString();
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages filter, search, and pagination state in one place.
 *
 * When used with **TanStack Query**, omit `fetchFn` and spread the returned
 * `params` into the `queryKey` instead — React Query will refetch automatically
 * whenever the state changes.
 *
 * When used **without** TanStack Query, pass a `fetchFn` and every action
 * method will call it automatically after updating state.
 *
 * @template {Record<string, unknown>} T
 *
 * @param {T}                                            initialFilters
 * @param {(params: FilterParams) => Promise<void>}      [fetchFn]       - Optional. Omit when using TanStack Query.
 *
 * @example <caption>With TanStack Query</caption>
 * const f = useFilters({ fromDate: "", toDate: "" });
 *
 * const { data } = useQuery({
 *   queryKey: ["awards", f.params],
 *   queryFn:  () => fetchAwards(buildQuery(f.params)),
 * });
 *
 * @example <caption>Without TanStack Query</caption>
 * const f = useFilters({ fromDate: "", toDate: "" }, fetchAwards);
 * await f.applyFilters(); // calls fetchAwards internally
 */
export function useFilters(initialFilters, fetchFn = async () => {}) {
  const [filters, setFilters] = useState({ ...initialFilters });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // ── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Current state snapshot — spread into `queryKey` or pass to `buildQuery`.
   *
   * @type {FilterParams}
   */
  const params = { filters, page, search };

  /**
   * `true` when at least one filter field has a non-empty, non-null value.
   * Useful for conditionally rendering a "Clear filters" button.
   *
   * @type {boolean}
   */
  const hasActiveFilters = Object.values(filters).some((v) => v != null && v !== "");

  /**
   * Updates a single filter field **without** triggering a fetch.
   * Call {@link applyFilters} when the user is ready to submit.
   *
   * @param {keyof T} field
   * @param {T[keyof T]} value
   *
   * @example
   * f.setFilter("fromDate", "2024-01-01");
   */
  function setFilter(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * Applies filter values, resets to page 1, then calls `fetchFn` (if provided).
   *
   * @param {T} [next] - Defaults to the current `filters` state.
   *
   * @example
   * await f.applyFilters();
   * await f.applyFilters({ fromDate: "2024-01-01", toDate: "2024-12-31" });
   */
  async function applyFilters(next = filters) {
    setFilters(next);
    setPage(1);
    await fetchFn({ filters: next, page: 1, search });
  }

  /**
   * Applies a search term, resets to page 1, then calls `fetchFn` (if provided).
   *
   * @param {string} [term] - Defaults to the current `search` state.
   *
   * @example
   * await f.applySearch("graduation");
   */
  async function applySearch(term = search) {
    setSearch(term);
    setPage(1);
    await fetchFn({ filters, page: 1, search: term });
  }

  /**
   * Clears the search term, resets to page 1, then calls `fetchFn` (if provided).
   * Active filters are preserved.
   *
   * @example
   * <button onClick={f.clearSearch}>✕</button>
   */
  async function clearSearch() {
    setSearch("");
    setPage(1);
    await fetchFn({ filters, page: 1, search: "" });
  }

  /**
   * Resets **all** state (filters, search, page, totalPages) to initial values,
   * then calls `fetchFn` (if provided).
   *
   * @example
   * <button onClick={f.reset}>Reset all</button>
   */
  async function reset() {
    const clean = { ...initialFilters };
    setFilters(clean);
    setSearch("");
    setPage(1);
    setTotalPages(0);
    await fetchFn({ filters: clean, page: 1, search: "" });
  }

  /**
   * Navigates to a specific page, then calls `fetchFn` (if provided).
   * Filters and search term are preserved.
   *
   * @param {number} next - 1-based page number.
   *
   * @example
   * <Pagination onChange={f.goToPage} />
   */
  async function goToPage(next) {
    setPage(next);
    await fetchFn({ filters, page: next, search });
  }

  // ─────────────────────────────────────────────────────────────────────────

  return {
    // ── State ──────────────────────────────────────────────────────────────
    /** @type {T} Current filter values. */
    filters,
    /** @type {string} Current search string. */
    search,
    /** @type {number} Current 1-based page number. */
    page,
    /** @type {number} Total pages — set this after receiving a response. */
    totalPages,
    /** @type {boolean} True when any filter field has a non-empty value. */
    hasActiveFilters,
    /** @type {FilterParams} Full snapshot — spread into queryKey or buildQuery. */
    params,

    // ── Fine-grained setters (no fetch) ────────────────────────────────────
    /** Update a single filter field without triggering a fetch. */
    setFilter,
    /** Directly set the search string without triggering a fetch. */
    setSearch,
    /** Set total pages after receiving a paginated response. */
    setTotalPages,

    // ── Actions (trigger fetch / queryKey change) ──────────────────────────
    /** Apply current (or provided) filters and reset to page 1. */
    applyFilters,
    /** Apply a search term and reset to page 1. */
    applySearch,
    /** Clear the search term and reload (filters preserved). */
    clearSearch,
    /** Navigate to a specific page. */
    goToPage,
    /** Reset all state to initial values and reload. */
    reset,
  };
}
