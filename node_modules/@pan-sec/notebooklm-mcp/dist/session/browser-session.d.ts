/**
 * Browser Session
 *
 * Represents a single browser session for NotebookLM interactions.
 *
 * Features:
 * - Human-like question typing
 * - Streaming response detection
 * - Auto-login on session expiry
 * - Session activity tracking
 * - Chat history reset
 *
 * Based on the Python implementation from browser_session.py
 */
import type { Page } from "patchright";
import { SharedContextManager } from "./shared-context-manager.js";
import { AuthManager } from "../auth/auth-manager.js";
import type { SessionInfo, ProgressCallback } from "../types.js";
export declare class BrowserSession {
    readonly sessionId: string;
    readonly notebookUrl: string;
    readonly createdAt: number;
    lastActivity: number;
    messageCount: number;
    private context;
    private sharedContextManager;
    private authManager;
    private page;
    private initialized;
    constructor(sessionId: string, sharedContextManager: SharedContextManager, authManager: AuthManager, notebookUrl: string);
    /**
     * Initialize the session by creating a page and navigating to the notebook
     */
    init(): Promise<void>;
    /**
     * Wait for NotebookLM interface to be ready
     *
     * IMPORTANT: Matches Python implementation EXACTLY!
     * - Uses SPECIFIC selectors (textarea.query-box-input)
     * - Checks ONLY for "visible" state (NOT disabled!)
     * - NO placeholder checks (let NotebookLM handle that!)
     *
     * Based on Python _wait_for_ready() from browser_session.py:104-113
     */
    private waitForNotebookLMReady;
    private isPageClosedSafe;
    /**
     * Ensure the session is authenticated, perform auto-login if needed
     */
    private ensureAuthenticated;
    private getOriginFromUrl;
    /**
     * Safely restore sessionStorage when the page is on the expected origin
     */
    private restoreSessionStorage;
    /**
     * Ask a question to NotebookLM
     */
    ask(question: string, sendProgress?: ProgressCallback): Promise<string>;
    /**
     * Find the chat input element
     *
     * IMPORTANT: Matches Python implementation EXACTLY!
     * - Uses SPECIFIC selectors from Python
     * - Checks ONLY visibility (NOT disabled state!)
     *
     * Based on Python ask() method from browser_session.py:166-171
     */
    private findChatInput;
    /**
     * Detect if a rate limit error occurred
     *
     * Searches the page for error messages indicating rate limit/quota exhaustion.
     * Free NotebookLM accounts have 50 queries/day limit.
     *
     * @returns true if rate limit error detected, false otherwise
     */
    private detectRateLimitError;
    /**
     * Reset the chat history (start a new conversation)
     */
    reset(): Promise<void>;
    /**
     * Close the session
     */
    close(): Promise<void>;
    /**
     * Update last activity timestamp
     */
    updateActivity(): void;
    /**
     * Check if session has expired (inactive for too long)
     */
    isExpired(timeoutSeconds: number): boolean;
    /**
     * Get session information
     */
    getInfo(): SessionInfo;
    /**
     * Get the underlying page (for advanced operations)
     */
    getPage(): Page | null;
    /**
     * Check if session is initialized
     */
    isInitialized(): boolean;
}
//# sourceMappingURL=browser-session.d.ts.map