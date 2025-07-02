import { LlmConnector } from '@src/llm/domain/LlmConnector.ts';
import { LlmConnectorNotFoundError } from '@src/llm/domain/LlmConnectorNotFoundError.ts';
import { LlmConnectorId } from '@src/llm/domain/LlmConnectorId.ts';

export class LlmConnectorFactory {
  constructor(private readonly connectors: LlmConnector[]) {}

  get(id: LlmConnectorId): LlmConnector {
    return (
      this.connectors.find((llm) => llm.id() === id) ??
      (() => {
        throw new LlmConnectorNotFoundError(id);
      })()
    );
  }
}
