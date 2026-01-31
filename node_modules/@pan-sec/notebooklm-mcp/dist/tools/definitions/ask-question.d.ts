import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { NotebookLibrary } from "../../library/notebook-library.js";
/**
 * Build dynamic tool description for ask_question based on active notebook or library
 */
export declare function buildAskQuestionDescription(library: NotebookLibrary): string;
export declare const askQuestionTool: Tool;
//# sourceMappingURL=ask-question.d.ts.map