/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GenerativeLanguageService {
  private URL = 'http://127.0.0.1:5001/chatbot-demo-7e376/us-central1/generate_aqa_answer';

  private chat_id = 'chatcmpl-123';
  private chatcompetionsURL = `http://127.0.0.1:80/api/v1/chats_openai/${this.chat_id}/chat/completions`;

  private model = 'model';
  private streamBool = true;
  private messages = [{'role': 'user', 'content': 'Say this is a test!'}];

  private body = {
    model: this.model,
    messages: this.messages,
    stream: this.streamBool,
  };

  constructor(private http: HttpClient) {}

  async getAQAAnswer(prompt: string): Promise<Observable<AQAResponse>> {
    return this.http.get<AQAResponse>(`${this.URL}?text=${prompt}`);
  }

  async getAChatCompletion(prompt: string): Promise<Observable<any>> {
    return this.http.post(`${this.chatcompetionsURL}`, this.body);
  }

  // new code to test workflow testing with streaming
  async getAChatCompletionStream(prompt: string): Promise<Observable<any>> {
    return this.http.post(`${this.chatcompetionsURL}`, this.body, {
      responseType: 'text',
    });
  }
}
export interface AQAResponse {
  answer: string;
  probability: Number;
  url: string;
  questions?: string[];
}
