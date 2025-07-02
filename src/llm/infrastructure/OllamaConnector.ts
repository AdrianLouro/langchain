import { LlmConnector } from '@src/llm/domain/LlmConnector.ts';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOllama } from '@langchain/ollama';
import { LlmConnectorId } from '@src/llm/domain/LlmConnectorId.ts';
import { Url } from '@src/llm/shared/domain/Url.ts';
import { LlmId } from '@src/llm/domain/LlmId.ts';

export class OllamaConnector implements LlmConnector {
  private llm: ChatOllama;

  constructor(host: string, port: number, model: LlmId) {
    this.llm = new ChatOllama({
      baseUrl: Url.create(host, port),
      model: model,
      temperature: 0.7,
    });
  }

  id(): LlmConnectorId {
    return LlmConnectorId.Ollama;
  }

  async ask(message: string): Promise<string> {
    const messages = [
      new SystemMessage("You're a helpful assistant."),
      new HumanMessage(message),
    ];

    return (await this.llm.invoke(messages)).content;
  }
}
