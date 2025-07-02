import { LlmConnectorId } from '@src/llm/domain/LlmConnectorId.ts';

export interface LlmConnector {
  id(): LlmConnectorId;

  ask(question: string): Promise<string>;
}
