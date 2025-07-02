import { LlmConnectorId } from '@src/llm/domain/LlmConnectorId.ts';

export class LlmConnectorNotFoundError extends Error {
  constructor(id: LlmConnectorId) {
    super(`Llm connector with id ${id} not found`);
  }
}
