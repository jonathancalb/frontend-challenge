import type { SendMessageResponse, ConversationContext } from '../types/api';

class ApiClient {
  private static instance: ApiClient;
  private baseUrl: string;
  private apiKey?: string;

  private constructor() {
    this.baseUrl = (import.meta as any).env?.VITE_API_URL;
    this.apiKey = (import.meta as any).env?.VITE_API_KEY;
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async sendMessage(message: string, conversationId?: string): Promise<SendMessageResponse> {
    const response = await this.makeHttpRequest('/messages', 'POST', {
      message,
      conversationId,
      userId: this.getCurrentUserId()
    });

    return response;
  }

  async createConversation(): Promise<ConversationContext> {
    const response = await this.makeHttpRequest('/conversations', 'POST', {
      userId: this.getCurrentUserId()
    });

    return response;
  }

  async endConversation(conversationId: string): Promise<void> {
    await this.makeHttpRequest(`/conversations/${conversationId}/end`, 'POST');
  }

  private getCurrentUserId(): string {
    // In a real app, this would get the authenticated user ID from auth context
    // For now, return a placeholder
    return 'authenticated-user-id';
  }

  private async makeHttpRequest(
    endpoint: string, 
    method: string, 
    data?: any
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        ...(data && { body: JSON.stringify(data) })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          code: errorData.code || 'API_ERROR',
          status: response.status
        };
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = ApiClient.getInstance();