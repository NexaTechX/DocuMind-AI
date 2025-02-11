import { semanticSearch } from './ai';

describe('Semantic Search', () => {
  it('should return relevant results for a given query', async () => {
    const query = 'What are the benefits of using AI for document analysis?';
    const results = await semanticSearch(query);
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    // Further assertions can be added based on expected structure of results
  });
});
