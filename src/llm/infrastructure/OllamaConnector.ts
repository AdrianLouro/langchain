import { LlmConnector } from '@src/llm/domain/LlmConnector.ts';
import { ChatOllama } from '@langchain/ollama';
import { LlmConnectorId } from '@src/llm/domain/LlmConnectorId.ts';
import { Url } from '@src/llm/shared/domain/Url.ts';
import { LlmId } from '@src/llm/domain/LlmId.ts';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';

export class OllamaConnector implements LlmConnector {
  private llm: ChatOllama;
  private conversation: ConversationChain;

  constructor(host: string, port: number, model: LlmId) {
    this.llm = new ChatOllama({
      baseUrl: Url.create(host, port),
      model: model,
      temperature: 0.7,
    });

    this.conversation = new ConversationChain({
      llm: this.llm,
      memory: new BufferMemory({ returnMessages: true }),
    });
  }

  id(): LlmConnectorId {
    return LlmConnectorId.Ollama;
  }

  async ask(message: string): Promise<string> {
    return (await this.conversation.call({ input: message })).response;
  }
}
