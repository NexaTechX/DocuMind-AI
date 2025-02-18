export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleError(error: unknown) {
  console.error('Error:', error);

  if (error instanceof APIError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new APIError(error.message);
  }

  throw new APIError('An unexpected error occurred');
}
