import type { SendMessageRequest, SendMessageResponse, ApiError, ConversationContext } from '../../types/api';

// Mock AI responses database
const AI_RESPONSES = [
  "That's a great topic! I'd be happy to help you explore your career path. What specific aspects would you like to discuss?",
  "I understand. Career development can feel overwhelming sometimes. What's your current situation?",
  "That makes sense. Have you considered what skills you'd like to develop further?",
  "Interesting perspective! What industries or roles are you most curious about?",
  "I can help you think through that. What are your main priorities when it comes to your career?",
  "That's a valid concern. Many people face similar challenges. What do you think is holding you back?",
  "Great question! Have you had a chance to research companies or roles that align with your interests?",
  "I see. Work-life balance is really important. What does an ideal day look like for you?",
  "That's exciting! What steps have you already taken towards that goal?",
  "I appreciate you sharing that. What support do you feel you need most right now?",
  "That's a thoughtful question. Have you considered reaching out to professionals in that field?",
  "I can relate to that challenge. What would success look like to you in this area?",
  "That's an important consideration. What factors are most important to you when making this decision?",
  "It sounds like you're really thinking this through. What's your timeline for making these changes?",
  "That's a valuable insight. How do you think your past experiences have prepared you for this next step?"
];

// Mock conversation context storage
const conversationContexts: Map<string, ConversationContext> = new Map();

// Simulate network delay
const NETWORK_DELAY = 800; // milliseconds

/**
 * Mock AI Service - Simulates backend AI API
 * This is for development/demo purposes only
 */
class MockAIService {
  private static instance: MockAIService;
  private responseIndex: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): MockAIService {
    if (!MockAIService.instance) {
      MockAIService.instance = new MockAIService();
    }
    return MockAIService.instance;
  }

  /**
   * Send a message to the AI and get a response
   */
  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      // Simulate network delay
      await this.delay(NETWORK_DELAY);

      // TESTING: Uncomment the line below to simulate errors for testing error handling UI
      // throw this.createApiError('Network connection failed', 'NETWORK_ERROR', 503);

      // Get or create conversation context
      const conversationId = request.conversationId || this.generateConversationId();
      const context = this.getOrCreateContext(conversationId, request.userId || 'default-user');

      // Get next AI response
      const currentIndex = this.responseIndex.get(conversationId) || 0;
      const responseContent = AI_RESPONSES[currentIndex % AI_RESPONSES.length];
      
      // Update response index for this conversation
      this.responseIndex.set(conversationId, currentIndex + 1);

      // Update conversation context
      context.messageCount += 2; // user message + AI response
      context.lastActivity = new Date().toISOString();
      conversationContexts.set(conversationId, context);

      const response: SendMessageResponse = {
        id: this.generateMessageId(),
        content: responseContent,
        timestamp: new Date().toISOString(),
        conversationId,
        isStreaming: true
      };

      return response;
    } catch {
      throw this.createApiError('Failed to send message', 'SEND_MESSAGE_ERROR', 500);
    }
  }

  /**
   * Create a new conversation
   */
  async createConversation(userId: string = 'default-user'): Promise<ConversationContext> {
    await this.delay(300); // Simulate network delay
    
    const conversationId = this.generateConversationId();
    const context: ConversationContext = {
      id: conversationId,
      userId,
      messageCount: 0,
      lastActivity: new Date().toISOString()
    };

    conversationContexts.set(conversationId, context);
    this.responseIndex.set(conversationId, 0);

    return context;
  }

  /**
   * Reset conversation (for when user clicks "End")
   */
  async resetConversation(conversationId: string): Promise<void> {
    await this.delay(200);
    conversationContexts.delete(conversationId);
    this.responseIndex.delete(conversationId);
  }


  // Helper methods
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateConversationId(): string {
    return `mock_conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateMessageId(): string {
    return `mock_msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getOrCreateContext(conversationId: string, userId: string): ConversationContext {
    let context = conversationContexts.get(conversationId);
    if (!context) {
      context = {
        id: conversationId,
        userId,
        messageCount: 0,
        lastActivity: new Date().toISOString()
      };
      conversationContexts.set(conversationId, context);
    }
    return context;
  }

  private createApiError(message: string, code: string, status: number): ApiError {
    return {
      message,
      code,
      status
    };
  }
}

// Export singleton instance
export const mockAIService = MockAIService.getInstance();

// Export the class for testing purposes
export { MockAIService };
