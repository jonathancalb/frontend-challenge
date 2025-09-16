import { mockAIService } from './aiService';
import type { SendMessageRequest, SendMessageResponse, ConversationContext } from '../../types/api';

/**
 * Mock API Client - Development/Demo Only
 * This simulates what a real API client would do
 */
class MockApiClient {
  private static instance: MockApiClient;

  private constructor() {}

  public static getInstance(): MockApiClient {
    if (!MockApiClient.instance) {
      MockApiClient.instance = new MockApiClient();
    }
    return MockApiClient.instance;
  }

  /**
   * Send a message to Iris AI (Mock Implementation)
   */
  async sendMessage(message: string, conversationId?: string): Promise<SendMessageResponse> {
    const request: SendMessageRequest = {
      message,
      conversationId,
      userId: this.getCurrentUserId()
    };

    return mockAIService.sendMessage(request);
  }

  /**
   * Create a new conversation (Mock Implementation)
   */
  async createConversation(): Promise<ConversationContext> {
    return mockAIService.createConversation(this.getCurrentUserId());
  }

  /**
   * End/reset a conversation (Mock Implementation)
   */
  async endConversation(conversationId: string): Promise<void> {
    return mockAIService.resetConversation(conversationId);
  }


  // Helper methods
  private getCurrentUserId(): string {
    // Mock user ID for development
    return 'mock-user-' + Date.now().toString().slice(-6);
  }
}

// Export singleton instance
export const mockApiClient = MockApiClient.getInstance();
