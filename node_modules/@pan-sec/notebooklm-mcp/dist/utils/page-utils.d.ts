/**
 * Page utilities for extracting responses from NotebookLM web UI
 *
 * This module provides functions to:
 * - Extract latest assistant responses from the page
 * - Wait for new responses with streaming detection
 * - Detect placeholders and loading states
 * - Snapshot existing responses for comparison
 *
 * Based on the Python implementation from page_utils.py
 */
import type { Page } from "patchright";
/**
 * Snapshot the latest response text currently visible
 * Returns null if no response found
 */
export declare function snapshotLatestResponse(page: Page): Promise<string | null>;
/**
 * Snapshot ALL existing assistant response texts
 * Used to capture visible responses BEFORE submitting a new question
 */
export declare function snapshotAllResponses(page: Page): Promise<string[]>;
/**
 * Count the number of visible assistant response elements
 */
export declare function countResponseElements(page: Page): Promise<number>;
/**
 * Wait for a new assistant response with streaming detection
 *
 * This function:
 * 1. Polls the page for new response text
 * 2. Detects streaming (text changes) vs. complete (text stable)
 * 3. Requires text to be stable for 3 consecutive polls before returning
 * 4. Ignores placeholders, question echoes, and known responses
 *
 * @param page Playwright page instance
 * @param options Options for waiting
 * @returns The new response text, or null if timeout
 */
export declare function waitForLatestAnswer(page: Page, options?: {
    question?: string;
    timeoutMs?: number;
    pollIntervalMs?: number;
    ignoreTexts?: string[];
    debug?: boolean;
}): Promise<string | null>;
declare const _default: {
    snapshotLatestResponse: typeof snapshotLatestResponse;
    snapshotAllResponses: typeof snapshotAllResponses;
    countResponseElements: typeof countResponseElements;
    waitForLatestAnswer: typeof waitForLatestAnswer;
};
export default _default;
//# sourceMappingURL=page-utils.d.ts.map