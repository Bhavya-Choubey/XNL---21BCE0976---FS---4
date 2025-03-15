import * as dotenv from 'dotenv';
dotenv.config(); // ✅ Load env variables first

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../job/job.schema';
import { Freelancer } from '../freelancer/freelancer.schema';
import { OpenAI } from 'openai';

@Injectable()
export class AIMatchingService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Freelancer.name) private freelancerModel: Model<Freelancer>,
  ) {}

  async getJobRecommendations(freelancerId: string): Promise<Job[]> {
    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); // ✅ Debugging

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    const freelancer = await this.freelancerModel.findById(freelancerId);
    if (!freelancer) throw new Error('Freelancer not found');

    const skillEmbedding = await this.getEmbeddings(freelancer.skills.join(', '));
    const jobs = await this.jobModel.find();

    const scoredJobs = await Promise.all(
      jobs.map(async (job) => {
        const jobEmbedding = await this.getEmbeddings(job.description);
        const score = this.cosineSimilarity(skillEmbedding, jobEmbedding);
        return { job, score };
      }),
    );

    scoredJobs.sort((a, b) => b.score - a.score);
    return scoredJobs.slice(0, 5).map((j) => j.job);
  }

  private async getEmbeddings(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data[0].embedding;
  }

  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (norm1 * norm2);
  }
}
