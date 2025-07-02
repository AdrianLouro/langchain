import { LlmConnectorFactory } from '@src/llm/domain/LlmConnectorFactory.ts';
import { LlmConnectorId } from '@src/llm/domain/LlmConnectorId.ts';
import { OllamaConnector } from '@src/llm/infrastructure/OllamaConnector.ts';
import { LlmConnector } from '@src/llm/domain/LlmConnector.ts';
import { LlmId } from '@src/llm/domain/LlmId.ts';
import { setSelectOptionsFromEnum } from '@src/llm/shared/infrastructure/SelectOptions.ts';

class Main {
  private static readonly LLM_CONNECTOR_HOST: string = import.meta.env
    .VITE_LLM_CONNECTOR_HOST;
  private static readonly LLM_CONNECTOR_PORT: number = import.meta.env
    .VITE_LLM_CONNECTOR_PORT;

  private static readonly llmForm: HTMLFormElement = document.getElementById(
    'llm-form',
  ) as HTMLFormElement;
  private static readonly llmConnectorSelect: HTMLSelectElement =
    document.getElementById('llm-connector-select') as HTMLSelectElement;
  private static readonly llmSelect: HTMLSelectElement =
    document.getElementById('llm-select') as HTMLSelectElement;
  private static readonly questionInput: HTMLTextAreaElement =
    document.getElementById('llm-question-input') as HTMLTextAreaElement;
  private static readonly llmResponseOutput: HTMLElement =
    document.getElementById('llm-response-output') as HTMLElement;
  private static readonly sendMessageButton: HTMLButtonElement =
    document.getElementById('send-message-button') as HTMLButtonElement;

  private static readonly connectors: LlmConnector[] = [
    new OllamaConnector(
      Main.LLM_CONNECTOR_HOST,
      Main.LLM_CONNECTOR_PORT,
      LlmId.gemma3_12b_it_q4_K_M,
    ),
  ];

  private static validateForm(): boolean {
    return (
      Main.llmConnectorSelect.value !== '' &&
      Main.llmSelect.value !== '' &&
      Main.questionInput.value.trim() !== ''
    );
  }

  private static updateButtonState(): void {
    Main.sendMessageButton.disabled = !Main.validateForm();
  }

  private static setInputEventListeners(): void {
    Main.llmConnectorSelect.addEventListener('change', () =>
      Main.updateButtonState(),
    );
    Main.llmSelect.addEventListener('change', () => Main.updateButtonState());
    Main.questionInput.addEventListener('input', () =>
      Main.updateButtonState(),
    );
  }

  private static setFormSubmitEventListener(): void {
    Main.llmForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!Main.validateForm()) {
        return;
      }

      const connectorId = Main.llmConnectorSelect.value as LlmConnectorId;
      const llmConnector = new LlmConnectorFactory(Main.connectors).get(
        connectorId,
      );

      Main.sendMessageButton.disabled = true;
      llmConnector
        .ask(Main.questionInput.value)
        .then((response: string) => {
          Main.llmResponseOutput.innerText = response;
        })
        .catch((error: Error) => {
          alert(error.message);
        })
        .finally(() => {
          Main.updateButtonState();
        });
    });
  }

  public static main(): void {
    setSelectOptionsFromEnum(Main.llmConnectorSelect, LlmConnectorId);
    setSelectOptionsFromEnum(Main.llmSelect, LlmId);
    Main.setFormSubmitEventListener();
    Main.setInputEventListeners();
    Main.updateButtonState();
  }
}

Main.main();
