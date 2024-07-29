import type { IQuestion } from '../types/questions';

const LOCAL_STORAGE_KEY = 'questions';

class QuestionsService {

  private async delayBeforeExecution<T>(operation: () => Promise<T>, delay: number = 500): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return operation();
  }

  async loadQuestions(): Promise<IQuestion[]> {
    return this.delayBeforeExecution(async () => {
      const storedQuestions = localStorage.getItem(LOCAL_STORAGE_KEY);
      const questions = storedQuestions ? JSON.parse(storedQuestions) : [];
      return questions;
    });
  }

  async getQuestionById(id: string): Promise<IQuestion | undefined> {
    return this.delayBeforeExecution(async () => {
      const storedQuestions = await this.loadQuestions();
      return storedQuestions.find(question => question.id === id);
    });
  }

  async saveQuestions(questions: IQuestion[]): Promise<void> {
    return this.delayBeforeExecution(async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
    });
  }

  async addQuestion(questions: IQuestion[], newQuestion: IQuestion): Promise<IQuestion[]> {
    return this.delayBeforeExecution(async () => {
      questions.push(newQuestion);
      await this.saveQuestions(questions);
      return questions;
    });
  }

  async updateQuestion(questions: IQuestion[], updatedQuestion: IQuestion): Promise<IQuestion[]> {
    return this.delayBeforeExecution(async () => {
      const index = questions.findIndex(q => q.id === updatedQuestion.id);
      if (index !== -1) {
        questions[index] = updatedQuestion;
        await this.saveQuestions(questions);
      }
      return questions;
    });
  }

  async deleteQuestion(questions: IQuestion[], id: string): Promise<IQuestion[]> {
    return this.delayBeforeExecution(async () => {
      const updatedQuestions = questions.filter(q => q.id !== id);
      await this.saveQuestions(updatedQuestions);
      return updatedQuestions;
    });
  }
}

export default new QuestionsService();
